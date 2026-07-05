import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SeraClient } from '../src/client.js';
import { ISeraSigner } from '../src/auth/types.js';
import { RawQuoteResponse, RawExecuteSwapResponse } from '../src/types/api/index.js';
import { TransactionStatus } from '../src/types/enums/index.js';

describe('SwapModule Integration Pipeline Tests', () => {
  let client: SeraClient;
  let mockSigner: ISeraSigner;
  const originalFetch = globalThis.fetch;

  const mockRawQuote: RawQuoteResponse = {
    uuid: 'quote_uuid_123',
    input_token: 'USDC',
    output_token: 'EURC',
    input_amount: '1000.00',
    expected_output_amount: '920.00',
    min_output_amount: '915.00',
    route: [
      {
        input_token: '0xUSDC',
        output_token: '0xEURC',
        pool_address: '0xPoolAddr',
        pool_fee_bps: 5,
      },
    ],
    protocol_fee: '0.10',
    expires_at: 1800000000,
    route_params: {
      taker: '0x1234567890123456789012345678901234567890',
      input_token: '0xUSDC',
      output_token: '0xEURC',
      max_input_amount: '1000000000',
      min_output_amount: '915000000',
      recipient: '0xRecipientAddr',
      initial_deposit_amount: '0',
      uuid: '99999999',
      deadline: 1800000000,
      chain_id: 1,
      verifying_contract: '0x1234567890123456789012345678901234567890',
    },
  };

  const mockRawExecute: RawExecuteSwapResponse = {
    tx_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    input_amount_consumed: '1000.00',
    output_amount_received: '920.00',
    status: 'success',
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn();
    mockSigner = {
      getAddress: vi.fn().mockResolvedValue('0x1234567890123456789012345678901234567890'),
      signTypedData: vi.fn().mockResolvedValue('0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab'),
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

  it('should request quote and normalize responses in swap.quote()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawQuote),
    } as any);

    const quote = await client.swap.quote({
      inputToken: 'USDC',
      outputToken: 'EURC',
      amount: '1000.00',
    });

    expect(quote.uuid).toBe('quote_uuid_123');
    expect(quote.expectedOutputAmount).toBe('920.00');
    expect(quote.routeParams.taker).toBe('0x1234567890123456789012345678901234567890');
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('should run simulation in swap.simulate()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawQuote),
    } as any);

    const simulation = await client.swap.simulate({
      from: 'USDC',
      to: 'EURC',
      amount: '1000.00',
    });

    expect(simulation.expectedOutputAmount).toBe('920.00');
    expect(simulation.priceImpactBps).toBeDefined();
    expect(simulation.route.length).toBe(1);
  });

  it('should execute complete pipeline (quote, sign, submit) in swap.execute()', async () => {
    vi.mocked(globalThis.fetch)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        text: async () => JSON.stringify(mockRawQuote),
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        text: async () => JSON.stringify(mockRawExecute),
      } as any);

    const beforeSwapHook = vi.fn();
    const afterSwapHook = vi.fn();
    client.hooks.on('beforeSwap', beforeSwapHook);
    client.hooks.on('afterSwap', afterSwapHook);

    const result = await client.swap.execute({
      from: 'USDC',
      to: 'EURC',
      amount: '1000.00',
    });

    expect(result.txHash).toBe('0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab');
    expect(result.status).toBe(TransactionStatus.SUCCESS);
    expect(mockSigner.signTypedData).toHaveBeenCalledTimes(1);

    expect(beforeSwapHook).toHaveBeenCalledTimes(1);
    expect(afterSwapHook).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });
});
