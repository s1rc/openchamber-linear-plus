// Shapes of the data `queries.ts` asks for. Keep the two files in step.

export type StateType = 'triage' | 'backlog' | 'unstarted' | 'started' | 'completed' | 'canceled' | 'duplicate';

export type PageInfo = { hasNextPage: boolean; endCursor: string | null };
export type Connection<T> = { nodes: T[] };
export type Page<T> = { nodes: T[]; pageInfo: PageInfo };

export type User = {
  id: string;
  name: string;
  displayName: string;
  avatarUrl: string | null;
  avatarBackgroundColor: string;
};

export type Viewer = User & { email: string; organization: { id: string; name: string; urlKey: string }; teams: Connection<{ id: string }> };

export type WorkflowState = { id: string; name: string; type: StateType; color: string; position: number };

export type Label = { id: string; name: string; color: string };

export type CycleSummary = {
  id: string;
  number: number;
  name: string | null;
  startsAt: string;
  endsAt: string;
  progress: number;
  isActive: boolean;
  isFuture: boolean;
  isPast: boolean;
  completedAt: string | null;
};

export type Team = {
  id: string;
  key: string;
  name: string;
  color: string | null;
  icon: string | null;
  cyclesEnabled: boolean;
  triageEnabled: boolean;
  /** notUsed, exponential, fibonacci, linear or tShirt. */
  issueEstimationType: string;
  issueEstimationAllowZero: boolean;
  issueEstimationExtended: boolean;
  /** Where new issues land, and where Accept moves a triage issue. */
  defaultIssueState: { id: string } | null;
  /** The team this one is a sub-team of. */
  parent: { id: string } | null;
  activeCycle: CycleSummary | null;
};

/** 0 none, 1 urgent, 2 high, 3 medium, 4 low. */
export type Priority = 0 | 1 | 2 | 3 | 4;

export type IssueRow = {
  id: string;
  identifier: string;
  number: number;
  title: string;
  priority: Priority;
  estimate: number | null;
  dueDate: string | null;
  sortOrder: number;
  url: string;
  branchName: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  slaBreachesAt: string | null;
  slaType: string | null;
  startedAt: string | null;
  canceledAt: string | null;
  addedToCycleAt: string | null;

  creator: { id: string; name: string; avatarUrl: string | null } | null;
  state: WorkflowState;
  assignee: User | null;
  labels: Connection<Label>;
  team: { id: string; key: string };
  project: { id: string; name: string; color: string; icon: string | null } | null;
  projectMilestone: { id: string; name: string } | null;
  cycle: { id: string; number: number; name: string | null } | null;
  parent: { id: string; identifier: string; title?: string } | null;
  attachments: Connection<Attachment>;
  /** Relations from this issue: `blocks` means it blocks another. State decides whether the badge still matters. */
  outRelations: Connection<{ id: string; type: string; relatedIssue: RelatedIssue }>;
  /** Relations to this issue: `blocks` means another blocks it. */
  inRelations: Connection<{ id: string; type: string; issue: RelatedIssue }>;
};

export type HistoryEvent = {
  id: string;
  createdAt: string;
  updatedDescription: boolean | null;
  fromPriority: number | null;
  toPriority: number | null;
  fromEstimate: number | null;
  toEstimate: number | null;
  fromTitle: string | null;
  toTitle: string | null;
  actor: { id: string; name: string; avatarUrl: string | null } | null;
  fromState: { name: string; type: StateType; color: string } | null;
  toState: { name: string; type: StateType; color: string } | null;
  fromAssignee: { name: string } | null;
  toAssignee: { name: string } | null;
  addedLabels: { name: string; color: string }[] | null;
  removedLabels: { name: string; color: string }[] | null;
  fromCycle: { number: number } | null;
  toCycle: { number: number } | null;
  fromProject: { name: string } | null;
  toProject: { name: string } | null;
  toParent: { identifier: string } | null;
  relationChanges: { identifier: string; type: string }[] | null;
};

export type CustomView = { id: string; name: string; icon: string | null; color: string | null; shared: boolean; team: { id: string } | null };
export type CustomViewsResult = { customViews: Connection<CustomView> };
export type CustomViewIssuesResult = { customView: { issues: Page<IssueRow> } };

export type ChildStatesResult = { issues: Page<{ parent: { id: string } | null; state: { type: StateType } }> };

/** A link on an issue; merge and pull requests carry their state in `metadata`. */
export type Attachment = { id: string; url: string; title: string; sourceType: string | null; metadata: Record<string, unknown> | null };

export type RelatedIssue = { id: string; identifier: string; title: string; url: string; state: WorkflowState };

export type Comment = {
  id: string;
  body: string;
  createdAt: string;
  editedAt: string | null;
  url: string;
  user: User | null;
  parent: { id: string } | null;
};

export type IssueDetail = Omit<IssueRow, 'team'> & {
  description: string | null;
  creator: User | null;
  team: { id: string; key: string; name: string; issueEstimationType?: string; issueEstimationAllowZero?: boolean; issueEstimationExtended?: boolean; states: Connection<WorkflowState> };
  children: Connection<IssueRow>;
  comments: Connection<Comment>;
  links: Connection<Attachment & { subtitle: string | null; createdAt: string }>;
  /** Documents attached to the issue, including a long plan's full text. Optional for older cached replies. */
  documents?: Connection<DocumentSummary>;
  relations: Connection<{ id: string; type: string; relatedIssue: RelatedIssue }>;
  inverseRelations: Connection<{ id: string; type: string; issue: RelatedIssue }>;
  subscribers: Connection<User>;
  history: Connection<HistoryEvent>;
};

export type ProjectHealth = 'onTrack' | 'atRisk' | 'offTrack';

export type ProjectStatusType = 'backlog' | 'planned' | 'started' | 'paused' | 'completed' | 'canceled';

export type ProjectMilestoneSummary = { id: string; name: string; sortOrder: number };

export type ProjectSummary = {
  id: string;
  name: string;
  slugId: string;
  url: string;
  icon: string | null;
  color: string;
  health: ProjectHealth | null;
  /** 0 to 1. */
  progress: number;
  startDate: string | null;
  targetDate: string | null;
  updatedAt: string;
  status: { id: string; name: string; type: ProjectStatusType; color: string };
  lead: User | null;
  teams: Connection<{ id: string; key: string; name: string }>;
};

export type ProjectUpdate = { id: string; body: string; health: ProjectHealth; createdAt: string; url: string; user: User };

export type DocumentSummary = { id: string; title: string; url: string; updatedAt: string; project?: { id: string; name: string } | null };

export type ProjectStatus = { id: string; name: string; type: ProjectStatusType; color: string; position: number };

export type ProjectDetail = ProjectSummary & {
  /** The short summary under the title. */
  description: string;
  /** The long description, as Markdown. */
  content: string | null;
  /** 0 none, 1 urgent, 2 high, 3 medium, 4 low. */
  priority: 0 | 1 | 2 | 3 | 4;
  createdAt: string;
  members: Connection<User>;
  projectMilestones: Connection<ProjectMilestoneSummary & { description?: string | null; targetDate: string | null; /** A percent, 0 to 100 (a project's own progress is 0 to 1). */ progress: number }>;
  lastUpdate: { id: string; health: ProjectHealth; createdAt: string } | null;
  projectUpdates: Connection<ProjectUpdate>;
  documents: Connection<DocumentSummary>;
};

export type DocumentDetail = DocumentSummary & { content: string | null; creator: User | null };

export type Notification = {
  id: string;
  type: string;
  /** Linear's NotificationCategory: assignments, commentsAndReplies, mentions, statusChanges, reactions, ... */
  category: string;
  readAt: string | null;
  createdAt: string;
  actor: User | null;
  issue?: {
    id: string;
    identifier: string;
    title: string;
    url: string;
    state: WorkflowState;
    team: { id: string; key: string };
    project: { id: string } | null;
  };
  comment?: { id: string; body: string } | null;
  reactionEmoji?: string | null;
  project?: { id: string; name: string; url: string; teams?: Connection<{ id: string }> };
  projectUpdate?: { health: string; url: string } | null;
  document?: { title: string; url: string } | null;
};

// Query results.

export type ViewerResult = { viewer: Viewer };
export type TeamsResult = { teams: Connection<Team> };
export type WorkflowStatesResult = { workflowStates: Page<WorkflowState & { team: { id: string } }> };
export type TeamPeopleResult = { team: { id: string; members: Connection<User & { active: boolean }>; labels: Connection<Label> } };
export type WorkspaceLabelsResult = { issueLabels: Connection<Label & { team: { id: string } | null }> };
export type ProjectsResult = { projects: Page<ProjectSummary> };
export type ProjectDetailResult = { project: ProjectDetail };
export type ProjectStatusesResult = { projectStatuses: Connection<ProjectStatus> };
export type ProjectMilestonesResult = { project: { id: string; projectMilestones: Connection<ProjectMilestoneSummary> } };
export type IssuesResult = { issues: Page<IssueRow> };
export type IssueDetailResult = { issue: IssueDetail };
export type IssuesByIdentifierResult = Record<string, IssueRow | null>;
export type IssuesByKeysResult = { issues: { nodes: IssueRow[] } };
export type BlockStatesResult = { workflowStates: { nodes: { id: string; position: number; team: { id: string } }[] } };
export type TeamCyclesResult = { team: { id: string; key: string; name: string; cycles: Connection<CycleSummary> } };
export type CycleDetailResult = { cycle: CycleSummary & { description: string | null } };
export type ReleaseSummary = { id: string; name: string; version: string | null };

/** The costly properties, loaded apart from the rows and only when shown. */
export type IssueExtras = {
  id: string;
  releases: Connection<ReleaseSummary>;
  needs: Connection<{ id: string; customer: { id: string; name: string; revenue: number | null } | null }>;
  /** The latest state span: when the issue entered its current status. */
  stateHistory: Connection<{ startedAt: string }>;
};
export type IssueExtrasResult = { issues: Page<IssueExtras> };
/** One open issue as the Work Status counts see it. */
export type StatusCountNode = { state: WorkflowState; team: { id: string } };
export type StatusCountsResult = { issues: Page<StatusCountNode> };
export type StatusMineIssue = {
  id: string;
  identifier: string;
  title: string;
  url: string;
  priority: Priority;
  updatedAt: string;
  state: WorkflowState;
  team: { id: string; key: string };
  project: { id: string; name: string } | null;
};
export type StatusMineResult = { issues: Page<StatusMineIssue> };
export type ChildIssuesResult = { issues: Page<IssueRow> };
export type NotificationsResult = { notifications: Page<Notification> };
export type RepoAttachmentsResult = {
  attachments: Connection<{ url: string; issue: { id: string; identifier: string; team: { id: string }; project: { id: string } | null } | null }>;
};
export type SearchIssuesResult = { searchIssues: Connection<IssueRow> };
export type IssueReleasesResult = { issue: { id: string; releases: Connection<ReleaseSummary> }; releaseSearch: ReleaseSummary[] };
export type CustomersResult = { customers: Connection<{ id: string; name: string }> };
export type IssueFavoriteResult = { issue: { id: string; favorite: { id: string } | null } };
export type SemanticIssuesResult = { semanticSearch: { results: { id: string; type: string; issue: IssueRow | null }[] } };

/** One issue in the dialog's picker (`PICKER_ROW`). */
export type PickerIssue = {
  id: string;
  identifier: string;
  title: string;
  priority: Priority;
  updatedAt: string;
  url: string;
  branchName: string;
  state: WorkflowState;
  team: { id: string; key: string; name: string };
  assignee: User | null;
  labels: Connection<Label>;
  project: { id: string; name: string; color: string; icon: string | null } | null;
  parent: { id: string; identifier: string; title: string; state: WorkflowState } | null;
  children: Connection<{ id: string; state: { type: StateType } }>;
};
export type TriageCountsResult = { issues: Page<{ team: { id: string } }> };
/** What a project's issue timeline needs: when each issue was made, started and finished. */
export type ProjectIssueTimeline = {
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  canceledAt: string | null;
  estimate: number | null;
  state: { type: StateType };
  projectMilestone: { id: string } | null;
};
export type MilestoneIssuesResult = { issues: Page<ProjectIssueTimeline> };
export type ProjectHistoryNode = { id: string; createdAt: string; entries: unknown };
export type ProjectActivityResult = { project: { id: string; history: Connection<ProjectHistoryNode> } };
export type UsersResult = { users: Connection<User> };
export type PickerIssuesResult = { issues: Connection<PickerIssue> };
export type PickerSearchResult = { searchIssues: Connection<PickerIssue> };
export type SearchProjectsResult = { searchProjects: Connection<ProjectSummary> };
export type SearchDocumentsResult = { searchDocuments: Connection<DocumentSummary> };
export type DocumentsResult = { documents: Connection<DocumentSummary> };
export type DocumentResult = { document: DocumentDetail };

export type IssueUpdateResult = { issueUpdate: { success: boolean; issue: IssueRow | null } };
export type IssueCreateResult = { issueCreate: { success: boolean; issue: IssueRow | null } };
export type CommentCreateResult = { commentCreate: { success: boolean; comment: Comment | null } };
export type ProjectUpdateCreateResult = { projectUpdateCreate: { success: boolean; projectUpdate: ProjectUpdate | null } };
export type DocumentCreateResult = { documentCreate: { success: boolean; document: DocumentSummary } };
export type DocumentUpdateResult = { documentUpdate: { success: boolean; document: DocumentSummary } };
export type ProjectCreateResult = { projectCreate: { success: boolean; project: { id: string; name: string; url: string } | null } };
export type SuccessResult = Record<string, { success: boolean }>;
