import { HostRequestError } from '@openchamber/sdk';
import { graphqlBody } from './gql-body.ts';
import { host } from './host.ts';

export class LinearError extends Error {
  readonly kind: 'disconnected' | 'rate-limited' | 'network' | 'graphql';
  constructor(kind: LinearError['kind'], message: string) {
    super(message);
    this.kind = kind;
  }
}

type GraphqlBody<T> = { data?: T; errors?: { message: string; extensions?: { code?: string; type?: string } }[] };

/** One GraphQL call through the host's Linear connection. */
export const gql = async <T>(query: string, variables?: Record<string, unknown>): Promise<T> => {
  let result;
  try {
    result = await host.request({
      method: 'POST',
      path: '/graphql',
      body: graphqlBody(query, variables),
    });
  } catch (error) {
    if (error instanceof HostRequestError) {
      if (error.code === 'DISCONNECTED' || error.code === 'NO_INTEGRATION') {
        throw new LinearError('disconnected', 'Linear is not connected.');
      }
      throw new LinearError('network', error.message || 'Could not reach Linear.');
    }
    throw new LinearError('network', error instanceof Error ? error.message : 'Could not reach Linear.');
  }
  let parsed: GraphqlBody<T>;
  try {
    parsed = JSON.parse(result.body) as GraphqlBody<T>;
  } catch {
    throw new LinearError('network', `Linear answered with status ${result.status}.`);
  }
  if (result.status === 401) throw new LinearError('disconnected', 'Linear sign-in expired.');
  if (parsed.errors?.length) {
    const first = parsed.errors[0]!;
    const limited = first.extensions?.code === 'RATELIMITED' || first.extensions?.type === 'ratelimited';
    throw new LinearError(limited ? 'rate-limited' : 'graphql', first.message);
  }
  if (!parsed.data) throw new LinearError('graphql', 'Linear returned no data.');
  return parsed.data;
};
