# Changelog

What changed in each Linear+ release. The newest is first. The release workflow uses a version's section as the notes of its GitHub release.

## 1.3.4 (2026-11-25)

### Added

- Issue lists remember search, assignee, status, priority, label, closed-issue and project milestone filters after closing an issue, remounting or reloading. Projects also have a copy-link icon beside Open in Linear.
- When a saved view, issue, project or team cannot be restored, Linear+ can open the issue named by the worktree prefix. Branch names and linked sessions remain fallbacks too.
- Plans over 6,500 characters are kept in full in an issue-linked Linear document. The issue gets a concise plan of 2,500 to 6,500 characters, aiming for 3,000 to 5,000, with a link to the document. Attached documents expand inline under the sub-issue list.
- Sessions with several plan replies get a Plan message picker. Start build from this plan on a message uses exactly that message for Write Plan and Start build.
- Related and dependency issues can be changed or removed in the issue view. Right click offers Change to, Remove relation, Copy link and Open in new tab, and a hover X removes the relation. The properties column opens the full issue menu, including its empty space below the footer.

### Changed

- Planning sessions interview you about meaningful unsettled choices. Recommendations are not treated as answers, and lead sessions reject plans that leave those choices unasked under Open decisions.
- Work Status beside a session shows only that session's plan, not every pending plan for the folder.
- Remove in the issue menu lists the actual parent issue and each blocked or blocking issue, rather than unrelated property shortcuts.
- Relation titles and status icons use the full column width. The remove X overlays the row only on hover or focus instead of compressing the title.

### Fixed

- Long-plan writes no longer wait for a model call or append `[cut]`. Writing again updates the existing plan document instead of adding duplicates.
- A revised plan can add split-out issues after the first plan was written. Only newly named issues are created, and Work Status recognizes the revision as new work.
- Relation menus open beside the pointer, including when the host reports zero coordinates. Submenus re-anchor after the main menu moves and clamp to the viewport using their real height.

## 1.3.3 (2026-11-25)

### Added

- Projects can be edited in place, as in Linear: name, short summary and description (rich text or Markdown), status, priority, lead, members, teams, and start and target dates. Changes show at once and roll back with a toast when Linear refuses them.
- Milestones can be added, edited and deleted from the project overview. Deleting one asks first and leaves its issues in the project.
- The project overview has Linear's right-hand column: Properties and a compact Milestones panel whose rows open that milestone's issues. The main column keeps the full milestone descriptions and progress bars.
- A Progress panel draws the project's burn-up, with Scope, Started and Completed, in the same style as the cycle chart. It counts issues, since a project can span teams with different estimate scales, and hides when there is nothing to draw.
- An Activity panel lists the project's changes: status, lead, members, teams, milestones, priority, dates, renames and description edits, with who made them and when.

### Changed

- The issue description reads as page text, without a card, border or background, as in Linear. Edit Description is now an outline button, like Plan and Build. The project's description looks the same.
- The open issue is remembered per worktree rather than per project, so two worktrees of one project each restore their own issue. The view, tabs and list options stay shared per project. Issues saved under the old project-wide key are not restored once.

## 1.3.2 (2026-11-24)

### Added

- Project milestones can be assigned or cleared from the issue side panel and the right-click menu (Shift+M).
- The issue menu now includes More properties, Create related, Mark as, Remove, Convert to, Make a copy, Open in, Favorite and Remind me. Links, customer requests, documents, releases, relations and project conversion use Linear's public API. Find suggestions uses semantic issue search.

### Fixed

- Lead mode always relays every plan session question to you and waits for your answer, rather than answering questions itself when it thinks they are obvious.
- Blocking badges and groups now reflect open work: completed issues show no list badges, and completed dependencies appear under Related instead of Blocked by or Blocking.

## 1.3.1 (2026-11-24)

### Added

- After the build offers Request Review and Request Full Review cards when an AI reviewer stays silent. CodeRabbit requests use the actual bot account on the merge request, and nothing is posted without a click.
- A mergeable merge request with a green pipeline and every required approval gets Merge and Cancel cards. Optional approvals do not block, and only clicking Merge authorizes the merge.

### Fixed

- Saving All folders with an empty AI reviewers field stores CodeRabbit explicitly, so the reviewer choice persists across folders and projects.

## 1.3.0 (2026-11-23)

### Added

- **Lead mode** (Settings, Plan and build). Start plan makes the issue's worktree with one session, the lead. The lead starts the plan as a session nested under it, on the plan agent and model. When you click Start build, it starts the build the same way, on the build agent and model. It answers their questions itself and asks you only what it cannot settle. Off by default. Needs OpenChamber 2.7.3 or later.
- **Write Plan** on the issue card in chat and in the issue view, next to Build. It writes the plan into the issue's description and starts nothing, for when someone else picks the work up in a session of their own. Work Status already had it.
- **All folders settings** for After the build (with its AI reviewers), Finish comments and Add the plan to the issue. This folder overrides each one in a pinned folder, as the plan and build agents and models already did.

### Changed

- Sub-issues sit on a card, like the description and the comments.
- Buttons are in title case everywhere (Start Session, Edit Description, New Issue). Add plan only is now **Write Plan**, in the Work Status row, the Start build panel and everywhere else.
- The issue card in chat and the issue view share one set of buttons, none of them orange: Start Session, Plan, Write Plan and Build. Before an issue has a planning session, Write Plan and Build show disabled, and hovering them says to plan first. The issue view starts with Attach, and in the rail and the side pane its buttons take a row of their own under Close and More. The longer "Start plan", "Start session", "Start build" and "Attach to message" labels are gone.
- Add the plan to the issue has its own section in Settings, and so does After the build.
- A folder whose finish comments were left at Off now follows All folders. A folder set to Draft keeps it.

### Fixed

- The Work Status section no longer scrolls sideways, which also made it scroll up and down: the plan row's buttons wrap inside its width and Dismiss stays inside it. The row no longer draws a hover behind its buttons.
- Changing a folder's team or projects kept only its finish comments. It now keeps the folder's agents, models, After the build, reviewers and Add the plan choice too.

## 1.2.0 (2026-11-23)

### Added

- Rich text description editor: a toolbar, shortcuts and Markdown input rules, and a Markdown tab that shows what Linear stores. Untouched text is never saved; tables, `+++` sections, HTML and indented code stay as written.

### Changed

- The issue description sits on a card like the comments, with Edit description in its footer.

## 1.1.1 (2026-11-23)

### Fixed

- Milestone progress: a started milestone no longer reads as 100% and done.
- Cycles of a team at cycle 6 or below, and the cycle picker of a team with no active cycle, load again.
- The Inbox reads only the fields Linear still publishes, after Linear dropped its internal notification fields.

## 1.1.0 (2026-11-23)

### Added

- Issue menu on right click, on rows and cards: status, priority, assignee, due date, labels, project, estimate, cycle, open, copy, and delete with a confirmation. Linear's shortcut keys work, and submenus open in place on the rail.
- `@Linear+` lists the branch's issue, your open issues, the issues you opened in the dashboard and any key you type, with live search when a personal API key is set.
- Settings button in the rail header.

### Changed

- A click in the description no longer edits it, so its text can be selected. Task lists draw boxes, and a box ticks and saves.
- Every issue list sits on the same card as the project view; board columns are one darker panel from the header down.

## 1.0.0 (2026-11-21)

First release: the Linear dashboard (teams, issues, board, projects, cycles, Inbox), issue editing, attaching Linear work to sessions, the Work Status section, chat blocks, and Start plan and Start build.
