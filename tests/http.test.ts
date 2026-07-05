import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SeraClient } from '../src/client.js';
import { HttpClient } from '../src/http/client.js';
import { Middleware } from '../src/http/middleware.js';
import { SeraTransportError } from '../src/http/types.js';

describe('HttpClient Transport Layer Tests', () => {
  let client: SeraClient;
  let httpClient: HttpClient;
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
    client = new SeraClient({
      apiKey: 'test_api_key_12345678',
      baseUrl: 'https://api-test.sera.cx',
      environment: 'custom',
    });
    httpClient = new HttpClient(client.context);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('should execute basic GET request with query params and parse JSON response', async () => {
    const mockResponseData = { success: true, balance: '100.0' };
    const mockHeaders = new Headers({ 'content-type': 'application/json' });

    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: mockHeaders,
      text: async () => JSON.stringify(mockResponseData),
    } as any);

    const result = await httpClient.get<{ success: boolean; balance: string }>('/balances', {
      query: { address: '0x123', status: 'active' },
    });

    expect(result).toEqual(mockResponseData);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    const [calledUrl, calledOptions] = vi.mocked(globalThis.fetch).mock.calls[0] as [string, RequestInit];
    expect(calledUrl).toBe('https://api-test.sera.cx/balances?address=0x123&status=active');
    expect(calledOptions.method).toBe('GET');

    const headers = calledOptions.headers as Record<string, string>;
    expect(headers['x-api-key']).toBe('test_api_key_12345678');
    expect(headers['x-correlation-id']).toBeDefined();
  });

  it('should mask the API key in debug logs', async () => {
    let debugLoggedSecret = false;
    const customLogger = {
      debug: vi.fn((msg) => {
        if (msg.includes('test_api_key_12345678')) {
          debugLoggedSecret = true;
        }
      }),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    client = new SeraClient({
      apiKey: 'test_api_key_12345678',
      baseUrl: 'https://api-test.sera.cx',
      environment: 'custom',
      debug: true,
      logger: customLogger,
    });
    httpClient = new HttpClient(client.context);

    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers(),
      text: async () => 'ok',
    } as any);

    await httpClient.get('/health');
    expect(debugLoggedSecret).toBe(false);
    expect(customLogger.debug).toHaveBeenCalled();
  });

  it('should execute middlewares in correct order (beforeRequest, afterResponse)', async () => {
    const trace: string[] = [];

    const testMiddleware: Middleware = {
      name: 'test-middleware',
      beforeRequest: (ctx) => {
        trace.push('before');
        ctx.headers['x-custom-header'] = 'mutated';
        return ctx;
      },
      afterResponse: (ctx) => {
        trace.push('after');
        return ctx;
      },
    };

    client = new SeraClient({
      baseUrl: 'https://api-test.sera.cx',
      environment: 'custom',
      middlewares: [testMiddleware],
    });
    httpClient = new HttpClient(client.context);

    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers(),
      text: async () => 'ok',
    } as any);

    await httpClient.get('/health');
    expect(trace).toEqual(['before', 'after']);

    const [, calledOptions] = vi.mocked(globalThis.fetch).mock.calls[0] as [string, RequestInit];
    const headers = calledOptions.headers as Record<string, string>;
    expect(headers['x-custom-header']).toBe('mutated');
  });

  it('should retry on retryable HTTP errors (503) and then succeed', async () => {
    vi.mocked(globalThis.fetch)
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers(),
        text: async () => 'Service Unavailable',
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        text: async () => JSON.stringify({ ok: true }),
      } as any);

    const result = await httpClient.get('/health', { maxRetries: 2 });
    expect(result).toEqual({ ok: true });
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });

  it('should not retry on non-retryable HTTP errors (401)', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      headers: new Headers(),
      text: async () => 'Unauthorized',
    } as any);

    await expect(httpClient.get('/health')).rejects.toThrow(SeraTransportError);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('should fail on timeout using AbortController', async () => {
    vi.mocked(globalThis.fetch).mockImplementationOnce(async (_, options) => {
      return new Promise((_, reject) => {
        options?.signal?.addEventListener('abort', () => {
          reject(new DOMException('The operation was aborted due to timeout.', 'TimeoutError'));
        });
      });
    });

    await expect(httpClient.get('/health', { timeout: 10 })).rejects.toThrow(
      'The operation was aborted due to timeout.'
    );
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('should support manual cancellation via AbortSignal', async () => {
    const controller = new AbortController();

    vi.mocked(globalThis.fetch).mockImplementationOnce(async (_, options) => {
      return new Promise((_, reject) => {
        options?.signal?.addEventListener('abort', () => {
          reject(new DOMException('The user aborted a request.', 'AbortError'));
        });
      });
    });

    setTimeout(() => controller.abort(), 5);

    await expect(httpClient.get('/health', { signal: controller.signal })).rejects.toThrow(
      'The user aborted a request.'
    );
  });
});
