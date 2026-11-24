// Dialogs behind the issue menu's less frequent actions. Every write follows the user's Save or choice.
import { toast } from '@openchamber-ext/shared-ui';
import { useState } from 'preact/hooks';
import { host } from '../../shared/host.ts';
import type { IssuePrompt } from '../../shared/issue-menu.ts';
import { useIssueDetail } from '../../shared/issues.ts';
import { Button, Checkbox, Select, Spinner, TextField } from '../../shared/kit.tsx';
import { gql } from '../../shared/linear.ts';
import { CUSTOMERS, ISSUE_RELEASES } from '../../shared/queries.ts';
import { useQuery } from '../../shared/cache.ts';
import type { CustomersResult, IssueReleasesResult, IssueRow, ReleaseSummary } from '../../shared/types.ts';
import {
  addCustomerRequest, addIssueDocument, addIssueLink, convertIssueToProject, remindIssue, writeErrorText,
} from '../../shared/writes.ts';
import { CreateIssueDialog } from './create-issue.tsx';
import { IssueSearchDialog } from './issue-search-dialog.tsx';
import { Modal } from './modal.tsx';
import { save } from './property-editors.tsx';

const NONE = '__none__';

type Props = {
  issue: IssueRow;
  onClose: () => void;
  onOpen: (issue: IssueRow) => void;
};

const buttons = (busy: boolean, label: string, enabled: boolean, submit: () => void, close: () => void) => (
  <>
    <Button label="Cancel" variant="ghost" size="sm" disabled={busy} onClick={close} />
    <Button label={busy ? 'Saving...' : label} size="sm" disabled={busy || !enabled} onClick={submit} />
  </>
);

const RenameDialog = ({ issue, onClose }: Props) => {
  const [title, setTitle] = useState(issue.title);
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (!title.trim() || busy) return;
    setBusy(true);
    if (await save(issue, { input: { title: title.trim() }, patch: { title: title.trim() } })) onClose();
    else setBusy(false);
  };
  return (
    <Modal title={`Rename ${issue.identifier}`} onClose={onClose} footer={buttons(busy, 'Save', Boolean(title.trim()), () => { void submit(); }, onClose)}>
      <TextField label="Title" value={title} onChange={setTitle} />
    </Modal>
  );
};

const LinkDialog = ({ issue, onClose }: Props) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (!url.trim() || !title.trim() || busy) return;
    setBusy(true);
    try {
      await addIssueLink(issue, { url: url.trim(), title: title.trim() });
      await toast(host, 'success', `Added a link to ${issue.identifier}`);
      onClose();
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };
  return (
    <Modal title={`Add a link to ${issue.identifier}`} onClose={onClose} footer={buttons(busy, 'Add Link', Boolean(url.trim() && title.trim()), () => { void submit(); }, onClose)}>
      <div class="lin-stack">
        <TextField label="URL" value={url} onChange={setUrl} placeholder="https://" />
        <TextField label="Title" value={title} onChange={setTitle} placeholder="Link title" />
      </div>
    </Modal>
  );
};

const CustomerDialog = ({ issue, onClose }: Props) => {
  const customers = useQuery('customers', async () => (await gql<CustomersResult>(CUSTOMERS)).customers.nodes);
  const [customerId, setCustomerId] = useState(NONE);
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (customerId === NONE || !body.trim() || busy) return;
    setBusy(true);
    try {
      await addCustomerRequest(issue, { customerId, body: body.trim() });
      await toast(host, 'success', `Added a customer request to ${issue.identifier}`);
      onClose();
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };
  return (
    <Modal title={`Add a customer request to ${issue.identifier}`} onClose={onClose} footer={buttons(busy, 'Add Request', customerId !== NONE && Boolean(body.trim()), () => { void submit(); }, onClose)}>
      <div class="lin-stack">
        {customers.loading && <Spinner label="Loading customers" />}
        {customers.error && <div class="sui-muted sui-small">Could not load customers.</div>}
        {customers.data && !customers.data.length && <div class="sui-muted sui-small">No customers yet. Create one in Linear first.</div>}
        {(customers.data?.length ?? 0) > 0 && (
          <Select
            value={customerId}
            searchable
            placeholder="Choose a customer"
            options={[{ id: NONE, label: 'Choose a customer' }, ...(customers.data ?? []).map((c) => ({ id: c.id, label: c.name }))]}
            onChange={setCustomerId}
          />
        )}
        <TextField label="Request" value={body} onChange={setBody} multiline rows={5} placeholder="What does the customer need?" />
      </div>
    </Modal>
  );
};

const DocumentDialog = ({ issue, onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (!title.trim() || busy) return;
    setBusy(true);
    try {
      await addIssueDocument(issue, { title: title.trim(), content });
      await toast(host, 'success', `Added a document to ${issue.identifier}`);
      onClose();
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };
  return (
    <Modal wide title={`Add a document to ${issue.identifier}`} onClose={onClose} footer={buttons(busy, 'Add Document', Boolean(title.trim()), () => { void submit(); }, onClose)}>
      <div class="lin-stack">
        <TextField label="Title" value={title} onChange={setTitle} placeholder="Document title" />
        <TextField label="Content" value={content} onChange={setContent} multiline rows={8} placeholder="Markdown content" />
      </div>
    </Modal>
  );
};

const localInput = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const CustomReminderDialog = ({ issue, onClose }: Props) => {
  const [initial] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(9, 0, 0, 0);
    return localInput(date);
  });
  const [value, setValue] = useState(initial);
  const [busy, setBusy] = useState(false);
  const at = new Date(value);
  const valid = Number.isFinite(at.getTime()) && at.getTime() > Date.now();
  const submit = async () => {
    if (!valid || busy) return;
    setBusy(true);
    try {
      await remindIssue(issue, at.toISOString());
      await toast(host, 'success', `Reminder set for ${at.toLocaleString()}`);
      onClose();
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };
  return (
    <Modal title={`Remind me about ${issue.identifier}`} onClose={onClose} footer={buttons(busy, 'Set Reminder', valid, () => { void submit(); }, onClose)}>
      <input class="lin-date" type="datetime-local" aria-label="Reminder time" value={value} onChange={(event) => setValue((event.target as HTMLInputElement).value)} />
    </Modal>
  );
};

const SlaDialog = ({ issue, onClose }: Props) => {
  const [busy, setBusy] = useState(false);
  const choose = async (id: string) => {
    if (id === (issue.slaType ?? NONE) || busy) return;
    setBusy(true);
    const slaType = id === NONE ? null : id;
    if (await save(issue, { input: { slaType }, patch: { slaType } })) onClose();
    else setBusy(false);
  };
  return (
    <Modal title={`SLA for ${issue.identifier}`} onClose={onClose}>
      <div class="lin-stack">
        <div class="sui-muted sui-small">Choose how Linear counts days. SLA durations and start rules come from the team's SLA configuration.</div>
        <Select
          value={issue.slaType ?? NONE}
          disabled={busy}
          options={[
            { id: NONE, label: 'No day-count override' },
            { id: 'all', label: 'All calendar days' },
            { id: 'onlyBusinessDays', label: 'Business days only' },
          ]}
          onChange={(id) => { void choose(id); }}
        />
      </div>
    </Modal>
  );
};

const ReleaseDialog = ({ issue, onClose }: Props) => {
  const result = useQuery(`issue-releases:${issue.id}`, async () => gql<IssueReleasesResult>(ISSUE_RELEASES, { id: issue.id }));
  const [edited, setEdited] = useState<Set<string> | null>(null);
  const [busy, setBusy] = useState(false);
  const current = result.data?.issue.releases.nodes ?? [];
  const selected = edited ?? new Set(current.map((r) => r.id));
  const releases = [...new Map<string, ReleaseSummary>([...current, ...(result.data?.releaseSearch ?? [])].map((r) => [r.id, r])).values()]
    .sort((a, b) => a.name.localeCompare(b.name) || (a.version ?? '').localeCompare(b.version ?? ''));
  const toggle = async (release: ReleaseSummary) => {
    if (busy) return;
    const adding = !selected.has(release.id);
    const next = new Set(selected);
    if (adding) next.add(release.id); else next.delete(release.id);
    setBusy(true);
    const ok = await save(issue, { input: adding ? { addedReleaseIds: [release.id] } : { removedReleaseIds: [release.id] }, patch: {} });
    if (ok) setEdited(next);
    setBusy(false);
  };
  return (
    <Modal title={`Releases for ${issue.identifier}`} onClose={onClose} footer={<Button label="Done" size="sm" onClick={onClose} />}>
      <div class="lin-stack">
        {result.loading && <Spinner label="Loading releases" />}
        {result.error && <div class="sui-muted sui-small">Could not load releases.</div>}
        {result.data && !releases.length && <div class="sui-muted sui-small">No releases are available.</div>}
        {releases.map((release) => (
          <Checkbox
            key={release.id}
            label={`${release.name}${release.version ? ` ${release.version}` : ''}`}
            checked={selected.has(release.id)}
            disabled={busy}
            onChange={() => { void toggle(release); }}
          />
        ))}
      </div>
    </Modal>
  );
};

const CopyDialog = ({ issue, onClose, onOpen }: Props) => {
  const detail = useIssueDetail(issue.identifier);
  if (!detail.data) return <Modal title={`Make a copy of ${issue.identifier}`} onClose={onClose}><Spinner label="Loading the issue" /></Modal>;
  const source = detail.data;
  return (
    <CreateIssueDialog
      teamIds={[issue.team.id]}
      projectId={issue.project?.id ?? null}
      initial={{
        title: issue.title,
        description: source.description ?? '',
        stateId: issue.state.id,
        priority: issue.priority,
        assigneeId: issue.assignee?.id ?? null,
        estimate: issue.estimate,
        cycleId: issue.cycle?.id ?? null,
        projectId: issue.project?.id ?? null,
        labels: issue.labels.nodes,
      }}
      onClose={onClose}
      onCreated={onOpen}
    />
  );
};

const ConvertProjectDialog = ({ issue, onClose }: Props) => {
  const [busy, setBusy] = useState(false);
  const convert = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const project = await convertIssueToProject(issue);
      await toast(host, 'success', `Converted ${issue.identifier} to ${project.name}`);
      onClose();
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };
  return (
    <Modal
      title={`Convert ${issue.identifier} to a project?`}
      onClose={onClose}
      footer={buttons(busy, 'Convert to Project', true, () => { void convert(); }, onClose)}
    >
      <div class="sui-small">Linear creates a project named {issue.title} and applies its standard issue conversion, including handling any sub-issues.</div>
    </Modal>
  );
};

const SubissueDialog = ({ issue, onClose }: Props) => {
  const [busy, setBusy] = useState(false);
  const choose = async (parent: IssueRow) => {
    if (busy) return;
    setBusy(true);
    const ok = await save(issue, { input: { parentId: parent.id }, patch: { parent: { id: parent.id, identifier: parent.identifier } } });
    if (ok) {
      await toast(host, 'success', `${issue.identifier} is now a sub-issue of ${parent.identifier}`);
      onClose();
    } else setBusy(false);
  };
  return <IssueSearchDialog issue={issue} title={`Make ${issue.identifier} a sub-issue of`} placeholder="Search for a parent issue" busy={busy} onClose={onClose} onChoose={(parent) => { void choose(parent); }} />;
};

export const IssueActionDialog = ({ issue, prompt, onClose, onOpen }: Props & { prompt: IssuePrompt }) => {
  switch (prompt) {
    case 'rename': return <RenameDialog issue={issue} onClose={onClose} onOpen={onOpen} />;
    case 'link': return <LinkDialog issue={issue} onClose={onClose} onOpen={onOpen} />;
    case 'customer': return <CustomerDialog issue={issue} onClose={onClose} onOpen={onOpen} />;
    case 'document': return <DocumentDialog issue={issue} onClose={onClose} onOpen={onOpen} />;
    case 'reminder-custom': return <CustomReminderDialog issue={issue} onClose={onClose} onOpen={onOpen} />;
    case 'sla': return <SlaDialog issue={issue} onClose={onClose} onOpen={onOpen} />;
    case 'release': return <ReleaseDialog issue={issue} onClose={onClose} onOpen={onOpen} />;
    case 'copy': return <CopyDialog issue={issue} onClose={onClose} onOpen={onOpen} />;
    case 'convert-project': return <ConvertProjectDialog issue={issue} onClose={onClose} onOpen={onOpen} />;
    case 'convert-subissue': return <SubissueDialog issue={issue} onClose={onClose} onOpen={onOpen} />;
    case 'suggestions':
      return <IssueSearchDialog issue={issue} title={`Suggestions for ${issue.identifier}`} initialQuery={issue.title} placeholder="Search for similar issues" semantic onClose={onClose} onChoose={(other) => { onOpen(other); onClose(); }} />;
    default: return null;
  }
};
