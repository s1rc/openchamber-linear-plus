// Shapes the service keeps in its data folder and frames read or push. Types only: frames import this
// file too, so it must not pull in anything from node.

export type FinishComments = 'off' | 'draft';

/** A folder's mapping, as the frames mirror it with `PUT /config`. */
export type MappingConfig = {
  directory: string;
  teamIds: string[];
  linearProjectIds: string[];
  activeProjectId: string;
  finishComments: FinishComments;
  /** The agent a plan to build handoff starts, empty for `build`. */
  buildAgent?: string;
  /** `provider/model` for the build session, empty for the host's default. */
  buildModel?: string;
  /** The agent Start plan starts, empty for `plan`. */
  planAgent?: string;
  /** `provider/model` for the plan session, empty for the host's default. */
  planModel?: string;
  /** Start build adds the plan to the issue's description first. */
  postPlan?: boolean;
  /** What the build does after the code is written: the merge request and AI review. Empty means `off`. */
  reviewMode?: ReviewMode;
  /** Names of the AI reviewers whose comments the build handles, comma separated. Empty means CodeRabbit. */
  aiReviewers?: string;
  updatedAt: number;
};

/**
 * What the build session does after the code is written. `mr`: it shows its usual commit, push and merge request
 * options, waits for the choice, and then watches the pipeline and handles AI review comments by itself. `auto`: it
 * does all of that without asking. `off`: it stops when the code is done.
 */
export type ReviewMode = 'off' | 'mr' | 'auto';

export type Config = { directories: Record<string, MappingConfig> };

export type SnapTeam = { id: string; key: string; name: string };

export type SnapProject = {
  id: string;
  name: string;
  url: string;
  status: string;
  health: string | null;
  /** 0 to 1. */
  progress: number;
  targetDate: string | null;
  /** Team keys. */
  teams: string[];
  /** The overview an agent reads, when a frame held the whole project. */
  text?: string;
};

export type SnapDoc = { id: string; title: string; url: string; project: string | null; text?: string };

export type SnapIssue = { identifier: string; title: string; state: string; url?: string; description?: string };

/** What the service knows about one mapped folder, from a frame's push or from Linear with a key. */
export type DirSnapshot = {
  at: number;
  source: 'frame' | 'key';
  teams: SnapTeam[];
  /** The key of every team in the workspace, so a branch named for an issue of any team is recognised, whatever the folder is pinned to. */
  teamKeys?: string[];
  projects: SnapProject[];
  documents: SnapDoc[];
  myIssues: SnapIssue[];
  branchIssue: SnapIssue | null;
};

export type SnapshotStore = Record<string, DirSnapshot>;

/** The body of `POST /snapshot`: a key that is left out is left as it was. */
export type SnapshotPush = {
  directory: string;
  teams?: SnapTeam[];
  teamKeys?: string[];
  /** The folder's mapped projects: replaces the list. */
  projects?: SnapProject[];
  /** Projects to add or update by id, such as one overview a frame holds in full. */
  moreProjects?: SnapProject[];
  documents?: SnapDoc[];
  myIssues?: SnapIssue[];
  branchIssue?: SnapIssue | null;
};

export type Draft = {
  id: string;
  directory: string;
  sessionId: string;
  identifier: string;
  sessionTitle: string;
  body: string;
  createdAt: number;
};

/** A planning session that finished a turn while linked to a Linear issue: a candidate for Start build. */
export type Handoff = {
  id: string;
  /** The mapped folder. */
  directory: string;
  /** Where the planning session runs, often a worktree. */
  sessionDirectory: string;
  sessionId: string;
  identifier: string;
  sessionTitle: string;
  /** The reply reads like a plan. A frame also shows the row when the session's agent is the plan agent. */
  plan: boolean;
  createdAt: number;
  /** Filled when the list is read: the folder's setting for posting the plan with Start build. */
  postPlan?: boolean;
};

/**
 * A session this service started for an issue, a plan or a build: it carries no link of its own, so the service
 * counts it as linked (finish-comments, plan rows). `role` is `build` when missing.
 */
export type BuildSession = {
  identifier: string;
  /** The mapped folder, or the session's own when the folder is not mapped. */
  directory: string;
  createdAt: number;
  role?: 'plan' | 'build';
  /** Where the session runs, usually the issue's worktree. */
  sessionDirectory?: string;
  title?: string;
};
