import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SeraClient } from '../src/client.js';
import { ISeraSigner } from '../src/auth/types.js';
import { RawBalancesResponse } from '../src/types/api/index.js';
import { Address } from '../types/shared/branded.js';

describe('BalancesModule and Caching Integration Tests', () => {
  let client: SeraClient;
  let mockSigner: ISeraSigner;
  const originalFetch = globalThis.fetch;

  const mockRawBalances: RawBalancesResponse = {
    address: '0x1234567890123456789012345678901234567890',
    wallet_balances: {
      USDC: '1500.00',
      EURC: '50.50',
    },
    vault_balances: {
      USDC: {
        available: '1000.00',
        frozen: '200.00',
        total: '1200.00',
      },
    },
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn();
    mockSigner = {
      getAddress: vi.fn().mockResolvedValue('0x1234567890123456789012345678901234567890'),
      signTypedData: vi.fn().mockResolvedValue('0xabcdef'),
    };

    client = new SeraClient({
      apiKey: 'test_key',
      baseUrl: 'https://api.sera.cx/api/v1',
      environment: 'custom',
      signer: mockSigner,
    });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('should fetch balance mapping correctly and map snake_case to camelCase in balances.get()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawBalances),
    } as any);

    const beforeLoad = vi.fn();
    const afterLoad = vi.fn();
    client.hooks.on('beforeBalanceLoad', beforeLoad);
    client.hooks.on('afterBalanceLoad', afterLoad);

    const balances = await client.balances.get();

    expect(balances.address).toBe('0x1234567890123456789012345678901234567890');
    expect(balances.wallet.USDC).toBe('1500.00');
    expect(balances.vault.USDC.available).toBe('1000.00');
    expect(balances.vault.USDC.frozen).toBe('200.00');
    expect(balances.vault.USDC.total).toBe('1200.00');

    expect(beforeLoad).toHaveBeenCalledTimes(1);
    expect(afterLoad).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('should leverage internal caching on consecutive reads', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawBalances),
    } as any);

    const cacheHitListener = vi.fn();
    client.events.on('balance:cacheHit', cacheHitListener);

    // Call 1: HTTP Fetch
    await client.balances.get('0x1234567890123456789012345678901234567890');
    // Call 2: Cache Read
    await client.balances.get('0x1234567890123456789012345678901234567890');

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(cacheHitListener).toHaveBeenCalledTimes(1);
  });

  it('should bypass cache when forceRefresh is requested', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawBalances),
    } as any);

    // Call 1: HTTP Fetch
    await client.balances.get('0x1234567890123456789012345678901234567890');
    // Call 2: Force Refresh HTTP Fetch
    await client.balances.refresh('0x1234567890123456789012345678901234567890');

    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });

  it('should compute helper shortcut results', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawBalances),
    } as any);

    const walletUSDC = await client.balances.wallet('USDC');
    expect(walletUSDC).toBe('1500.00');

    const availableUSDC = await client.balances.available('USDC');
    const frozenUSDC = await client.balances.frozen('USDC');
    const totalUSDC = await client.balances.total('USDC');

    expect(availableUSDC).toBe('1000.00');
    expect(frozenUSDC).toBe('200.00');
    expect(totalUSDC).toBe('1200.00');
  });
});
