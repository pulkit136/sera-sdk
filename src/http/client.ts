import { SdkContext } from '../types/domain/config.js';
import { HttpRequestOptions, RequestContext, ResponseContext, SeraTransportError } from './types.js';
import { generateRequestId, mergeHeaders, serializeQueryParams, calculateBackoff, delay, maskSecret } from '../utils/http.js';

/**
 * Production-grade HTTP client wrapper around native fetch.
 * Acts as the single source of truth for all SDK HTTP communication.
 */
export class HttpClient {
  private readonly context: SdkContext;

  constructor(context: SdkContext) {
    this.context = context;
  }

  /**
   * Send a GET request.
   */
  public async get<TResponse>(
    path: string,
    options?: Omit<HttpRequestOptions, 'path' | 'method'>
  ): Promise<TResponse> {
    return this.request<TResponse>({ ...options, path, method: 'GET' });
  }

  /**
   * Send a POST request.
   */
  public async post<TResponse>(
    path: string,
    body?: any,
    options?: Omit<HttpRequestOptions, 'path' | 'method' | 'body'>
  ): Promise<TResponse> {
    return this.request<TResponse>({ ...options, path, method: 'POST', body });
  }

  /**
   * Send a PUT request.
   */
  public async put<TResponse>(
    path: string,
    body?: any,
    options?: Omit<HttpRequestOptions, 'path' | 'method' | 'body'>
  ): Promise<TResponse> {
    return this.request<TResponse>({ ...options, path, method: 'PUT', body });
  }

  /**
   * Send a PATCH request.
   */
  public async patch<TResponse>(
    path: string,
    body?: any,
    options?: Omit<HttpRequestOptions, 'path' | 'method' | 'body'>
  ): Promise<TResponse> {
    return this.request<TResponse>({ ...options, path, method: 'PATCH', body });
  }

  /**
   * Send a DELETE request.
   */
  public async delete<TResponse>(
    path: string,
    options?: Omit<HttpRequestOptions, 'path' | 'method'>
  ): Promise<TResponse> {
    return this.request<TResponse>({ ...options, path, method: 'DELETE' });
  }

  /**
   * Core request runner that handles timeouts, retries, headers, and middleware hooks.
   */
  public async request<TResponse>(options: HttpRequestOptions): Promise<TResponse> {
    const { config } = this.context;
    const logger = config.logger;
    const isDebug = options.debug ?? config.debug;

    const requestId = generateRequestId();
    const timeout = options.timeout ?? config.timeout ?? 10000;
    const maxRetries = options.maxRetries ?? config.maxRetries ?? 3;

    // Resolve URL with serialized parameters
    const queryString = serializeQueryParams(options.query);
    const fullUrl = new URL(options.path + queryString, config.baseUrl).toString();

    // Compile default and customized headers
    const requestHeaders = mergeHeaders(
      {
        'accept': 'application/json',
        'user-agent': config.userAgent ?? 'sera-sdk-js',
        'x-correlation-id': requestId,
      },
      config.apiKey ? { 'x-api-key': config.apiKey } : {},
      options.body ? { 'content-type': 'application/json' } : {},
      config.headers,
      options.headers
    );

    let attempt = 0;
    const startTime = Date.now();

    while (true) {
      const controller = new AbortController();
      let timeoutId: any = null;

      // Coordinate caller's abort signal
      let onCallerAbort: (() => void) | null = null;
      if (options.signal) {
        if (options.signal.aborted) {
          throw options.signal.reason || new DOMException('The user aborted a request.', 'AbortError');
        }
        onCallerAbort = () => {
          controller.abort(options.signal!.reason);
        };
        options.signal.addEventListener('abort', onCallerAbort);
      }

      let reqContext: RequestContext = {
        path: options.path,
        method: options.method,
        url: fullUrl,
        headers: { ...requestHeaders },
        body: options.body,
        requestId,
        attempt,
        options,
        client: this.context.client,
      };

      try {
        // 1. Run Request Middlewares in order
        const middlewares = config.middlewares || [];
        for (const middleware of middlewares) {
          if (middleware.beforeRequest) {
            const result = await middleware.beforeRequest(reqContext);
            if (result) {
              reqContext = result;
            }
          }
        }

        // Set Timeout
        timeoutId = setTimeout(() => {
          controller.abort(new DOMException('The operation was aborted due to timeout.', 'TimeoutError'));
        }, timeout);

        if (isDebug) {
          const logHeaders = { ...reqContext.headers };
          if (logHeaders['x-api-key']) {
            logHeaders['x-api-key'] = maskSecret(logHeaders['x-api-key']);
          }
          logger.debug(
            `[Http Request] ${reqContext.method} ${reqContext.url} (Request ID: ${reqContext.requestId}, Attempt: ${reqContext.attempt})`,
            {
              headers: logHeaders,
              body: reqContext.body,
            }
          );
        }

        const response = await fetch(reqContext.url, {
          method: reqContext.method,
          headers: reqContext.headers,
          body: reqContext.body ? JSON.stringify(reqContext.body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        if (options.signal && onCallerAbort) {
          options.signal.removeEventListener('abort', onCallerAbort);
        }

        // Read and parse response body
        const rawBody = await this.readResponseBody(response);
        let parsedBody: any = null;
        if (rawBody) {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            try {
              parsedBody = JSON.parse(rawBody);
            } catch {
              parsedBody = rawBody; // Fallback to raw if JSON malformed
            }
          } else {
            parsedBody = rawBody;
          }
        }

        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((val, key) => {
          responseHeaders[key.toLowerCase()] = val;
        });

        // Determine request tracking ID from server or client correlation
        const resolvedRequestId = responseHeaders['x-request-id'] || responseHeaders['request-id'] || requestId;

        if (isDebug) {
          logger.debug(
            `[Http Response] ${response.status} ${reqContext.url} (Request ID: ${reqContext.requestId}, Server ID: ${resolvedRequestId}, Duration: ${Date.now() - startTime}ms, Size: ${rawBody.length} bytes)`
          );
        }

        let respContext: ResponseContext = {
          ...reqContext,
          response,
          rawBody,
          parsedBody,
          status: response.status,
          responseHeaders,
          durationMs: Date.now() - startTime,
        };

        if (response.ok) {
          // 2. Run Response Middlewares in order
          for (const middleware of middlewares) {
            if (middleware.afterResponse) {
              const result = await middleware.afterResponse(respContext);
              if (result) {
                respContext = result;
              }
            }
          }
          return respContext.parsedBody as TResponse;
        }

        // Handle Non-OK response by throwing a rich Transport Error
        throw new SeraTransportError(
          `Request failed with status ${response.status}: ${response.statusText}`,
          {
            status: response.status,
            url: reqContext.url,
            method: reqContext.method,
            headers: respContext.responseHeaders,
            requestId: reqContext.requestId,
            durationMs: respContext.durationMs,
            rawResponse: respContext.rawBody,
          }
        );

      } catch (error: any) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (options.signal && onCallerAbort) {
          options.signal.removeEventListener('abort', onCallerAbort);
        }

        const durationMs = Date.now() - startTime;

        // 3. Run Error Middlewares in order
        let processedError = error;
        const middlewares = config.middlewares || [];
        for (const middleware of middlewares) {
          if (middleware.onError) {
            const result = await middleware.onError({
              ...reqContext,
              error: processedError,
              durationMs,
            });
            if (result) {
              processedError = result;
            }
          }
        }

        const isTimeout =
          processedError.name === 'TimeoutError' ||
          processedError.message?.includes('timeout') ||
          processedError.message?.includes('aborted due to timeout');

        const isAbort =
          processedError.name === 'AbortError' ||
          (options.signal?.aborted && processedError.message?.includes('aborted'));

        // Determine if request qualifies for retry
        let shouldRetry = false;
        if (processedError instanceof SeraTransportError) {
          const status = processedError.status;
          shouldRetry = !!status && [429, 502, 503, 504].includes(status);
        } else if (!isAbort && !isTimeout) {
          // Assume generic TypeError from fetch implies network failure
          shouldRetry = true;
        }

        if (shouldRetry && attempt < maxRetries) {
          attempt++;
          const backoffDelayMs = calculateBackoff(attempt);
          if (isDebug) {
            logger.debug(
              `[Http Retry] Retrying request in ${backoffDelayMs.toFixed(0)}ms (Attempt: ${attempt}/${maxRetries}) due to error: ${processedError.message}`
            );
          }
          await delay(backoffDelayMs);
          continue;
        }

        if (isDebug) {
          logger.error(
            `[Http Error] Request failed: ${processedError.message} (Request ID: ${reqContext.requestId}, Duration: ${durationMs}ms)`
          );
        }

        if (
          processedError instanceof SeraTransportError ||
          processedError.name === 'AbortError' ||
          processedError.name === 'TimeoutError'
        ) {
          throw processedError;
        }

        // Wrap general runtime errors
        throw new SeraTransportError(
          processedError.message || 'Network request failed',
          {
            url: reqContext.url,
            method: reqContext.method,
            headers: reqContext.headers,
            requestId: reqContext.requestId,
            durationMs,
          },
          processedError
        );
      }
    }
  }

  private async readResponseBody(response: Response): Promise<string> {
    try {
      const text = await response.text();
      return text;
    } catch {
      return '';
    }
  }
}

