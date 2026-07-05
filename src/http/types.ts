import { SeraClient } from '../client.js';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Options specified on individual request invocations.
 */
export interface HttpRequestOptions {
  path: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, any>;
  body?: any;
  signal?: AbortSignal;
  timeout?: number;
  maxRetries?: number;
  debug?: boolean;
}

/**
 * Execution context of an outbound request passed through middleware.
 */
export interface RequestContext {
  readonly path: string;
  readonly method: HttpMethod;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body?: any;
  readonly requestId: string;
  readonly attempt: number;
  readonly options: HttpRequestOptions;
  readonly client: SeraClient;
}

/**
 * Execution context of a received response passed through middleware.
 */
export interface ResponseContext extends RequestContext {
  readonly response: Response;
  readonly rawBody: string;
  readonly parsedBody: any;
  readonly status: number;
  readonly responseHeaders: Record<string, string>;
  readonly durationMs: number;
}

/**
 * A rich error containing diagnostic transport metadata from failed requests.
 */
export class SeraTransportError extends Error {
  public readonly status?: number;
  public readonly url: string;
  public readonly method: HttpMethod;
  public readonly headers: Record<string, string>;
  public readonly requestId: string;
  public readonly durationMs: number;
  public readonly rawResponse?: string;

  constructor(
    message: string,
    metadata: {
      status?: number;
      url: string;
      method: HttpMethod;
      headers: Record<string, string>;
      requestId: string;
      durationMs: number;
      rawResponse?: string;
    },
    originalError?: Error
  ) {
    super(message);
    this.name = 'SeraTransportError';
    this.status = metadata.status;
    this.url = metadata.url;
    this.method = metadata.method;
    this.headers = metadata.headers;
    this.requestId = metadata.requestId;
    this.durationMs = metadata.durationMs;
    this.rawResponse = metadata.rawResponse;
    if (originalError?.stack) {
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
