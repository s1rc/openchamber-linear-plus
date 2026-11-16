// Dev-only. Checks every GraphQL document in src/shared/queries.ts against Linear's published schema,
// with no network call to the user's workspace: fields, variable values, and Linear's complexity score.
//
//   bun scripts/validate-queries.ts [--refresh]
//
// The schema is cached in node_modules/.cache/linear-schema.graphql; --refresh downloads it again.
import {
  buildSchema, getNamedType, isCompositeType, isObjectType, isInterfaceType, Kind, parse, validate, validateExecutionArgs,
  type GraphQLCompositeType, type GraphQLSchema, type OperationDefinitionNode, type SelectionSetNode,
} from 'graphql';
import { ALL_DOCUMENTS } from '../src/shared/queries.ts';

// Variables the app sends, checked against each operation's variable types.
const SAMPLES: Record<string, Record<string, unknown>[]> = {
  PROJECTS: [
    { after: null, filter: { id: { in: ['p1'] } } },
    { after: null, filter: { accessibleTeams: { some: { id: { eq: 't1' } } }, status: { type: { nin: ['completed', 'canceled'] } } } },
  ],
  CUSTOM_VIEWS: [{ filter: { team: { id: { eq: 't1' } }, modelName: { eq: 'Issue' } } }],
  CUSTOM_VIEW_ISSUES: [{ id: 'v1', filter: { team: { id: { in: ['t1'] } } }, after: null }],
  TEAM_CYCLES: [{ teamId: 't1', minNumber: 60 }],
  CYCLE_DETAIL: [{ id: 'c1' }],
  CHILD_STATES: [{ ids: ['i1', 'i2'], after: null }],
  CHILD_ISSUES: [{ ids: ['i1', 'i2'], after: null }],
  ISSUE_EXTRAS: [{ ids: ['i1', 'i2'], after: null }],
  REPO_ATTACHMENTS: [{ url: 'gitlab.com/acme/group/repo/' }],
  DOCUMENTS: [{ filter: { project: { id: { eq: 'p1' } } } }],
  ISSUES: [
    { filter: { assignee: { isMe: { eq: true } } } },
    { filter: { creator: { isMe: { eq: true } } } },
    { filter: { subscribers: { some: { isMe: { eq: true } } } } },
    { filter: { project: { id: { in: ['p1'] } }, state: { type: { nin: ['completed', 'canceled'] } } } },
    { filter: { team: { id: { eq: 't1' } }, state: { type: { eq: 'triage' } } } },
    { filter: { cycle: { id: { eq: 'c1' } } }, after: 'cursor' },
    { filter: { team: { or: [{ id: { in: ['t1'] } }, { ancestors: { some: { id: { in: ['t1'] } } } }] } }, after: null },
    { filter: { and: [{ or: [{ state: { type: { nin: ['completed', 'canceled', 'duplicate'] } } }, { completedAt: { gt: '-P2W' } }, { canceledAt: { gt: '-P2W' } }] }, { or: [{ team: { id: { in: ['t1'] } } }, { project: { id: { in: ['p1'] } } }] }] }, after: null },
  ],
  ISSUE_UPDATE: [
    { id: 'i1', input: { stateId: 's1', assigneeId: null, priority: 2, labelIds: ['l1'], estimate: 3, dueDate: '2026-11-20' } },
    { id: 'i1', input: { title: 'T', description: 'D', projectId: null, cycleId: 'c1', teamId: 't2' } },
  ],
  ISSUE_CREATE: [{ input: { teamId: 't1', title: 'T', description: 'D', projectId: 'p1', priority: 0, stateId: 's1', assigneeId: 'u1', labelIds: ['l1'], estimate: 2, cycleId: 'c1' } }],
  COMMENT_CREATE: [{ input: { issueId: 'i1', body: 'B' } }],
  PROJECT_UPDATE_CREATE: [{ input: { projectId: 'p1', body: 'B', health: 'onTrack' } }],
  NOTIFICATION_MARK_READ: [{ id: 'n1', readAt: '2026-11-09T00:00:00Z' }],
  NOTIFICATION_MARK_ALL_READ: [{ input: { issueId: 'i1' }, readAt: '2026-11-09T00:00:00Z' }],
  NOTIFICATIONS_MARK_READ: [{ readAt: '2026-11-09T00:00:00Z' }],
};

// Linear rejects any single query above 10,000 points. Keep a margin, since lists grow with real data.
const COMPLEXITY_MAX = 10_000;
const COMPLEXITY_WARN = 6_000;

/**
 * Linear's published formula: each property 0.1, each object 1, and a connection multiplies its
 * children by its `first` argument (default 50). https://linear.app/developers/rate-limiting
 */
const complexity = (schema: GraphQLSchema, operation: OperationDefinitionNode): number => {
  const root = operation.operation === 'mutation' ? schema.getMutationType()! : schema.getQueryType()!;
  const walk = (selections: SelectionSetNode | undefined, type: GraphQLCompositeType): number => {
    if (!selections) return 0;
    let total = 0;
    for (const selection of selections.selections) {
      if (selection.kind === Kind.INLINE_FRAGMENT) {
        const inner = selection.typeCondition ? schema.getType(selection.typeCondition.name.value) : type;
        if (inner && isCompositeType(inner)) total += walk(selection.selectionSet, inner);
        continue;
      }
      if (selection.kind !== Kind.FIELD || selection.name.value === '__typename') continue;
      if (!isObjectType(type) && !isInterfaceType(type)) continue;
      const field = type.getFields()[selection.name.value];
      if (!field) continue;
      const named = getNamedType(field.type);
      if (!isCompositeType(named)) { total += 0.1; continue; }
      const isConnection = isObjectType(named) && 'nodes' in named.getFields() && 'pageInfo' in named.getFields();
      if (!isConnection) { total += 1 + walk(selection.selectionSet, named); continue; }
      const firstArg = selection.arguments?.find((arg) => arg.name.value === 'first');
      const first = firstArg?.value.kind === Kind.INT ? Number(firstArg.value.value) : 50;
      for (const inner of selection.selectionSet?.selections ?? []) {
        if (inner.kind !== Kind.FIELD) continue;
        const innerField = named.getFields()[inner.name.value];
        if (!innerField) continue;
        const innerType = getNamedType(innerField.type);
        if (!isCompositeType(innerType)) { total += 0.1; continue; }
        if (inner.name.value === 'nodes') total += first * (1 + walk(inner.selectionSet, innerType));
        else total += 1 + walk(inner.selectionSet, innerType);
      }
    }
    return total;
  };
  return Math.ceil(walk(operation.selectionSet, root));
};

const SCHEMA_URL = 'https://raw.githubusercontent.com/linear/linear/master/packages/sdk/src/schema.graphql';
const cache = Bun.file('node_modules/.cache/linear-schema.graphql');

if (process.argv.includes('--refresh') || !(await cache.exists())) {
  const res = await fetch(SCHEMA_URL);
  if (!res.ok) throw new Error(`Could not download the Linear schema: ${res.status}`);
  await Bun.write(cache, await res.text());
}

const schema = buildSchema(await cache.text(), { assumeValidSDL: true });
let failed = 0;
for (const [name, source] of Object.entries(ALL_DOCUMENTS)) {
  const document = parse(source);
  const errors = [...validate(schema, document)];
  for (const variableValues of SAMPLES[name] ?? []) {
    const checked = validateExecutionArgs({ schema, document, variableValues });
    if (Array.isArray(checked)) errors.push(...checked);
  }
  const operation = document.definitions.find((def) => def.kind === Kind.OPERATION_DEFINITION);
  const points = !errors.length && operation ? complexity(schema, operation) : 0;
  const score = `${String(points).padStart(6)} pts`;
  if (points > COMPLEXITY_MAX) errors.push(new Error(`complexity ${points} is over Linear's limit of ${COMPLEXITY_MAX}`) as never);
  if (errors.length) {
    failed += 1;
    console.log(`FAIL ${score}  ${name}`);
    for (const error of errors) console.log(`  ${error.message}`);
  } else {
    console.log(`${points > COMPLEXITY_WARN ? 'warn' : 'ok  '} ${score}  ${name}`);
  }
}
if (failed) process.exit(1);
