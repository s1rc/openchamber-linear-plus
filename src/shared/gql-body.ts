/** The exact request body `gql` sends. Shared with scripts/fixtures.ts so harness fixtures match it. */
export const graphqlBody = (query: string, variables?: Record<string, unknown>): string => JSON.stringify({ query, variables });
