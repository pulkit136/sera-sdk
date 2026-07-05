import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SeraClient } from '../src/client.js';
import { Chain, AssetType, RawHealthResponse, RawToken, RawMarket } from '../src/index.js';

describe('SystemModule Metadata and Caching Tests', () => {
  let client: SeraClient;
  const originalFetch = globalThis.fetch;

  const mockRawHealth: RawHealthResponse = {
    status: 'healthy',
    version: '1.0.0',
    timestamp: '2026-07-05T12:00:00Z',
    executor_status: 'operational',
    signature_ready: true,
  };

  const mockRawConfig = {
    verifying_contract: '0x1234567890123456789012345678901234567890',
    chain_id: 1,
    protocol_fee_bps: 10,
  };

  const mockRawToken: RawToken = {
    symbol: 'USDC',
    decimals: 6,
    contract_address: '0xUSDCAddress',
    minimum_trade_amount: '1.00',
  };

  const mockRawMarket: RawMarket = {
    symbol: 'USDC/EURC',
    base_token: mockRawToken,
    quote_token: {
      symbol: 'EURC',
      decimals: 18,
      contract_address: '0xEURCAddress',
      minimum_trade_amount: '1.00',
    },
    min_tick_size: '0.0001',
    min_order_size: '1.00',
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn();
    client = new SeraClient({
      apiKey: 'test_key',
      baseUrl: 'https://api.sera.cx/api/v1',
      environment: 'custom',
    });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('should fetch health details and convert snake_case to camelCase', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawHealth),
    } as any);

    const beforeSystem = vi.fn();
    client.hooks.on('beforeSystemRequest', beforeSystem);

    const health = await client.system.health();

    expect(health.status).toBe('healthy');
    expect(health.executorStatus).toBe('operational');
    expect(health.signatureReady).toBe(true);
    expect(beforeSystem).toHaveBeenCalledTimes(1);
  });

  it('should fetch configuration settings', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawConfig),
    } as any);

    const config = await client.system.config();

    expect(config.verifyingContract).toBe('0x1234567890123456789012345678901234567890');
    expect(config.chainId).toBe(1);
    expect(config.protocolFeeBps).toBe(10);
  });

  it('should fetch tokens and support single lookup', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify([mockRawToken]),
    } as any);

    const token = await client.system.token('USDC');

    expect(token).toBeDefined();
    expect(token?.decimals).toBe(6);
    expect(token?.contractAddress).toBe('0xUSDCAddress');
  });

  it('should fetch markets and support single lookup', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify([mockRawMarket]),
    } as any);

    const market = await client.system.market('USDC/EURC');

    expect(market).toBeDefined();
    expect(market?.minTickSize).toBe('0.0001');
    expect(market?.baseToken.symbol).toBe('USDC');
  });

  it('should serve system calls from cache and support manual eviction', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawHealth),
    } as any);

    const cacheHitListener = vi.fn();
    client.events.on('system:cacheHit', cacheHitListener);

    // Call 1: HTTP request
    await client.system.health();
    // Call 2: cache hit
    await client.system.health();

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(cacheHitListener).toHaveBeenCalledTimes(1);

    // Evict cache
    client.system.refresh();

    // Call 3: HTTP request again
    await client.system.health();
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });

  it('should return supported chains and assets', () => {
    const chains = client.system.supportedChains();
    const assets = client.system.supportedAssets();

    expect(chains).toContain(Chain.ETHEREUM);
    expect(assets).toContain(AssetType.FIAT_STABLE);
  });
});
