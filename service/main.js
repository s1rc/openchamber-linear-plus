// src/service/main.ts
import http from "node:http";
import os from "node:os";
import path3 from "node:path";
// node_modules/@openchamber/sdk/dist/scrollbar-style.js
var GUEST_SCROLLING_ATTRIBUTE = "data-oc-scrolling";
var GUEST_SCROLLBAR_CSS = `
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [${GUEST_SCROLLING_ATTRIBUTE}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${GUEST_SCROLLING_ATTRIBUTE}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${GUEST_SCROLLING_ATTRIBUTE}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${GUEST_SCROLLING_ATTRIBUTE}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;
function installGuestScrollbarActivity(doc) {
  const root = doc.documentElement;
  if (root.hasAttribute("data-oc-scrollbar-activity"))
    return;
  root.setAttribute("data-oc-scrollbar-activity", "");
  const timers = new WeakMap;
  doc.addEventListener("scroll", (event) => {
    const target = event.target === doc ? root : event.target;
    if (!(target instanceof Element))
      return;
    if (!target.hasAttribute("data-oc-scrolling"))
      target.setAttribute("data-oc-scrolling", "");
    const pending = timers.get(target);
    if (pending !== undefined)
      clearTimeout(pending);
    timers.set(target, setTimeout(() => {
      timers.delete(target);
      target.removeAttribute("data-oc-scrolling");
    }, 1000));
  }, { capture: true, passive: true });
}
var GUEST_SCROLLBAR_SCRIPT = `(${installGuestScrollbarActivity.toString()})(document);`;
// node_modules/@openchamber/sdk/dist/manifest.js
var TRACKER_URL_TOKENS = ["{id}", "{segment}", "{segments+}"];
var TRACKER_URL_TOKEN_SET = new Set(TRACKER_URL_TOKENS);
// node_modules/@openchamber/sdk/dist/session-events.js
var GUEST_SESSION_EVENT_TYPES = [
  "turn-finished",
  "turn-failed",
  "permission-asked",
  "question-asked",
  "turn-started",
  "session-created",
  "session-archived",
  "session-deleted"
];
var SESSION_EVENTS_PATH = "/session-events";
var SESSION_EVENTS_WIRE_VERSION = 1;
var SESSION_EVENTS_IDLE_MS = 10 * 60000;
var EVENT_TYPES = new Set(GUEST_SESSION_EVENT_TYPES);
var isGuestSessionEventType = (value) => EVENT_TYPES.has(value);
var readSessionEventRequest = (body) => {
  let wire;
  try {
    const parsed = JSON.parse(body);
    if (Object(parsed) !== parsed || parsed === null)
      return null;
    wire = parsed;
  } catch {
    return null;
  }
  const { v, requestId, event, content } = wire;
  if (v !== SESSION_EVENTS_WIRE_VERSION)
    return null;
  if (String(requestId) !== requestId || requestId.length === 0)
    return null;
  if (Object(event) !== event || event === undefined)
    return null;
  const { id, type, at, session, project, linked, permission, question } = event;
  if (String(id) !== id || id.length === 0)
    return null;
  if (String(type) !== type || !isGuestSessionEventType(type))
    return null;
  if (!Number.isFinite(at))
    return null;
  if (Object(session) !== session || session === undefined)
    return null;
  const sessionId = session.id;
  if (String(sessionId) !== sessionId || sessionId.length === 0)
    return null;
  const parentId = session.parentId;
  if (parentId !== null && (String(parentId) !== parentId || parentId.length === 0))
    return null;
  if (Object(project) !== project || project === undefined)
    return null;
  const directory = project.directory;
  if (directory !== null && (String(directory) !== directory || directory.length === 0))
    return null;
  if (!Array.isArray(linked))
    return null;
  const request = {
    v: SESSION_EVENTS_WIRE_VERSION,
    requestId,
    event: { id, type, at: Number(at), session: { id: sessionId, parentId }, project: { directory }, linked }
  };
  if (permission !== undefined) {
    if (Object(permission) !== permission)
      return null;
    const permissionRequestId = permission.requestId;
    if (String(permissionRequestId) !== permissionRequestId || permissionRequestId.length === 0)
      return null;
    request.event.permission = { requestId: permissionRequestId };
  }
  if (question !== undefined) {
    if (Object(question) !== question)
      return null;
    const { kind, id: questionId } = question;
    if (kind !== "form" && kind !== "page")
      return null;
    if (String(questionId) !== questionId || questionId.length === 0)
      return null;
    request.event.question = { kind, id: questionId };
  }
  if (content !== undefined) {
    if (Object(content) !== content || content.type !== type)
      return null;
    request.content = content;
  }
  return request;
};
// node_modules/@openchamber/sdk/dist/service-host.js
var SERVICE_HOST_PATH = "/service/call";
var OPENCHAMBER_HOST_CALLBACK_URL_ENV = "OPENCHAMBER_HOST_CALLBACK_URL";
var SERVICE_HOST_TIMEOUT_MS = 30000;
var SERVICE_SCHEDULE_IDLE_MS = 10 * 60000;
var MENTIONS_SEARCH_PATH = "/mentions/search";
var MENTIONS_RESOLVE_PATH = "/mentions/resolve";
var MENTIONS_IDLE_MS = 10 * 60000;
class ServiceHostError extends Error {
  code;
  status;
  constructor(message, code, status) {
    super(message);
    this.name = "ServiceHostError";
    this.code = code;
    this.status = status;
  }
}
var createServiceHost = ({ env }) => {
  const call = async (method, input) => {
    const base = env[OPENCHAMBER_HOST_CALLBACK_URL_ENV];
    const token = env.OPENCHAMBER_SERVICE_TOKEN;
    if (!base || !token)
      throw new ServiceHostError("This service was not started by OpenChamber.", "HOST_UNAVAILABLE", 0);
    let response;
    try {
      response = await fetch(`${base.replace(/\/+$/, "")}${SERVICE_HOST_PATH}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ method, input }),
        signal: AbortSignal.timeout(SERVICE_HOST_TIMEOUT_MS)
      });
    } catch {
      throw new ServiceHostError("OpenChamber did not answer.", "HOST_UNAVAILABLE", 0);
    }
    const body = await response.json().catch(() => null);
    if (response.ok && body?.result !== undefined)
      return body.result;
    throw new ServiceHostError(body?.error?.message ?? `OpenChamber answered HTTP ${response.status}.`, body?.error?.code ?? "HOST_UNAVAILABLE", response.status);
  };
  return {
    sessions: {
      start: (input) => call("sessions.start", input),
      send: (sessionId, prompt) => call("sessions.send", { sessionId, prompt }),
      retry: (sessionId) => call("sessions.retry", { sessionId }),
      status: (sessionId) => call("sessions.status", { sessionId }),
      lastReply: (sessionId) => call("sessions.lastReply", { sessionId }),
      stop: (sessionId) => call("sessions.stop", { sessionId }),
      answerPermission: (sessionId, requestId, answer) => call("sessions.answerPermission", { sessionId, requestId, ...answer }),
      answerForm: (sessionId, formId, values, message) => call("sessions.answerForm", { sessionId, formId, values, ...message === undefined ? {} : { message } })
    },
    setInstructions: (directory, text) => call("instructions.set", { directory, text }),
    emit: (topic, data) => call("panels.emit", { topic, data }),
    readSettings: () => call("settings.read", {}).then(({ settings }) => settings),
    needsConfiguration: (message) => call("status.set", { needsConfiguration: message })
  };
};
// node_modules/@openchamber/sdk/dist/file-editor.js
var patternExpressions = new Map;
// node_modules/@openchamber/sdk/dist/contract.js
var GUEST_FILE_STAT_KINDS = ["file", "directory", "other", "missing"];
var GUEST_GENERATE_LATE_KEEP_MS = 60 * 60000;
var HOST_REQUEST_ERROR_CODES = [
  "HOST_UNAVAILABLE",
  "HOST_TIMEOUT",
  "HOST_REJECTED",
  "DISCONNECTED",
  "DISABLED",
  "BAD_PATH",
  "NO_INTEGRATION",
  "NO_SERVICE",
  "SERVICE_FAILED",
  "REQUEST_FAILED",
  "RESPONSE_TOO_LARGE",
  "NO_SESSION",
  "SESSION_BUSY",
  "NOT_GRANTED",
  "NO_DIRECTORY",
  "NOT_FOUND",
  "FILE_TOO_LARGE",
  "DENIED",
  "NO_MODEL",
  "MODEL_FAILED",
  "UNSUPPORTED"
];
var SERVICE_STATUS_VALUES = ["stopped", "starting", "ready", "failed"];
var hostRequestErrorCodeSet = new Set(HOST_REQUEST_ERROR_CODES);
var serviceStatusSet = new Set(SERVICE_STATUS_VALUES);
var fileStatKindSet = new Set(GUEST_FILE_STAT_KINDS);
var HOST_PUSH_TYPES = new Set([
  "workspace",
  "shells",
  "ready",
  "directory",
  "session",
  "connection",
  "settings",
  "session-lifecycle",
  "item",
  "resolve",
  "action",
  "service-event",
  "status-control-event",
  "popover-closed",
  "file-open",
  "file-snapshot",
  "file-saved",
  "generate-late"
]);
// node_modules/@openchamber/sdk/dist/service-providers.js
var BROWSER_CONTROL_ACTIONS = [
  "browser.open",
  "browser.snapshot",
  "browser.click",
  "browser.type",
  "browser.select",
  "browser.scroll",
  "browser.back",
  "browser.forward",
  "browser.inspect",
  "browser.capture",
  "browser.resize",
  "browser.close"
];
var BROWSER_PROVIDER_IDLE_MS = 10 * 60000;
var CONTROL_ACTIONS = new Set(BROWSER_CONTROL_ACTIONS);
var SOURCE_CONTROL_PROVIDER_IDLE_MS = 10 * 60000;
var NOTIFICATIONS_PROVIDER_IDLE_MS = 10 * 60000;
var TRACKER_PROVIDER_IDLE_MS = 10 * 60000;
var QUOTA_PROVIDER_IDLE_MS = 10 * 60000;
// node_modules/@openchamber/sdk/dist/service-surface.js
var SURFACE_CONTROLLERS = ["none", "agent", "user"];
var CONTROLLERS = new Set(SURFACE_CONTROLLERS);
// src/service/directories.ts
import path from "node:path";
var trimDir = (directory) => {
  const trimmed = directory.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};
var mainOfGitFile = (text, directory) => {
  const match = text?.match(/^gitdir:\s*(.+?)\s*$/m);
  if (!match?.[1])
    return null;
  const gitdir = path.posix.resolve(directory, match[1]);
  return /^(.*)\/\.git\/worktrees\/[^/]+\/?$/.exec(gitdir)?.[1] ?? null;
};
var resolveMapped = (directory, mapped, read) => {
  if (!directory)
    return null;
  const dir = trimDir(directory);
  const folders = mapped.map(trimDir);
  const exact = folders.indexOf(dir);
  if (exact >= 0)
    return mapped[exact];
  const main = mainOfGitFile(read(`${dir}/.git`), dir);
  if (main) {
    const index = folders.indexOf(trimDir(main));
    if (index >= 0)
      return mapped[index];
  }
  let best = -1;
  for (let i = 0;i < folders.length; i += 1) {
    const folder = folders[i];
    if (dir.startsWith(`${folder}/`) && (best < 0 || folder.length > folders[best].length))
      best = i;
  }
  return best >= 0 ? mapped[best] : null;
};
var parseHead = (head) => head?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1] ?? null;
var readBranch = (directory, read) => {
  const dir = trimDir(directory);
  const file = read(`${dir}/.git`);
  const pointed = file?.match(/^gitdir:\s*(.+?)\s*$/m)?.[1];
  if (pointed)
    return parseHead(read(`${path.posix.resolve(dir, pointed)}/HEAD`));
  return parseHead(read(`${dir}/.git/HEAD`));
};
var KEY = /(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6}-\d{1,9})(?![A-Za-z0-9])/;
var issueOfBranch = (branch) => {
  const match = branch?.match(KEY);
  return match?.[1] ? match[1].toUpperCase() : null;
};

// src/service/events.ts
var ISSUE_URL = /linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i;
var KEY2 = /^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/;
var OWN_ID = /^guest:linear-dashboard:(.+)$/;
var REPLY_LIMIT = 4000;
var DRAFTS_MAX = 50;
var HANDOFFS_MAX = 30;
var DRAFT_MAX_AGE_MS = 14 * 86400000;
var linearIssuesOf = (linked) => {
  const found = [];
  const add = (value) => {
    const key = value?.trim().toUpperCase();
    if (key && KEY2.test(key) && !found.includes(key))
      found.push(key);
  };
  for (const item of linked) {
    if (item.provider === "linear")
      add(item.identifier);
    const own = OWN_ID.exec(item.id);
    if (own)
      add(item.identifier ?? own[1]);
    const legacy = /^linear:(.+)$/i.exec(item.id);
    if (legacy)
      add(legacy[1]);
    add(ISSUE_URL.exec(item.url)?.[1]);
  }
  return found;
};
var draftBody = (title, reply) => {
  const text = reply.trim();
  const cut = text.length > REPLY_LIMIT ? `${text.slice(0, REPLY_LIMIT).trimEnd()}

[cut]` : text;
  return `**OpenChamber session: ${title?.trim() || "untitled"}**

${cut}`;
};
var draftId = (sessionId, identifier) => `${sessionId}:${identifier}`;
var buildDraft = (input) => {
  if (!input.reply.trim())
    return null;
  return {
    id: draftId(input.sessionId, input.identifier),
    directory: input.directory,
    sessionId: input.sessionId,
    identifier: input.identifier,
    sessionTitle: input.title?.trim() || "Untitled session",
    body: draftBody(input.title, input.reply),
    createdAt: input.now
  };
};
var upsertDraft = (drafts, draft, now) => [...drafts.filter((d) => d.id !== draft.id && now - d.createdAt < DRAFT_MAX_AGE_MS), draft].slice(-DRAFTS_MAX);
var upsertHandoff = (handoffs, handoff) => [...handoffs.filter((h) => h.id !== handoff.id), handoff].slice(-HANDOFFS_MAX);
var looksLikePlan = (reply) => {
  const text = reply.trim();
  if (text.length < 500)
    return false;
  const structure = text.split(`
`).filter((line) => /^\s*(#{1,4}\s|\d+[.)]\s|[-*]\s)/.test(line)).length;
  return structure >= 4 && /\bplan\b/i.test(text);
};
var handoffId = (sessionId, identifier) => `${sessionId}:${identifier}`;
var withoutBlocks = (reply) => reply.replace(/```openui-lang[\s\S]*?```/g, "").replace(/\n{3,}/g, `

`).trim();
var PLANS_KEPT = 10;

// src/service/handoff.ts
var PLAN_LIMIT = 40000;
var handoffPrompt = (input) => {
  const plan = input.plan.trim();
  const body = plan.length > PLAN_LIMIT ? `${plan.slice(0, PLAN_LIMIT).trimEnd()}
[plan cut]` : plan;
  const head = `Build the plan below for Linear issue ${input.identifier}${input.issueTitle ? ` (${input.issueTitle.replace(/\s+/g, " ").trim().slice(0, 160)})` : ""}.`;
  const where = [
    `Work in ${input.directory}${input.branch ? `, on branch ${input.branch}` : ""}.`,
    `Reference ${input.identifier} in commit messages and the pull request title so Linear links them.`,
    input.planSessionTitle ? `The plan came from the session "${input.planSessionTitle.replace(/\s+/g, " ").trim().slice(0, 120)}".` : ""
  ].filter(Boolean);
  const finish = input.review && input.review.mode !== "off" ? reviewSteps(input.review.mode, input.identifier, input.review.reviewers) : ["Implement this plan now. Follow its steps in order, run the project's tests, and report what changed."];
  return [head, "", ...where, "", "Plan:", "---", body, "---", "", ...finish].join(`
`);
};
var reviewerNames = (reviewers) => {
  const names = (reviewers ?? "").split(/[,;\n]/).map((n) => n.trim().replace(/\s+/g, " ").slice(0, 40)).filter(Boolean).slice(0, 5);
  return names.length ? names : ["CodeRabbit"];
};
var reviewSteps = (mode, identifier, reviewers) => {
  const names = reviewerNames(reviewers);
  const who = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0];
  const open = mode === "auto" ? `2. Commit with a message that starts with ${identifier}, push this branch, and open a merge request (or pull request) assigned to me, with a title that starts with "${identifier}:" and a link to the Linear issue. I authorize these three steps.` : "2. Commit, push and open the merge request the way you normally offer them: show me those options and wait for my choice. Once the merge request exists, do not ask me again for anything in steps 3 to 7 unless step 6 says so.";
  return [
    "Implement this plan now. Follow its steps in order, then finish the work in these steps:",
    "",
    "1. Run the project's tests and linters, and fix what fails.",
    open,
    "3. Watch the merge request's pipeline until it passes or fails: check it about once a minute with a short sleep, for at most 20 minutes. Fix failures you caused, push, and watch again.",
    `4. Read every unresolved review comment written by ${who} (AI reviewers) on the merge request. For each one, fix it, or if you disagree, say why in a reply. You may reply to and resolve the threads those AI reviewers started, and only those: do not reply to, resolve or edit anyone else's threads, and do not merge.`,
    `5. After each push, wait up to 15 minutes for ${who} and the pipeline to run again, then handle any new AI comments the same way. Repeat until the pipeline is green and no AI thread is unresolved, at most 5 rounds.`,
    "6. If a comment needs a decision from me, ask me. When I answer, apply it, push, and go back to step 5: close out any new AI comments before you finish. Never finish while an AI comment is unresolved without telling me why.",
    "7. Finish with one message: the merge request link, the pipeline status, and a list of the AI comments you fixed, replied to or left for me."
  ];
};
var cleanModel = (value) => {
  const text = value?.trim();
  return text && /^[^\s/]+\/\S+$/.test(text) ? text : undefined;
};
var cleanAgent = (value, fallback = "build") => {
  const text = value?.trim();
  return text && /^[A-Za-z0-9._-]{1,64}$/.test(text) ? text : fallback;
};
var planPrompt = (input) => {
  const context = input.context.trim().slice(0, 20000);
  return [
    `Plan the work for Linear issue ${input.identifier}${input.issueTitle ? ` (${input.issueTitle.replace(/\s+/g, " ").trim().slice(0, 160)})` : ""}. Do not change any files yet.`,
    "",
    `Work in ${input.directory}${input.branch ? `, on branch ${input.branch}` : ""}.`,
    "",
    "The issue:",
    "---",
    context || `${input.identifier}`,
    "---",
    "",
    "Read the code you need, then write a plan: what to change and where, in order, how to test it, and the risks.",
    "",
    "You may ask me questions first to clarify the issue; I want that. When you are done asking, write the complete plan as a normal message.",
    "",
    'This session only plans. A separate build session, started from the Linear extension, will build the plan. So the plan must be your last message, with no question card or form left open, and you must not end with a "go", "build it" or "switch agent" card or offer to build. Do not ask which agent to use. Anything still undecided goes under "Open decisions" at the end of the plan, each with your recommendation.',
    "",
    "End that final message with this block, exactly, so the Linear card with the Start build button appears under the plan (it is only a display, not a question):",
    "```openui-lang",
    "root = Stack([card])",
    `card = LinearIssue("${input.identifier}")`,
    "```"
  ].join(`
`);
};

// src/service/instructions.ts
var INSTRUCTIONS_TARGET = 800;
var INSTRUCTIONS_MAX = 4096;
var clip = (text, max) => {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, Math.max(0, max - 3)).trimEnd()}...` : flat;
};
var issueLine = (issue, title) => `${issue.identifier} ${clip(issue.title, title)}${issue.state ? ` [${issue.state}]` : ""}`;
var render = (input, budget) => {
  const lines = ["Linear for this folder (from the Linear extension):"];
  const projects = input.projects.slice(0, budget.projects).map((p) => `${clip(p.name, 50)} (${p.url})`);
  const teams = input.teamKeys.slice(0, 4);
  const where = [projects.length ? `Projects: ${projects.join(", ")}` : "", teams.length ? `${teams.length > 1 ? "teams" : "team"} ${teams.join(", ")}` : ""].filter(Boolean);
  if (where.length)
    lines.push(`- ${where.join("; ")}.`);
  const branch = input.branchIssue;
  if (branch) {
    const description = budget.description > 0 && branch.description?.trim() ? ` ${clip(branch.description, budget.description)}` : "";
    lines.push(`- Current branch issue: ${branch.identifier}${branch.title ? ` "${clip(branch.title, 80)}"` : ""}${branch.state ? ` [${branch.state}]` : ""}.${description}`);
  }
  const mine = input.mine.filter((i) => i.identifier !== branch?.identifier).slice(0, budget.mine);
  if (mine.length)
    lines.push(`- My open issues here: ${mine.map((i) => issueLine(i, budget.title)).join("; ")}.`);
  const example = branch?.identifier ?? input.mine[0]?.identifier ?? (teams[0] ? `${teams[0]}-123` : "ENG-123");
  lines.push(`- Reference issues as ${example} in commit messages and PR titles so Linear links them.`);
  lines.push("- To show issues in chat, use the LinearIssue, LinearIssueList and LinearPickIssue blocks.");
  return lines.join(`
`);
};
var buildInstructions = (input) => {
  const steps = [
    { mine: 10, title: 60, description: 300, projects: 3 },
    { mine: 7, title: 48, description: 200, projects: 3 },
    { mine: 4, title: 40, description: 120, projects: 2 },
    { mine: 2, title: 32, description: 60, projects: 2 },
    { mine: 0, title: 0, description: 0, projects: 1 }
  ];
  let text = "";
  for (const step of steps) {
    text = render(input, step);
    if (text.length <= INSTRUCTIONS_TARGET)
      return text;
  }
  return text.slice(0, INSTRUCTIONS_MAX);
};

// src/shared/filters.ts
var OPEN = { state: { type: { nin: ["completed", "canceled", "duplicate"] } } };
var scopeFilter = (teamIds, projectIds, subTeams = false) => {
  const parts = [];
  if (teamIds.length) {
    const ids = [...teamIds].sort();
    parts.push({ team: subTeams ? { or: [{ id: { in: ids } }, { ancestors: { some: { id: { in: ids } } } }] } : { id: { in: ids } } });
  }
  if (projectIds.length)
    parts.push({ project: { id: { in: [...projectIds].sort() } } });
  if (!parts.length)
    return null;
  return parts.length === 1 ? parts[0] : { or: parts };
};
var all = (...filters) => {
  const parts = filters.filter((f) => Boolean(f));
  return parts.length === 1 ? parts[0] : { and: parts };
};
var MY_FILTERS = {
  assigned: { assignee: { isMe: { eq: true } } },
  created: { creator: { isMe: { eq: true } } },
  subscribed: { subscribers: { some: { isMe: { eq: true } } } }
};

// src/shared/queries.ts
var PAGE = "pageInfo { hasNextPage endCursor }";
var USER = "id name displayName avatarUrl avatarBackgroundColor";
var STATE = "id name type color position";
var LABEL = "id name color";
var ISSUE_ROW = `
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { ${STATE} }
  assignee { ${USER} }
  labels(first: 20) { nodes { ${LABEL} } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
`;
var PROJECT_SUMMARY = `
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { ${USER} }
  teams(first: 10) { nodes { id key name } }
`;
var CYCLE_SUMMARY = "id number name startsAt endsAt progress isActive isFuture isPast completedAt";
var VIEWER = `
  query Viewer {
    viewer { ${USER} email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`;
var TEAMS = `
  query Teams {
    teams(first: 100) {
      nodes {
        id key name color icon cyclesEnabled triageEnabled issueEstimationType issueEstimationAllowZero issueEstimationExtended
        defaultIssueState { id }
        activeCycle { ${CYCLE_SUMMARY} }
      }
    }
  }
`;
var WORKFLOW_STATES = `
  query WorkflowStates($after: String) {
    workflowStates(first: 250, after: $after) {
      nodes { ${STATE} team { id } }
      ${PAGE}
    }
  }
`;
var TEAM_PEOPLE = `
  query TeamPeople($teamId: String!) {
    team(id: $teamId) {
      id
      members(first: 250) { nodes { ${USER} active } }
      labels(first: 250) { nodes { ${LABEL} } }
    }
  }
`;
var WORKSPACE_LABELS = `
  query WorkspaceLabels {
    issueLabels(first: 250) { nodes { ${LABEL} team { id } } }
  }
`;
var PROJECTS = `
  query Projects($after: String, $filter: ProjectFilter) {
    projects(first: 100, after: $after, filter: $filter) {
      nodes { ${PROJECT_SUMMARY} }
      ${PAGE}
    }
  }
`;
var PROJECT_DETAIL = `
  query ProjectDetail($id: String!) {
    project(id: $id) {
      ${PROJECT_SUMMARY}
      description content
      members(first: 50) { nodes { ${USER} } }
      projectMilestones(first: 50) { nodes { id name targetDate progress sortOrder } }
      lastUpdate { id health createdAt }
      projectUpdates(first: 5) { nodes { id body health createdAt url user { ${USER} } } }
      documents(first: 50) { nodes { id title url updatedAt } }
    }
  }
`;
var ISSUES = `
  query Issues($filter: IssueFilter, $after: String) {
    issues(first: 100, after: $after, filter: $filter) {
      nodes { ${ISSUE_ROW} }
      ${PAGE}
    }
  }
`;
var ISSUE_DETAIL = `
  query IssueDetail($id: String!) {
    issue(id: $id) {
      ${ISSUE_ROW}
      description
      creator { ${USER} }
      team { id key name states(first: 100) { nodes { ${STATE} } } }
      children(first: 50) { nodes { ${ISSUE_ROW} } }
      comments(first: 100) { nodes { id body createdAt editedAt url user { ${USER} } parent { id } } }
      links: attachments(first: 50) { nodes { id title subtitle url sourceType metadata createdAt } }
      relations(first: 25) { nodes { id type relatedIssue { id identifier title url state { ${STATE} } } } }
      inverseRelations(first: 25) { nodes { id type issue { id identifier title url state { ${STATE} } } } }
      subscribers(first: 25) { nodes { ${USER} } }
      history(first: 40) {
        nodes {
          id createdAt updatedDescription fromPriority toPriority fromEstimate toEstimate fromTitle toTitle
          actor { id name avatarUrl }
          fromState { name type color } toState { name type color }
          fromAssignee { name } toAssignee { name }
          addedLabels { name color } removedLabels { name color }
          fromCycle { number } toCycle { number }
          fromProject { name } toProject { name }
          toParent { identifier }
          relationChanges { identifier type }
        }
      }
    }
  }
`;
var CUSTOM_VIEWS = `
  query CustomViews($filter: CustomViewFilter) {
    customViews(first: 50, filter: $filter) {
      nodes { id name icon color shared team { id } }
    }
  }
`;
var CUSTOM_VIEW_ISSUES = `
  query CustomViewIssues($id: String!, $filter: IssueFilter, $after: String) {
    customView(id: $id) {
      issues(first: 100, after: $after, filter: $filter) {
        nodes { ${ISSUE_ROW} }
        ${PAGE}
      }
    }
  }
`;
var CHILD_ISSUES = `
  query ChildIssues($ids: [ID!], $after: String) {
    issues(first: 100, after: $after, filter: { parent: { id: { in: $ids } } }) {
      nodes { ${ISSUE_ROW} }
      ${PAGE}
    }
  }
`;
var ISSUE_EXTRAS = `
  query IssueExtras($ids: [ID!], $after: String) {
    issues(first: 100, after: $after, filter: { id: { in: $ids } }) {
      nodes {
        id
        releases(first: 2) { nodes { id name version } }
        needs(first: 3) { nodes { id customer { id name revenue } } }
        stateHistory(last: 1) { nodes { startedAt } }
      }
      ${PAGE}
    }
  }
`;
var CHILD_STATES = `
  query ChildStates($ids: [ID!], $after: String) {
    issues(first: 250, after: $after, filter: { parent: { id: { in: $ids } } }) {
      nodes { parent { id } state { type } }
      ${PAGE}
    }
  }
`;
var STATUS_COUNTS = `
  query StatusCounts($filter: IssueFilter, $after: String) {
    issues(first: 250, after: $after, filter: $filter) {
      nodes { state { ${STATE} } team { id } }
      ${PAGE}
    }
  }
`;
var STATUS_MINE = `
  query StatusMine($filter: IssueFilter) {
    issues(first: 50, filter: $filter) {
      nodes { id identifier title url priority updatedAt state { ${STATE} } team { id key } project { id name } }
      ${PAGE}
    }
  }
`;
var issuesByIdentifier = (identifiers) => `
  query IssuesByIdentifier {
    ${identifiers.map((id, index) => `i${index}: issue(id: ${JSON.stringify(id)}) { ${ISSUE_ROW} }`).join(`
    `)}
  }
`;
var ISSUES_BY_KEYS = `
  query IssuesByKeys($filter: IssueFilter) {
    issues(first: 25, filter: $filter) { nodes { ${ISSUE_ROW} } }
  }
`;
var BRANCH_ISSUE = `
  query BranchIssue($filter: IssueFilter) {
    issues(first: 1, filter: $filter) { nodes { identifier title url description state { name } } }
  }
`;
var BLOCK_STATES = `
  query BlockStates($teamIds: [ID!]) {
    workflowStates(first: 100, filter: { team: { id: { in: $teamIds } }, type: { eq: "started" } }) {
      nodes { id position team { id } }
    }
  }
`;
var TEAM_CYCLES = `
  query TeamCycles($teamId: String!, $minNumber: Float!) {
    team(id: $teamId) {
      id key name
      cycles(first: 25, filter: { number: { gte: $minNumber } }) { nodes { ${CYCLE_SUMMARY} } }
    }
  }
`;
var CYCLE_DETAIL = `
  query CycleDetail($id: String!) {
    cycle(id: $id) { ${CYCLE_SUMMARY} description }
  }
`;
var NOTIFICATIONS = `
  query Notifications($after: String) {
    notificationsUnreadCount
    notifications(first: 50, after: $after) {
      nodes {
        id type title subtitle url inboxUrl readAt createdAt
        actor { ${USER} }
        ... on IssueNotification {
          issue { id identifier title url state { ${STATE} } team { id key } project { id } }
          comment { id body }
        }
        ... on ProjectNotification {
          project { id name url teams(first: 5) { nodes { id } } }
        }
      }
      ${PAGE}
    }
  }
`;
var REPO_ATTACHMENTS = `
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`;
var SEARCH_ISSUES = `
  query SearchIssues($term: String!, $filter: IssueFilter) {
    searchIssues(term: $term, first: 20, filter: $filter) { nodes { ${ISSUE_ROW} } }
  }
`;
var SEARCH_PROJECTS = `
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { ${PROJECT_SUMMARY} } }
  }
`;
var SEARCH_DOCUMENTS = `
  query SearchDocuments($term: String!) {
    searchDocuments(term: $term, first: 20) { nodes { id title url updatedAt project { id name } } }
  }
`;
var DOCUMENTS = `
  query Documents($filter: DocumentFilter) {
    documents(first: 100, filter: $filter) { nodes { id title url updatedAt project { id name } } }
  }
`;
var DOCUMENT = `
  query Document($id: String!) {
    document(id: $id) { id title content url updatedAt project { id name } creator { ${USER} } }
  }
`;
var ISSUE_UPDATE = `
  mutation IssueUpdate($id: String!, $input: IssueUpdateInput!) {
    issueUpdate(id: $id, input: $input) { success issue { ${ISSUE_ROW} } }
  }
`;
var ISSUE_CREATE = `
  mutation IssueCreate($input: IssueCreateInput!) {
    issueCreate(input: $input) { success issue { ${ISSUE_ROW} } }
  }
`;
var COMMENT_CREATE = `
  mutation CommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id body createdAt url user { ${USER} } } }
  }
`;
var PROJECT_UPDATE_CREATE = `
  mutation ProjectUpdateCreate($input: ProjectUpdateCreateInput!) {
    projectUpdateCreate(input: $input) { success projectUpdate { id body health createdAt url user { ${USER} } } }
  }
`;
var NOTIFICATION_MARK_READ = `
  mutation NotificationMarkRead($id: String!, $readAt: DateTime!) {
    notificationUpdate(id: $id, input: { readAt: $readAt }) { success }
  }
`;
var NOTIFICATION_MARK_ALL_READ = `
  mutation NotificationMarkAllRead($input: NotificationEntityInput!, $readAt: DateTime!) {
    notificationMarkReadAll(input: $input, readAt: $readAt) { success }
  }
`;
var markReadMany = (ids) => `
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${ids.map((id, index) => `n${index}: notificationUpdate(id: ${JSON.stringify(id)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`;
var ALL_DOCUMENTS = {
  VIEWER,
  TEAMS,
  WORKFLOW_STATES,
  TEAM_PEOPLE,
  WORKSPACE_LABELS,
  PROJECTS,
  PROJECT_DETAIL,
  ISSUES,
  CHILD_STATES,
  CHILD_ISSUES,
  ISSUE_EXTRAS,
  ISSUE_DETAIL,
  STATUS_COUNTS,
  STATUS_MINE,
  ISSUES_BY_IDENTIFIER: issuesByIdentifier(["ENG-1", "ENG-2"]),
  ISSUES_BY_KEYS,
  BRANCH_ISSUE,
  BLOCK_STATES,
  TEAM_CYCLES,
  CYCLE_DETAIL,
  CUSTOM_VIEWS,
  CUSTOM_VIEW_ISSUES,
  NOTIFICATIONS,
  REPO_ATTACHMENTS,
  SEARCH_ISSUES,
  SEARCH_PROJECTS,
  SEARCH_DOCUMENTS,
  DOCUMENTS,
  DOCUMENT,
  ISSUE_UPDATE,
  ISSUE_CREATE,
  COMMENT_CREATE,
  PROJECT_UPDATE_CREATE,
  NOTIFICATION_MARK_READ,
  NOTIFICATION_MARK_ALL_READ,
  NOTIFICATIONS_MARK_READ: markReadMany(["n1", "n2"])
};

// src/shared/format.ts
var shortDate = (value, now = new Date) => {
  if (!value)
    return "";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value);
  if (Number.isNaN(date.getTime()))
    return "";
  const sameYear = date.getFullYear() === now.getFullYear();
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", ...sameYear ? {} : { year: "numeric" } });
};
var percent = (fraction) => `${Math.floor(Math.max(0, Math.min(1, fraction)) * 100)}%`;
var HEALTH_LABEL = { onTrack: "On track", atRisk: "At risk", offTrack: "Off track" };

// src/shared/attach-text.ts
var LIMIT = 15000;
var fit = (text) => text.length > LIMIT ? `${text.slice(0, LIMIT)}
[cut]` : text;
var compact = (lines) => lines.filter((l, i, all) => l || all[i - 1]).join(`
`).trim();
var projectContext = (project) => {
  const teams = project.teams.nodes.map((t) => t.name).join(", ");
  const milestones = project.projectMilestones.nodes.slice().sort((a, b) => a.sortOrder - b.sortOrder).map((m) => `- ${m.name}${m.targetDate ? ` (${shortDate(m.targetDate)})` : ""}: ${percent(m.progress)}`);
  const update = project.projectUpdates.nodes[0];
  const body = project.content?.trim() || project.description?.trim() || "";
  return fit(compact([
    `Linear project: ${project.name}`,
    `Status: ${project.status.name}.${project.health ? ` Health: ${HEALTH_LABEL[project.health]}.` : ""} Progress: ${percent(project.progress)}.`,
    teams ? `Teams: ${teams}.` : "",
    project.lead ? `Lead: ${project.lead.name}.` : "",
    project.startDate || project.targetDate ? `Dates: ${project.startDate ? `starts ${shortDate(project.startDate)}` : ""}${project.startDate && project.targetDate ? ", " : ""}${project.targetDate ? `target ${shortDate(project.targetDate)}` : ""}.` : "",
    `Link: ${project.url}`,
    ...milestones.length ? ["", "Milestones:", ...milestones] : [],
    ...update ? ["", `Latest update (${shortDate(update.createdAt)}, ${update.user?.name ?? "someone"}${update.health ? `, ${HEALTH_LABEL[update.health]}` : ""}):`, update.body.trim()] : [],
    ...body ? ["", body] : []
  ]));
};
var documentContext = (doc) => fit(compact([
  `Linear document: ${doc.title}`,
  doc.project ? `Project: ${doc.project.name}.` : "",
  `Link: ${doc.url}`,
  "",
  doc.content?.trim() ?? ""
]));

// src/service/snapshot.ts
var PROJECTS_MAX = 100;
var DOCUMENTS_MAX = 200;
var ISSUES_MAX = 50;
var TEXT_MAX = 15000;
var isObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var text = (value, max) => typeof value === "string" && value.trim() ? value.trim().slice(0, max) : null;
var strings = (value, max, each = 80) => Array.isArray(value) ? value.map((v) => text(v, each)).filter((v) => v !== null).slice(0, max) : [];
var optional = (key, value) => value === null || value === undefined ? {} : { [key]: value };
var team = (raw) => {
  if (!isObject(raw))
    return null;
  const id = text(raw.id, 80);
  const key = text(raw.key, 12);
  const name = text(raw.name, 120);
  return id && key && name ? { id, key, name } : null;
};
var project = (raw) => {
  if (!isObject(raw))
    return null;
  const id = text(raw.id, 80);
  const name = text(raw.name, 160);
  const url = text(raw.url, 400);
  if (!id || !name || !url)
    return null;
  const progress = typeof raw.progress === "number" && Number.isFinite(raw.progress) ? Math.max(0, Math.min(1, raw.progress)) : 0;
  return {
    id,
    name,
    url,
    status: text(raw.status, 60) ?? "",
    health: text(raw.health, 20),
    progress,
    targetDate: text(raw.targetDate, 30),
    teams: strings(raw.teams, 10, 12),
    ...optional("text", text(raw.text, TEXT_MAX))
  };
};
var doc = (raw) => {
  if (!isObject(raw))
    return null;
  const id = text(raw.id, 80);
  const title = text(raw.title, 200);
  const url = text(raw.url, 400);
  if (!id || !title || !url)
    return null;
  return { id, title, url, project: text(raw.project, 160), ...optional("text", text(raw.text, TEXT_MAX)) };
};
var issue = (raw) => {
  if (!isObject(raw))
    return null;
  const identifier = text(raw.identifier, 20)?.toUpperCase();
  if (!identifier || !/^[A-Z][A-Z0-9]{0,6}-\d{1,9}$/.test(identifier))
    return null;
  return {
    identifier,
    title: text(raw.title, 200) ?? "",
    state: text(raw.state, 60) ?? "",
    ...optional("url", text(raw.url, 400)),
    ...optional("description", text(raw.description, 1000))
  };
};
var list = (raw, read, max) => Array.isArray(raw) ? raw.map(read).filter((v) => v !== null).slice(0, max) : [];
var readPush = (raw) => {
  if (!isObject(raw))
    return null;
  const directory = text(raw.directory, 1000);
  if (!directory)
    return null;
  const push = { directory };
  if ("teams" in raw)
    push.teams = list(raw.teams, team, 20);
  if ("teamKeys" in raw)
    push.teamKeys = strings(raw.teamKeys, 300, 12);
  if ("projects" in raw)
    push.projects = list(raw.projects, project, PROJECTS_MAX);
  if ("moreProjects" in raw)
    push.moreProjects = list(raw.moreProjects, project, PROJECTS_MAX);
  if ("documents" in raw)
    push.documents = list(raw.documents, doc, DOCUMENTS_MAX);
  if ("myIssues" in raw)
    push.myIssues = list(raw.myIssues, issue, ISSUES_MAX);
  if ("branchIssue" in raw)
    push.branchIssue = raw.branchIssue === null ? null : issue(raw.branchIssue);
  return push;
};
var emptySnapshot = (now) => ({ at: now, source: "frame", teams: [], projects: [], documents: [], myIssues: [], branchIssue: null });
var mergePush = (current, push, now) => {
  const base = current ?? emptySnapshot(now);
  const documents = push.documents ? [...push.documents, ...base.documents.filter((d) => !push.documents.some((n) => n.id === d.id))].slice(0, DOCUMENTS_MAX) : base.documents;
  const replaced = push.projects ? push.projects.map((p) => p.text ? p : { ...p, ...optional("text", base.projects.find((b) => b.id === p.id)?.text) }) : base.projects;
  const projects = push.moreProjects ? [...push.moreProjects, ...replaced.filter((p) => !push.moreProjects.some((n) => n.id === p.id))].slice(0, PROJECTS_MAX) : replaced;
  return {
    at: now,
    source: "frame",
    teams: push.teams ?? base.teams,
    teamKeys: push.teamKeys ?? base.teamKeys ?? [],
    projects,
    documents,
    myIssues: push.myIssues ?? base.myIssues,
    branchIssue: push.branchIssue === undefined ? base.branchIssue : push.branchIssue
  };
};
var mapping = (raw) => {
  if (!isObject(raw))
    return null;
  const directory = text(raw.directory, 1000);
  if (!directory)
    return null;
  const finish = raw.finishComments === "draft" ? "draft" : "off";
  return {
    directory,
    teamIds: strings(raw.teamIds, 20, 80),
    linearProjectIds: strings(raw.linearProjectIds, 50, 80),
    activeProjectId: text(raw.activeProjectId, 80) ?? "all",
    finishComments: finish,
    ...optional("buildAgent", text(raw.buildAgent, 64)),
    ...optional("buildModel", text(raw.buildModel, 200)),
    ...optional("planAgent", text(raw.planAgent, 64)),
    ...optional("planModel", text(raw.planModel, 200)),
    ...raw.postPlan === true ? { postPlan: true } : {},
    ...raw.reviewMode === "mr" || raw.reviewMode === "auto" ? { reviewMode: raw.reviewMode } : {},
    ...optional("aiReviewers", text(raw.aiReviewers, 200)),
    updatedAt: typeof raw.updatedAt === "number" ? raw.updatedAt : 0
  };
};
var readConfig = (raw) => {
  if (!isObject(raw) || !isObject(raw.directories))
    return null;
  const directories = {};
  for (const value of Object.values(raw.directories)) {
    const read = mapping(value);
    if (read)
      directories[read.directory] = read;
  }
  return { directories };
};
var knownTeamKeys = (snapshot) => {
  const keys = new Set;
  for (const t of snapshot?.teams ?? [])
    keys.add(t.key.toUpperCase());
  for (const k of snapshot?.teamKeys ?? [])
    keys.add(k.toUpperCase());
  for (const p of snapshot?.projects ?? [])
    for (const k of p.teams)
      keys.add(k.toUpperCase());
  return [...keys];
};
var toSnapProject = (project, text) => ({
  id: project.id,
  name: project.name,
  url: project.url,
  status: project.status.name,
  health: project.health,
  progress: project.progress,
  targetDate: project.targetDate,
  teams: project.teams.nodes.map((t) => t.key),
  ...text ? { text } : {}
});
var toSnapDoc = (doc, text) => ({
  id: doc.id,
  title: doc.title,
  url: doc.url,
  project: doc.project?.name ?? null,
  ...text ? { text } : {}
});
var toSnapIssue = (issue) => ({
  identifier: issue.identifier,
  title: issue.title,
  state: issue.state.name,
  url: issue.url
});

// src/service/linear-node.ts
var ENDPOINT = "https://api.linear.app/graphql";
var createGql = (key, fetchImpl = fetch) => async (query, variables = {}) => {
  const response = await fetchImpl(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: key },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(1e4)
  });
  const text = await response.text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Linear answered HTTP ${response.status} with something unreadable.`);
  }
  if (parsed.errors?.length)
    throw new Error(parsed.errors[0]?.message ?? "Linear refused the request.");
  if (!response.ok || !parsed.data)
    throw new Error(`Linear answered HTTP ${response.status}.`);
  return parsed.data;
};
var ACTIVE_STATUS = { type: { nin: ["completed", "canceled"] } };
var fetchBranchIssue = async (gql, identifier) => {
  const [teamKey, number] = identifier.split("-");
  const data = await gql(BRANCH_ISSUE, { filter: { team: { key: { eqIgnoreCase: teamKey } }, number: { eq: Number(number) } } });
  const issue = data.issues.nodes[0];
  return issue ? { identifier: issue.identifier, title: issue.title, state: issue.state.name, url: issue.url, description: issue.description ?? undefined } : null;
};
var refreshFromLinear = async (gql, mapping, branch, now) => {
  const teamIds = mapping.teamIds;
  const projectIds = mapping.linearProjectIds;
  const [teams, byId, byTeam] = await Promise.all([
    gql(TEAMS),
    projectIds.length ? gql(PROJECTS, { after: null, filter: { id: { in: [...projectIds].sort() } } }) : Promise.resolve({ projects: { nodes: [] } }),
    teamIds.length ? gql(PROJECTS, { after: null, filter: { accessibleTeams: { some: { id: { in: [...teamIds].sort() } } }, status: ACTIVE_STATUS } }) : Promise.resolve({ projects: { nodes: [] } })
  ]);
  const seen = new Set;
  const summaries = [...byId.projects.nodes, ...byTeam.projects.nodes].filter((p) => seen.has(p.id) ? false : (seen.add(p.id), true));
  const scope = scopeFilter(teamIds, projectIds);
  const [docs, mine] = await Promise.all([
    summaries.length ? gql(DOCUMENTS, { filter: { project: { id: { in: summaries.map((p) => p.id).slice(0, 50) } } } }) : Promise.resolve({ documents: { nodes: [] } }),
    scope ? gql(STATUS_MINE, { filter: all(OPEN, MY_FILTERS.assigned, scope) }) : Promise.resolve({ issues: { nodes: [] } })
  ]);
  const myIssues = mine.issues.nodes.map(toSnapIssue);
  const documents = docs.documents.nodes.map((d) => toSnapDoc(d));
  const identifier = issueOfBranch(branch);
  let branchIssue = null;
  if (identifier) {
    try {
      branchIssue = await fetchBranchIssue(gql, identifier);
    } catch {
      branchIssue = null;
    }
  }
  return {
    at: now,
    source: "key",
    teams: teams.teams.nodes.filter((t) => teamIds.includes(t.id)).map((t) => ({ id: t.id, key: t.key, name: t.name })),
    teamKeys: teams.teams.nodes.map((t) => t.key),
    projects: summaries.map((p) => toSnapProject(p)),
    documents,
    myIssues,
    branchIssue
  };
};
var fetchProjectText = async (gql, id) => projectContext((await gql(PROJECT_DETAIL, { id })).project);
var fetchDocText = async (gql, id) => documentContext((await gql(DOCUMENT, { id })).document);

// src/service/mentions.ts
var ROWS_MAX = 20;
var TEXT_LIMIT = 15000;
var TITLE_MAX = 120;
var clip2 = (text, max = TITLE_MAX) => {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 3)}...` : flat;
};
var projectRowId = (id) => `project:${id}`;
var docRowId = (id) => `doc:${id}`;
var mentionRows = (query, snapshots) => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const seen = new Set;
  const found = [];
  const matches = (...texts) => {
    const hay = texts.filter(Boolean).join(" ").toLowerCase();
    return words.every((word) => hay.includes(word));
  };
  for (const { snapshot, preferred } of [...snapshots].sort((a, b) => Number(b.preferred) - Number(a.preferred))) {
    for (const project of snapshot.projects) {
      const id = projectRowId(project.id);
      if (seen.has(id) || !matches(project.name, project.teams.join(" "), project.status))
        continue;
      seen.add(id);
      found.push({
        preferred,
        name: project.name,
        row: {
          id,
          title: clip2(project.name),
          subtitle: clip2(["Project", project.teams.join(", "), project.status].filter(Boolean).join(" · ")),
          url: project.url
        }
      });
    }
    if (!words.length)
      continue;
    for (const doc of snapshot.documents) {
      const id = docRowId(doc.id);
      if (seen.has(id) || !matches(doc.title, doc.project))
        continue;
      seen.add(id);
      found.push({
        preferred,
        name: doc.title,
        row: { id, title: clip2(doc.title), subtitle: clip2(["Doc", doc.project].filter(Boolean).join(" · ")), url: doc.url }
      });
    }
  }
  const first = words[0] ?? "";
  const rank = (c) => (c.preferred ? 0 : 2) + (first && c.name.toLowerCase().startsWith(first) ? 0 : 1);
  return found.sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name)).slice(0, ROWS_MAX).map((c) => c.row);
};
var fit2 = (text) => text.length > TEXT_LIMIT ? `${text.slice(0, TEXT_LIMIT)}
[cut]` : text;
var cachedNote = (at) => `(cached at ${new Date(at).toISOString().slice(0, 16).replace("T", " ")} UTC)`;
var projectMarkdown = (project, cachedAt) => {
  const base = project.text?.trim() ?? [
    `Linear project: ${project.name}`,
    `Status: ${project.status}.${project.health ? ` Health: ${HEALTH_LABEL[project.health] ?? project.health}.` : ""} Progress: ${percent(project.progress)}.`,
    project.teams.length ? `Teams: ${project.teams.join(", ")}.` : "",
    project.targetDate ? `Target: ${shortDate(project.targetDate)}.` : "",
    `Link: ${project.url}`
  ].filter(Boolean).join(`
`);
  return fit2(cachedAt ? `${base}

${cachedNote(cachedAt)}` : base);
};
var docMarkdown = (doc, cachedAt) => {
  const base = doc.text?.trim() ?? [`Linear document: ${doc.title}`, doc.project ? `Project: ${doc.project}.` : "", `Link: ${doc.url}`, "", "The content is not cached yet. Open the document in Linear, or add a Linear personal API key in Settings, Integrations."].filter((l, i) => l || i === 3).join(`
`);
  return fit2(cachedAt ? `${base}

${cachedNote(cachedAt)}` : base);
};
var locate = (rowId, snapshots) => {
  const project = rowId.startsWith("project:") ? rowId.slice(8) : null;
  const doc = rowId.startsWith("doc:") ? rowId.slice(4) : null;
  for (const snapshot of snapshots) {
    if (project) {
      const found = snapshot.projects.find((p) => p.id === project);
      if (found)
        return { kind: "project", project: found, at: snapshot.at };
    }
    if (doc) {
      const found = snapshot.documents.find((d) => d.id === doc);
      if (found)
        return { kind: "doc", doc: found, at: snapshot.at };
    }
  }
  return null;
};

// src/service/app.ts
var INSTRUCTIONS_STALE_MS = 5 * 60000;
var CACHE_STALE_MS = 10 * 60000;
var KEY_TTL_MS = 60000;
var SEEN_MAX = 50;
var DEBUG_FLAG = "debug-events";
var NOT_A_PLAN = "The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";
var IDENTIFIER = /^[A-Za-z][A-Za-z0-9]{0,6}-\d{1,9}$/;
var isObject2 = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var parse = (raw) => {
  try {
    const value = raw ? JSON.parse(raw) : {};
    return isObject2(value) ? value : {};
  } catch {
    return {};
  }
};
var fail = (error, status = 200) => ({ status, body: { ok: false, error } });
var message = (error) => (error instanceof Error ? error.message : String(error)).slice(0, 300);
var createApp = (deps) => {
  const { host, store, read, now } = deps;
  const log = deps.log ?? (() => {
    return;
  });
  let config = store.load("config.json", { directories: {} });
  let snapshots = store.load("snapshot.json", {});
  let drafts = store.load("drafts.json", { drafts: [] }).drafts;
  let handoffs = store.load("handoffs.json", { pending: [], builds: {} });
  let worktrees = store.load("worktrees.json", {});
  const refreshed = new Map;
  const texts = new Map;
  const branchIssues = new Map;
  const seenEvents = [];
  const starting = new Set;
  let key = null;
  const mapped = () => Object.keys(config.directories);
  const mappedFor = (directory) => resolveMapped(directory, mapped(), read);
  const saveConfig = () => store.save("config.json", config);
  const saveSnapshots = () => store.save("snapshot.json", snapshots);
  const saveDrafts = () => store.save("drafts.json", { drafts });
  const saveHandoffs = () => store.save("handoffs.json", handoffs);
  const saveWorktrees = () => store.save("worktrees.json", worktrees);
  const apiKey = async () => {
    if (key && now() - key.at < KEY_TTL_MS)
      return key.value;
    try {
      const value = (await host.readSettings())["api-key"]?.trim() || null;
      key = { value, at: now() };
    } catch {
      key = { value: null, at: now() };
    }
    return key.value;
  };
  const peekKey = () => {
    if (!key || now() - key.at >= KEY_TTL_MS)
      apiKey();
    return key?.value ?? null;
  };
  const refreshCache = async (folder, branch) => {
    const value = await apiKey();
    const mapping = config.directories[folder];
    if (!value || !mapping)
      return;
    try {
      snapshots[folder] = await refreshFromLinear(deps.gqlFor(value), mapping, branch, now());
      saveSnapshots();
    } catch (error) {
      log(`cache refresh failed for ${folder}: ${message(error)}`);
    }
  };
  const branchIssueFor = async (folder, branch) => {
    const identifier = issueOfBranch(branch);
    if (!identifier)
      return null;
    const snapshot = snapshots[folder];
    const keys = knownTeamKeys(snapshot);
    const prefix = identifier.split("-")[0];
    if (!keys.includes(prefix))
      return null;
    const known = [snapshot?.branchIssue, ...snapshot?.myIssues ?? []].find((i) => i?.identifier === identifier) ?? branchIssues.get(identifier);
    if (known)
      return known;
    const value = await apiKey();
    if (value) {
      try {
        const found = await fetchBranchIssue(deps.gqlFor(value), identifier);
        if (found) {
          branchIssues.set(identifier, found);
          return found;
        }
      } catch (error) {
        log(`branch issue ${identifier} failed: ${message(error)}`);
      }
    }
    return { identifier, title: "", state: "" };
  };
  const setText = async (directory, folder) => {
    const mapping = config.directories[folder];
    if (!mapping)
      return;
    const snapshot = snapshots[folder];
    const branch = readBranch(directory, read);
    const branchIssue = await branchIssueFor(folder, branch);
    const text = buildInstructions({
      projects: (snapshot?.projects ?? []).filter((p) => mapping.linearProjectIds.includes(p.id)).slice(0, 3).map((p) => ({ name: p.name, url: p.url })),
      teamKeys: (snapshot?.teams ?? []).map((t) => t.key),
      branchIssue,
      mine: snapshot?.myIssues ?? []
    });
    refreshed.set(directory, now());
    if (texts.get(directory) === text)
      return;
    try {
      await host.setInstructions(directory, text);
      texts.set(directory, text);
    } catch (error) {
      log(`setInstructions failed for ${directory}: ${message(error)}`);
    }
  };
  const clearText = async (directory) => {
    try {
      await host.setInstructions(directory, "");
    } catch (error) {
      log(`clearing instructions failed for ${directory}: ${message(error)}`);
    }
    refreshed.delete(directory);
    texts.delete(directory);
  };
  const refreshFolder = async (folder, fetchFresh) => {
    if (fetchFresh)
      await refreshCache(folder, readBranch(folder, read));
    await setText(folder, folder);
    for (const [dir, info] of Object.entries(worktrees))
      if (info.mapped === folder)
        await setText(dir, folder);
  };
  const rememberWorktree = (directory, folder) => {
    if (trimDir(directory) === trimDir(folder) || worktrees[directory])
      return;
    worktrees[directory] = { mapped: folder, at: now() };
    const entries = Object.entries(worktrees);
    if (entries.length > SEEN_MAX)
      worktrees = Object.fromEntries(entries.sort((a, b) => b[1].at - a[1].at).slice(0, SEEN_MAX));
    saveWorktrees();
  };
  const start = async () => {
    for (const folder of mapped()) {
      try {
        await refreshFolder(folder, true);
      } catch (error) {
        log(`start refresh failed for ${folder}: ${message(error)}`);
      }
    }
  };
  const putConfig = async (raw) => {
    const next = readConfig(parse(raw));
    if (!next)
      return fail("Expected { directories: { <folder>: <mapping> } }.", 400);
    const before = config;
    config = next;
    saveConfig();
    const removed = Object.keys(before.directories).filter((d) => !next.directories[d]);
    const changed = Object.keys(next.directories).filter((d) => JSON.stringify(before.directories[d]) !== JSON.stringify(next.directories[d]));
    return {
      body: { hasKey: Boolean(await apiKey()), directories: config.directories },
      after: () => {
        (async () => {
          for (const folder of removed) {
            await clearText(folder);
            for (const [dir, info] of Object.entries(worktrees)) {
              if (info.mapped !== folder)
                continue;
              await clearText(dir);
              delete worktrees[dir];
            }
            delete snapshots[folder];
          }
          if (removed.length) {
            saveWorktrees();
            saveSnapshots();
          }
          for (const folder of changed)
            await refreshFolder(folder, true);
        })().catch((error) => log(`config refresh failed: ${message(error)}`));
      }
    };
  };
  const postSnapshot = async (raw) => {
    const push = readPush(parse(raw));
    if (!push)
      return fail("Expected a snapshot with a directory.", 400);
    const folder = mappedFor(push.directory);
    if (!folder)
      return { body: { ok: true, mapped: false } };
    snapshots[folder] = mergePush(snapshots[folder], push, now());
    saveSnapshots();
    if (trimDir(push.directory) !== trimDir(folder))
      rememberWorktree(push.directory, folder);
    try {
      await setText(folder, folder);
      if (trimDir(push.directory) !== trimDir(folder))
        await setText(push.directory, folder);
    } catch (error) {
      log(`snapshot refresh failed: ${message(error)}`);
    }
    return { body: { ok: true, mapped: true } };
  };
  const draftsFor = (directory) => {
    if (!directory)
      return drafts;
    const folder = mappedFor(directory);
    return folder ? drafts.filter((d) => d.directory === folder) : [];
  };
  const postDraft = (raw) => {
    const body = parse(raw);
    const id = typeof body.id === "string" ? body.id : "";
    if (!id || body.action !== "posted" && body.action !== "discard")
      return fail("Expected { id, action: 'posted' | 'discard' }.", 400);
    const before = drafts.length;
    drafts = drafts.filter((d) => d.id !== id);
    if (drafts.length !== before)
      saveDrafts();
    return { body: { ok: true, removed: drafts.length !== before } };
  };
  const withSetting = (list) => list.map((h) => ({ ...h, postPlan: config.directories[h.directory]?.postPlan === true }));
  const handoffsFor = (directory) => {
    if (!directory)
      return withSetting(handoffs.pending);
    const folder = mappedFor(directory);
    return folder ? withSetting(handoffs.pending.filter((h) => h.directory === folder)) : [];
  };
  const postHandoffs = (raw) => {
    const body = parse(raw);
    const id = typeof body.id === "string" ? body.id : "";
    if (!id || body.action !== "dismiss")
      return fail("Expected { id, action: 'dismiss' }.", 400);
    const before = handoffs.pending.length;
    handoffs.pending = handoffs.pending.filter((h) => h.id !== id);
    if (handoffs.pending.length !== before)
      saveHandoffs();
    return { body: { ok: true } };
  };
  const rememberSession = (sessionId, entry) => {
    handoffs.builds[sessionId] = entry;
    const keep = Object.entries(handoffs.builds).sort((x, y) => y[1].createdAt - x[1].createdAt).slice(0, 100);
    handoffs.builds = Object.fromEntries(keep);
  };
  const readPlan = async (sessionId) => {
    const status = await host.sessions.status(sessionId);
    if (status.status === "busy")
      return { error: "The planning session is still working. Start the build when it has finished." };
    if (status.status === "waiting")
      return { error: "The planning session is waiting for your answer. Answer it first." };
    const { reply } = await host.sessions.lastReply(sessionId);
    const last = withoutBlocks(reply ?? "");
    if (last && looksLikePlan(last))
      return { plan: last, earlier: false, isPlan: true };
    const kept = handoffs.plans?.[sessionId];
    if (kept && looksLikePlan(withoutBlocks(kept.text)))
      return { plan: withoutBlocks(kept.text), earlier: true, isPlan: true };
    if (!last)
      return { error: "The planning session has no reply to build from." };
    return { plan: last, earlier: false, isPlan: false };
  };
  const startBuild = async (raw) => {
    const body = parse(raw);
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim().slice(0, 120) : "";
    const identifier = typeof body.identifier === "string" ? body.identifier.trim().toUpperCase() : "";
    if (!sessionId || !IDENTIFIER.test(identifier))
      return fail("Expected { sessionId, identifier }.", 400);
    const pending = handoffs.pending.find((h) => h.sessionId === sessionId);
    const sessionDirectory = pending?.sessionDirectory ?? handoffs.builds[sessionId]?.sessionDirectory ?? (typeof body.sessionDirectory === "string" ? body.sessionDirectory.trim() : "");
    if (!sessionDirectory.startsWith("/"))
      return fail("The planning session has no folder the service can start a build in.");
    const folder = mappedFor(sessionDirectory);
    const mapping = folder ? config.directories[folder] : undefined;
    if (body.mode === "preview") {
      try {
        const got = await readPlan(sessionId);
        return { body: "error" in got ? { ok: false, error: got.error } : { ok: true, plan: got.plan.slice(0, PLAN_LIMIT), postPlan: mapping?.postPlan === true, earlier: got.earlier, isPlan: got.isPlan } };
      } catch (error) {
        log(`plan preview failed: ${message(error)}`);
        return fail(message(error));
      }
    }
    if (starting.has(sessionId))
      return fail("A build is already starting from that session.");
    starting.add(sessionId);
    try {
      const got = await readPlan(sessionId);
      if ("error" in got)
        return fail(got.error);
      if (!got.isPlan && body.force !== true)
        return fail(NOT_A_PLAN);
      const prompt = handoffPrompt({
        identifier,
        issueTitle: typeof body.issueTitle === "string" ? body.issueTitle : null,
        branch: readBranch(sessionDirectory, read),
        directory: sessionDirectory,
        planSessionTitle: typeof body.sessionTitle === "string" ? body.sessionTitle : pending?.sessionTitle ?? null,
        plan: got.plan,
        review: { mode: mapping?.reviewMode ?? "off", reviewers: mapping?.aiReviewers ?? "" }
      });
      const model = cleanModel(mapping?.buildModel);
      const started = await host.sessions.start({
        prompt,
        directory: sessionDirectory,
        title: `${identifier} build`,
        agent: cleanAgent(mapping?.buildAgent),
        ...model ? { model } : {}
      });
      rememberSession(started.sessionId, { identifier, directory: folder ?? sessionDirectory, createdAt: now(), role: "build", sessionDirectory, title: `${identifier} build` });
      handoffs.pending = handoffs.pending.filter((h) => h.sessionId !== sessionId);
      saveHandoffs();
      return { body: { ok: true, sessionId: started.sessionId, directory: started.directory ?? sessionDirectory } };
    } catch (error) {
      log(`handoff failed: ${message(error)}`);
      return fail(message(error));
    } finally {
      starting.delete(sessionId);
    }
  };
  const startPlan = async (raw) => {
    const body = parse(raw);
    const identifier = typeof body.identifier === "string" ? body.identifier.trim().toUpperCase() : "";
    const directory = typeof body.directory === "string" ? body.directory.trim() : "";
    if (!IDENTIFIER.test(identifier) || !directory.startsWith("/"))
      return fail("Expected { identifier, directory }.", 400);
    const key = `plan:${directory}:${identifier}`;
    if (starting.has(key))
      return fail("A plan is already starting for that issue.");
    starting.add(key);
    try {
      const folder = mappedFor(directory);
      const mapping = folder ? config.directories[folder] : undefined;
      const model = cleanModel(mapping?.planModel);
      const started = await host.sessions.start({
        prompt: planPrompt({
          identifier,
          issueTitle: typeof body.issueTitle === "string" ? body.issueTitle : null,
          branch: readBranch(directory, read),
          directory,
          context: typeof body.context === "string" ? body.context : ""
        }),
        directory,
        title: `${identifier} plan`,
        agent: cleanAgent(mapping?.planAgent, "plan"),
        ...model ? { model } : {}
      });
      rememberSession(started.sessionId, { identifier, directory: folder ?? directory, createdAt: now(), role: "plan", sessionDirectory: directory, title: `${identifier} plan` });
      saveHandoffs();
      return { body: { ok: true, sessionId: started.sessionId, directory: started.directory ?? directory } };
    } catch (error) {
      log(`plan failed: ${message(error)}`);
      return fail(message(error));
    } finally {
      starting.delete(key);
    }
  };
  const plansFor = (identifier, sessionId) => Object.entries(handoffs.builds).filter(([id, b]) => b.role === "plan" && (!identifier || b.identifier === identifier.toUpperCase()) && (!sessionId || id === sessionId)).map(([id, b]) => ({ sessionId: id, identifier: b.identifier, directory: b.directory, sessionDirectory: b.sessionDirectory ?? b.directory, title: b.title ?? `${b.identifier} plan`, createdAt: b.createdAt })).sort((x, y) => y.createdAt - x.createdAt);
  const snapshotRows = (directory) => {
    const folder = mappedFor(directory);
    return Object.entries(snapshots).map(([dir, snapshot]) => ({ snapshot, preferred: dir === folder }));
  };
  const search = (raw) => {
    const request = parse(raw);
    const directory = typeof request.directory === "string" ? request.directory : null;
    const query = typeof request.query === "string" ? request.query : "";
    const folder = mappedFor(directory);
    if (folder && peekKey() && now() - (snapshots[folder]?.at ?? 0) > CACHE_STALE_MS)
      refreshCache(folder, readBranch(folder, read));
    return { body: { items: mentionRows(query, snapshotRows(directory)) } };
  };
  const resolve = async (raw) => {
    const request = parse(raw);
    const id = typeof request.id === "string" ? request.id : "";
    const cached = locate(id, Object.values(snapshots));
    const value = await apiKey();
    if (value) {
      try {
        const gql = deps.gqlFor(value);
        if (id.startsWith("project:"))
          return { body: { text: await fetchProjectText(gql, id.slice(8)) } };
        if (id.startsWith("doc:"))
          return { body: { text: await fetchDocText(gql, id.slice(4)) } };
      } catch (error) {
        log(`resolve ${id} failed, using the cache: ${message(error)}`);
      }
    }
    if (cached?.kind === "project")
      return { body: { text: projectMarkdown(cached.project, cached.at) } };
    if (cached?.kind === "doc")
      return { body: { text: docMarkdown(cached.doc, cached.at) } };
    return { status: 404, body: { message: "That Linear item is not cached. Open the Linear dashboard once so it is, or add a personal API key in Settings, Integrations." } };
  };
  const debugOn = () => store.exists(DEBUG_FLAG);
  const handleEvent = async (request) => {
    const { event, content } = request;
    if (debugOn()) {
      store.append("debug.log", JSON.stringify({ at: now(), type: event.type, session: event.session, directory: event.project.directory, linked: event.linked }));
    }
    if (event.session.parentId)
      return;
    if (seenEvents.includes(event.id))
      return;
    seenEvents.push(event.id);
    if (seenEvents.length > SEEN_MAX)
      seenEvents.shift();
    const directory = event.project.directory;
    const folder = mappedFor(directory);
    if (!directory || !folder)
      return;
    const mapping = config.directories[folder];
    if (!mapping)
      return;
    if (event.type === "session-created" || event.type === "turn-started") {
      rememberWorktree(directory, folder);
      if (now() - (refreshed.get(directory) ?? 0) > INSTRUCTIONS_STALE_MS) {
        if (now() - (snapshots[folder]?.at ?? 0) > CACHE_STALE_MS)
          await refreshCache(folder, readBranch(directory, read));
        await setText(directory, folder);
      }
      return;
    }
    if (event.type !== "turn-finished")
      return;
    const build = handoffs.builds[event.session.id];
    const issues = [...linearIssuesOf(event.linked)];
    if (build && !issues.includes(build.identifier))
      issues.push(build.identifier);
    if (!issues.length)
      return;
    const reply = content?.type === "turn-finished" ? withoutBlocks(content.reply) : "";
    const title = content?.sessionTitle ?? null;
    if (mapping.finishComments === "draft") {
      for (const identifier of issues) {
        const draft = buildDraft({ directory: folder, sessionId: event.session.id, identifier, title, reply, now: now() });
        if (draft)
          drafts = upsertDraft(drafts, draft, now());
      }
      saveDrafts();
    }
    if (reply.trim() && looksLikePlan(reply) && build?.role !== "build") {
      const kept = { ...handoffs.plans ?? {}, [event.session.id]: { text: reply.slice(0, PLAN_LIMIT + 2000), at: now() } };
      handoffs.plans = Object.fromEntries(Object.entries(kept).sort((x, y) => y[1].at - x[1].at).slice(0, PLANS_KEPT));
      saveHandoffs();
    }
    if (build?.role !== "build" && reply.trim()) {
      const identifier = issues[issues.length - 1];
      const handoff = {
        id: handoffId(event.session.id, identifier),
        directory: folder,
        sessionDirectory: directory,
        sessionId: event.session.id,
        identifier,
        sessionTitle: title?.trim() || "Untitled session",
        plan: build?.role === "plan" || looksLikePlan(reply),
        createdAt: now()
      };
      handoffs.pending = upsertHandoff(handoffs.pending.filter((h) => h.sessionId !== event.session.id && !(h.identifier === identifier && h.directory === folder)), handoff).slice(-HANDOFFS_MAX);
      saveHandoffs();
    }
  };
  const sessionEvent = (raw) => {
    const request = readSessionEventRequest(raw);
    if (!request)
      return { status: 400, body: { ok: false, error: "Not a session event this service understands." } };
    return {
      body: { ok: true },
      after: () => {
        handleEvent(request).catch((error) => log(`event ${request.event.type} failed: ${message(error)}`));
      }
    };
  };
  const route = async (method, path, query, raw) => {
    try {
      if (path === "/health")
        return { body: {} };
      if (path === SESSION_EVENTS_PATH)
        return sessionEvent(raw);
      if (path === MENTIONS_SEARCH_PATH)
        return search(raw);
      if (path === MENTIONS_RESOLVE_PATH)
        return await resolve(raw);
      if (path === "/config") {
        if (method === "PUT")
          return await putConfig(raw);
        return { body: { hasKey: Boolean(await apiKey()), directories: config.directories } };
      }
      if (path === "/snapshot" && method === "POST")
        return await postSnapshot(raw);
      if (path === "/drafts") {
        if (method === "POST")
          return postDraft(raw);
        return { body: { drafts: draftsFor(query.get("directory")) } };
      }
      if (path === "/handoffs") {
        if (method === "POST")
          return postHandoffs(raw);
        return { body: { handoffs: handoffsFor(query.get("directory")) } };
      }
      if (path === "/handoff" && method === "POST")
        return await startBuild(raw);
      if (path === "/plan" && method === "POST")
        return await startPlan(raw);
      if (path === "/plans")
        return { body: { sessions: plansFor(query.get("identifier"), query.get("sessionId")) } };
      if (path === "/choices") {
        const folder = mappedFor(query.get("directory"));
        return { body: deps.choices ? { ok: true, ...deps.choices(folder ?? query.get("directory")) } : { ok: false, error: "This service cannot read the agent and model lists." } };
      }
      return null;
    } catch (error) {
      log(`${method} ${path} failed: ${message(error)}`);
      return fail(message(error));
    }
  };
  return { route, start };
};

// src/service/choices.ts
var isObject3 = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var parseJsonc = (text) => {
  if (!text)
    return {};
  let out = "";
  let inString = false;
  for (let i = 0;i < text.length; i += 1) {
    const c = text[i];
    if (inString) {
      out += c;
      if (c === "\\") {
        out += text[i + 1] ?? "";
        i += 1;
      } else if (c === '"')
        inString = false;
    } else if (c === '"') {
      inString = true;
      out += c;
    } else if (c === "/" && text[i + 1] === "/") {
      while (i < text.length && text[i] !== `
`)
        i += 1;
      out += `
`;
    } else if (c === "/" && text[i + 1] === "*") {
      i += 2;
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "/"))
        i += 1;
      i += 1;
    } else
      out += c;
  }
  try {
    const value = JSON.parse(out.replace(/,(\s*[}\]])/g, "$1"));
    return isObject3(value) ? value : {};
  } catch {
    return {};
  }
};
var frontMatter = (text) => {
  const head = text?.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? "";
  const mode = head.match(/^mode:\s*["']?([A-Za-z]+)/m)?.[1] ?? null;
  const disabled = /^disable:\s*true\b/m.test(head);
  return { mode, disabled };
};
var BUILT_IN = [
  { id: "build", label: "build", hint: "built in" },
  { id: "plan", label: "plan", hint: "built in" }
];
var CONFIG_NAMES = ["opencode.json", "opencode.jsonc"];
var readChoices = (io, directory) => {
  const folders = [io.configDir, ...directory ? [directory, `${directory.replace(/\/+$/, "")}/.opencode`] : []];
  const configs = folders.flatMap((folder) => CONFIG_NAMES.map((name) => parseJsonc(io.read(`${folder}/${name}`))));
  const agents = new Map(BUILT_IN.map((c) => [c.id, c]));
  const addAgent = (name, mode, disabled) => {
    if (disabled || mode === "subagent" || !/^[A-Za-z0-9._-]{1,64}$/.test(name)) {
      if (disabled || mode === "subagent")
        agents.delete(name);
      return;
    }
    if (!agents.has(name))
      agents.set(name, { id: name, label: name });
  };
  for (const config of configs) {
    if (!isObject3(config.agent))
      continue;
    for (const [name, value] of Object.entries(config.agent)) {
      const entry = isObject3(value) ? value : {};
      addAgent(name, typeof entry.mode === "string" ? entry.mode : null, entry.disable === true);
    }
  }
  for (const folder of folders) {
    for (const sub of ["agent", "agents"]) {
      for (const file of io.list(`${folder}/${sub}`)) {
        if (!file.endsWith(".md"))
          continue;
        const { mode, disabled } = frontMatter(io.read(`${folder}/${sub}/${file}`));
        addAgent(file.slice(0, -3), mode, disabled);
      }
    }
  }
  const defaultModel = configs.map((c) => typeof c.model === "string" ? c.model : null).filter((m) => m !== null).at(-1) ?? null;
  const providers = new Set(io.signedIn);
  for (const config of configs)
    if (isObject3(config.provider))
      for (const id of Object.keys(config.provider))
        providers.add(id);
  if (defaultModel)
    providers.add(defaultModel.split("/")[0]);
  let catalogue = {};
  try {
    const parsed = JSON.parse(io.catalogue() ?? "{}");
    if (isObject3(parsed))
      catalogue = parsed;
  } catch {
    catalogue = {};
  }
  const models = new Map;
  for (const provider of providers) {
    const entry = catalogue[provider];
    const providerName = isObject3(entry) && typeof entry.name === "string" ? entry.name : provider;
    const list = isObject3(entry) && isObject3(entry.models) ? entry.models : {};
    for (const [key, value] of Object.entries(list)) {
      const model = isObject3(value) ? value : {};
      if (model.status === "deprecated")
        continue;
      models.set(`${provider}/${key}`, { id: `${provider}/${key}`, label: typeof model.name === "string" ? model.name : key, hint: providerName });
    }
    for (const config of configs) {
      const own = isObject3(config.provider) && isObject3(config.provider[provider]) ? config.provider[provider].models : null;
      if (!isObject3(own))
        continue;
      for (const [key, value] of Object.entries(own)) {
        const name = isObject3(value) && typeof value.name === "string" ? value.name : key;
        models.set(`${provider}/${key}`, { id: `${provider}/${key}`, label: name, hint: providerName });
      }
    }
  }
  if (defaultModel && !models.has(defaultModel))
    models.set(defaultModel, { id: defaultModel, label: defaultModel.split("/").slice(1).join("/"), hint: "default" });
  const sorted = [...models.values()].sort((a, b) => a.id === defaultModel ? -1 : b.id === defaultModel ? 1 : (a.hint ?? "").localeCompare(b.hint ?? "") || a.label.localeCompare(b.label));
  return { agents: [...agents.values()], models: sorted, defaultModel };
};

// src/service/store.ts
import fs from "node:fs";
import path2 from "node:path";
var createStore = (dir) => {
  const file = (name) => path2.join(dir, name);
  return {
    load: (name, fallback) => {
      try {
        return JSON.parse(fs.readFileSync(file(name), "utf8"));
      } catch {
        return fallback;
      }
    },
    save: (name, value) => {
      try {
        fs.mkdirSync(dir, { recursive: true });
        const target = file(name);
        const temp = `${target}.${process.pid}.tmp`;
        fs.writeFileSync(temp, JSON.stringify(value), { mode: 384 });
        fs.renameSync(temp, target);
      } catch {}
    },
    append: (name, line) => {
      try {
        fs.mkdirSync(dir, { recursive: true });
        fs.appendFileSync(file(name), `${line}
`, { mode: 384 });
      } catch {}
    },
    exists: (name) => fs.existsSync(file(name))
  };
};
var readText = (target) => {
  try {
    return fs.readFileSync(target, "utf8");
  } catch {
    return null;
  }
};
var listDir = (directory) => {
  try {
    return fs.readdirSync(directory);
  } catch {
    return [];
  }
};

// src/service/main.ts
var token = process.env.OPENCHAMBER_SERVICE_TOKEN;
var dataDir = process.env.OPENCHAMBER_SERVICE_DATA_DIR || path3.join(os.homedir(), ".openchamber-linear");
var store = createStore(dataDir);
var home = os.homedir();
var configDir = process.env.OPENCODE_CONFIG_DIR || path3.join(process.env.XDG_CONFIG_HOME || path3.join(home, ".config"), "opencode");
var dataHome = process.env.XDG_DATA_HOME || path3.join(home, ".local", "share");
var cacheHome = process.env.XDG_CACHE_HOME || path3.join(home, ".cache");
var signedIn = () => {
  try {
    const value = JSON.parse(readText(path3.join(dataHome, "opencode", "auth.json")) ?? "{}");
    return typeof value === "object" && value !== null ? Object.keys(value) : [];
  } catch {
    return [];
  }
};
var catalogueText = null;
var catalogue = () => {
  if (!catalogueText || Date.now() - catalogueText.at > 5 * 60000)
    catalogueText = { at: Date.now(), text: readText(path3.join(cacheHome, "opencode", "models.json")) };
  return catalogueText.text;
};
var choices = (directory) => readChoices({ read: readText, list: listDir, configDir, signedIn: signedIn(), catalogue }, directory);
var app = createApp({
  choices,
  host: createServiceHost({ env: process.env }),
  store,
  read: readText,
  now: Date.now,
  gqlFor: (key) => createGql(key),
  log: (line) => {
    console.error(`[linear] ${line}`);
  }
});
http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    res.writeHead(401).end();
    return;
  }
  const url = new URL(req.url ?? "/", "http://x");
  let raw = "";
  req.on("data", (chunk) => {
    raw += chunk;
  });
  req.on("end", () => {
    app.route(req.method ?? "GET", url.pathname, url.searchParams, raw).then((reply) => {
      res.writeHead(reply ? reply.status ?? 200 : 404, { "Content-Type": "application/json" }).end(JSON.stringify(reply ? reply.body : { message: "Not found" }));
      reply?.after?.();
    }, () => {
      res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify({ ok: false, error: "The Linear service hit an error." }));
    });
  });
}).listen(Number(process.env.OPENCHAMBER_SERVICE_PORT), "127.0.0.1", () => {
  app.start().catch(() => {
    return;
  });
});
