// Settings for what the service does with no window open: agent instructions and `@` rows (the optional
// API key), finish-comment drafts, and the agent and model of the plan and build sessions.
import { KV, Section } from '@openchamber-ext/shared-ui/preact';
import { api } from '@openchamber-ext/shared-ui';
import { useEffect, useState } from 'preact/hooks';
import { useQuery } from '../../shared/cache.ts';
import { fetchChoices } from '../../shared/choices.ts';
import { DEFAULT_ID, withSaved } from '../../shared/choices-rules.ts';
import { DraftRow } from '../../shared/draft-row.tsx';
import { fetchDrafts } from '../../shared/drafts.ts';
import { rowKey } from '../../shared/handoff-rules.ts';
import { host } from '../../shared/host.ts';
import { Banner, Button, Select, Spinner, Switch, TextField } from '../../shared/kit.tsx';
import type { FinishComments } from '../../shared/storage.ts';
import type { DetectionState } from '../../shared/use-detection.ts';

type ServiceState = { reachable: boolean; hasKey: boolean };

const readService = async (): Promise<ServiceState> => {
  const reply = await api(host, 'GET', '/config', { name: 'Linear' });
  return reply.ok === false ? { reachable: false, hasKey: false } : { reachable: true, hasKey: reply.hasKey === true };
};

const FINISH_OPTIONS = [
  { id: 'off', label: 'Off' },
  { id: 'draft', label: 'Draft a summary comment' },
];

type Role = 'plan' | 'build';
const COPY = {
  plan: { agent: 'Plan agent', model: 'Plan model', agentDefault: 'Plan (default)', example: 'plan' },
  build: { agent: 'Build agent', model: 'Build model', agentDefault: 'Build (default)', example: 'build' },
} as const;
const keys = (role: Role) => (role === 'plan' ? ({ agent: 'planAgent', model: 'planModel' } as const) : ({ agent: 'buildAgent', model: 'buildModel' } as const));

const TypedFields = ({ state, role }: { state: DetectionState; role: Role }) => {
  const mapping = state.detection.mapping;
  const k = keys(role);
  const [agent, setAgent] = useState(mapping?.[k.agent] ?? '');
  const [model, setModel] = useState(mapping?.[k.model] ?? '');
  const [saved, setSaved] = useState(false);
  useEffect(() => { setAgent(mapping?.[k.agent] ?? ''); setModel(mapping?.[k.model] ?? ''); }, [mapping?.[k.agent], mapping?.[k.model]]);
  const badModel = model.trim() !== '' && !/^[^\s/]+\/\S+$/.test(model.trim());
  const dirty = agent.trim() !== (mapping?.[k.agent] ?? '') || model.trim() !== (mapping?.[k.model] ?? '');
  return (
    <>
      <div class="sui-muted sui-small">The list of agents and models could not be read, so write them out.</div>
      <TextField label={COPY[role].agent} value={agent} onChange={(v) => { setAgent(v); setSaved(false); }} placeholder={COPY[role].example} disabled={!mapping} mono />
      <TextField
        label={COPY[role].model}
        value={model}
        onChange={(v) => { setModel(v); setSaved(false); }}
        placeholder="provider/model, empty for the default"
        disabled={!mapping}
        mono
        {...(badModel ? { error: 'Write it as provider/model, for example fireworks-ai/accounts/fireworks/models/kimi-k3.' } : {})}
      />
      <div class="sui-row">
        <Button label="Save" size="sm" disabled={!mapping || !dirty || badModel} onClick={() => { void state.update({ [k.agent]: agent.trim(), [k.model]: model.trim() }).then((ok) => setSaved(ok)); }} />
        {saved && <span class="sui-small sui-muted">Saved</span>}
      </div>
    </>
  );
};

/** Pick an agent and a model from what OpenCode offers; a pick is saved at once. */
const AgentModelFields = ({ state, role }: { state: DetectionState; role: Role }) => {
  const mapping = state.detection.mapping;
  const directory = state.place?.directory ?? null;
  const choices = useQuery(`settings:choices:${directory ?? ''}`, () => fetchChoices(directory));
  if (choices.loading && choices.data === undefined) return <Spinner size="sm" label="Reading agents and models" />;
  if (!choices.data) return <TypedFields state={state} role={role} />;
  const k = keys(role);
  const agents = withSaved(choices.data.agents, mapping?.[k.agent], COPY[role].agentDefault);
  const models = withSaved(choices.data.models, mapping?.[k.model], choices.data.defaultModel ? 'Your default model' : 'The host default');
  return (
    <>
      <Select
        label={COPY[role].agent}
        value={mapping?.[k.agent]?.trim() || DEFAULT_ID}
        options={agents}
        disabled={!mapping}
        onChange={(id) => { void state.update({ [k.agent]: id === DEFAULT_ID ? '' : id }); }}
      />
      <Select
        label={COPY[role].model}
        value={mapping?.[k.model]?.trim() || DEFAULT_ID}
        options={models}
        disabled={!mapping}
        searchable
        searchPlaceholder="Search models"
        onChange={(id) => { void state.update({ [k.model]: id === DEFAULT_ID ? '' : id }); }}
      />
    </>
  );
};

const REVIEW_OPTIONS = [
  { id: 'off', label: 'Stop when the code is done' },
  { id: 'mr', label: 'My usual commit, push and merge request options, then AI review' },
  { id: 'auto', label: 'Commit, push, open the merge request and handle AI review by itself' },
];

/** What the build session does after the code: the merge request, the pipeline and the AI reviewers' comments. */
const ReviewFields = ({ state }: { state: DetectionState }) => {
  const mapping = state.detection.mapping;
  const mode = mapping?.reviewMode ?? 'off';
  const [reviewers, setReviewers] = useState(mapping?.aiReviewers ?? '');
  useEffect(() => { setReviewers(mapping?.aiReviewers ?? ''); }, [mapping?.aiReviewers]);
  return (
    <>
      <Select
        label="After the build"
        value={mode}
        options={REVIEW_OPTIONS}
        disabled={!mapping}
        onChange={(id) => { void state.update({ reviewMode: id === 'off' ? undefined : (id as 'mr' | 'auto') }); }}
      />
      <div class="sui-muted sui-small">
        {mode === 'off'
          ? 'The build ends when the code is written and tested.'
          : `${mode === 'auto' ? 'The build commits, pushes and opens the merge request without asking, assigned to you. ' : 'The build shows its usual commit, push and merge request options and waits for your choice. '}Then it watches the pipeline and fixes AI review comments, and replies to or resolves only the threads the AI reviewers started. It never touches other people's threads and never merges. If a comment needs your decision it asks, and after your answer it checks for new AI comments again before finishing. Choosing this is your permission for those pushes and replies.`}
      </div>
      {mode !== 'off' && (
        <>
          <TextField
            label="AI reviewers"
            value={reviewers}
            onChange={setReviewers}
            placeholder="CodeRabbit"
            helper="Names, separated by commas. Empty means CodeRabbit."
            disabled={!mapping}
          />
          <div class="sui-row">
            <Button label="Save reviewers" size="sm" disabled={!mapping || reviewers.trim() === (mapping?.aiReviewers ?? '')} onClick={() => { void state.update({ aiReviewers: reviewers.trim() }); }} />
          </div>
        </>
      )}
    </>
  );
};

export const AgentSettings = ({ state }: { state: DetectionState }) => {
  const service = useQuery('settings:service', readService);
  const directory = state.place?.directory ?? null;
  const drafts = useQuery(directory ? `settings:drafts:${directory}` : null, () => fetchDrafts(directory!));
  const [handled, setHandled] = useState<ReadonlySet<string>>(new Set());
  const mapping = state.detection.mapping;
  const waiting = (drafts.data ?? []).filter((d) => !handled.has(rowKey(d)));

  return (
    <>
      <Section title="Agent context">
        <KV items={[['Personal API key', service.data ? (service.data.hasKey ? 'Set' : 'Not set') : '...']]} />
        {service.data && !service.data.reachable && (
          <Banner tone="warning" title="The Linear service is not running" body="Approve the Linear extension in Settings, Extensions. Until then agents get no Linear context and the @ menu has no Linear rows." />
        )}
        {service.data?.reachable && !service.data.hasKey && (
          <div class="sui-muted sui-small">
            Without a key, agent instructions and the @ menu use what this dashboard last showed. Add a Linear personal API key in Settings, Integrations, to keep them current while the dashboard is closed. The key is optional and is only read by the service.
          </div>
        )}
      </Section>
      <Section title="Finish comments">
        <Select
          value={mapping?.finishComments ?? 'off'}
          options={FINISH_OPTIONS}
          disabled={!mapping}
          onChange={(id) => { void state.update({ finishComments: id as FinishComments }); }}
        />
        <div class="sui-muted sui-small">
          {mapping
            ? 'When an agent finishes a turn in a session linked to a Linear issue in this folder, a summary is kept as a draft in the Work Status section. Nothing is posted until you click Post.'
            : 'Pin this folder to a team or project first.'}
        </div>
        {waiting.length === 0 ? (
          <div class="sui-muted sui-small">No drafts waiting.</div>
        ) : (
          waiting.map((draft) => (
            <DraftRow key={draft.id} draft={draft} onDone={() => { setHandled((set) => new Set(set).add(rowKey(draft))); drafts.refresh(); }} />
          ))
        )}
      </Section>
      <Section title="Start plan">
        <div class="sui-muted sui-small">
          Start plan makes the issue's worktree and starts a planning session in it with this agent and model. The session plans and stops: it changes no files.
        </div>
        <AgentModelFields state={state} role="plan" />
        {!mapping && <div class="sui-muted sui-small">Pin this folder to a team or project first.</div>}
      </Section>
      <Section title="Start build">
        <div class="sui-muted sui-small">
          Start build begins a new session in the same worktree with the plan from the planning session. Pick the agent and model it uses here, or leave both on the default.
        </div>
        <AgentModelFields state={state} role="build" />
        <ReviewFields state={state} />
        <Switch
          label="Add the plan to the issue description when I click Start build"
          description="Adds the plan to the end of the issue's description, then starts the build. A plan added before is replaced, and the rest of the description is kept. Written only on that click, and you can still turn it off for one build."
          checked={mapping?.postPlan === true}
          disabled={!mapping}
          onChange={(on) => { void state.update({ postPlan: on }); }}
        />
        {!mapping && <div class="sui-muted sui-small">Pin this folder to a team or project first.</div>}
      </Section>
    </>
  );
};
