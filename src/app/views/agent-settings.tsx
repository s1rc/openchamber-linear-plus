// Settings for what the service does with no window open: agent instructions and `@` rows (the optional
// API key), finish-comment drafts, and the agent and model of the plan and build sessions.
import { KV, Section } from '@openchamber-ext/shared-ui/preact';
import { api } from '@openchamber-ext/shared-ui';
import { useEffect, useState } from 'preact/hooks';
import { invalidate, put, useQuery } from '../../shared/cache.ts';
import { fetchChoices } from '../../shared/choices.ts';
import type { Choice, Choices } from '../../shared/choices-rules.ts';
import { DEFAULT_ID, withSaved } from '../../shared/choices-rules.ts';
import { DraftRow } from '../../shared/draft-row.tsx';
import { fetchDrafts } from '../../shared/drafts.ts';
import { rowKey } from '../../shared/handoff-rules.ts';
import { host } from '../../shared/host.ts';
import { Banner, Button, Select, Spinner, Switch, TextField } from '../../shared/kit.tsx';
import { finishChoice, folderFinish } from '../../shared/folder-settings.ts';
import { getAgentDefaults, getLeadMode, setAgentDefaults, setLeadMode, type AgentDefaults, type FinishComments, type ReviewMode } from '../../shared/storage.ts';
import type { DetectionState } from '../../shared/use-detection.ts';

type ServiceState = { reachable: boolean; hasKey: boolean };

const readService = async (): Promise<ServiceState> => {
  const reply = await api(host, 'GET', '/config', { name: 'Linear+' });
  return reply.ok === false ? { reachable: false, hasKey: false } : { reachable: true, hasKey: reply.hasKey === true };
};

const FINISH_OPTIONS: Choice[] = [
  { id: 'off', label: 'Off' },
  { id: 'draft', label: 'Draft a summary comment' },
];

type Role = 'plan' | 'build';
const COPY = {
  plan: { agent: 'Plan agent', model: 'Plan model', agentDefault: 'Plan (default)', example: 'plan' },
  build: { agent: 'Build agent', model: 'Build model', agentDefault: 'Build (default)', example: 'build' },
} as const;
const keys = (role: Role) => (role === 'plan' ? ({ agent: 'planAgent', model: 'planModel' } as const) : ({ agent: 'buildAgent', model: 'buildModel' } as const));

/** One agent and model pair: the one for every folder, or this folder's. */
type Pair = {
  agent: string;
  model: string;
  save: (agent: string, model: string) => Promise<boolean>;
  disabled: boolean;
  /** The first entry of each select: what an empty value means here. */
  agentDefault: string;
  modelDefault: string;
};

const TypedFields = ({ pair, role }: { pair: Pair; role: Role }) => {
  const [agent, setAgent] = useState(pair.agent);
  const [model, setModel] = useState(pair.model);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setAgent(pair.agent); setModel(pair.model); }, [pair.agent, pair.model]);
  const badModel = model.trim() !== '' && !/^[^\s/]+\/\S+$/.test(model.trim());
  const dirty = agent.trim() !== pair.agent || model.trim() !== pair.model;
  return (
    <>
      <TextField label={COPY[role].agent} value={agent} onChange={(v) => { setAgent(v); setSaved(false); }} placeholder={`${COPY[role].example}, or empty for: ${pair.agentDefault}`} disabled={pair.disabled} mono />
      <TextField
        label={COPY[role].model}
        value={model}
        onChange={(v) => { setModel(v); setSaved(false); }}
        placeholder={`provider/model, or empty for: ${pair.modelDefault}`}
        disabled={pair.disabled}
        mono
        {...(badModel ? { error: 'Write it as provider/model, for example fireworks-ai/accounts/fireworks/models/kimi-k3.' } : {})}
      />
      <div class="sui-row">
        <Button label="Save" size="sm" disabled={pair.disabled || !dirty || badModel} onClick={() => { void pair.save(agent.trim(), model.trim()).then((ok) => setSaved(ok)); }} />
        {saved && <span class="sui-small sui-muted">Saved</span>}
      </div>
    </>
  );
};

/** Pick an agent and a model from what OpenCode offers; a pick is saved at once. */
const AgentModelFields = ({ pair, role, choices }: { pair: Pair; role: Role; choices: Choices | null }) => {
  if (!choices) return <TypedFields pair={pair} role={role} />;
  const agents = withSaved(choices.agents, pair.agent, pair.agentDefault);
  const models = withSaved(choices.models, pair.model, pair.modelDefault);
  return (
    <div class="lin-field-pair">
      <Select label={COPY[role].agent} value={pair.agent || DEFAULT_ID} options={agents} disabled={pair.disabled} onChange={(id) => { void pair.save(id === DEFAULT_ID ? '' : id, pair.model); }} />
      <Select
        label={COPY[role].model}
        value={pair.model || DEFAULT_ID}
        options={models}
        disabled={pair.disabled}
        searchable
        searchPlaceholder="Search models"
        onChange={(id) => { void pair.save(pair.agent, id === DEFAULT_ID ? '' : id); }}
      />
    </div>
  );
};

const labelOf = (list: readonly Choice[], id: string | undefined): string | null => (id ? list.find((c) => c.id === id)?.label ?? id : null);

/** The agent and model for every folder, then this folder's own, which wins when set. */
const RoleFields = ({ state, role }: { state: DetectionState; role: Role }) => {
  const mapping = state.detection.mapping;
  const directory = state.place?.directory ?? null;
  const choices = useQuery(`settings:choices:${directory ?? ''}`, () => fetchChoices(directory));
  const defaults = useQuery('settings:agent-defaults', getAgentDefaults);
  if ((choices.loading && choices.data === undefined) || !defaults.data) return <Spinner size="sm" label="Reading agents and models" />;
  const k = keys(role);
  const list = choices.data ?? null;
  const all = defaults.data;
  const hostModel = list?.defaultModel ? 'Your default model' : 'The host default';
  const everywhere: Pair = {
    agent: all[k.agent] ?? '',
    model: all[k.model] ?? '',
    disabled: false,
    agentDefault: COPY[role].agentDefault,
    modelDefault: hostModel,
    save: async (agent, model) => {
      const next = { ...all, [k.agent]: agent || undefined, [k.model]: model || undefined };
      put('settings:agent-defaults', next);
      const saved = await setAgentDefaults(next);
      invalidate('start-choices:');
      return saved;
    },
  };
  const inherited = (id: string | undefined, fallback: string, options: readonly Choice[]) => `All folders: ${labelOf(options, id) ?? fallback}`;
  const folder: Pair = {
    agent: mapping?.[k.agent]?.trim() ?? '',
    model: mapping?.[k.model]?.trim() ?? '',
    disabled: !mapping,
    agentDefault: inherited(all[k.agent], COPY[role].agentDefault, list?.agents ?? []),
    modelDefault: inherited(all[k.model], hostModel, list?.models ?? []),
    save: async (agent, model) => {
      const saved = await state.update({ [k.agent]: agent, [k.model]: model });
      invalidate('start-choices:');
      return saved;
    },
  };
  return (
    <>
      {!list && <div class="sui-muted sui-small">The list of agents and models could not be read, so write them out.</div>}
      <div class="lin-subheading">All folders</div>
      <AgentModelFields pair={everywhere} role={role} choices={list} />
      <div class="lin-subheading">This folder</div>
      <AgentModelFields pair={folder} role={role} choices={list} />
      <div class="sui-muted sui-small">
        {mapping ? 'Leave this folder on "All folders" to follow the setting above.' : 'Pin this folder to a team or project to give it its own agent and model.'}
      </div>
    </>
  );
};

/** Whether Start plan runs the plan and the build under one lead session or as two sessions of their own. */
const LeadModeSwitch = () => {
  const mode = useQuery('settings:lead-mode', getLeadMode);
  const on = mode.data === true;
  return (
    <Switch
      label="Run the plan and the build under one lead session"
      description={on
        ? "Start plan makes the issue's worktree with one session, the lead. The lead starts the plan as a session nested under it, and when you click Start build, the build the same way, each with the agent and model below. It answers their questions itself and asks you only what it cannot settle. Make it a lead from its menu in the sidebar to also get its brief and digest (OpenChamber 2.8 or later). Needs OpenChamber 2.7.3 or later."
        : "Start plan makes the issue's worktree, then a plan session in it, and Start build a build session next to it. The host also leaves an empty first session in the worktree: it needs one to make the worktree. Turn this on to use that session as the lead instead (OpenChamber 2.7.3 or later)."}
      checked={on}
      disabled={mode.data === undefined}
      onChange={(next) => {
        put('settings:lead-mode', next);
        void setLeadMode(next).then((saved) => { if (!saved) invalidate('settings:lead-mode'); });
      }}
    />
  );
};

const REVIEW_OPTIONS: Choice[] = [
  { id: 'off', label: 'Stop when the code is done' },
  { id: 'mr', label: 'My usual commit, push and merge request options, then AI review' },
  { id: 'auto', label: 'Commit, push, open the merge request and handle AI review by itself' },
];

/** Saves one change to the settings for every folder. */
const saveDefaults = async (all: AgentDefaults, patch: Partial<AgentDefaults>): Promise<boolean> => {
  const next = { ...all, ...patch };
  put('settings:agent-defaults', next);
  return setAgentDefaults(next);
};

const reviewLabel = (mode: ReviewMode) => REVIEW_OPTIONS.find((o) => o.id === mode)?.label ?? mode;

const reviewText = (mode: ReviewMode) => (mode === 'off'
  ? 'The build ends when the code is written and tested.'
  : `${mode === 'auto' ? 'The build commits, pushes and opens the merge request without asking, assigned to you. ' : 'The build shows its usual commit, push and merge request options and waits for your choice. '}Then it watches the pipeline and fixes AI review comments, and replies to or resolves only the threads the AI reviewers started. It never touches other people's threads and never merges. If a comment needs your decision it asks, and after your answer it checks for new AI comments again before finishing. Choosing this is your permission for those pushes and replies.`);

/** One "After the build" choice and its AI reviewers: the one for every folder, or this folder's. */
type ReviewPair = {
  /** A mode, or `DEFAULT_ID` for a folder that follows every folder's. */
  value: string;
  options: Choice[];
  reviewers: string;
  reviewersPlaceholder: string;
  /** The mode that applies here, which decides whether the reviewers field shows. */
  effective: ReviewMode;
  disabled: boolean;
  save: (mode: string, reviewers: string) => Promise<boolean>;
};

const ReviewPairFields = ({ pair }: { pair: ReviewPair }) => {
  const [reviewers, setReviewers] = useState(pair.reviewers);
  useEffect(() => { setReviewers(pair.reviewers); }, [pair.reviewers]);
  return (
    <>
      <Select label="When the code is done" value={pair.value} options={pair.options} disabled={pair.disabled} onChange={(id) => { void pair.save(id, pair.reviewers); }} />
      {pair.effective !== 'off' && (
        <>
          <TextField
            label="AI reviewers"
            value={reviewers}
            onChange={setReviewers}
            placeholder={pair.reviewersPlaceholder}
            helper={`Names, separated by commas. Empty means ${pair.reviewersPlaceholder}.`}
            disabled={pair.disabled}
          />
          <div class="sui-row">
            <Button label="Save reviewers" size="sm" disabled={pair.disabled || reviewers.trim() === pair.reviewers} onClick={() => { void pair.save(pair.value, reviewers.trim()); }} />
          </div>
        </>
      )}
    </>
  );
};

/** What the build session does after the code (the merge request, the pipeline and the AI reviewers' comments): for every folder, then this folder's own. */
const ReviewFields = ({ state }: { state: DetectionState }) => {
  const defaults = useQuery('settings:agent-defaults', getAgentDefaults);
  if (!defaults.data) return <Spinner size="sm" label="Reading the build settings" />;
  const all = defaults.data;
  const mapping = state.detection.mapping;
  const allMode: ReviewMode = all.reviewMode ?? 'off';
  const allReviewers = all.aiReviewers ?? '';
  const effective: ReviewMode = mapping?.reviewMode ?? allMode;
  const everywhere: ReviewPair = {
    value: allMode,
    options: REVIEW_OPTIONS,
    reviewers: allReviewers,
    reviewersPlaceholder: 'CodeRabbit',
    effective: allMode,
    disabled: false,
    save: (mode, reviewers) => saveDefaults(all, { reviewMode: mode === 'mr' || mode === 'auto' ? mode : undefined, aiReviewers: reviewers || undefined }),
  };
  const folder: ReviewPair = {
    value: mapping?.reviewMode ?? DEFAULT_ID,
    options: [{ id: DEFAULT_ID, label: `All folders: ${reviewLabel(allMode)}` }, ...REVIEW_OPTIONS],
    reviewers: mapping?.aiReviewers?.trim() ?? '',
    reviewersPlaceholder: allReviewers || 'CodeRabbit',
    effective,
    disabled: !mapping,
    save: (mode, reviewers) => state.update({ reviewMode: mode === DEFAULT_ID ? undefined : (mode as ReviewMode), aiReviewers: reviewers }),
  };
  return (
    <>
      <div class="lin-subheading">All folders</div>
      <ReviewPairFields pair={everywhere} />
      <div class="lin-subheading">This folder</div>
      <ReviewPairFields pair={folder} />
      <div class="sui-muted sui-small">
        {`In this folder: ${reviewText(effective).replace(/^The build/, 'the build')}`}
        {!mapping && ' Pin this folder to a team or project to give it its own choice.'}
      </div>
    </>
  );
};

/** Finish comments for every folder, then this folder's own, which wins when set. */
const FinishFields = ({ state }: { state: DetectionState }) => {
  const defaults = useQuery('settings:agent-defaults', getAgentDefaults);
  if (!defaults.data) return <Spinner size="sm" label="Reading the settings" />;
  const all = defaults.data;
  const mapping = state.detection.mapping;
  const allMode = all.finishComments ?? 'off';
  const own = folderFinish(mapping ?? undefined);
  const effective = finishChoice(mapping ?? undefined, all);
  return (
    <>
      <div class="lin-subheading">All folders</div>
      <Select value={allMode} options={FINISH_OPTIONS} onChange={(id) => { void saveDefaults(all, { finishComments: id === 'draft' ? 'draft' : undefined }); }} />
      <div class="lin-subheading">This folder</div>
      <Select
        value={own ?? DEFAULT_ID}
        options={[{ id: DEFAULT_ID, label: `All folders: ${FINISH_OPTIONS.find((o) => o.id === allMode)!.label}` }, ...FINISH_OPTIONS]}
        disabled={!mapping}
        onChange={(id) => { void state.update(id === DEFAULT_ID ? { finishComments: 'off', finishSet: undefined } : { finishComments: id as FinishComments, finishSet: true }); }}
      />
      <div class="sui-muted sui-small">
        {effective === 'draft'
          ? 'In this folder: when an agent finishes a turn in a session linked to a Linear issue, a summary is kept as a draft in the Work Status section. Nothing is posted until you click Post.'
          : 'In this folder: no drafts are kept.'}
        {!mapping && ' Pin this folder to a team or project first: drafts are kept only in pinned folders.'}
      </div>
    </>
  );
};

const POST_OPTIONS: Choice[] = [
  { id: 'on', label: 'Add the plan' },
  { id: 'off', label: 'Do not add the plan' },
];

/** Whether Start build adds the plan to the issue description: for every folder, then this folder's own. */
const PostPlanFields = ({ state }: { state: DetectionState }) => {
  const defaults = useQuery('settings:agent-defaults', getAgentDefaults);
  if (!defaults.data) return <Spinner size="sm" label="Reading the settings" />;
  const all = defaults.data;
  const mapping = state.detection.mapping;
  const allOn = all.postPlan === true;
  return (
    <>
      <div class="lin-subheading">All folders</div>
      <Switch
        label="Add the plan to the issue description when I click Start build"
        description="Adds the plan to the end of the issue's description, then starts the build. A plan added before is replaced, and the rest of the description is kept. Written only on that click, and you can still turn it off for one build."
        checked={allOn}
        onChange={(on) => { void saveDefaults(all, { postPlan: on ? true : undefined }); }}
      />
      <div class="lin-subheading">This folder</div>
      <Select
        value={mapping?.postPlan === undefined ? DEFAULT_ID : mapping.postPlan ? 'on' : 'off'}
        options={[{ id: DEFAULT_ID, label: `All folders: ${allOn ? 'Add the plan' : 'Do not add the plan'}` }, ...POST_OPTIONS]}
        disabled={!mapping}
        onChange={(id) => { void state.update({ postPlan: id === DEFAULT_ID ? undefined : id === 'on' }); }}
      />
      {!mapping && <div class="sui-muted sui-small">Pin this folder to a team or project to give it its own choice.</div>}
    </>
  );
};

export const AgentSettings = ({ state }: { state: DetectionState }) => {
  const service = useQuery('settings:service', readService);
  const directory = state.place?.directory ?? null;
  const drafts = useQuery(directory ? `settings:drafts:${directory}` : null, () => fetchDrafts(directory!));
  const [handled, setHandled] = useState<ReadonlySet<string>>(new Set());
  const waiting = (drafts.data ?? []).filter((d) => !handled.has(rowKey(d)));

  return (
    <>
      <Section title="Agent context">
        <KV items={[['Personal API key', service.data ? (service.data.hasKey ? 'Set' : 'Not set') : '...']]} />
        {service.data && !service.data.reachable && (
          <Banner tone="warning" title="The Linear+ service is not running" body="Approve the Linear+ extension in Settings, Extensions. Until then agents get no Linear context and the @ menu has no Linear rows." />
        )}
        {service.data?.reachable && !service.data.hasKey && (
          <div class="sui-muted sui-small">
            Without a key, agent instructions and the @ menu use what this dashboard last showed. Add a Linear personal API key in Settings, Integrations, to keep them current while the dashboard is closed. The key is optional and is only read by the service.
          </div>
        )}
      </Section>
      <Section title="Finish comments">
        <FinishFields state={state} />
        {waiting.length === 0 ? (
          <div class="sui-muted sui-small">No drafts waiting.</div>
        ) : (
          waiting.map((draft) => (
            <DraftRow key={draft.id} draft={draft} onDone={() => { setHandled((set) => new Set(set).add(rowKey(draft))); drafts.refresh(); }} />
          ))
        )}
      </Section>
      <Section title="Plan and build">
        <LeadModeSwitch />
      </Section>
      <Section title="Start plan">
        <div class="sui-muted sui-small">
          Start plan makes the issue's worktree and starts a planning session in it with this agent and model. The session plans and stops: it changes no files.
        </div>
        <RoleFields state={state} role="plan" />
      </Section>
      <Section title="Start build">
        <div class="sui-muted sui-small">
          Start build begins a new session in the same worktree with the plan from the planning session (with the lead on, a session the lead starts under it). Pick the agent and model it uses for every folder, and this folder's own when it should differ.
        </div>
        <RoleFields state={state} role="build" />
      </Section>
      <Section title="Add the plan to the issue">
        <PostPlanFields state={state} />
      </Section>
      <Section title="After the build">
        <div class="sui-muted sui-small">What the build session does once the code is written: the merge request, the pipeline and the AI reviewers' comments. Pick it for every folder, and this folder's own when it should differ.</div>
        <ReviewFields state={state} />
      </Section>
    </>
  );
};
