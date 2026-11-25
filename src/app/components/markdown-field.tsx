// A Markdown text that edits in place: shown rendered with an Edit button, edited in the rich editor or
// as Markdown. Used by the issue description and the project's description.
import { useState } from 'preact/hooks';
import { Button, Tabs, TextField } from '../../shared/kit.tsx';
import { Markdown } from '../../shared/markdown.tsx';
import { setTask } from '../../shared/tasks.ts';
import { RichEditor } from './rich-editor.tsx';

/** Typing in a field must not reach the list's shortcuts: Escape there closes the issue. */
export const keepKeys = (onKey: (event: KeyboardEvent) => void) => (event: KeyboardEvent) => {
  event.stopPropagation();
  onKey(event);
};

type Props = {
  value: string;
  /** Saves the text; resolves false when it was refused, which keeps the editor open. */
  onSave: (next: string) => Promise<boolean>;
  onOpenIssue?: (id: string) => void;
  /** Words for the empty state and the button: "description" gives "No description." and "Add Description". */
  noun?: string;
};

export const MarkdownField = ({ value, onSave, onOpenIssue, noun = 'description' }: Props) => {
  const [draft, setDraft] = useState<string | null>(null);
  // Rich text by default; Markdown shows the same text as Linear stores it. Each switch to rich text reads the draft again.
  const [tab, setTab] = useState<'rich' | 'markdown'>('rich');
  const [loads, setLoads] = useState(0);
  const [busy, setBusy] = useState(false);
  const title = `${noun.charAt(0).toUpperCase()}${noun.slice(1)}`;
  const edit = () => { setDraft(value); setTab('rich'); setLoads((n) => n + 1); };
  const switchTo = (next: 'rich' | 'markdown') => { if (next === 'rich' && tab !== 'rich') setLoads((n) => n + 1); setTab(next); };
  if (draft === null) {
    // Only the button edits: a click in the text selects it, as text does everywhere else. A task box ticks and saves.
    const toggleTask = (index: number, checked: boolean) => {
      const next = setTask(value, index, checked);
      if (next !== null) void onSave(next);
    };
    return (
      <div class="lin-description">
        <div class="lin-description-body">
          {value.trim()
            ? <Markdown source={value} onOpenIssue={onOpenIssue} onToggleTask={toggleTask} />
            : <div class="sui-muted">No {noun}.</div>}
        </div>
        <div class="lin-description-foot"><Button label={value.trim() ? `Edit ${title}` : `Add ${title}`} variant="outline" size="xs" onClick={edit} /></div>
      </div>
    );
  }
  const commit = async () => {
    setBusy(true);
    const ok = draft === value || (await onSave(draft));
    setBusy(false);
    if (ok) setDraft(null);
  };
  return (
    <div class="lin-stack lin-stack--tight lin-description-edit" onKeyDown={keepKeys((e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void commit(); if (e.key === 'Escape') setDraft(null); })}>
      <Tabs items={[{ id: 'rich', label: 'Rich text' }, { id: 'markdown', label: 'Markdown' }]} activeId={tab} onChange={(id) => switchTo(id as 'rich' | 'markdown')} />
      {tab === 'rich'
        ? <RichEditor key={loads} initial={draft} onChange={setDraft} />
        : <TextField value={draft} onChange={setDraft} multiline rows={Math.min(30, Math.max(8, draft.split('\n').length + 2))} placeholder="Markdown. Cmd+Enter saves, Escape cancels." />}
      <div class="sui-muted sui-small">Cmd+Enter saves, Escape cancels. Linear keeps descriptions as Markdown; tables and collapsible sections are kept as written.</div>
      <div class="sui-row">
        <Button label={busy ? 'Saving...' : 'Save'} size="xs" disabled={busy} onClick={() => { void commit(); }} />
        <Button label="Cancel" variant="ghost" size="xs" disabled={busy} onClick={() => setDraft(null)} />
      </div>
    </div>
  );
};
