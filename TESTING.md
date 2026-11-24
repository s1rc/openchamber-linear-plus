# Linear+ testing

How Linear+ is checked, and what still needs a try by hand on real data before and after a release.

## Automated checks

Run all of these before a release. Each must pass.

| Command | What it checks |
|---|---|
| `bun run typecheck` | TypeScript, the whole project |
| `bun test` | 485 unit and route tests in `test/` (see below) |
| `bun run validate-queries` | Every GraphQL query and mutation against Linear's published schema, and its complexity score under Linear's 10,000 point limit. No call to your workspace. Run it with `--refresh` before a release: since November 2026 the published schema leaves out Linear's `[Internal]` fields, and a query that uses one fails here |
| `bun run build` | Bundles the panel, dialog, Work Status, blocks, background and service |
| `bun run check` | `openchamber-guest-check`: the manifest and built files are ready to install |
| `bun run smoke` | Starts the built service against a fake host and calls every route, including the plan to build handoff and lead mode |
| `bun run e2e` | Builds, writes the fixtures, then drives the built frames in headless Chrome against a mock host (`e2e/`): 19 screen tests, fake data only |

Also check by grep:

- No hex, `rgb(` or `hsl(` colors in `src` (Linear's own data colors are set at runtime only).
- Every local CSS class in `src/shared/local.css` starts with `lin-`.
- No em or en dashes in code, docs or UI text.

### What the unit tests cover

`bun test` covers the pure rules and the service, with fakes for the host, the disk and Linear:

- **Service** (`service.test.ts`, `service-app.test.ts`, `mention-issues.test.ts`): folder resolution, agent instructions, `@` rows (issues, projects, documents; cached, and live with the API key), session events, finish-comment drafts, plan to build, Start plan, lead mode (plan and build steps sent to the lead, its progress lines are no plan rows), agent and model choice (folder, all folders, one-off override), plan extras (claim, done, failed, retry, never twice).
- **Plan and build** (`handoff.test.ts`, `plan-extras.test.ts`, `moves.test.ts`): which session to build from, the plan section in a description, which status to move to, the `linear-plan` block, estimate snapping.
- **Dashboard rules**: the issue menu (`issue-menu.test.ts`), the Inbox's notification text (`inbox.test.ts`), task boxes in a description (`tasks.test.ts`), the rich editor's Markdown round trip and editing commands (`rich.test.ts`), grouping, board columns and drag, view options, nesting, burn-up, detection, view state, the sidebar tree (`nav.test.ts`), milestones, the dialog's picker (`picker.test.ts`), blocks and slash commands, status rows, colors, the cache.

### Screen tests (`bun run e2e`)

`e2e/run.ts` serves the built pages inside `e2e/harness.html`, a mock OpenChamber host that answers the SDK (projects, sessions, storage, start session, attach, close, clipboard, toasts) and replays `harness/fixtures/workspace.json` or `plan-extras.json`. It records every host message and every Linear and service call, and checks:

| Test | Checks |
|---|---|
| `picker` | The dialog lists the folder's issues with a preview; a pasted Linear link lists only that issue; Enter attaches it and closes the dialog |
| `dialog-escape` | Escape with the filter open closes only the filter; the next Escape closes the dialog |
| `issue-pane` | An issue from a list opens in the right-hand pane with its trail, the list stays beside it, another row swaps it, Escape closes it; a cycle's issue opens in the same pane |
| `issue-rail` | On the rail the issue replaces the view, with its trail; Back returns to the list |
| `sidebar` | The folder's team is open with Home, Triage (count 1), Issues, Projects, Views; the sub-team sits under it and opens; a saved view opens the team's issues with it picked; open teams are remembered |
| `milestones` | A milestone's issue count opens its three issues; a half-done milestone shows 50% (Linear gives milestones a percent, projects a fraction) and only finished ones count as done |
| `copy-buttons` | Copy ID copies the key |
| `assign-to-me` | With the Settings default on, New issue starts assigned to you and says so |
| `plan-extras` | The Work Status frame claims a finished plan, sets the estimate on the team's scale, creates the split-out issue once, relates it, reports it done, and toasts what it did |
| `description` | A click in the description does not edit it; a checklist draws boxes with no bullets, a click ticks a box and saves the description; Edit description still edits |
| `rich-editor` | Edit description opens rich text with headings, bold and the checklist drawn; Cancel on untouched text saves nothing; Enter after a task adds an unticked one, the toolbar's Bold applies; the Markdown tab shows what Linear will store; Save sends it. Runs on a real clock: ProseMirror tells clicks apart by time |
| `rail-settings` | The rail header has Settings, the view dropdown does not; a second click goes back |
| `issue-menu` | A right click on a row opens Linear's menu without opening the issue; Status flies out, ticks the current one and saves a pick; P opens Priority, Escape closes the submenu, then the menu |
| `issue-menu-rail` | On the rail the menu fits and a submenu opens in place with a Back row; Copy ID copies |
| `board-delete` | Board columns are one darker panel from the header down; Delete from a card's menu asks first, moves the issue to the trash and says how to get it back |
| `inbox` | Notifications read only published fields: each says who did what (comment, assignment, new status, project update with its health); opening one opens the issue and marks it read |
| `status-plan-row` | At 280 px the Work Status plan row's buttons are in title case, nothing scrolls sideways, Dismiss stays inside, the row draws no hover; Add Plan Only writes the plan and starts no build |
| `add-plan-only` | The LinearIssue card's Add plan only writes the plan into the description and says so; the issue view's bar offers it too |
| `list-surface` | My issues and a cycle's issues sit on the same card; a project's list uses its section's card |

Run one with `bun e2e/run.ts --only <name>` after `bun run build` and `bun run fixtures`. Needs Google Chrome (`CHROME_PATH` to point elsewhere).

### What they do not cover

- **Not every screen has a test.** The rest are checked by screenshots: `bun run fixtures` writes fake Linear data to `harness/fixtures/`, and the shot lists in `harness/shots/` are shot with shared-ui's harness (see "Screenshots" below). Look at every shot.
- **Nothing runs against a real OpenChamber host or the real Linear workspace.** That is the hand testing below.

### Screenshots

From `../shared-ui`, without changing it:

```bash
bun harness/server.ts --root "<this folder>" --port 4812 --replay "<this folder>/harness/fixtures/workspace.json"
bun harness/shoot.ts "<this folder>/harness/shots/phase12.json" <temp dir>/p12 --base http://localhost:4812
```

Some phase 12 shots need more than the shared harness gives:

- Shots with `type` or `press` steps need a copy of `shoot.ts` that fills `.lin-picker-head input`.
- Shots on port 4813 need a copy of `harness.html` that answers `workspace-read` (projects, sessions) and `storage`.
- `p12-extras-status` (port 4814) replays `harness/fixtures/plan-extras.json`, where the Work Status frame writes a plan's estimate and split-out issue on fake data.

Keep those copies in a temp folder, never in `../shared-ui`.

## By hand on real data

Reload Linear+ in Settings, Extensions first.

### Writes to Linear without a click: test these first

**Plan estimate and split-out issues.** This is the one place Linear+ writes to Linear without a click.

Use a throwaway issue in a team that uses estimates, with no estimate set.

1. Click **Start plan** on the issue. The plan session's first message asks it to size the work on the team's scale, by coding agent effort, and to end with a `linear-plan` block.
2. Answer any questions until the plan finishes, with the Work Status section (or the Linear+ page) open.
3. Within about a minute a toast says what was written, for example "Plan for ENG-16: set the estimate of ENG-16 to M; created ENG-40, related to ENG-16".
4. In Linear, check:
   - the estimate on the planned issue, and that an estimate already set by hand is kept;
   - each split-out issue is in the same team and project, has its own estimate, is related to the planned issue, and is assigned to you only when "Assign new issues to me" is on;
   - nothing is created twice when the plan is revised in a later turn, or when two Linear+ frames are open.
5. A plan that splits nothing sets only the estimate.
6. Click **Start build**. The plan shown has no JSON block, and the build session's first message says to leave the split-out parts alone.
7. On a failure, Work Status shows a row with **Retry**, and a retry creates only the issues still missing.

Things to watch:

- How good the agent's sizing is, and whether it splits too often or too rarely. The prompt is `planPrompt` in `src/service/handoff.ts`.
- A plan that finishes with no Linear+ frame open is written when one opens next, or when Start build runs. With the optional API key the service could write on its own; it does not yet.
- An issue created just before a failed "related" link stays unrelated; link it by hand.

### Plan and build

- [ ] Settings, Start plan and Start build: **All folders** agent and model apply in a folder that is not pinned; **This folder** overrides them in a pinned folder.
- [ ] Start plan and Start build: the **Plan model** or **Build model** dropdown starts on "From Settings: <model>"; a pick is used for that start only and Settings stay as they were.
- [ ] Lead on (Settings, Plan and build): Start plan makes one session in the worktree, and it starts "<KEY> plan" nested under it on the plan agent and model. When the plan is done, the lead repeats it with the card, and the Work Status row offers Start build. Start build opens the lead, which starts "<KEY> build" under it on the build agent and model. No empty session is left.
- [ ] Lead off: Start plan makes the worktree, an empty first session and "<KEY> plan"; Start build makes "<KEY> build".
- [ ] After the build: the **All folders** choice and AI reviewers reach the build in a folder left on "All folders"; **This folder** (Off included) overrides it in a pinned folder.
- [ ] Finish comments and Add the plan: the **All folders** choice applies in a pinned folder left on "All folders" (an existing folder that was Off follows it); **This folder** (Off included) overrides it.
- [ ] Finish comments (Settings, Draft): a draft appears in Work Status after a turn; Post comments, Discard drops it.

### Dashboard

- [ ] Sidebar: Your teams opens and closes, and each team shows Home, Triage (with its count, only where the team uses triage), Issues, Projects and Views. Sub-teams sit under their parent. Which teams are open is remembered.
- [ ] Views: a saved view opens the team's Issues with that view picked.
- [ ] Inbox: each notification says who did what (comments, assignments, mentions, status changes, reactions, project updates); a project or document one opens in Linear.
- [ ] Issue pane: from a list, a project, a cycle and the Inbox the issue opens in the same right-hand pane, with a trail of where it came from. Close, Escape, and clicking another row work. On the rail panel the issue shows alone and Back returns to where you were.
- [ ] Project overview: a milestone's name or issue count opens its issues, done ones included.
- [ ] Projects page and a team's overview: the same table (health, lead, target, progress).
- [ ] Issue view: copy link, ID and branch (left of Plan) copy and toast; text in the description can be selected, and only Edit description edits it.
- [ ] Rich text editing on real descriptions: open, change one word, save, and check in Linear that the rest is unchanged (lists, links, mentions, images). Try one with a table and one with a `+++` collapsible section: both show as they render and come back exactly as written. Shortcuts: Cmd+B, I, E, K, Cmd+Shift+7/8/9, `# `, `- `, `[] `, `> `, ``` then space, Tab and Shift+Tab in lists.
- [ ] Checklists: an issue with `- [ ]` steps (NIL-784) shows boxes, not bullets; ticking one saves in Linear and the box stays ticked after Refresh.
- [ ] Right click on a list row and a board card: each property saves, labels tick several in a row, Copy copies, Open in Linear opens, Delete asks and the issue lands in Linear's trash. On the rail the submenus open in place.
- [ ] Rail header: Settings opens Settings and a second click goes back.
- [ ] List surface: My issues, a cycle, a team's issues and Triage sit on the same grey card as a project's Issues tab.
- [ ] New issue: the **Assign to me** switch starts from Settings, New issues.
- [ ] Board: a drag to a status only another team has moves the issue to that team. Not yet checked: whether its sub-issues move with it (say what happened, so the confirm dialog can say it).

### `@` in the composer

- [ ] Without the API key: `@` alone lists the branch's issue and your open issues; `@` plus words finds an issue you opened in the dashboard; picking it attaches its full text (description and latest comments).
- [ ] A typed key (`@NIL-784`) is offered even when nothing cached it; picking it gives the agent the key and link.
- [ ] With the API key: `@` plus words finds any issue through Linear's search, and a pick reads it fresh.
- [ ] A folder with no Linear team still lists your issues.

### Dialog (+ menu and New worktree)

- [ ] New worktree, PR or issue, **Linear+**: the two-pane picker; a pasted key or Linear link finds that issue; Up, Down and Enter work; Choose makes the worktree with the issue attached.
- [ ] Escape closes the dialog; with a dropdown open, the first Escape closes only the dropdown.
- [ ] Create Linear issue from a message, a selection, a chat and a diff: the Small Model drafts the title and description.

### Known limits

- The extension dialog is 672 px wide at most. OpenChamber fixes that size and offers no setting for it.
- Linear+ never posts a comment, a project update or a status change on its own; those are clicks. The plan extras above are the only automatic writes.
