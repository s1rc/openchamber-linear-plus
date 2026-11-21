export type View =
  | 'inbox'
  | 'my-issues'
  | 'project'
  | 'project-issues'
  | 'project-board'
  | 'projects'
  | 'cycles'
  | 'team-home'
  | 'team-issues'
  | 'team-projects'
  | 'team-views'
  | 'triage'
  | 'project-detail'
  | 'settings'
  | 'picker';

/** `projectId` opens one project from a team's overview. */
export type Route = { view: View; teamId?: string; projectId?: string };

/** Views remembered as the last view for a folder. */
export const REMEMBERED: readonly View[] = ['inbox', 'my-issues', 'project', 'project-issues', 'project-board', 'projects', 'cycles'];

/** Views that belong to one team (`teamId` set). */
export const TEAM_VIEWS: readonly View[] = ['team-home', 'triage', 'team-issues', 'team-projects', 'team-views'];

export const PROJECT_VIEWS: readonly View[] = ['project', 'project-issues', 'project-board'];

export const TITLES: Record<View, string> = {
  inbox: 'Inbox',
  'my-issues': 'My issues',
  project: 'Overview',
  'project-issues': 'Issues',
  'project-board': 'Board',
  projects: 'Projects',
  cycles: 'Cycles',
  'team-home': 'Home',
  'team-issues': 'Issues',
  'team-projects': 'Projects',
  'team-views': 'Views',
  triage: 'Triage',
  'project-detail': 'Project',
  settings: 'Settings',
  picker: 'Pick team or projects',
};

/** One id per route, for nav selection and the panel's view picker. */
export const routeId = (route: Route): string => (route.teamId ? `${route.view}:${route.teamId}` : route.view);

export const parseRouteId = (id: string): Route => {
  const [view, teamId] = id.split(':') as [View, string | undefined];
  return teamId ? { view, teamId } : { view };
};
