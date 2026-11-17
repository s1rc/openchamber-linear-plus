// Where a new issue goes by default: the folder's active team or project.

export type Scope = { teamIds: string[]; projectId: string | null };

type Input = {
  teamIds: readonly string[];
  projectIds: readonly string[];
  /** The mapping's active team or project id, or 'all'. */
  activeId: string | null | undefined;
  /** The ids of the teams a project belongs to. */
  teamsOfProject: (projectId: string) => readonly string[];
};

/** Teams to offer first (the active one leading) and the project to preselect, when one is clear. */
export const createScope = ({ teamIds, projectIds, activeId, teamsOfProject }: Input): Scope => {
  const activeProject = activeId && projectIds.includes(activeId) ? activeId : projectIds.length === 1 ? projectIds[0]! : null;
  const ordered: string[] = [];
  const add = (id: string) => { if (!ordered.includes(id)) ordered.push(id); };
  if (activeId && teamIds.includes(activeId)) add(activeId);
  if (activeProject) for (const id of teamsOfProject(activeProject)) add(id);
  for (const id of teamIds) add(id);
  for (const projectId of projectIds) for (const id of teamsOfProject(projectId)) add(id);
  // A folder mapped to teams only has no project; a project is preselected only when it is the clear choice.
  return { teamIds: ordered, projectId: activeId && teamIds.includes(activeId) ? null : activeProject };
};
