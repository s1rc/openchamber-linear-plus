// The options of Start build: which planning session it builds from, and whether the issue moves. Shared by
// the LinearIssue block and the dashboard's issue view. Nothing is written until the Start build click.
import { toast } from '@openchamber-ext/shared-ui';
import { useEffect, useState } from 'preact/hooks';
import { invalidate } from './cache.ts';
import { findBuildSource, previewPlan, type PlanPreview } from './handoff.ts';
import { planExcerpt, type BuildSource } from './handoff-rules.ts';
import { host } from './host.ts';
import { Banner, Button, Spinner, Switch } from './kit.tsx';
import { ModelPick } from './model-pick.tsx';
import { MoveRow, useMoveChoice } from './move-row.tsx';
import { gql } from './linear.ts';
import { ISSUE_DETAIL } from './queries.ts';
import { startBuildFor, writePlan } from './start-build.ts';
import { openStartedSession } from './start-session.ts';
import { getStartMoves, getStartState, setStartState } from './storage.ts';
import type { IssueDetail, IssueDetailResult } from './types.ts';

const failureText = (error: unknown) => (error instanceof Error ? error.message : String(error));
const folderName = (directory: string) => directory.replace(/\/+$/, '').split('/').pop() || directory;

type Props = {
  identifier: string;
  source: BuildSource;
  /** The issue as the dashboard already holds it; the block reads it. */
  detail?: IssueDetail;
  onClose: () => void;
  /** Called after the build started and its session opened. */
  onDone?: () => void;
  /** In the dialog: show the whole plan and let it take the room the frame has, with the controls below it. */
  fill?: boolean;
};

export const BuildPanel = ({ identifier, source, detail: given, onClose, onDone, fill }: Props) => {
  const [detail, setDetail] = useState<IssueDetail | null>(given ?? null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [allowMove, setAllowMove] = useState(true);
  const [lastState, setLastState] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  // The plan the build would start from, read when the panel opens, and whether to post it to the issue first.
  const [preview, setPreview] = useState<PlanPreview | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [post, setPost] = useState(false);
  const [added, setAdded] = useState(false);
  const [force, setForce] = useState(false);
  const choice = useMoveChoice('build', detail, lastState, allowMove);
  const [model, setModel] = useState('');

  useEffect(() => {
    let live = true;
    setPreview(null);
    setPreviewError(null);
    void previewPlan({ source, identifier }).then(
      (read) => { if (live) { setPreview(read); setPost(read.postPlan); } },
      (failure: unknown) => { if (live) setPreviewError(failureText(failure)); },
    );
    return () => { live = false; };
  }, [identifier, source.sessionId]);

  useEffect(() => {
    let live = true;
    void Promise.all([
      given ? Promise.resolve(given) : gql<IssueDetailResult>(ISSUE_DETAIL, { id: identifier }).then((data) => data.issue),
      getStartMoves().catch(() => true),
    ]).then(
      ([issue, moves]) => {
        if (!live) return;
        setDetail(issue);
        setAllowMove(moves);
        void getStartState(issue.team.id).then((name) => { if (live) setLastState(name); }, () => undefined);
      },
      (failure: unknown) => { if (live) setLoadError(failureText(failure)); },
    );
    return () => { live = false; };
  }, [identifier, given]);

  if (done) return <div class="lin-build" data-state="started"><div class="sui-small">{done}</div></div>;
  if (loadError) return <Banner tone="error" title="Could not read the issue" body={loadError} action={{ label: 'Close', onClick: onClose }} />;
  if (!detail) return <Spinner label="Reading the issue" />;


  const addOnly = async () => {
    setBusy(true);
    setError(null);
    try {
      await writePlan(detail, source, force);
      invalidate('issue');
      await toast(host, 'success', `Added the plan to ${detail.identifier}.`);
      setAdded(true);
    } catch (failure) {
      setError(failureText(failure));
    } finally {
      setBusy(false);
    }
  };

  const start = async () => {
    setBusy(true);
    setError(null);
    try {
      const outcome = await startBuildFor(detail, source, { move: choice.move, post: post && Boolean(preview), force, state: choice.selected, lastState, ...(model ? { model } : {}) });
      if (outcome.moved && outcome.target) void setStartState(detail.team.id, outcome.target.name).catch(() => undefined);
      if (outcome.moveError) await toast(host, 'error', `Build started, but ${detail.identifier} was not moved: ${outcome.moveError}`);
      const text = `${outcome.posted ? 'Added the plan to the issue and started' : 'Started'} a build for ${detail.identifier}${outcome.moved ? ` and moved it to ${outcome.target!.name}` : ''}.`;
      await toast(host, 'success', text);
      setDone(text);
      if (outcome.moved) invalidate('block:');
      await openStartedSession(outcome.sessionId);
      onDone?.();
    } catch (failure) {
      setError(failureText(failure));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div class={fill ? 'lin-build lin-build--fill' : 'lin-build'} data-state="options">
      <div class="sui-small">
        Builds from the last reply in <strong>{source.title}</strong>{source.agent ? ` (${source.agent} agent)` : ''}, in {folderName(source.directory)}, {preview?.lead ? 'as a session that lead starts under it' : 'as a new session'}.
        It uses the build agent from Settings, on the model below.
      </div>
      {previewError && <Banner tone="warning" title="The plan cannot be read yet" body={previewError} />}
      {preview && !preview.isPlan && (
        <Banner
          tone="warning"
          title="The last reply is not a plan"
          body={'Ask the planning session: "Repeat the final plan in full, unchanged, as your last message. No question cards." Then reopen this. Writing or building from a chat answer would put the wrong text in the issue and the build.'}
          action={force ? undefined : { label: 'Use it anyway', onClick: () => setForce(true) }}
        />
      )}
      {preview?.earlier && <div class="sui-muted sui-small">The last reply in that session is not the plan, so this is the latest reply that was.</div>}
      {preview && <pre class="lin-build-plan">{fill ? preview.plan.trim() : planExcerpt(preview.plan)}</pre>}
      {error && <Banner tone="error" title="Could not start the build" body={error} />}
      <Switch
        label="Add the plan to the issue description first"
        description={post ? `A plan section at the end of ${detail.identifier}'s description, replaced if one is already there. Then the build starts.` : undefined}
        checked={post && Boolean(preview)}
        disabled={!preview || busy}
        onChange={setPost}
      />
      <MoveRow choice={choice} disabled={busy} />
      <ModelPick role="build" directory={source.directory} value={model} onChange={setModel} disabled={busy} />
      <div class="sui-row">
        <Button label={busy ? 'Starting...' : post && preview ? 'Add plan and build' : 'Start build'} size="sm" disabled={busy || !preview || (!preview.isPlan && !force)} onClick={() => { void start(); }} />
        <Button label={added ? 'Plan added' : 'Add plan only'} variant="outline" size="sm" disabled={busy || !preview || (!preview.isPlan && !force)} onClick={() => { void addOnly(); }} />
        <Button label="Cancel" variant="ghost" size="sm" disabled={busy} onClick={onClose} />
      </div>
    </div>
  );
};

/** A build source for an issue, found once when the frame draws it. Null until found, and when there is none. */
export const useBuildSource = (directory: string | null, identifier: string): BuildSource | null => {
  const [source, setSource] = useState<BuildSource | null>(null);
  useEffect(() => {
    let live = true;
    setSource(null);
    if (!directory) return undefined;
    void findBuildSource(directory, identifier).then((found) => { if (live) setSource(found); });
    return () => { live = false; };
  }, [directory, identifier]);
  return source;
};
