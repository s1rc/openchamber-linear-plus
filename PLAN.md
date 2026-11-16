# Linear dashboard extension: build plan

Planned with Opus, to be built with Sonnet. Read this whole file before writing code.

## 0. Read first

1. The skill: `/Users/Matt/.config/openchamber/run/instances/60179/skills/openchamber-extensions/SKILL.md`. Follow its Steps 2 to 6 (create, build, check, try the service, hand over). The instance number changes each time OpenChamber restarts; if that path is gone, run `ls ~/.config/openchamber/run/instances/` and use the current number, or load the `openchamber-extensions` skill.
2. After `bun add @openchamber/sdk@2.7.0`, the references are in `node_modules/@openchamber/sdk/API.md` and `GUEST_SERVICES.md`. Open them for any method or manifest key not spelled out here.
3. Build in **this folder**: `/Users/Matt/Development/OpenChamber Extensions/linear` (the user named it; do not use `~/openchamber-extensions`).
4. Keep `@openchamber/sdk` at exactly `2.7.0` and `engines.openchamber` at `>=2.7.0`.
5. Load the `openchamber-shared-ui` skill and read `../shared-ui/USAGE.md`. Section 2.3.1 says which UI comes from the kit, shared-ui, or local code.

### Rules from the user (non-negotiable)

- No em dashes or en dashes as punctuation anywhere: code comments, UI strings, docs, commit messages. Use commas, colons, parentheses or new sentences.
- **Never write to the user's real Linear workspace while testing** (no `issueCreate`, `issueUpdate`, `commentCreate`, `projectUpdateCreate`, notification mark-read) unless the user approves that exact call in chat. Read-only GraphQL queries are fine. Every write in the shipped extension happens only on a user click.
- Private extension. No publishing.

## 1. What the user gets

| Where | What |
|---|---|
| Sidebar → Extension pages → **Linear** | Full dashboard with a Linear-style sidebar: Inbox, My issues, This project (Overview, Issues, Board), Projects, Cycles, Teams (Issues, Triage) |
| Rail panel | Same app, compact single column with a view picker |
| Work Status section **Linear** | Project progress, current cycle, counts by status, my issues in this project, pending finish-comments with Post / Discard |
| Message / selection / session / diff menus | Create issue (drafted by the Small Model), Comment on linked issue |
| `+` menu → Linear dialog | Create an issue, or attach a Linear project or document to the message |
| Chat replies | Agent can draw `LinearIssue`, `LinearIssueList`, and `LinearPickIssue` (asks you to choose) |
| Every agent session | Short instructions: mapped project(s), the current branch's issue, my open issues, how to reference issues |
| `@` menu | Linear projects and documents |

Everything scopes to the Linear project(s) detected for the open folder. With nothing detected, the app lands on **My issues**.

## 2. Architecture decisions (already made)

### 2.1 Auth: two paths

- **UI (all frames)**: `integration.host.provider: "linear"` reuses the Linear account already connected in OpenChamber. Frames call `host.request({ method: 'POST', path: '/graphql', body })` against `https://api.linear.app`. The host adds the Bearer token. No key needed.
- **Service**: cannot use that connection. The same integration card gets one optional secret setting, `api-key` (Linear personal API key). The service reads it with `readSettings()`.
  - With a key: service calls `https://api.linear.app/graphql` itself with header `Authorization: <key>` (personal keys are sent raw, no `Bearer`). Instructions and `@` rows stay live.
  - Without a key: frames push a snapshot to the service (`POST /snapshot`) every time they load project data. Service answers `@` rows and instructions from that cache. Never call `needsConfiguration` for a missing key, because the key is optional. Show a muted hint in the dashboard's Settings view instead.
- The SDK's `integrationSchema` accepts `settings` beside `host` (verified in `dist/parse.js`). Settings are strings only; toggles live in extension storage.

### 2.2 Frames, not app-drawn rows, for the status section

Use `statusSection.entry` (a frame), not `statusSection.source`. Reason: a frame gets the host Linear connection, so the section works with no API key. It runs only while the section is expanded.

### 2.3 Stack

- **Preact** + TSX for all frames (`bun add preact`). `tsconfig.json`: `"jsx": "react-jsx"`, `"jsxImportSource": "preact"`. `openchamber-guest-bundle` uses `Bun.build`, which honors this.
- Markdown: `marked` + `dompurify` (`bun add marked dompurify`). All Linear content is untrusted. Links go through `host.openUrl`.
- CSS: one file per entry, linked from the HTML (`<link rel="stylesheet" href="./styles.css">`); package files load under the CSP.
- **Visual style**: Linear's layout and density (left nav, 32px rows, status/priority glyphs, mono identifiers, subtle hover), colors from the OpenChamber theme. Status glyphs are inline SVG: triage (dashed ring), backlog (dotted ring), unstarted (ring), started (half-filled ring with the state's color), completed (filled check), canceled (filled x). Priority glyphs: urgent (filled square with !), high/medium/low (3/2/1 bars), none (dashes). Use each workflow state's own `color` from Linear for the glyph tint. Avatar initials use `--oc-selection` background and `--oc-selection-fg` text (`--oc-muted-surface` was too close to the page in dark themes) (no per-person hash color). Glyph contrast strokes use `var(--oc-bg)`; the urgent square uses `var(--oc-warning)`.

### 2.3.1 UI building blocks (order: SDK kit, then shared-ui, then local)

- **SDK kit** (`@openchamber/sdk/ui`) for every control, wrapped once in `src/shared/kit.tsx` with shared `useKit`: Button, Select, TextField, SearchField, Tabs, Menu, Badge, Spinner, Banner, Empty, plus **Progress, List, Checkbox, Switch** (add these four). Never rebuild a kit control.
- **shared-ui** from `@openchamber-ext/shared-ui/preact` (components) and `@openchamber-ext/shared-ui` (`api`, `toast`): `Card`, `Cards`, `StatCard`, `Section`, `KV`, `Chip`, `Dot`, classes `sui-row`, `sui-grow`, `sui-muted`, `sui-small`, `sui-mono`.
- **Local** for Linear-only pieces, every class prefixed `lin-`, in `src/shared/local.css`.
- **Colors**: theme colors only through `--oc-*`, no hex, rgb or hsl and no hex fallbacks inside `var()`. Linear's own data colors (workflow state `color`, label `color`, project `color`) are data, not theme, and may be set as inline styles on glyphs and swatches.
- **Service calls** from frames: `api(host, method, path, { query, body, name: 'Linear' })`. It never throws; check `reply.ok`. **Toasts**: `toast(host, kind, text)`. Linear GraphQL stays in local `gql()` (it uses `host.request`, not the service).

| Surface | Kit | shared-ui | Local (`lin-`) |
|---|---|---|---|
| App shell | Spinner, Banner (errors, Retry), Empty (connect, nothing mapped) | `sui-row`, `sui-muted` | `lin-shell`, `lin-nav` sidebar, `lin-header` |
| Detection banner | Banner (info) with Pin action, ghost Button "Change" beside it | | |
| Scope chip, filter chips | Button `xs` for the remove x | `Chip` | |
| My issues, Issue list | Tabs (Assigned / Created / Subscribed), SearchField, Select and Menu for filters, sort, group | `Chip` for labels (with a local swatch), `sui-mono` identifiers | `lin-group`, `lin-issue-row`, glyphs, `Avatar` |
| Board | | `Chip` for labels | `lin-board`, `lin-column`, `lin-card` (drag and drop) |
| Project overview | Progress (overall), Badge (health and status text), Button (Post update), TextField (update body), Select (health) | `Cards` + `StatCard` (Progress %, Open issues with a status breakdown of `Dot`s, Milestones done, Days to target), `KV` (lead, members, status, start, target), `Section` (Milestones, Updates, Description) | stacked status bar `lin-status-bar`, markdown body `lin-md` |
| Projects list | SearchField, Select (team, status), Progress per row | `Dot` (health) | `lin-table` |
| Cycles | Tabs (teams), Progress | `Cards` + `StatCard` (Scope, Completed, Days left), `Section` (Burn-up, Issues) | burn-up SVG `lin-burnup` |
| Inbox | Switch (Unread only), Button (Mark all read) | `Dot` (unread, tone info) | `lin-notification-row` |
| Triage | Button (Accept, Decline) | | issue rows |
| Issue detail | Select (status, priority, assignee, project, milestone, cycle, searchable), Menu (labels), TextField (title, description, comment), Buttons (Open, Copy ID, Copy branch, Start session, Link, Attach) | `KV` (properties panel, controls as values), `Section` (Sub-issues, Comments), `Chip` (labels) | `lin-md`, comment rows |
| Create issue / dialog | Tabs (Create / Attach), TextField, Select, List (project and document results), Spinner (drafting) | `KV` for the property grid | |
| Start session dialog | Switch (worktree, Move to In Progress), Button | `KV` | |
| Settings | Select (mappings), Select (finish-comments Off / Draft), Button | `Section` per group, `KV` (API key: set or not set) | |
| Work Status section (160px) | Progress (project), Button `xs` (Start, Post, Discard) | `sui-row`, `Chip` (counts by status), `Dot` (health), `sui-small`, `sui-muted` | issue line `lin-status-line` |
| Block `LinearIssue` | Button (Open, Start session) | `Card` (static), `KV` (status, assignee, priority) | glyphs |
| Block `LinearIssueList` | Button | `Section` (title as heading) | issue rows |
| Block `LinearPickIssue` | Button per issue, or List with `onSelect` | `Section` (question as heading) | |

Stays local even though it looks reusable (rule 6: shared only when a second extension needs it): status and priority glyphs, `Avatar`, issue rows, board columns, burn-up chart, markdown renderer, relative-time formatter, SWR cache. If Wiz later needs `Avatar`, the markdown renderer or relative time, move them with USAGE section 3 (minor bump, CHANGELOG, rebuild and shoot Wiz and Linear).


### 2.4 Data layer (`src/shared/linear.ts`)

- `gql<T>(query, variables)` wraps `host.request`. Parse `{ data, errors }`; throw a typed error with Linear's message. Map host errors: `DISCONNECTED` → "Connect Linear in Settings → Integrations" empty state with a button calling `host.oauthStart()`; `HOST_TIMEOUT` / network → banner with Retry.
- Paginate with `first: 100` + `pageInfo { hasNextPage endCursor }`. Cap a project's issue load at 1,000; show "Showing first 1,000" if capped.
- In-memory SWR cache keyed by query+variables, 30 s fresh. Paint from `host.storage` snapshot (`cache:<ocProjectId>`, trimmed under 60 KB) for instant first render, then revalidate.
- Optimistic updates for writes, rollback + error toast on failure.
- **Verify every query against Linear's live schema with one read-only call before building views on it.** Field names below are from memory of the public API; fix any that error. Known candidates: `viewer`, `teams { nodes { id key name color states { nodes { id name type color position } } activeCycle {...} labels {...} members {...} } }`, `projects(filter:)`, `project(id:) { id name slugId url icon color state status { name type } progress health targetDate startDate lead { id name avatarUrl } members teams projectMilestones { nodes { id name targetDate progress } } projectUpdates(first: 5) { nodes { id body health createdAt user { name } } } content }`, `issues(filter:)` with `project`, `team`, `assignee`, `state.type`, `cycle` filters, `issue(id:)` (accepts identifier like `ENG-123`) with `description comments { nodes { id body createdAt user { name avatarUrl } } } children { nodes {...} } parent attachments branchName url`, `notifications(first: 50)` (union types, inspect `__typename`), `searchIssues(term:)` / `searchDocuments(term:)` (older name: `issueSearch`), `documents(filter:)`, `document(id:) { title content url }`, cycle fields `number name startsAt endsAt progress scopeHistory completedScopeHistory issues`.
- Mutations: `issueCreate`, `issueUpdate(id, input: { stateId, assigneeId, priority, labelIds, estimate, projectId, projectMilestoneId, cycleId, dueDate, title, description })`, `commentCreate(input: { issueId, body })`, `projectUpdateCreate(input: { projectId, body, health })`, `notificationUpdate` / `notificationMarkReadAll`. Check the OAuth scope allows writes with a **read-only** probe first (for example query `viewer`); if the first real write the user clicks fails with a scope error, show a banner telling the user to reconnect Linear in Settings → Integrations.
- Images: declare `origins: ["https://uploads.linear.app", "https://public.linear.app"]`. If an image still fails, render a link instead. Avatar fallback: initials on a colored circle.

### 2.5 Folder detection (`src/shared/detect.ts`)

A folder maps to the Linear **team that owns it** first; projects are optional. Decided with the user after testing on real repositories: AppSec issues (APPSEC-5) carry merge requests in other teams' repos, so issues the user works on say nothing about who owns a repo.

Inputs: `ctx.directory`, `host.listProjects()`, `host.listWorktrees(projectId)`, `host.listSessions(projectId)`, `host.readFile(...)` (relative to the open folder, `files` capability).

1. **Resolve the place**: the OpenChamber project whose `directory` equals the folder, or the project owning a worktree whose `directory` equals it, so worktrees share one mapping. Also: the branch (worktree record, else `.git/HEAD`), the git remote (`.git/config`; a worktree cannot read it, so the main checkout's remote is cached in storage as `repo:<placeKey>`; else the repo of a merge or pull request linked to a session), and the Linear issues linked to the project's sessions.
2. **Sources, in precedence order.** The first that yields a team or project wins:
   1. **Saved mapping** (`map:<placeKey>`): authoritative.
   2. **`.linear.json`** at the folder root: `{ "team": "ENG", "projects": ["<id | slugId | URL | exact name>"] }`. Authoritative.
   3. **Repository activity**: `attachments(filter: { url: { contains: "<host>/<path>/" } })` finds Linear issues whose merge or pull requests are in this repo. The team with the most issues wins, when it has at least 3. A project comes along only when it holds at least 60% of that team's issues (and at least 3).
   4. **Names**: the folder name, the repo name, the words in them (generic words such as api, helm, web, terraform are ignored) and the remote's groups, matched against team names and keys first (exact, prefix, contains; a team key equal to a word counts), then against active projects found with `searchProjects`.
3. Sources 3 and 4 are **inferred**: a banner says what matched, with **Pin** and **Change**. The user chose "always ask": nothing is saved without Pin.
4. **Current work is separate.** The branch's issue, else the latest Linear issue linked to a session, shows as "Your branch: APPSEC-5 ... in PoC Wiz Code". It never sets the folder's team or projects.
5. A mapping holds `{ directory, teamIds, linearProjectIds, activeProjectId (a team or project id, or 'all'), finishComments, updatedAt }`. Tabs at the top of folder views switch between the mapped teams and projects, plus "All".
6. Projects are never loaded in bulk (workspaces have thousands): views read them by id, by team (`accessibleTeams`), or by `searchProjects`.
7. Re-run detection on `onDirectory` changes only (not every `onReady`).
8. After any mapping change, `PUT /config` to the service with `{ directories: { [projectDir]: mapping } }` so the service can act without frames.

### 2.6 Scoping rules

- Project views (Overview, Issues, Board) use the active mapped project.
- Global views (My issues, Inbox, Cycles, Team issues) show a removable **"This project"** filter chip, on by default when a project is detected.
- No detection: land on My issues, unscoped.
- Remember where you were per folder (`src/app/view-state.ts`, storage key `ui:<placeKey>`, device scope when the host has it): the view with its team or project, the issue open in each list, and the selected tabs. It is kept in memory for instant switching back, and in storage because OpenChamber may reload the panel on a project switch. Unusable saved views (a team that is gone, a folder view without a mapping) fall back to the overview or My issues.

### 2.7 Refresh

Poll every 60 s only while `document.visibilityState === 'visible'` and the frame is a page, panel, or status section. A Refresh button in every view header. Refetch the touched entity after each write.

## 3. Views (page and panel share one app)

`ctx.surface === 'page'`: two-pane layout (sidebar 220 px + content), issue detail opens as a right-side pane (or full content on narrow widths). `'panel'`: single column, view picker at top, detail pushes a stacked view with Back. `'dialog'`: the create/attach dialog (section 5).

| View | Contents |
|---|---|
| **My issues** | Tabs Assigned / Created / Subscribed. Grouped list. "This project" chip |
| **Issue list** (project or team) | Group by status (default), assignee, priority, project, cycle, label, or none (no milestone grouping; Linear offers it, not built). Filters: assignee (me / anyone / unassigned / person), status type, priority, labels, cycle, milestone, text search. Sort: priority, updated, created. Toggle "Show completed" (last 14 days). Collapsible groups with counts. Row: priority glyph, mono identifier, status glyph, title, label chips, milestone, due date, assignee avatar |
| **View options** | An Options button on every issue list opens Linear's menu: List or Board; Grouping (board: Columns) and Sub-grouping (board: Rows) by status, assignee, priority, project, cycle or label, each with a reverse switch for group order; Ordering by priority, updated, created, due date, estimate or title with a reverse switch; order completed by recency; show sub-issues; show triage issues; show empty groups or columns; and show sub-team issues (a team's `ancestors` filter, where a team is in scope); nested sub-issues (show all, matching, hide; `src/shared/nesting.ts`); and display properties, all twenty of Linear's menu except none (ID, status, assignee, creator, priority, SLA, project, due date, milestone, cycle, release, estimate, labels, links, customers, customer revenue, time in status, created, updated, pull requests). Empty groups and columns (Show empty) come from every state of the teams in scope, and for assignee, label and project grouping from the teams' members, labels and projects (`src/shared/seeds.ts`). Release, customers, revenue and time in status load in a second request (`ISSUE_EXTRAS`) only while one is on. Switches sit at the right of their label; reverse buttons beside Grouping and Ordering. Remembered per list; Reset and "Set as my default" per mode (`src/shared/view-options.ts`, `src/app/view-state.ts`) |
| **Saved views** | Above a team's issues: Linear's Active, Backlog and All issues tabs, then the team's own saved views (`customViews`, filtered by Linear). Shown where one team is in scope |
| **Board** | A List / Board toggle on every issue list, remembered per list; the nav's Board opens it as a board. Columns per workflow state, in Linear's order: triage, backlog, unstarted, started, done, canceled, each by position (never summed: positions run into the thousands). Empty columns hide and list under "Hidden columns"; any column hides from its menu and returns from that list. Started states draw Linear's pie, filled by their place among the team's started states. State colors are the state's own, lifted toward the text color only when too close to the background (`src/shared/grouping.ts`, `src/shared/board.ts`, `src/shared/colors.ts`). Drag a card to another column, **in phase 6**, as Linear does on multi-team boards (see 3.2). Card: key, priority, assignee, title, sub-issue ring, labels, MR, blocked, estimate, due, project |
| **Project overview** | Name, icon, status, health, lead, members, start and target date, progress bar, issue counts by status as a stacked bar, milestones with progress, latest 5 project updates (markdown, health badge), description. **Post update** composer with health select. "Map to this folder" when not mapped |
| **Projects list** | Table: name, health, status, lead, target date, progress. Filter by team and status. Click → overview |
| **Cycles** | Per team: active cycle (number, name, dates, days left, progress), burn-up chart as inline SVG built from the cycle's issues (`src/shared/burnup.ts`: added, started, completed and canceled timestamps, in points when the team estimates, else issues; Linear's `scopeHistory` arrays are one nightly snapshot and lag a day, so they are not used), cycle issues grouped by status. Upcoming and previous cycles listed |
| **Inbox** | Notifications: type, issue, actor, time, unread dot. Opening one marks it read, as in Linear; Mark all read (Mark these read when the folder filter is on) sends one request with an aliased `notificationUpdate` per notification, since Linear's `notificationMarkReadAll` covers one entity only. Unread-only toggle |
| **Triage** | Team's triage issues. Accept (the team's `defaultIssueState`, else its first `backlog`, else first `unstarted` state) and Decline (first `canceled` state), from the issue's header |
| **Issue detail** | Editable title and description (markdown edit/preview). Properties panel: status, priority, assignee, labels, project, milestone, cycle, estimate, due date, all editable via kit selects/menus (searchable). Parent and sub-issues. Comments with a composer. Buttons: Open in Linear, Copy ID, Copy branch name, **Start session**, Link to current session (`host.sessionLink`), Attach to message (`host.attach`) |
| **Create issue** (modal, key `c`) | Team (default from active project), title, description, status, priority, assignee, labels, project (default active), milestone, cycle, estimate |
| **Settings** | Mappings for this folder (projects, teams), finish-comments per mapping (Off / Draft), API key status (set or not, read from service `GET /config`), "Start session moves issue to In Progress" default |

Keyboard (page and panel): `j`/`k` move, `Enter` open, `Esc` close, `c` create, `/` search, `r` refresh.

Every empty state says why and what to do (no project mapped → "Pick a Linear project for this folder" with a picker button).

### 3.1 Start session from issue

Dialog with: worktree toggle (default on, branch = Linear's `branchName`), "Move to In Progress" toggle (default from Settings, on), Start button. Calls:

```ts
host.startSession({
  providerId: 'linear-dashboard', id: issue.identifier, title: `${issue.identifier} ${issue.title}`,
  url: issue.url, kind: 'issue',
  text: issueContext(issue),            // title, status, description, last 5 comments; under 16,000 chars
  data: { issueId: issue.id, identifier: issue.identifier },
  worktree: useWorktree ? { kind: 'new', name: issue.branchName } : false,
  navigation: 'open',
});
```

Handle the result: `sessionId: null` with `failure` means the worktree exists but the session failed; offer "Retry in existing worktree" (`{ kind: 'existing', directory }`), never a second new worktree. Then, if the toggle is on, `issueUpdate(stateId = team's first started state)`. Toast the outcome.

### 3.2 Board drag across teams (phase 6)

Linear's rule: on a board holding several teams, columns merge only when state name and type both match; dropping an issue on a state only another team has moves the issue to that team after a confirm. Chosen with the user: match Linear.

1. Columns other than status: priority, assignee and project set that field; cycle and label columns refuse the drop with a note (a cycle belongs to one team, an issue can have several labels). A cell on a board with rows sets both its column and its row.
2. **The issue's own team has the column's state** (same name and type): `issueUpdate(id, { stateId })`, optimistic, rolled back on failure.
3. **Only another team has it**: a confirm dialog, "Move SC-123 to CON?", listing what changes: a new identifier, the old team's labels and cycle may drop, and how many sub-issues come along. When several other teams have the state, the dialog asks which team.
4. On confirm, one `issueUpdate(id, { teamId, stateId })` (both fields exist in `IssueUpdateInput`). Not optimistic, because the identifier changes: the card waits with a spinner, the board reloads, and the saved open issue for the list follows the new identifier.
5. Harness fixtures for both cases. The fixtures make Mobile a sub-team of Engineering with an In QA status Engineering lacks.

## 4. Work Status section (`status/index.html`)

`requiresProject: true`, `height: 160`, call `setHeight` from a `ResizeObserver`. Rows, top to bottom (hide a row with no data):

1. Project progress bar: name, percent, health badge, target date. With several mapped projects, one compact line each (max 3).
2. Current cycle: "Cycle 42 · 60% · 4 days left".
3. Counts by status as chips: "3 In Progress · 5 Todo · 2 In Review".
4. My issues in this project, started first (max 5): status glyph, identifier, title; click opens the dashboard page on that issue (`host.openSurface` cannot open pages, so open the rail panel with the issue; store the target in `host.storage` key `open-target` and have the panel read it on ready). Hover button **Start**.
5. Pending finish-comments from the service (`GET /drafts?directory=`): "Summary ready for ENG-123" with **Post** and **Discard**. Post runs `commentCreate` through `host.request` (works without a key), then `POST /drafts { id, action: 'posted' }`. Clicking the row expands an editable preview before posting.

No project mapped: one line "Pick a Linear project" that opens the panel's picker. Header controls via `setStatusControls` (feature-gated on `features.statusControls`): Refresh button.

## 5. Actions and the `+` dialog

Manifest `attach: { "mode": "dialog", "entry": "dialog/index.html" }`. The dialog bundle is the same app with `surface === 'dialog'`.

| id | where | label | Behavior |
|---|---|---|---|
| `issue-from-message` | message | Create Linear issue | Open dialog with `item.text`. Small Model (`host.generate`) drafts `{ title, description }` as JSON. User edits and clicks Create |
| `issue-from-selection` | selection (`display: "both"`, icon `add-circle`) | Create Linear issue | Same, from `item.text` |
| `issue-from-session` | session, `payload: ["messages"]` | Create Linear issue from chat | Same, summarizing the conversation (trim oldest messages to fit 60,000 chars of prompt) |
| `issue-from-diff` | diff | Create Linear issue | `host.readFile(item.path)`, take `startLine..endLine` plus 5 lines of context, draft with file path and line numbers in the description |
| `comment-on-issue` | message | Comment on Linear issue | Find Linear issues linked to the session (`listSessions` → `links` with linear.app URLs, plus items with this extension's provider id). One → prefill; several → picker; none → issue search. User clicks Post |

All actions use `mode: "open"` (they need a form). After Create: toast with the identifier, plus buttons in the dialog "Link to this session" (`host.sessionLink`) and "Open". If `generate` fails with `NO_MODEL`, open the form empty with a note.

Dialog with no item (opened from `+`): tabs **Create issue** and **Attach**. Attach searches projects and documents and calls `host.attach({ providerId: 'linear-dashboard', id, title, url, text })` with the project overview or document content as `text` (under 16,000 chars), then `host.close()`. Issues are not offered there because OpenChamber's built-in Linear already attaches issues.

## 6. Chat blocks (`blocks/index.html`, one bundle switching on `name`)

| name | args | description (max 120 chars) | answers |
|---|---|---|---|
| `LinearIssue` | `id` | Shows one Linear issue live: status, assignee, priority, with Open and Start session. id: identifier like ENG-123 | no |
| `LinearIssueList` | `title`, `ids` | Shows several Linear issues as a live list. title: heading, ids: identifiers separated by commas | no |
| `LinearPickIssue` | `question`, `ids` | Asks the user to choose one Linear issue. question: what to ask, ids: candidate identifiers separated by commas | yes |

Args are model-written and untrusted: validate identifiers against `^[A-Za-z]{1,7}-\d+$`, fetch by id, render text only. Side effects only on click. `LinearPickIssue` answers with `host.answerBlock(`${identifier} ${title}`)`; when `answered` is set, show the choice and disable the buttons. Padding 12 px, `setHeight` from a `ResizeObserver`, max 960.

## 7. Service (`service/main.ts`)

State lives in `process.env.OPENCHAMBER_SERVICE_DATA_DIR` (`config.json`, `snapshot.json`, `drafts.json`). Never write inside the package.

### Routes

| Route | Purpose |
|---|---|
| `GET /health` | `{}` |
| `GET /config` → `{ hasKey, directories }`; `PUT /config` | Mappings mirrored from frames |
| `POST /snapshot` | Frames push `{ directory, projects: [...], documents: [...], myIssues: [...], branchIssue? }`. Service merges and refreshes instructions for that directory |
| `GET /drafts?directory=`; `POST /drafts { id, action: 'posted' \| 'discard', body? }` | Finish-comment drafts |
| `MENTIONS_SEARCH_PATH` / `MENTIONS_RESOLVE_PATH` | `@` rows (below) |
| `SESSION_EVENTS_PATH` | Session events (below). Answer `{ ok: true }` first, then work |

Use the SDK constants and parsers: `MENTIONS_SEARCH_PATH`, `MENTIONS_RESOLVE_PATH`, `SESSION_EVENTS_PATH`, `readSessionEventRequest`. Return a row or note on failure, never a 500.

### Directory resolution

An event's `project.directory` may be a worktree. Resolve to a mapped directory: exact match; else if `<dir>/.git` is a file (`gitdir: <main>/.git/worktrees/<name>`), take `<main>`; else longest mapped prefix.

### Instructions

`host.setInstructions(directory, text)` per mapped directory (and per worktree directory seen in events, since the branch issue differs). Refresh on service start, on `POST /snapshot`, and on `session-created` / `turn-started` for a mapped directory when the last refresh is older than 5 minutes. With a key, fetch fresh data; without, use the snapshot. The branch: read `<dir>/.git/HEAD` (or the worktree gitdir's `HEAD`) directly from disk.

Template (keep under ~800 characters; hard limit 4,096):

```
Linear for this folder (from the Linear extension):
- Projects: Foo (https://linear.app/acme/project/foo-1a2b), team ENG.
- Current branch issue: ENG-123 "Fix login timeout" [In Progress]. <first 300 chars of description>
- My open issues here: ENG-120 Title [Todo]; ENG-118 Title [In Review]; ... (max 10)
- Reference issues as ENG-123 in commit messages and PR titles so Linear links them.
- To show issues in chat, use the LinearIssue, LinearIssueList and LinearPickIssue blocks.
```

Unmapped directories get no text (`setInstructions(dir, '')` when a mapping is removed).

### `@` rows

Label "Linear". Search answers from memory within 2 s: projects (title = name, subtitle = "Project · team · status") and documents (title, subtitle = "Doc · project"). Max 20 rows, title and subtitle trimmed to 120. Resolve returns markdown: a project's overview (status, health, target, milestones, open issue counts, latest update) or a document's content, under 16,000 chars. With a key, resolve fetches fresh; without, from snapshot, and says "(cached at <time>)". Cache refresh with a key: on start, then lazily when older than 10 minutes on the next search (refresh in the background; answer the current cache).

### Finish-comments

Subscribe to `turn-finished` with `content: true`. On each event:

1. Skip subagents (`session.parentId` set) and unmapped directories, and mappings with `finishComments === 'off'` (default).
2. Linear issues = `event.linked` entries with `provider === 'linear'`, or an `identifier` / `id` / `url` matching a Linear issue (`linear.app/.../issue/ENG-123`, or this extension's items).
3. None linked → drop. Otherwise store a draft per issue: `{ id, directory, sessionId, identifier, sessionTitle, body, createdAt }`, body = `**OpenChamber session: <title>**\n\n<reply trimmed to 4,000 chars>`. Replace an older draft for the same session + issue.
4. The service never posts. Posting is a click in the status section or the dashboard (Settings → Drafts list also shows them).

## 8. Manifest (draft)

```json
{
  "name": "linear-dashboard",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "bunx openchamber-guest-bundle src/app/main.tsx panel/main.js && bunx openchamber-guest-bundle src/app/main.tsx dialog/main.js && bunx openchamber-guest-bundle src/status/main.tsx status/main.js && bunx openchamber-guest-bundle src/blocks/main.tsx blocks/main.js && bunx openchamber-guest-bundle --node src/service/main.ts service/main.js",
    "check": "bunx openchamber-guest-check"
  },
  "openchamber": {
    "apiVersion": 1,
    "engines": { "openchamber": ">=2.7.0" },
    "id": "linear-dashboard",
    "name": "Linear",
    "icon": "icon.svg",
    "contributes": {
      "panel": { "entry": "panel/index.html" },
      "page": true,
      "attach": { "mode": "dialog", "entry": "dialog/index.html" },
      "statusSection": { "entry": "status/index.html", "title": "Linear", "height": 160, "requiresProject": true },
      "capabilities": ["prompt", "sessions", "files", "model"],
      "origins": ["https://uploads.linear.app", "https://public.linear.app"],
      "integration": {
        "name": "Linear dashboard",
        "description": "Uses your OpenChamber Linear connection. Optional: a personal API key keeps agent context and @ rows fresh while the dashboard is closed.",
        "host": { "provider": "linear" },
        "settings": [{ "id": "api-key", "label": "Personal API key (optional)", "secret": true }]
      },
      "service": { "entry": "service/main.js", "runtime": "host" },
      "sessionEvents": { "events": ["session-created", "turn-started", "turn-finished"], "content": true },
      "instructions": true,
      "mentions": { "label": "Linear" },
      "actions": [
        { "id": "issue-from-message", "label": "Create Linear issue", "where": "message", "icon": "add-circle" },
        { "id": "issue-from-selection", "label": "Create Linear issue", "where": "selection", "icon": "add-circle", "display": "both" },
        { "id": "issue-from-session", "label": "Create Linear issue from chat", "where": "session", "payload": ["messages"] },
        { "id": "issue-from-diff", "label": "Create Linear issue", "where": "diff", "icon": "add-circle" },
        { "id": "comment-on-issue", "label": "Comment on Linear issue", "where": "message", "icon": "chat-1" }
      ],
      "blocks": [
        { "name": "LinearIssue", "description": "...", "args": ["id"], "entry": "blocks/index.html", "height": 120 },
        { "name": "LinearIssueList", "description": "...", "args": ["title", "ids"], "entry": "blocks/index.html", "height": 200 },
        { "name": "LinearPickIssue", "description": "...", "args": ["question", "ids"], "entry": "blocks/index.html", "height": 200, "answers": true }
      ]
    }
  },
  "dependencies": { "@openchamber/sdk": "2.7.0" }
}
```

Fill block descriptions from section 6. Run `bunx openchamber-guest-check` after writing it; fix whatever it names (for example if `page: true` with an `attach` object or the shared block entry is refused).

`icon.svg`: a simple 24×24 single-color mark (Linear-style diagonal lines in a circle), `fill="currentColor"`.

## 9. File layout

```
package.json  tsconfig.json  icon.svg  PLAN.md
src/shared/   host.ts linear.ts queries.ts types.ts detect.ts storage.ts markdown.ts format.ts kit.tsx glyphs.tsx local.css
src/app/      main.tsx router.tsx views/*.tsx components/*.tsx
src/status/   main.tsx
src/blocks/   main.tsx
src/service/  main.ts linear-node.ts instructions.ts mentions.ts drafts.ts
scripts/      build.sh  fixtures.ts
panel/  index.html  styles.css(built: shared styles.css + local.css)  main.js(built)
dialog/ index.html  styles.css(built)  main.js(built)
status/ index.html  styles.css(built)  main.js(built)
blocks/ index.html  styles.css(built)  main.js(built)
service/ main.js(built)
```

`src/shared/local.css` is the one local stylesheet; there are no per-frame `src/*/styles.css` files.

## 10. Build order with checkpoints

Each phase ends with `bun run build && bun run check` passing and a short note to the user.

Phases 3 to 9 are also done only when:

1. No new local class without the `lin-` prefix; no hex, rgb or hsl colors (`grep -nE '#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(' src` returns only Linear data colors read at runtime).
2. Fake-data fixtures for the phase's views, written by `bun run fixtures` (`scripts/fixtures.ts`) into this folder's `harness/fixtures/` (`workspace.json`, `error.json`). It imports `queries.ts` and `gql-body.ts`, so every fixture key is the exact body the app sends. Fake data only, never real workspace data.
3. A shot list for the phase in this folder's `harness/shots/phase<N>.json`, at page width (1100) and rail width (360). `shoot.ts` takes dark and light by default.
4. Shoot them with shared-ui's harness, run from `../shared-ui` without changing it: `bun harness/server.ts --root <this folder> --port 47xx --replay <this folder>/harness/fixtures/workspace.json`, then `bun harness/shoot.ts <this folder>/harness/shots/phase<N>.json <temp dir>/p<N>`. Look at every shot.

Fixtures, shot lists and screenshots stay in this folder or a temp dir: nothing is written into `../shared-ui` (it is another project). The harness answers `storage`, `listProjects` and `readFile` with empty results, so the app must treat a missing answer as "nothing there".

The harness also gives a safe preview of write flows: fixture the mutation responses instead of testing writes on the real workspace.

| # | Phase | Done when | Estimate |
|---|---|---|---|
| 1 | Scaffold: `bun init -y`, deps, manifest, tsconfig, empty frames, kit wrapper, glyphs, `gql` client | Check passes; install link works; panel shows the Linear viewer's name | 30 min |
| 2 | Read-only schema probe: run each query from 2.4 once, fix field names, write `queries.ts` and types | Every query returns data | 30 min |
| 3 | Detection + mapping + project picker + scope chip | Opening a mapped folder lands on its project; worktree shares the mapping; inferred banner Pin works | 1 h (ran longer: detection was reworked after testing on real repos) |
| 4 | Views: My issues, Issue list, Issue detail (read-only first), Projects list, Project overview | Navigable dashboard on page and panel | 2 to 3 h (ran longer: Linear-style issue detail and view-state persistence added) |
| 5 | Board, Cycles (burn-up SVG), Inbox, Triage | All views render. Done: list/board toggle, cycles with burn-up and issues, inbox with scope filter, triage list; periodic reload of what is on screen (60 s while visible). Mark read, Accept and Decline are phase 6 | 2 h (ran well over: the view options panel, saved views, extra properties, nesting and the burn-up rebuild were added during the phase) |
| 6 | Writes: property edits, drag on board (with team moves, 3.2), comments, create issue, post update, inbox mark read, triage accept/decline, Start session | Each write optimistic with rollback. **Do not test writes on the real workspace without asking the user**. Done: issue detail edits every property, title and description in place, with comments, triage Accept and Decline, Start session (3.1) and Link to this session; New issue (button and `c`); board drag between columns, cells and hidden columns, with team moves (3.2); inbox marks read on open and Mark all read in one aliased request; project Post update; Settings default for Start session. All writes live in `src/shared/writes.ts` (optimistic with rollback through `patchEntries`), the rules in `src/shared/moves.ts`. Checked against fake mutation answers only (harness fixtures, and a temp-dir Playwright script for drag and toasts) | 3 h |
| 7 | Status section | Rows render for a mapped folder; empty state for unmapped | 45 min |
| 8 | Dialog + 5 actions with Small Model drafting | Each action opens a prefilled form | 1.5 h |
| 9 | Blocks | Each block renders from a hand-written `openui-lang` call; PickIssue answers | 1 h |
| 10 | Service: config, snapshot, instructions, mentions, session events, drafts; draft rows in section and Settings | `curl` each route per SKILL Step 5 | 2 h |
| 11 | Hand over | Install link + one line per surface, per SKILL Step 6 | 10 min |

Total: about 15 to 17 hours of build time as planned; phases 3 to 5 ran over, so the real total will be higher.

## 11. Risks to check early

1. **OAuth scope for writes** through the host Linear connection. Unknown until the user clicks a write; handle the error clearly.
2. **Block entry shared by three blocks**: if the check refuses it, copy `blocks/index.html` per block pointing at the same `main.js`.
3. **Instructions timing**: whether instructions set on `session-created` reach that session's first turn. If not, the next turn gets them; acceptable.
4. **`listWorktrees` may not include the main checkout**: fall back to `.git/HEAD` for the branch.
5. **Linear rate limits** (complexity-based): keep issue queries lean (no nested comments in lists), and back off on `RATELIMITED` errors with a banner. One query may not exceed 10,000 points (each property 0.1, each object 1, a connection multiplies its children by `first`, default 50). `bun run validate-queries` prints every query's score and fails above the limit; nested connections such as `teams(100) { states(100) }` break it, so fetch them flat (`workflowStates`). Current scores: the largest is `ISSUE_EXTRAS` at 6,592 (warn threshold 6,000), which is why releases, customers and time in status load apart from the rows; `ISSUES` is 5,642.
6. **`event.linked` for this extension's own items**: confirm what `provider` and `identifier` look like for sessions started via `startSession` with `providerId: 'linear-dashboard'`; log one event's `linked` to `OPENCHAMBER_SERVICE_DATA_DIR/debug.log` during development.
7. **shared-ui drift**: `bun install --silent` in `build.sh` refreshes the copy, but a shared-ui change can still move Linear pixels. Any change to shared-ui follows USAGE section 3 and re-shoots Linear from `linear.json`.
8. **Sub-issues on a team move**: Linear's app moves sub-issues along when they all belong to the same team; unknown whether `issueUpdate(teamId)` through the API does the same. Check on the first approved real team move and say what happened in the confirm dialog.
9. **Sub-teams that inherit workflows**: answered (read-only check, Nov 10): in this workspace Strength & Conditioning, GM and NIL Ops each have their own state ids, different from their parent teams'. A drop between a parent and a sub-team is therefore a team move, with the confirm.

## 12. Out of scope (later ideas)

Slash command `/linear`, rail badge for unread inbox, scheduled digests, editing or creating saved views (the team's saved views are shown read only), issue history timeline, documents editing, roadmaps / initiatives, Linear's own palette.
