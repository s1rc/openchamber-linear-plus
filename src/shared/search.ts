// Searches the dialog needs: issues to comment on, and projects and documents to attach.
import { useEffect, useState } from 'preact/hooks';
import { load, useQuery } from './cache.ts';
import { gql } from './linear.ts';
import { DOCUMENT, DOCUMENTS, PROJECT_DETAIL, SEARCH_DOCUMENTS, SEARCH_ISSUES, SEMANTIC_ISSUES } from './queries.ts';
import type { DocumentDetail, DocumentResult, DocumentsResult, DocumentSummary, IssueRow, ProjectDetail, ProjectDetailResult, SearchDocumentsResult, SearchIssuesResult, SemanticIssuesResult } from './types.ts';

/** The text once typing has paused for 250 ms. */
export const useDebounced = (term: string): string => {
  const [debounced, setDebounced] = useState(term);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(term.trim()), 250);
    return () => clearTimeout(timer);
  }, [term]);
  return debounced;
};

const enough = (term: string) => term.length >= 2;

export const useIssueSearch = (term: string) => {
  const debounced = useDebounced(term);
  return useQuery<IssueRow[]>(
    enough(debounced) ? `issue-search:${debounced.toLowerCase()}` : null,
    async () => (await gql<SearchIssuesResult>(SEARCH_ISSUES, { term: debounced })).searchIssues.nodes,
  );
};

export const useSemanticIssueSearch = (term: string) => {
  const debounced = useDebounced(term);
  return useQuery<IssueRow[]>(
    enough(debounced) ? `semantic-issues:${debounced.toLowerCase()}` : null,
    async () => (await gql<SemanticIssuesResult>(SEMANTIC_ISSUES, { query: debounced })).semanticSearch.results.map((r) => r.issue).filter((i) => i !== null),
  );
};

export const useDocumentSearch = (term: string) => {
  const debounced = useDebounced(term);
  return useQuery<DocumentSummary[]>(
    enough(debounced) ? `document-search:${debounced.toLowerCase()}` : null,
    async () => (await gql<SearchDocumentsResult>(SEARCH_DOCUMENTS, { term: debounced })).searchDocuments.nodes,
  );
};

/** Documents of the given projects: what the Attach tab offers before anything is typed. */
export const useProjectDocuments = (projectIds: string[]) =>
  useQuery<DocumentSummary[]>(
    projectIds.length ? `project-documents:${[...projectIds].sort().join(',')}` : null,
    async () => (await gql<DocumentsResult>(DOCUMENTS, { filter: { project: { id: { in: [...projectIds].sort() } } } })).documents.nodes,
  );

export const fetchProjectDetail = (id: string): Promise<ProjectDetail> =>
  load(`project:${id}`, async () => (await gql<ProjectDetailResult>(PROJECT_DETAIL, { id })).project);

export const fetchDocument = (id: string): Promise<DocumentDetail> =>
  load(`document:${id}`, async () => (await gql<DocumentResult>(DOCUMENT, { id })).document);
