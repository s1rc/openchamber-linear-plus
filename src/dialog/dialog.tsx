// The host's dialog for this extension. What it shows depends on how it was opened:
//   a Create Linear issue action   -> the create form, drafted by the Small Model
//   Comment on Linear issue        -> the comment form for the session's issue
//   a project or document chip     -> what is attached
//   the + menu                     -> tabs: Create issue, Attach
import type { GuestItem, HostReadyContext } from '@openchamber/sdk';
import { useMemo, useState } from 'preact/hooks';
import { host } from '../shared/host.ts';
import { Banner, Empty, Spinner, Tabs } from '../shared/kit.tsx';
import { LinearError } from '../shared/linear.ts';
import { knownProject } from '../shared/projects.ts';
import { useDetection } from '../shared/use-detection.ts';
import { useWorkspace } from '../shared/workspace.ts';
import { AttachedView, AttachView } from './attach-view.tsx';
import { CommentView } from './comment-view.tsx';
import { CreateView } from './create-view.tsx';
import { jobFor } from './jobs.ts';
import { createScope } from './scope.ts';

const itemKey = (item: GuestItem | null): string => {
  if (!item) return 'none';
  if (!('kind' in item) || !('action' in item)) return `chip:${(item as { id?: string }).id ?? ''}`;
  return `${item.kind}:${item.action}:${'messageId' in item ? item.messageId : 'sessionId' in item ? item.sessionId : 'path' in item ? `${item.path}` : ''}`;
};

// With no session open (New worktree, or a chat that has not started) there is nothing to link a new issue to,
// and picking an issue to attach is what the dialog is for, so Attach leads.
const PlusView = ({ scope, projectIds, teamIds, hasSession }: { scope: ReturnType<typeof createScope>; projectIds: string[]; teamIds: string[]; hasSession: boolean }) => {
  const [tab, setTab] = useState<'create' | 'attach'>(hasSession ? 'create' : 'attach');
  return (
    <div class="lin-dialog-body">
      <Tabs
        items={[{ id: 'create', label: 'Create issue' }, { id: 'attach', label: 'Attach' }]}
        activeId={tab}
        onChange={(id) => setTab(id as 'create' | 'attach')}
      />
      <CreateView job={null} scope={scope} hidden={tab !== 'create'} />
      {tab === 'attach' && <AttachView scope={scope} projectIds={projectIds} teamIds={teamIds} />}
    </div>
  );
};

export const Dialog = ({ ctx }: { ctx: HostReadyContext }) => {
  const workspace = useWorkspace();
  const state = useDetection(ctx.directory, workspace.data);
  const item = ctx.item;
  const key = itemKey(item);
  const job = useMemo(
    () => jobFor(item, {
      readFile: (path) => host.readFile(path).then((result) => result?.content ?? null, () => null),
      sessionTitle: ctx.session?.title ?? null,
    }),
    [key],
  );

  if (workspace.error && !workspace.data) {
    const error = workspace.error instanceof LinearError ? workspace.error : new LinearError('network', String(workspace.error));
    if (error.kind === 'disconnected') {
      return (
        <div class="lin-dialog">
          <Empty title="Connect Linear" body="Sign in to Linear in OpenChamber, then open this again." action={{ label: 'Connect Linear', onClick: () => { void host.oauthStart(); } }} />
        </div>
      );
    }
    return (
      <div class="lin-dialog">
        <Banner tone="error" title="Could not load Linear" body={error.message} action={{ label: 'Retry', onClick: () => workspace.refresh() }} />
      </div>
    );
  }
  if (!workspace.data || !state.settled) return <div class="lin-center"><Spinner label="Loading Linear" /></div>;

  const scope = createScope({
    teamIds: state.detection.teamIds,
    projectIds: state.detection.projectIds,
    activeId: state.detection.mapping?.activeProjectId,
    teamsOfProject: (id) => knownProject(id)?.teams.nodes.map((t) => t.id) ?? [],
  });

  let view;
  if (job) view = <CreateView key={job.key} job={job} scope={scope} />;
  else if (item && 'kind' in item && item.kind === 'message' && item.action === 'comment-on-issue') view = <CommentView key={key} item={item} directory={ctx.directory} />;
  else if (item && 'providerId' in item) view = <AttachedView item={item} />;
  else view = <PlusView scope={scope} projectIds={state.detection.projectIds} teamIds={state.detection.teamIds} hasSession={Boolean(ctx.session)} />;
  return <div class="lin-dialog">{view}</div>;
};
