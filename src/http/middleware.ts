import { RequestContext, ResponseContext } from './types.js';

/**
 * Interface that all HTTP interceptor middlewares must implement.
 */
export interface Middleware {
  readonly name: string;

  /**
   * Executed sequentially before fetch is triggered.
   * Can inspect or mutate the RequestContext. Returning a mutated RequestContext overrides the active one.
   */
  beforeRequest?(
    context: RequestContext
  ): Promise<RequestContext | void> | RequestContext | void;

  /**
   * Executed sequentially after a successful (ok) response is received.
   * Can inspect or mutate the ResponseContext. Returning a mutated ResponseContext overrides the active one.
   */
  afterResponse?(
    context: ResponseContext
  ): Promise<ResponseContext | void> | ResponseContext | void;

  /**
   * Executed sequentially when a request fails due to status code, abort, or network drop.
   * Can inspect or replace the thrown Error. Returning a new Error overrides the active one.
   */
  onError?(
    context: RequestContext & { error: Error; durationMs: number }
  ): Promise<Error | void> | Error | void;
}
