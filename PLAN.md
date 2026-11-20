# Linear dashboard extension: build plan

Planned with Opus, to be built with Sonnet. Read this whole file before writing code.

## 0. Read first

1. The skill: `/Users/Matt/.config/openchamber/run/instances/33626/skills/openchamber-extensions/SKILL.md`. Follow its Steps 2 to 6 (create, build, check, try the service, hand over). The instance number changes each time OpenChamber restarts; if that path is gone, run `ls ~/.config/openchamber/run/instances/` and use the current number, or load the `openchamber-extensions` skill.
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
| Work Status section **Linear** | Project progress, current cycle, counts by status, my issues in this project, plans ready to build (Start build), pending finish-comments with Post / Discard |
| Message / selection / session / diff menus | Create issue (drafted by the Small Model), Comment on linked issue, Start build from this plan (session menu) |
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
| Work Status section (160px) | Progress (project), Button `xs` (Post, Discard, Pin, Pick) | `sui-row`, `Chip` (counts by status), `Dot` (health), `sui-small`, `sui-muted` | issue line `lin-status-line` |
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
| **Settings** | Mappings for this folder (projects, teams), "Start session moves issue to In Progress" default, and (phase 10, `src/app/views/agent-settings.tsx`) Agent context (API key set or not, read from service `GET /config`, with a banner when the service is not running), Finish comments (Off / Draft per saved mapping, with the drafts waiting and their Post and Discard), Start plan (plan agent and plan model per saved mapping) and Start build (build agent and model, and a switch to add the plan to the issue's description first), all chosen from dropdowns that `GET /choices` fills from OpenCode's own files (section 7). The finish-comments and build controls need a saved mapping (Pin first) and say so |

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

`requiresProject: true`, `height: 160`, `setHeight` from a `ResizeObserver` on the content wrapper (not on `#root`, whose `min-height` would stop the frame shrinking). The frame is `src/status/section.tsx` (reads in `src/status/data.ts`, pure rules in `src/shared/status.ts`). It uses the same detection and mapping as the dashboard (`useDetection`) and the same active team or project (`mapping.activeProjectId`, else the first). Rows, top to bottom (a row with no data is hidden). Phase 10 moved the two rows that wait for a click, the plan rows (item 7) and the finish-comment drafts (item 6), to just under the detected hint, because the section is at most 320 pixels tall and a row at the end was out of sight on a busy folder:

1. Detected hint: only for an inferred mapping, "Engineering (detected from ...)" with **Pin** (saves the mapping, as the dashboard's banner does).
2. Project progress: one mapped project shows the kit Progress (name, percent, tinted by health) and a line "On track · target Nov 28". Several mapped projects show one compact line each (health dot, name, percent, target date; max 3). A team-only mapping has no project row.
3. Current cycle: "Cycle 42 · 60% · 4 days left", for the mapped teams and the teams of the mapped projects that have an active cycle (max 2, then each line starts with the team key).
4. Counts by status as chips (status glyph, "3 In Progress"), active issues in scope only (triage, unstarted and started; the backlog and closed work are not counted, because a backlog of thousands made the counts partial): started statuses first, then unstarted, triage; at most 6 chips, then "+N more" (hover lists them). Same name and type in two teams count together. Read with `STATUS_COUNTS` (250 a page, at most 1,000 issues, then "first 1,000").
5. My issues in scope, started first, then by priority, then newest (max 5, read with `STATUS_MINE`, first 50): status glyph, identifier, title. Click opens the rail panel on that issue. There is no Start button here (decided with the user: Start lives in the issue view); `src/shared/start-session.ts` stays shared code for the dialog.
6. Pending finish-comments (`GET /drafts?directory=`, answer `{ drafts: [{ id, directory, sessionId, identifier, sessionTitle, body, createdAt }] }`): "Summary ready for ENG-123" with **Post** and **Discard**; clicking the row opens an editable preview. Post looks the issue up, runs `commentCreate` through `host.request` (works without a key), then `POST /drafts { id, action: 'posted' }`; Discard sends `{ id, action: 'discard' }`. Frame side in `src/shared/drafts.ts` and `src/shared/draft-row.tsx` (the row is shared with Settings); the service side is phase 10. An older or stopped service means no rows.
7. Plans ready to build (phase 10, `GET /handoffs?directory=`): "Plan ready for CON-315" with **Start build** and **Dismiss**, above the draft rows. The row shows when the service saw a planning session linked to the issue finish a turn and either its reply reads like a plan or the session record's `agent` is `plan` (`src/shared/handoff-rules.ts`), and the session is not running again. Start build reads the issue, asks the service to start the build (`POST /handoff`), moves the issue per the Start session defaults, toasts, and opens the new session last.

**Opening the panel.** `host.openSurface` cannot open pages, so a click opens the rail panel: surface id `ext:linear-dashboard` (OpenChamber names guest surfaces `ext:<id>`). The frame first stores a note under the extension storage key `open-target`: `{ placeKey, issue | view: 'picker', at }`. The panel (`src/app/shell.tsx`) takes the note when the folder has landed, and again every 3 s while it is the visible rail panel (it may already be open), ignores notes for another folder or older than 10 minutes (`src/shared/open-target.ts`), then shows My issues (Assigned, folder scope) with that issue open, or the picker. If the panel cannot be opened, a toast says to open it by hand; the note stays and is used when the panel next loads.

States: no project mapped is one line "Pick a Linear project" with a **Pick** button (opens the panel's picker); Linear not connected is "Linear is not connected." with **Connect** (`host.oauthStart`); a load failure is a banner with Retry; nothing open in scope says so. Refresh: a header control through `setStatusControls` when `features.statusControls`, republished on `onDirectory`; a body button shows until that succeeds. Data reloads every 60 s while the frame is visible.

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

**As built (phase 8).** The dialog bundle is its own entry, `src/dialog/main.tsx` (it no longer shares `src/app/main.tsx`), and `src/dialog/dialog.tsx` picks the view from `ctx.item`: a create action gets the create form (`create-view.tsx`), `comment-on-issue` gets `comment-view.tsx`, a project or document chip on the composer gets a small "what is attached" view, and no item gets the tabs. The create form is the dashboard's own (`useIssueForm` in `src/app/components/create-issue.tsx`, shared with the New issue modal). What differs from the table above:

- The form opens at once; the Small Model draft (`host.generate`, `src/shared/generate.ts`, prompts and the tolerant JSON reader in `src/shared/draft.ts`, per-action jobs in `src/dialog/jobs.ts`) fills the title and description afterwards, and only the field the user has not typed in. A line says "Drafting..." while it runs and "Drafted by the Small Model. Check it before you create the issue." after.
- Failures keep the form usable and empty: `NO_MODEL` is an info banner; any other failure, or an answer that is not JSON with a title, is a warning banner with **Try again**. Exception to "open the form empty": for diff lines the description starts with ``Location: `path:12-15` `` even without a model, and a draft always ends with that line when it does not already name the file.
- Session drafts use the 60,000 character budget with the oldest messages dropped first (each message clipped to 8,000); without `item.messages` (the conversation grant) the form opens empty with a note. Selection drafts use the open session's title (the selection item has none).
- Default team and project come from the folder's mapping (`src/dialog/scope.ts`): the active team leads, a single mapped project (or the active one) is preselected.
- After Create, the dialog shows "Issue created" with **Link to this session** (`host.sessionLink`; a toast says to open a session when there is none), **Open in Linear** and **Close**. Posting a comment shows the same view.
- The host's dialog is taller than the form and the extension cannot set its height, so `.lin-dialog` fills the frame and the description (and the comment box) grow to take the spare room, with the buttons pinned at the bottom (`.lin-grow` in `local.css`).
- **Comment on Linear issue**: linked issues come from the session record (`listSessions(project)` for the item's directory: `links` with a Linear issue url, newest first, then this extension's `items` with `data.identifier`; `src/shared/linked.ts`). One issue is used at once (with **Change issue**), several or none show a picker with issue search (`searchIssues`). The comment is prefilled with `**OpenChamber session: <title>**` and the message text (cut at 20,000), the same header the finish-comments use; the user edits and clicks **Post comment** (`commentCreate`).
- **Attach tab**: before anything is typed it lists your open issues in the folder's teams and projects (assigned to you, max 15, started first; all of yours when nothing is mapped), then the folder's projects (mapped ones plus the teams' active projects, max 20) and those projects' documents; a typed term (2 or more characters) searches all of Linear (`searchIssues`, `searchProjects`, `searchDocuments`). A click on an issue reads it (`ISSUE_DETAIL`) and attaches `issueContext` text (`id` is the identifier, `data` holds `issueId` and `identifier`); a project or document attaches its overview or content (`src/shared/attach-text.ts`: status, health, dates, milestones, latest update, content; open issue counts are not included). Then `host.attach` and `host.close`. A refused attach (no chat open) toasts and leaves the dialog open. Issues were left out in phase 8 because the host's own Linear attaches them, but New worktree (MR or issue) lists this extension beside the built-in Linear and opens this same dialog, so an issue picker is needed here.

Dialog with no item (opened from `+` or from New worktree): tabs **Create issue** and **Attach**. Attach searches issues, projects and documents and calls `host.attach({ providerId: 'linear-dashboard', id, title, url, text })` with the issue, project overview or document content as `text` (under 16,000 chars), then `host.close()`. With no open session (`ctx.session` null) Attach is the first tab shown, since there is nothing to link a new issue to; with a session, Create issue leads. The dialog cannot tell New worktree from the `+` menu (the context has no flag for it), so this is a guess from the session. It never calls `host.startSession` itself: New worktree makes its own worktree from the attached item, and a second one would be a duplicate. It does not pass `branches`, which the host treats as a merge request's own branch.

## 6. Chat blocks (`blocks/index.html`, one bundle switching on `name`)

| name | args | description (max 120 chars) | answers |
|---|---|---|---|
| `LinearIssue` | `id` | Shows one Linear issue live: status, assignee, priority, with Open and Start session. id: identifier like ENG-123 | no |
| `LinearIssueList` | `title`, `ids` | Shows several Linear issues as a live list. title: heading, ids: identifiers separated by commas | no |
| `LinearPickIssue` | `question`, `ids` | Asks the user to choose one Linear issue. question: what to ask, ids: candidate identifiers separated by commas | yes |

Args are model-written and untrusted: validate identifiers against `^[A-Za-z]{1,7}-\d+$`, fetch by id, render text only. Side effects only on click. `LinearPickIssue` answers with `host.answerBlock(`${identifier} ${title}`)`; when `answered` is set, show the choice and disable the buttons. Padding 12 px, `setHeight` from a `ResizeObserver`, max 960.

**As built (phase 9).** The three blocks share `blocks/index.html` and one bundle; the shared entry passes `bun run check`, so no per-block copy is needed (risk 2). `src/blocks/main.tsx` picks the block by `call.name` and sizes the frame from a `ResizeObserver` on its wrapper (`.lin-block`, padding 12, `maxHeight` 960 with scrolling beyond that). Pure argument rules are in `src/shared/block-args.ts` (tested in `test/blocks.test.ts`). What differs from the table above:

- **Lookup by key, not by `issue(id:)`.** `ISSUES_BY_KEYS` (`issues(first: 25, filter: { or: [{ team: { key: { eqIgnoreCase }}, number: { in }}] })`, the full `ISSUE_ROW`) reads every named issue in one request. The alias form (`issuesByIdentifier`) makes Linear answer the whole request with an error when one issue does not exist, which would blank a list for one bad id. A missing id shows a "Not found in Linear, or you cannot see it" row. A second small query (`BLOCK_STATES`, started states of the shown issues' teams) fills the status pies the way the dashboard does, through `seedStartedFills` in `workspace.ts` (a frame that never loads the whole workspace). Both are in `validate-queries` (1,411 and 230 points). **Found on INF-4399 (phase 11):** the first filter, `or: [{ team, number }]`, was wrong. Linear reads the two fields inside one `or` element as alternatives, so it returned every issue of the team plus every issue with that number, capped at 25. A small team (APPSEC) happened to fit; INF (4,400 issues) did not, and the block said "Not found in Linear". Each clause is now `{ and: [{ team }, { number }] }` (`keysFilter`, checked live read-only: INF-4399, APPSEC-21 and NIL-754 in one request all come back). A single top-level `{ team, number }` (the branch lookup, `first: 1`) is a real AND and was never affected.
- **Arguments.** `splitIds` accepts commas, semicolons, spaces and new lines, upper-cases, drops repeats, keeps the model's order, shows at most 25 (a note says how many were left out) and lists up to 3 pieces that are not identifiers ("Not an issue key: ..."). Identifiers with a number longer than 9 digits are refused. `LinearIssue` uses the first valid identifier of `id`. Titles and questions are one line, cut at 160 and 400 characters, and drawn as text (Preact escapes them; no markdown, no links from model text). Side effects: a read-only lookup on load, then only clicks.
- **`LinearIssue`**: a static shared-ui `Card` with the title, a `KV` (status, priority, assignee, project, labels, due, updated) and two buttons. **Open in Linear** calls `host.openUrl`. **Start session** reads nothing until clicked, then reads the issue (`ISSUE_DETAIL`) and shows the dialog's two switches inline (new worktree, move to the first started status; the second is disabled when the issue is already started) with its own **Start session** and **Cancel** (`src/blocks/start-panel.tsx`, the same `startSessionFor` as the dashboard, a failed session after a worktree offers a retry in that worktree, a toast and an inline line report the outcome). Found by hand: the host refuses a new worktree on a branch that already exists ("Branch already exists" in its log, but only "Extension operation failed." reaches the frame). So before offering the switches, `findIssueWorktree` (`start-session.ts`, matching in `moves.ts` `worktreeOnBranch`) looks for a ready worktree on the issue's branch in the folder's project; if one exists the panel says so and starts the session there (`{ kind: 'existing' }`). The branch can also exist with no worktree (a worktree removed or archived earlier, which is what happened by hand): the host refuses that too and `worktreeOnBranch` cannot see it, so each refused new-worktree start moves to the next branch name (`retryBranchName`: `-2`, `-3`), shown in the switch's description and in the inline error, which also says to turn the new worktree off. The dashboard's dialog does the same. **Which status**: found by hand, the first started status of the Contracts team is "Blocked", so "first started status" moved CON-315 there. `startedStateOf` now prefers a status named In Progress, then one named like work in motion, then the first that is not named like a wait (block, hold, pause, wait, stuck), then the first; and the switch is followed by a select of the team's started statuses so the user can change it (block panel and dashboard dialog). **Planning**: the user plans first and builds second, so the select also offers an unstarted status named like Plan ("In Planning"), and the status used last on a team is remembered by name (`pref:start-state:<teamId>`, set after a successful move) and offered first next time. An issue already in one of the offered statuses is not moved. The agent and model of the new session are NOT set by Start session: the host's `startSession` takes them from the composer when the call starts, so choose Plan and the planning model first. **Order matters**: the host's own `navigation: 'open'` switches to the new session at once and tears down the frame that is about to move the issue (found by hand: sessions started, the issue stayed in Backlog, no message). So `startSessionFor` starts with `navigation: 'preserve'`, moves the issue, reports, and only then `openStartedSession` calls `host.openSession` (last, in the block and in the dashboard dialog). The block refreshes its card after a move.
- **`LinearIssueList`**: a `Section` titled by `title` holding the dashboard's own `IssueRow` (container queries drop chips as the frame narrows; the display properties are id, status, assignee, priority, labels and due date). A click opens the issue in Linear.
- **`LinearPickIssue`**: the same rows under the question. One click on a row answers `${identifier} ${title}` (cut at 1,900 characters) and nothing else; there is no confirm step because the answer is final and the host adds its own note field. `answered` from the host (kept across a reload) selects the matching row and disables all rows; an answer that is only a note (no identifier at the start) disables the rows and reads "You answered: ...". A refused answer toasts and leaves the rows live; a double click sends one answer.
- **Slash commands (phase 11, asked for by hand: typing `LinearIssue("INF-4436")` is only text, and the agent answered in prose).** `/linear-issue KEY`, `/linear-list KEY KEY heading` and `/linear-pick KEY KEY question` (manifest `commands`, listed by the composer when you type `/`). A hidden background frame (`background/index.html`, `src/background/main.ts`, `host.onResolve`) answers with a chip whose text tells the agent to put one exact block in its reply (`src/shared/slash.ts`, tested in `test/slash.test.ts`). What follows the command: keys and bare numbers anywhere in the text, the other words as the heading or question (stripped of quotes, backslashes and backticks). The composer completes only the command name, so matching happens on send (`src/background/lookup.ts`, read-only through the host's Linear connection): `/linear-issue 4399` looks the number up in the folder's saved teams, then issues you are assigned, created or subscribe to, then anywhere (the same number exists in every team, so a tie is an error that lists the keys); `/linear-issue some words` takes Linear's top search hit. `/linear-list` and `/linear-pick` need no keys: with none, the chip tells the agent to choose the issues from the conversation and its Linear context. The `@` menu cannot do this: its rows attach projects and documents only. To check by hand: type `/linear` in a chat and pick one.
- States: spinner while loading, "Connect Linear" with a button for `DISCONNECTED`, an error banner with Retry otherwise. The blocks do not poll: they read when drawn.

## 7. Service (`service/main.ts`)

State lives in `process.env.OPENCHAMBER_SERVICE_DATA_DIR` (`config.json`, `snapshot.json`, `drafts.json`, `handoffs.json`, `worktrees.json`, and `debug.log` only while a file named `debug-events` exists there). Never write inside the package.

### Routes

| Route | Purpose |
|---|---|
| `GET /health` | `{}` |
| `GET /config` → `{ hasKey, directories }`; `PUT /config` | Mappings mirrored from frames |
| `POST /snapshot` | Frames push `{ directory, projects: [...], documents: [...], myIssues: [...], branchIssue? }`. Service merges and refreshes instructions for that directory |
| `GET /drafts?directory=`; `POST /drafts { id, action: 'posted' \| 'discard' }` | Finish-comment drafts. A worktree directory resolves to its mapped folder |
| `GET /choices?directory=` | The agents and models Settings offers: `{ ok, agents, models, defaultModel }`, read from OpenCode's config folder (`opencode.json(c)`, `agents/*.md`), the folder's own `opencode.json` and `.opencode`, the provider ids in OpenCode's sign-in file (ids only, never what is stored under them) and its model catalogue cache (`models.json`). Primary agents only (build and plan always); models of signed in or configured providers, the default model first (`src/service/choices.ts`) |
| `GET /handoffs?directory=`; `POST /handoffs { id, action: 'dismiss' }`; `POST /handoff { sessionId, identifier, sessionDirectory?, sessionTitle?, issueTitle?, mode?: 'preview' }`; `POST /plan { identifier, directory, issueTitle?, context? }`; `GET /plans?identifier=` | Plan to build (below) |
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

### Plan to build handoff (decided with the user after phase 9, built in phase 10)

Flow: plan in a session (the composer's Plan agent and planning model), then one click starts the build. A frame cannot change an open chat's agent or model, so the build is a **new session in the same worktree** started by the service (`sessions.start({ directory, agent, model, title, prompt })`, `contributes.sessionControl: { content: true }`, a new approval line), not a switch inside the planning chat.

1. **Trigger, both places.** (a) A Work Status row "Plan ready for CON-315" with **Start build** (and Dismiss), written by the service on `turn-finished` when a session that is linked to a Linear issue (like finish-comments) ran the plan agent, read from `GET /handoffs?directory=` like `GET /drafts`; (b) a **Start build** button on the `LinearIssue` card and the dashboard's issue view, for any issue that has a session in a worktree. Check in phase 10 whether the session event or `GET /api/session` tells the agent of a turn.
2. **Click.** The frame sends `POST /handoff { sessionId, identifier }`. The service reads the plan with `sessions.lastReply` (content), starts the build session in the planning session's directory with the mapping's build agent (default `build`) and build model, and a first message of the plan, the issue key and branch, and "implement this plan". It answers `{ sessionId }`; the frame then moves the issue to In Progress through `host.request` (the service has no Linear connection without the optional key), refreshes the card, and calls `openStartedSession` last.
3. **Models, per folder.** The mapping gets `buildAgent` and `buildModel` (free text, `provider/model`, empty means the host default), edited in Settings. A folder on a lighter model (a Fireworks open-weight model such as Kimi) sets its own build model there. The planning model is not set here: it is whatever the composer has. Or leave both empty and set `agent.plan.model` and `agent.build.model` in `opencode.json`.
4. **Open questions, answered in phase 10** (read from the host's own server code in the installed app and its OpenCode database, read only):
   - *Does the session event say which agent ran the turn?* No. `GuestSessionEventRequest` has no agent field. The frame side does: `GuestSessionRecord.agent` ("the agent the session runs as") comes with `host.listSessions`. So the service lists every linked session that finishes a turn, with a `plan` flag from a reading of the reply (`looksLikePlan`: 500 characters or more, four or more list or heading lines, and the word plan), and the Work Status section shows the row when that flag is set or the session record's agent is `plan` (`handoffShown`). Reading the exact agent from the service would need `provides: ["opencode"]` (a second approval line with read access to every session's messages); not taken.
   - *Can `sessions.start` take a worktree directory?* Yes. The host passes `directory` to `session.create`, which accepts any directory it can map to a project (a worktree resolves to its main checkout's project). The build starts in the planning session's own directory, so it shares the worktree and branch.
   - *Can it link the Linear issue?* No: `sessions.start` takes no items, and `host.sessionLink` writes to the open session only. So the service remembers build sessions it started (`handoffs.json`, `builds`, 100 newest) and counts such a session as linked to the issue for finish-comments. The first message names the issue and the branch.
   - *What does a link look like in `event.linked`?* From the host's client code: a session started with `host.startSession({ providerId: 'linear-dashboard', id })` stores `{ id: 'guest:linear-dashboard:ENG-123', kind: 'guest', providerId, identifier: 'ENG-123', url }`, and the event copies only `id`, `kind`, `url`, `provider`, `identifier`, `number`. So `provider` is absent and `linearIssuesOf` reads the `guest:linear-dashboard:` id prefix, an explicit `provider: 'linear'` (the host's own Linear), a `linear:KEY` id, or a Linear issue page address. To check against a real event, create a file named `debug-events` in the data folder: each event's type, session, directory and `linked` (never its reply) is then appended to `debug.log` there.

**As built (phase 10).** `src/service/main.ts` is only the http shell; the routes are `createApp` in `src/service/app.ts`, which takes the host, the disk, the clock and Linear as arguments (tests drive it with fakes; `bun run smoke` starts the built `service/main.js` against a fake host and calls every route). Pure parts: `directories.ts` (folder resolution, branch, `issueOfBranch`), `instructions.ts`, `events.ts` (linked issues, drafts, plan reading), `handoff.ts` (first message), `mentions.ts`, `snapshot.ts` (reads and merges what frames push), `linear-node.ts` (the key path, read-only). What differs from the text above:

- **Frames feed the service.** `src/shared/snapshot-pusher.tsx` is mounted in the dashboard shell and the Work Status section for a saved mapping. It sends the mappings once per frame load (`syncMappingsOnce`, never an empty set, since a frame that merely loaded has nothing to say about removing the last one) and a snapshot of the mapped teams, projects and my open issues. `project-detail.tsx` also pushes the project's full overview text and its documents (`moreProjects`, `documents`). A push is skipped when the same one went in the last five minutes. Pushes from a worktree are filed under the mapped main checkout, and the worktree gets its own instructions (its own branch issue).
- **The service starts empty** after an update or in a new data folder, so a mapped folder gets no instructions and no drafts until a frame has loaded once and sent its mappings.
- **Instructions.** The branch comes from `.git/HEAD`, or the worktree's `HEAD` behind its `.git` file. An issue found in the branch name counts only when its team key is one of the folder's mapped teams or the teams of its mapped projects. Its title and state come from the pushed issues, else from Linear with a key; with neither, the line names the key only. The text is sent only when it changed, and shrinks step by step to about 800 characters.
- **`@` rows.** Ids are `project:<id>` and `doc:<id>`. An empty query lists the composer's folder's projects; documents need a typed word. Resolve with a key reads fresh and falls back to the cache; without a key it uses the pushed overview text, else a summary built from the row, with "(cached at ...)". An unknown row answers 404 with a note.
- **Finish-comments** ignore `mapping.finishComments === 'off'` (the default); Settings has the switch. A draft's `directory` is the mapped folder, and `GET /drafts?directory=` resolves a worktree path to it. A draft id is `<sessionId>:<identifier>`, so the next turn of that session replaces it. Drafts keep 14 days and 50 entries.
- **Plan to build.** Every finished turn of a linked session in a mapped folder (not a subagent, not a build session this service started) leaves one pending row per session (30 newest). `POST /handoff` refuses while the planning session is busy or waiting, reads `sessions.lastReply`, builds the first message (`handoffPrompt`: issue, title, folder, branch, the plan, "implement this plan now"; the plan cut at 40,000 characters), and starts the session with the mapping's `buildAgent` (default `build`) and `buildModel` (only a `provider/model` value is passed). A second click while one is starting is refused. The frame side is `src/shared/handoff.ts` and `handoff-rules.ts` (choice of the planning session: plan agent first, then a worktree, then newest), `start-build.ts` (the move to In Progress, with the Start session defaults) and `build-panel.tsx` (the options, shared by the block and the dashboard's dialog). The Start build button shows on the `LinearIssue` card and in the issue view's header only when a session linked to the issue exists in the folder's OpenChamber project.
- **Build settings are dropdowns.** The agent select and a searchable model select save on a pick; the first entry is the default (empty value), and a saved value the lists lack stays selectable. If the service cannot read the lists, Settings falls back to two text fields. Without a saved mapping both are disabled with a note.
- **Start plan.** A frame cannot choose the agent or model of a session it starts (`StartSessionRequest` has no such field), and the service cannot make a worktree. So Start plan has two parts. The frame calls `host.startSession` with a new worktree and **no `text`**: the host reads that as "no first message" (`sent: 'skipped'`, read from its client code), so it makes the worktree and a session linked to the issue and sends nothing. Then `POST /plan` has the service start the real planning session in that worktree (`sessions.start`) with the mapping's `planAgent` (default `plan`) and `planModel`, and a first message that asks for a plan and no file changes (`planPrompt`: the issue as the dashboard shows it to an agent, the folder, the branch). The agent may interview first (kept on purpose), but the plan must be its last message with no question card or form open, and it must not end with a "go", "build it" or "switch agent" card (it is asked to end with a `LinearIssue` block for the issue instead, which only displays, so the card with Start build shows under the plan and does not hold the turn open): the host's `turn-finished` event is not sent while a form is open, so such a card would also hide the "Plan ready" row, and `sessions.status` reads `waiting`, which makes Start build refuse. Start build and Add plan and build in Work Status are the way on. The empty first session stays in the sidebar; the dialog says so. The service remembers the plan session (`handoffs.json`, `builds`, `role: 'plan'`) because the host shows no link on it: it counts as linked for finish-comments, its finished turns are always plan rows, and `GET /plans?identifier=` lets frames find it for the Start build button (`pickBuildSource` takes the known ids). The move is to a status named like planning when the team has one (`planningStateOf`), else what Start session would pick, and it does not overwrite the remembered Start session status. A failed service call after the worktree exists leaves a "Retry in that worktree" that skips the first part. With the worktree switch off or an existing worktree for the branch found, no new worktree or first session is made.
- **Add the plan to the issue with Start build.** `mapping.postPlan` (Settings, default off) sets the default of a switch in the build options and the label of the Work Status row's button ("Add plan and build"). The plan goes into the issue's description, not a comment. With it on, one click does: read the plan (`POST /handoff { mode: 'preview' }`, which also says whether the folder adds it), read the issue's description again from Linear (the copy in hand may be older), write it back with the plan as the last section (`withPlan`: a rule, a "Plan" heading, then the plan with its own first title dropped, cut at 20,000 characters), then start the build and move the issue. Everything above the section is kept as it is. A section this wrote before is replaced, so adding again never piles them up; anything typed below the section is replaced with it, because the section is always taken as the end. A section from the earlier version (its heading named the session, which Linear turned into a link to the issue itself) is replaced too. A rule followed by a "Plan" heading of your own, at the end of a description, would be taken for it; other headings are not. A failed write, or a description that would pass 100,000 characters, stops everything before the build starts. The finish-comment draft for the planning session is left alone, to post or discard. The options panel shows the first lines of the plan it will build and is disabled while the plan cannot be read (a busy planning session says so).
- **Start build from the plan session's own menu.** A sixth action, `build-from-plan` (`where: "session"`, label "Start build from this plan"), opens the dialog on the session it was clicked on (`src/dialog/build-view.tsx`). It finds the issue from a link on the session record or from the plan sessions the service started (`GET /plans?sessionId=` answers with each row's `identifier`), looks in the session's own folder first and then the folder the dialog opened in, and shows the same options as the card (`BuildPanel`: the plan's first lines, the add-to-description switch, the move). Several issues give a picker; none says to start the plan from the issue or link it. After the build session opens the dialog closes. It is a plain open-mode action: no background entry and no `conversation` grant.
- **Which reply is the plan.** Start build reads the planning session's last reply, but a chat message after the plan ("show NIL-754") makes the last reply something else. So the service keeps, for each planning session, the latest reply that read like a plan (`handoffs.json`, `plans`, ten sessions) and uses it when the last reply does not (`readPlan`); the options panel then says the last reply is not the plan. Display blocks (the `openui-lang` card the plan ends with) are taken out of every plan, draft and build message (`withoutBlocks`), so they never land in a description or a comment.
- **One "Move the issue to" row.** Start session, Start plan and Start build show the same row (`src/shared/move-row.tsx`, rules in `moveChoices` in `moves.ts`): a switch, and the status to move to as a dropdown on its right. The dropdown lists the started statuses; planning ones are left out for a build. It starts on the status the action would choose: the planning status for a plan, In Progress or the one used last for a session or a build. When the issue is already there, that status is shown and the switch is off; picking another status turns the switch on. The switch's first state also follows the "Start session moves the issue" default in Settings.
- **A chat answer is not a plan.** Found on APPSEC-21: the plan session's last reply was the card for "Show APPSEC-21", no earlier plan had been kept, so Add plan and build wrote that sentence into the description over the real plan section and the build started from it. The service now tells the frame whether the reply reads like a plan (`isPlan` in the preview) and refuses to build from one that does not unless the request says `force`; the frame refuses to write it to the description unless forced. The options panel shows a warning ("The last reply is not a plan", with what to ask the session) and keeps the buttons off until "Use it anyway". The Work Status row has no such button: its click fails with the same words, and the card or the issue view is where to go.
- **The move when the build starts.** Start build moves an issue that is in a planning status on to In Progress (`buildStateOf`): a status named like planning counts whatever its type, because some teams file "In Planning" as started (NIL does) and some as unstarted. The choices are the started statuses that are not planning (`buildStatesOf`). Start session still treats a planning status as already started and moves nothing. The switch is off only when the issue is already building (a started status that is not planning) or done.
- **Add the plan only.** A second button, "Add plan only", next to the build button in the Work Status row (the label of the first reads "Add plan and build" when the folder's switch is on) and in the build options of the card, the issue view and the session dialog. It does the same write as the switch (`writePlan` in `src/shared/start-build.ts`: read the plan, read the description again, replace the plan section) and starts nothing: no session, no move. The button then reads "Plan added" and can be clicked again to replace the section. The extension never writes the plan on its own when a plan finishes: every Linear write is a click.
- **A folder that belongs to many teams and projects.** Pinning takes any number of teams and projects, and the plan flow needs only that the folder is pinned to something: an unpinned folder is ignored by the service (no plan row, no drafts, no per-folder settings), though Start plan and the card's Start build still work there with the defaults. The issue named by a branch is recognised when its team key is one of the folder's mapped teams, the teams of its mapped projects, or any team of the workspace: frames push every team key (`teamKeys`, from the workspace they already loaded), and with an API key the service reads them itself.
- **After the build: merge request and AI review.** The build session's first message can carry the rest of the work, set per folder in Settings, Start build, "After the build" (`mapping.reviewMode`, default off) and "AI reviewers" (`mapping.aiReviewers`, default CodeRabbit). The extension adds no card of its own to the build session; the commit, push and merge request cards the user sees come from their own agent preferences. `mr`: the agent shows its usual commit, push and merge request options, waits for the choice, and once the merge request exists carries on by itself. `auto`: it commits (message starting with the issue key), pushes and opens the merge request assigned to the user, which the setting authorizes in the message. Both then follow `reviewSteps` (`src/service/handoff.ts`): watch the pipeline about once a minute for at most 20 minutes and fix what it broke; read every unresolved comment by the AI reviewers; fix it, or reply why not; reply to and resolve only the threads those reviewers started, never anyone else's, and never merge; after each push wait up to 15 minutes for the reviewers and the pipeline and handle new comments; at most 5 rounds; when a comment needs the user's decision, ask, and after the answer apply it and check for new AI comments again before finishing; finish with one message (merge request link, pipeline status, comments fixed, replied to or left). The loop is the agent's own, inside its session, with the tools it already has (GitLab or GitHub); the service does no polling and has no GitLab access. It depends on the agent following the message and on the user's global rules not forbidding the replies.
- **Not done.** Drafts are not posted by the service, ever. The key is read at most once a minute and kept in memory only.

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
    "build": "bunx openchamber-guest-bundle src/app/main.tsx panel/main.js && bunx openchamber-guest-bundle src/dialog/main.tsx dialog/main.js && bunx openchamber-guest-bundle src/status/main.tsx status/main.js && bunx openchamber-guest-bundle src/blocks/main.tsx blocks/main.js && bunx openchamber-guest-bundle --node src/service/main.ts service/main.js",
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
      "sessionControl": { "content": true },
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
src/dialog/   main.tsx dialog.tsx create-view.tsx comment-view.tsx attach-view.tsx done.tsx jobs.ts scope.ts use-draft.ts
src/status/   main.tsx
src/blocks/   main.tsx
src/service/  main.ts app.ts types.ts store.ts directories.ts instructions.ts events.ts handoff.ts mentions.ts snapshot.ts linear-node.ts
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

Phases 3 to 11 are also done only when:

1. No new local class without the `lin-` prefix; no hex, rgb or hsl colors (`grep -nE '#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(' src` returns only Linear data colors read at runtime).
2. Fake-data fixtures for the phase's views, written by `bun run fixtures` (`scripts/fixtures.ts`) into this folder's `harness/fixtures/` (`workspace.json`, `error.json`). It imports `queries.ts` and `gql-body.ts`, so every fixture key is the exact body the app sends. Fake data only, never real workspace data.
3. A shot list for the phase in this folder's `harness/shots/phase<N>.json`, at page width (1100) and rail width (360). `shoot.ts` takes dark and light by default.
4. Shoot them with shared-ui's harness, run from `../shared-ui` without changing it: `bun harness/server.ts --root <this folder> --port 47xx --replay <this folder>/harness/fixtures/workspace.json`, then `bun harness/shoot.ts <this folder>/harness/shots/phase<N>.json <temp dir>/p<N>`. Look at every shot.

Fixtures, shot lists and screenshots stay in this folder or a temp dir: nothing is written into `../shared-ui` (it is another project). The harness answers `storage`, `listProjects` and `readFile` with empty results, so the app must treat a missing answer as "nothing there".

Work Status shots use `"page": "status/index.html", "surface": "status"` and widths 360 and 1100. The shared harness keeps no extension storage and no status controls, so a folder with a saved mapping (several projects), a click that stores a note, and the panel reading a note are checked with a temp-dir copy of the harness that keeps storage (`harness.html` and `server.ts` copied from `../shared-ui/harness`, plus a seeded `storage` query and a `controls=1` flag), driven by a Playwright script. The copy lives in the temp dir, never in `../shared-ui`.

The harness also gives a safe preview of write flows: fixture the mutation responses instead of testing writes on the real workspace.

| # | Phase | Done when | Estimate |
|---|---|---|---|
| 1 | Scaffold: `bun init -y`, deps, manifest, tsconfig, empty frames, kit wrapper, glyphs, `gql` client | Check passes; install link works; panel shows the Linear viewer's name | 30 min |
| 2 | Read-only schema probe: run each query from 2.4 once, fix field names, write `queries.ts` and types | Every query returns data | 30 min |
| 3 | Detection + mapping + project picker + scope chip | Opening a mapped folder lands on its project; worktree shares the mapping; inferred banner Pin works | 1 h (ran longer: detection was reworked after testing on real repos) |
| 4 | Views: My issues, Issue list, Issue detail (read-only first), Projects list, Project overview | Navigable dashboard on page and panel | 2 to 3 h (ran longer: Linear-style issue detail and view-state persistence added) |
| 5 | Board, Cycles (burn-up SVG), Inbox, Triage | All views render. Done: list/board toggle, cycles with burn-up and issues, inbox with scope filter, triage list; periodic reload of what is on screen (60 s while visible). Mark read, Accept and Decline are phase 6 | 2 h (ran well over: the view options panel, saved views, extra properties, nesting and the burn-up rebuild were added during the phase) |
| 6 | Writes: property edits, drag on board (with team moves, 3.2), comments, create issue, post update, inbox mark read, triage accept/decline, Start session | Each write optimistic with rollback. **Do not test writes on the real workspace without asking the user**. Done: issue detail edits every property, title and description in place, with comments, triage Accept and Decline, Start session (3.1) and Link to this session; New issue (button and `c`); board drag between columns, cells and hidden columns, with team moves (3.2), done with pointer events and not HTML5 drag-and-drop, which did not work in the real sandboxed frame (`src/app/components/use-card-drag.ts`, rules in `src/shared/drag.ts`: a 5 px threshold, the board scrolls while the pointer rests near its edge, Escape cancels, a drag never counts as a click); inbox marks read on open and Mark all read in one aliased request; project Post update; Settings default for Start session. All writes live in `src/shared/writes.ts` (optimistic with rollback through `patchEntries`), the rules in `src/shared/moves.ts`. Checked against fake mutation answers only (harness fixtures, and a temp-dir Playwright script for drag and toasts) | 3 h |
| 7 | Status section | Rows render for a mapped folder; empty state for unmapped. Done: project, cycle, status chips, my issues, finish-comment draft rows (service side in phase 10), header Refresh, open-panel notes (`open-target`), unmapped, not connected and error states. Checked in the harness with fake data only (page shots, plus a temp-dir Playwright script for click, Post, Discard and the panel reading a note) | 1.5 h |
| 8 | Dialog + 5 actions with Small Model drafting | Each action opens a prefilled form. Done: create form drafted for message, selection, session and diff actions, comment form with linked-issue lookup and search, Attach tab, create and comment result view (see section 5, "As built"). Checked in a temp-dir copy of the harness that answers `generate`, `listProjects`, `listSessions`, `readFile`, `attach`, `sessionLink` and `close` (page shots in `harness/shots/phase8.json`, plus a temp-dir Playwright script for clicks); fake data only. Not checked here: the real action menus, a real Small Model and the host's real dialog size are for the user to try | 1.5 h |
| 9 | Blocks | Each block renders from a hand-written `openui-lang` call; PickIssue answers. Done: the three blocks on one shared entry (see section 6, "As built"). Checked in the shared harness (page shots in `harness/shots/phase9.json`: card, list, pick, start options, missing and invalid ids, hostile text, not connected, error; 720 and 360 wide, light and dark) and in a temp-dir copy of the harness that answers `block-answer` and replays `answered` (a Playwright script for pick, restored, note-only, refused and double-click answers, Open, and Start session through the move to In Progress); fake data only. Not checked here: the real chat, the real `openui-lang` call, a real answer reaching the agent and the real `host.startSession` are for the user to try | 1 h |
| 10 | Service: config, snapshot, instructions, mentions, session events, drafts; draft rows in section and Settings; the plan to build handoff (section 7) | `curl` each route per SKILL Step 5. Done: every route (see section 7, "As built (phase 10)"). Checked with `curl` against the built service on a temp data folder and a fake host (`bun run smoke` repeats it and walks the handoff on fake data), unit tests for the pure parts and the routes with fakes (`test/service.test.ts`, `test/service-app.test.ts`, `test/handoff.test.ts`), and page shots plus a temp-dir Playwright script for the clicks (`harness/shots/phase10.json`, fake data only). Not checked here: a real session event, a real `host.setInstructions` reaching a first turn, a real `sessions.start`, the approval of the new `sessionControl` line; those are for the user to try | 2 h |
| 11 | Hand over | Install link + one line per surface, per SKILL Step 6. Done: finishing checks all pass (typecheck, 353 tests, validate-queries with only the `ISSUE_EXTRAS` 6,592 warning, build, check, smoke, no hex outside the colour reader's own comments, every local class `lin-` or a `lin-` descendant of a kit class, no em or en dashes). The hand-over message lists the install link and one line per surface (panel and page, Work Status section, `+` dialog, the six actions, three blocks, service, Settings). Nothing was written to Linear and nothing pushed. What is still for the user to try on real data is listed in section 11 (risks 3, 6, 8, 10) and in the phase 9 and 10 rows | 10 min |

Total: about 15 to 17 hours of build time as planned; phases 3 to 5 ran over, so the real total will be higher.

## 11. Risks to check early

1. **OAuth scope for writes** through the host Linear connection. Answered (Nov 16): writes work. A status change on a real issue saved twice and Linear's history shows it (Backlog to Triage and back). Failures still show the reconnect message from `writeErrorText`.
2. **Block entry shared by three blocks**: answered (phase 9): `bun run check` accepts the shared `blocks/index.html`. If the real host ever draws a block from the wrong call name, copy the entry per block pointing at the same `main.js`.
3. **Instructions timing**: whether instructions set on `session-created` reach that session's first turn. If not, the next turn gets them; acceptable. The host stores instructions on its own server (`SERVICE_INSTRUCTIONS_MAX`, "no message waits on your process"), and the service also sets them on start, on every snapshot and on `session-created` / `turn-started` when older than five minutes, so a first turn after a refresh should have them. Still to see on a real session.
4. **`listWorktrees` may not include the main checkout**: fall back to `.git/HEAD` for the branch.
5. **Linear rate limits** (complexity-based): keep issue queries lean (no nested comments in lists), and back off on `RATELIMITED` errors with a banner. One query may not exceed 10,000 points (each property 0.1, each object 1, a connection multiplies its children by `first`, default 50). `bun run validate-queries` prints every query's score and fails above the limit; nested connections such as `teams(100) { states(100) }` break it, so fetch them flat (`workflowStates`). Current scores: the largest is `ISSUE_EXTRAS` at 6,592 (warn threshold 6,000), which is why releases, customers and time in status load apart from the rows; `ISSUES` is 5,642.
6. **`event.linked` for this extension's own items**: answered from the host's code (section 7, open questions): `id: 'guest:linear-dashboard:ENG-123'`, `kind: 'guest'`, `identifier`, no `provider`. `linearIssuesOf` covers it, the host's own Linear (`provider: 'linear'`), `linear:KEY` ids and issue page addresses. Confirm on a real event: create a file named `debug-events` in the extension's data folder (`~/.config/openchamber/guest-data/linear-dashboard/`) and read `debug.log` there.
7. **shared-ui drift**: `bun install --silent` in `build.sh` refreshes the copy, but a shared-ui change can still move Linear pixels. Any change to shared-ui follows USAGE section 3 and re-shoots Linear from `linear.json`.
8. **Sub-issues on a team move**: Linear's app moves sub-issues along when they all belong to the same team; unknown whether `issueUpdate(teamId)` through the API does the same. Check on the first approved real team move and say what happened in the confirm dialog.
9. **Sub-teams that inherit workflows**: answered (read-only check, Nov 10): in this workspace Strength & Conditioning, GM and NIL Ops each have their own state ids, different from their parent teams'. A drop between a parent and a sub-team is therefore a team move, with the confirm.
10. **Panel surface id for `openSurface`**: `ext:linear-dashboard`, read from the app's bundle (`ext:` plus the extension id); the SDK docs do not list it. If the first real click on a status row only shows a toast, the id is wrong: the note still reaches the panel when the user opens it. Check by hand on real data.

## 12. Out of scope (later ideas)

Rail badge for unread inbox, scheduled digests, editing or creating saved views (the team's saved views are shown read only), issue history timeline, documents editing, roadmaps / initiatives, Linear's own palette.
