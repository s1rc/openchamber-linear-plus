// Where an open issue is drawn, the same from every view: on the full page a pane on the right of the whole view
// (beside a project's tabs, a cycle's chart or a list alike), on the rail panel the issue alone in place of the view.
// The view that opened it stays mounted underneath, so Back returns to it as it was. A crumb names where it came from.
import { createContext, type ComponentChildren } from 'preact';
import { useContext, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { openIssueFor, saveOpenIssue } from './view-state.ts';

/** The open issue, and who opened it: `owner` is the list's key, `origin` the name shown in the crumb. */
export type OpenIssue = { id: string; owner: string; origin: string; /** Called when the pane's own Back or Close shuts it, so the owner forgets it too. */ onClosed?: () => void };

export type IssuePaneApi = {
  current: OpenIssue | null;
  open: (owner: string, origin: string, id: string, onClosed?: () => void) => void;
  /** Closes it when `owner` holds it; with no owner, whatever is open. */
  close: (owner?: string) => void;
};

const noPane: IssuePaneApi = { current: null, open: () => undefined, close: () => undefined };

export const IssuePaneContext = createContext<IssuePaneApi>(noPane);

export const useIssuePane = () => useContext(IssuePaneContext);

export const IssuePaneProvider = ({ children }: { children: ComponentChildren }) => {
  const [current, setCurrent] = useState<OpenIssue | null>(null);
  const api = useMemo<IssuePaneApi>(() => ({
    current,
    open: (owner, origin, id, onClosed) => setCurrent({ id, owner, origin, ...(onClosed ? { onClosed } : {}) }),
    close: (owner) => setCurrent((open) => (!owner || open?.owner === owner ? null : open)),
  }), [current]);
  return <IssuePaneContext.Provider value={api}>{children}</IssuePaneContext.Provider>;
};

/** The id open for one list, or null. */
export const openFor = (pane: IssuePaneApi, owner: string): string | null => (pane.current?.owner === owner ? pane.current.id : null);

/**
 * The open issue of one list or view, kept in the folder's saved state (`openIssueFor`) so it comes back after a
 * reload, and drawn by the shell's pane. Leaving the view closes the pane but keeps the saved issue.
 */
export const usePaneIssue = (placeKey: string | null, owner: string, origin: string) => {
  const pane = useIssuePane();
  const latest = useRef(pane);
  latest.current = pane;
  const forget = () => saveOpenIssue(placeKey, owner, null);
  useEffect(() => {
    const saved = openIssueFor(placeKey, owner);
    if (saved) latest.current.open(owner, origin, saved, forget);
    return () => latest.current.close(owner);
  }, [owner]);
  const openId = openFor(pane, owner);
  const setOpenId = (id: string | null) => {
    if (id) pane.open(owner, origin, id, forget);
    else pane.close(owner);
    saveOpenIssue(placeKey, owner, id);
  };
  return [openId, setOpenId] as const;
};
