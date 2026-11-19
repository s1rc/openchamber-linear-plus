// Runs detection for the open folder through the real host, and saves or clears its mapping.
import { toast } from '@openchamber-ext/shared-ui';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { detect, NO_DETECTION, resolvePlace, type DetectEnv, type Detection, type Place } from './detect.ts';
import { host } from './host.ts';
import { gql } from './linear.ts';
import { fetchProjectsByIds, knownProject, searchProjects } from './projects.ts';
import { issuesByIdentifier, REPO_ATTACHMENTS } from './queries.ts';
import { deleteMapping, getMapping, getRepo, setMapping, setRepo, type Mapping } from './storage.ts';
import type { IssueRow, IssuesByIdentifierResult, RepoAttachmentsResult } from './types.ts';
import type { Workspace } from './workspace.ts';

const ID_SHAPE = /^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/;

export const hostEnv: DetectEnv = {
  listProjects: () => host.listProjects(),
  listWorktrees: (projectId) => host.listWorktrees(projectId),
  listSessions: (projectId) => host.listSessions(projectId),
  readFile: (path) => host.readFile(path).then((result) => result?.content ?? null, () => null),
  getMapping,
  getRepo,
  setRepo,
  issuesByIdentifier: async (identifiers) => {
    const ids = identifiers.filter((id) => ID_SHAPE.test(id));
    if (!ids.length) return [];
    const data = await gql<IssuesByIdentifierResult>(issuesByIdentifier(ids));
    return Object.values(data).filter((issue): issue is IssueRow => Boolean(issue));
  },
  repoAttachments: async (url) => (await gql<RepoAttachmentsResult>(REPO_ATTACHMENTS, { url })).attachments.nodes,
  searchProjects,
  projectsByIds: fetchProjectsByIds,
};

/** What Settings can change on a saved mapping. */
export type MappingPatch = Partial<Pick<Mapping, 'finishComments' | 'buildAgent' | 'buildModel' | 'planAgent' | 'planModel' | 'postPlan' | 'reviewMode' | 'aiReviewers'>>;

export type DetectionState = {
  place: Place | null;
  detection: Detection;
  /** False until the first detection for this folder finishes. */
  settled: boolean;
  /** The folder has a team or a project, saved or detected. */
  mapped: boolean;
  refresh: () => void;
  /** Resolves true when the mapping was stored. */
  save: (teamIds: string[], projectIds: string[]) => Promise<boolean>;
  pin: () => Promise<void>;
  clear: () => Promise<void>;
  setActive: (id: string) => void;
  /** Changes a saved mapping's finish-comments or build settings. False when the folder has no saved mapping. */
  update: (patch: MappingPatch) => Promise<boolean>;
};

export const entityName = (workspace: Workspace, id: string): string =>
  workspace.teamsById.get(id)?.name ?? knownProject(id)?.name ?? 'Unknown';

export const useDetection = (directory: string | null, workspace: Workspace | undefined): DetectionState => {
  const [place, setPlace] = useState<Place | null>(null);
  const [detection, setDetection] = useState<Detection>(NO_DETECTION);
  const [settled, setSettled] = useState(false);
  const [tick, setTick] = useState(0);
  const run = useRef(0);

  useEffect(() => { setSettled(false); }, [directory]);

  useEffect(() => {
    if (!workspace) return;
    const id = ++run.current;
    if (!directory) {
      setPlace(null);
      setDetection(NO_DETECTION);
      setSettled(true);
      return;
    }
    void (async () => {
      const nextPlace = await resolvePlace(hostEnv, directory);
      const next = await detect(hostEnv, nextPlace, workspace.teams).catch(() => NO_DETECTION);
      if (id !== run.current) return;
      // Ids that no longer exist in Linear (an archived team or project) drop out quietly.
      const teamIds = next.teamIds.filter((t) => workspace.teamsById.has(t));
      const found = next.projectIds.length ? await fetchProjectsByIds(next.projectIds).catch(() => []) : [];
      const projectIds = next.projectIds.filter((p) => found.some((f) => f.id === p));
      if (id !== run.current) return;
      setPlace(nextPlace);
      setDetection({ ...next, teamIds, projectIds });
      setSettled(true);
    })();
  }, [directory, workspace, tick]);

  const refresh = useCallback(() => setTick((n) => n + 1), []);

  const save = useCallback(async (teamIds: string[], projectIds: string[]): Promise<boolean> => {
    if (!place) return false;
    const ids = [...teamIds, ...projectIds];
    const previous = detection.mapping?.activeProjectId;
    const mapping: Mapping = {
      directory: place.projectDirectory,
      linearProjectIds: projectIds,
      teamIds,
      activeProjectId: ids.length === 1 ? ids[0]! : previous && ids.includes(previous) ? previous : (ids[0] ?? 'all'),
      finishComments: detection.mapping?.finishComments ?? 'off',
      updatedAt: Date.now(),
    };
    // Apply it now either way; a failed save only means it will not survive a reload.
    setDetection((d) => ({ ...d, source: 'mapping', inferred: false, evidence: 'saved for this folder', teamIds, projectIds, mapping }));
    const saved = await setMapping(place.key, mapping);
    if (!saved) await toast(host, 'error', "Could not save this folder's choice. It applies until you reload.");
    return saved;
  }, [place, detection]);

  const pin = useCallback(async () => {
    if (!(await save(detection.teamIds, detection.projectIds))) return;
    const names = workspace ? [...detection.teamIds, ...detection.projectIds].map((id) => entityName(workspace, id)).join(', ') : '';
    await toast(host, 'success', names ? `Pinned ${names} to this folder` : 'Pinned to this folder');
  }, [save, detection, workspace]);

  const clear = useCallback(async () => {
    if (!place) return;
    await deleteMapping(place.key);
    refresh();
  }, [place, refresh]);

  const setActive = useCallback((id: string) => {
    if (!place || !detection.mapping) return;
    const mapping = { ...detection.mapping, activeProjectId: id, updatedAt: Date.now() };
    setDetection((d) => ({ ...d, mapping }));
    void setMapping(place.key, mapping);
  }, [place, detection]);

  const update = useCallback(async (patch: MappingPatch): Promise<boolean> => {
    if (!place || !detection.mapping) return false;
    const mapping = { ...detection.mapping, ...patch, updatedAt: Date.now() };
    setDetection((d) => ({ ...d, mapping }));
    const saved = await setMapping(place.key, mapping);
    if (!saved) await toast(host, 'error', 'Could not save the setting. It applies until you reload.');
    return saved;
  }, [place, detection]);

  const mapped = detection.teamIds.length + detection.projectIds.length > 0;
  return { place, detection, settled, mapped, refresh, save, pin, clear, setActive, update };
};
