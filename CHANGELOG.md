# Changelog

What changed in each Linear+ release. The newest is first. The release workflow uses a version's section as the notes of its GitHub release.

## 1.3.0 (2026-11-23)

### Added

- **Lead mode** (Settings, Plan and build). Start plan makes the issue's worktree with one session, the lead. The lead starts the plan as a session nested under it, on the plan agent and model. When you click Start build, it starts the build the same way, on the build agent and model. It answers their questions itself and asks you only what it cannot settle. Off by default. Needs OpenChamber 2.7.3 or later.
- **Add plan only** on the issue card in chat and in the issue view, next to Start build. It writes the plan into the issue's description and starts nothing, for when someone else picks the work up in a session of their own. Work Status already had it.
- **All folders settings** for After the build (with its AI reviewers), Finish comments and Add the plan to the issue. This folder overrides each one in a pinned folder, as the plan and build agents and models already did.

### Changed

- Sub-issues sit on a card, like the description and the comments.
- The Work Status plan row's buttons are in title case: Start Build (or Add Plan and Build), Add Plan Only, Dismiss.
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
