// Every GraphQL document the extension sends. Validated against Linear's published schema by
// `bun run validate-queries`. Field sets are plain strings, not fragments, so the same set works on
// `Issue` and on search results (`IssueSearchResult`), which are separate types.

const PAGE = 'pageInfo { hasNextPage endCursor }';

const USER = 'id name displayName avatarUrl avatarBackgroundColor';

const STATE = 'id name type color position';

const LABEL = 'id name color';

export const ISSUE_ROW = `
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

const PROJECT_SUMMARY = `
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { ${USER} }
  teams(first: 10) { nodes { id key name } }
`;

const CYCLE_SUMMARY = 'id number name startsAt endsAt progress isActive isFuture isPast completedAt';

export const VIEWER = `
  query Viewer {
    viewer { ${USER} email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`;

// Workflow states come from WORKFLOW_STATES, not nested here: teams(100) x states(100) is over
// Linear's 10,000-point limit for one query.
export const TEAMS = `
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

/** Every team's workflow states in one flat list. Page with `after` when `hasNextPage`. */
export const WORKFLOW_STATES = `
  query WorkflowStates($after: String) {
    workflowStates(first: 250, after: $after) {
      nodes { ${STATE} team { id } }
      ${PAGE}
    }
  }
`;

export const TEAM_PEOPLE = `
  query TeamPeople($teamId: String!) {
    team(id: $teamId) {
      id
      members(first: 250) { nodes { ${USER} active } }
      labels(first: 250) { nodes { ${LABEL} } }
    }
  }
`;

export const WORKSPACE_LABELS = `
  query WorkspaceLabels {
    issueLabels(first: 250) { nodes { ${LABEL} team { id } } }
  }
`;

export const PROJECTS = `
  query Projects($after: String, $filter: ProjectFilter) {
    projects(first: 100, after: $after, filter: $filter) {
      nodes { ${PROJECT_SUMMARY} }
      ${PAGE}
    }
  }
`;

export const PROJECT_DETAIL = `
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

/** Any issue list: a project, a team, a cycle, triage, my issues. Pass an `IssueFilter`. */
export const ISSUES = `
  query Issues($filter: IssueFilter, $after: String) {
    issues(first: 100, after: $after, filter: $filter) {
      nodes { ${ISSUE_ROW} }
      ${PAGE}
    }
  }
`;

export const ISSUE_DETAIL = `
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

/** Saved views of a team: the strip of tabs above its issues. Pass `customViewsFilter`. */
export const CUSTOM_VIEWS = `
  query CustomViews($filter: CustomViewFilter) {
    customViews(first: 50, filter: $filter) {
      nodes { id name icon color shared team { id } }
    }
  }
`;

/** A saved view's issues, narrowed by an extra filter (the folder's scope). The view applies its own. */
export const CUSTOM_VIEW_ISSUES = `
  query CustomViewIssues($id: String!, $filter: IssueFilter, $after: String) {
    customView(id: $id) {
      issues(first: 100, after: $after, filter: $filter) {
        nodes { ${ISSUE_ROW} }
        ${PAGE}
      }
    }
  }
`;

/** Every sub-issue of the given issues, for the "Show all" nesting. */
export const CHILD_ISSUES = `
  query ChildIssues($ids: [ID!], $after: String) {
    issues(first: 100, after: $after, filter: { parent: { id: { in: $ids } } }) {
      nodes { ${ISSUE_ROW} }
      ${PAGE}
    }
  }
`;

/**
 * Properties Linear shows that cost too much to ask for on every row: releases, customers and the
 * time in the current status. Asked for only when one of those properties is on.
 */
export const ISSUE_EXTRAS = `
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

/** Sub-issues of loaded issues, for the "2/3" progress on each row: only parent and state. */
export const CHILD_STATES = `
  query ChildStates($ids: [ID!], $after: String) {
    issues(first: 250, after: $after, filter: { parent: { id: { in: $ids } } }) {
      nodes { parent { id } state { type } }
      ${PAGE}
    }
  }
`;

/** The Work Status section's counts: only the status of each open issue in scope, 250 a page. */
export const STATUS_COUNTS = `
  query StatusCounts($filter: IssueFilter, $after: String) {
    issues(first: 250, after: $after, filter: $filter) {
      nodes { state { ${STATE} } team { id } }
      ${PAGE}
    }
  }
`;

/** The Work Status section's "my issues": a short row, no labels, relations or attachments. */
export const STATUS_MINE = `
  query StatusMine($filter: IssueFilter) {
    issues(first: 50, filter: $filter) {
      nodes { id identifier title url priority updatedAt state { ${STATE} } team { id key } project { id name } }
      ${PAGE}
    }
  }
`;

/** Several issues by identifier (`ENG-123`). Built per call with one alias per identifier. */
export const issuesByIdentifier = (identifiers: readonly string[]): string => `
  query IssuesByIdentifier {
    ${identifiers.map((id, index) => `i${index}: issue(id: ${JSON.stringify(id)}) { ${ISSUE_ROW} }`).join('\n    ')}
  }
`;

/** A team's cycles from `$minNumber` up: the recent past, the active one and every upcoming one. */
export const TEAM_CYCLES = `
  query TeamCycles($teamId: String!, $minNumber: Float!) {
    team(id: $teamId) {
      id key name
      cycles(first: 25, filter: { number: { gte: $minNumber } }) { nodes { ${CYCLE_SUMMARY} } }
    }
  }
`;

/** A cycle's description. Its burn-up is built from the cycle's issues: Linear's own daily history is one nightly snapshot. */
export const CYCLE_DETAIL = `
  query CycleDetail($id: String!) {
    cycle(id: $id) { ${CYCLE_SUMMARY} description }
  }
`;

export const NOTIFICATIONS = `
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

/** Merge and pull requests linked to Linear issues whose url contains a repository path. */
export const REPO_ATTACHMENTS = `
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`;

export const SEARCH_ISSUES = `
  query SearchIssues($term: String!, $filter: IssueFilter) {
    searchIssues(term: $term, first: 20, filter: $filter) { nodes { ${ISSUE_ROW} } }
  }
`;

export const SEARCH_PROJECTS = `
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { ${PROJECT_SUMMARY} } }
  }
`;

export const SEARCH_DOCUMENTS = `
  query SearchDocuments($term: String!) {
    searchDocuments(term: $term, first: 20) { nodes { id title url updatedAt project { id name } } }
  }
`;

export const DOCUMENTS = `
  query Documents($filter: DocumentFilter) {
    documents(first: 100, filter: $filter) { nodes { id title url updatedAt project { id name } } }
  }
`;

export const DOCUMENT = `
  query Document($id: String!) {
    document(id: $id) { id title content url updatedAt project { id name } creator { ${USER} } }
  }
`;

// Writes. Each runs only from a user's click.

export const ISSUE_UPDATE = `
  mutation IssueUpdate($id: String!, $input: IssueUpdateInput!) {
    issueUpdate(id: $id, input: $input) { success issue { ${ISSUE_ROW} } }
  }
`;

export const ISSUE_CREATE = `
  mutation IssueCreate($input: IssueCreateInput!) {
    issueCreate(input: $input) { success issue { ${ISSUE_ROW} } }
  }
`;

export const COMMENT_CREATE = `
  mutation CommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id body createdAt url user { ${USER} } } }
  }
`;

export const PROJECT_UPDATE_CREATE = `
  mutation ProjectUpdateCreate($input: ProjectUpdateCreateInput!) {
    projectUpdateCreate(input: $input) { success projectUpdate { id body health createdAt url user { ${USER} } } }
  }
`;

export const NOTIFICATION_MARK_READ = `
  mutation NotificationMarkRead($id: String!, $readAt: DateTime!) {
    notificationUpdate(id: $id, input: { readAt: $readAt }) { success }
  }
`;

export const NOTIFICATION_MARK_ALL_READ = `
  mutation NotificationMarkAllRead($input: NotificationEntityInput!, $readAt: DateTime!) {
    notificationMarkReadAll(input: $input, readAt: $readAt) { success }
  }
`;

/** Marks several notifications read in one request, one alias per notification. */
export const markReadMany = (ids: readonly string[]): string => `
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${ids.map((id, index) => `n${index}: notificationUpdate(id: ${JSON.stringify(id)}, input: { readAt: $readAt }) { success }`).join('\n    ')}
  }
`;

/** Every static document, for validation. */
export const ALL_DOCUMENTS: Record<string, string> = {
  VIEWER, TEAMS, WORKFLOW_STATES, TEAM_PEOPLE, WORKSPACE_LABELS, PROJECTS, PROJECT_DETAIL, ISSUES, CHILD_STATES, CHILD_ISSUES, ISSUE_EXTRAS, ISSUE_DETAIL,
  STATUS_COUNTS, STATUS_MINE,
  ISSUES_BY_IDENTIFIER: issuesByIdentifier(['ENG-1', 'ENG-2']),
  TEAM_CYCLES, CYCLE_DETAIL, CUSTOM_VIEWS, CUSTOM_VIEW_ISSUES, NOTIFICATIONS, REPO_ATTACHMENTS, SEARCH_ISSUES, SEARCH_PROJECTS, SEARCH_DOCUMENTS, DOCUMENTS, DOCUMENT,
  ISSUE_UPDATE, ISSUE_CREATE, COMMENT_CREATE, PROJECT_UPDATE_CREATE, NOTIFICATION_MARK_READ, NOTIFICATION_MARK_ALL_READ,
  NOTIFICATIONS_MARK_READ: markReadMany(['n1', 'n2']),
};
