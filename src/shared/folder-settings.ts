// Settings a folder can set for itself or leave to the one for every folder. Pure; the frames and the service share it.

type FinishComments = 'off' | 'draft';

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
