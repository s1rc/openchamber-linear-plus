// Settings a folder can set for itself or leave to the one for every folder. Pure; the frames and the service share it.

type FinishComments = 'off' | 'draft';
type ReviewMode = 'off' | 'mr' | 'auto';

/** Reviewers saved for every folder: an enabled review with an empty field explicitly keeps the CodeRabbit default. */
export const savedAllFolderReviewers = (mode: ReviewMode, reviewers: string): string | undefined =>
  mode === 'off' ? undefined : reviewers.trim() || 'CodeRabbit';

/**
 * A folder's own finish-comments choice, or undefined when it follows every folder's. Every mapping stores
 * `finishComments` ('off' when nobody picked), so an 'off' is the folder's own only with `finishSet`; a 'draft' was
 * always picked.
 */
export const folderFinish = (folder: { finishComments?: FinishComments; finishSet?: boolean } | undefined): FinishComments | undefined =>
  folder?.finishComments === 'draft' || (folder?.finishSet && folder.finishComments === 'off') ? folder.finishComments : undefined;

/** Finish comments here: the folder's own choice, else every folder's, else off. */
export const finishChoice = (
  folder: { finishComments?: FinishComments; finishSet?: boolean } | undefined,
  defaults: { finishComments?: FinishComments } | undefined,
): FinishComments => folderFinish(folder) ?? defaults?.finishComments ?? 'off';

/** Whether Start build adds the plan to the description first: the folder's own choice, else every folder's, else no. */
export const postPlanChoice = (folder: { postPlan?: boolean } | undefined, defaults: { postPlan?: boolean } | undefined): boolean =>
  folder?.postPlan ?? defaults?.postPlan ?? false;

/** The fields a folder's mapping needs; its own settings ride along. */
type MappingLike = {
  directory: string;
  teamIds: string[];
  linearProjectIds: string[];
  activeProjectId: string;
  finishComments: FinishComments;
  updatedAt: number;
};

/**
 * A folder's mapping with new teams and projects. Its own settings (agents, models, the build's last steps, finish
 * comments, add the plan) are kept: picking other teams is no reason to lose them. The active project stays when it
 * is still picked.
 */
export const withTargets = <M extends MappingLike>(previous: M | null | undefined, directory: string, teamIds: string[], projectIds: string[], now: number): M => {
  const ids = [...teamIds, ...projectIds];
  const active = previous?.activeProjectId;
  return {
    ...(previous ?? {}),
    directory,
    linearProjectIds: projectIds,
    teamIds,
    activeProjectId: ids.length === 1 ? ids[0]! : active && ids.includes(active) ? active : (ids[0] ?? 'all'),
    finishComments: previous?.finishComments ?? 'off',
    updatedAt: now,
  } as M;
};
