import crypto from 'crypto';

/**
 * Returns a promise that resolves after the specified milliseconds.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates a unique correlation UUID for logging and tracing.
 */
export function generateRequestId(): string {
  // Browser + Node.js environment safe randomUUID
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return crypto.randomUUID();
}

/**
 * Mask API keys or sensitive header values in logging output.
 */
export function maskSecret(value?: string): string {
  if (!value) return '';
  if (value.length <= 8) return '********';
  return `${value.substring(0, 4)}...${value.substring(value.length - 4)}`;
}

/**
 * Merges multiple header sources into a normalized record.
 */
export function mergeHeaders(...sources: Array<Record<string, string> | Headers | undefined>): Record<string, string> {
  const merged: Record<string, string> = {};

  for (const source of sources) {
    if (!source) continue;
    if (source instanceof Headers) {
      source.forEach((val, key) => {
        merged[key.toLowerCase()] = val;
      });
    } else {
      for (const [key, val] of Object.entries(source)) {
        merged[key.toLowerCase()] = val;
      }
    }
  }

  return merged;
}

/**
 * Serializes a query object into a URL query string, filtering undefined values.
 */
export function serializeQueryParams(params?: Record<string, any>): string {
  if (!params) return '';
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.set(key, String(value));
      }
    }
  }

  const queryStr = searchParams.toString();
  return queryStr ? `?${queryStr}` : '';
}

/**
 * Computes exponential backoff delay with random jitter.
 */
export function calculateBackoff(attempt: number, baseDelayMs = 500, maxDelayMs = 10000): number {
  const exp = Math.min(attempt, 6); // Cap exponent to prevent overflow
  const delayMs = baseDelayMs * Math.pow(2, exp);
  const jitter = Math.random() * 200; // Add up to 200ms randomized jitter
  return Math.min(delayMs + jitter, maxDelayMs);
}
