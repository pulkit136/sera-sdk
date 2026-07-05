import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SeraClient } from '../src/client.js';
import { ISeraSigner } from '../src/auth/types.js';
import { RawPaymentIntent, RawPaymentResult, RawPaymentStatusInfo, RawPaymentEstimation } from '../src/types/api/index.js';

describe('PaymentsModule Integration Pipeline Tests', () => {
  let client: SeraClient;
  let mockSigner: ISeraSigner;
  const originalFetch = globalThis.fetch;

  const mockRawIntent: RawPaymentIntent = {
    id: 'pay_intent_abc',
    recipient: '0x1234567890123456789012345678901234567890',
    asset: 'USDC',
    amount: '100.00',
    fee_amount: '0.50',
    memo: 'Coffee',
    verifying_contract: '0x1234567890123456789012345678901234567890',
    chain_id: 1,
    uuid: '987654321',
    deadline: 1800000000,
  };

  const mockRawResult: RawPaymentResult = {
    payment_id: 'pay_intent_abc',
    tx_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    recipient: '0x1234567890123456789012345678901234567890',
    asset: 'USDC',
    amount: '100.00',
    status: 'success',
    created_at: 1700000000,
  };

  const mockRawStatus: RawPaymentStatusInfo = {
    payment_id: 'pay_intent_abc',
    status: 'completed',
    tx_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    updated_at: 1700000100,
  };

  const mockRawEstimate: RawPaymentEstimation = {
    estimated_fee: '0.25',
    gas_limit: '150000',
    route: [
      {
        input_token: '0xUSDC',
        output_token: '0xEURC',
        pool_address: '0xPoolAddress',
        pool_fee_bps: 5,
      },
    ],
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn();
    mockSigner = {
      getAddress: vi.fn().mockResolvedValue('0x1234567890123456789012345678901234567890'),
      signTypedData: vi.fn().mockResolvedValue('0x' + 'a'.repeat(130)),
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

  it('should prepare a payment via payments.prepare()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawIntent),
    } as any);

    const intent = await client.payments.prepare({
      recipient: '0x1234567890123456789012345678901234567890',
      amount: '100.00',
      asset: 'USDC',
      memo: 'Coffee',
    });

    expect(intent.id).toBe('pay_intent_abc');
    expect(intent.feeAmount).toBe('0.50');
    expect(intent.recipient).toBe('0x1234567890123456789012345678901234567890');
  });

  it('should execute a complete pay workflow via payments.pay()', async () => {
    vi.mocked(globalThis.fetch)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        text: async () => JSON.stringify(mockRawIntent),
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        text: async () => JSON.stringify(mockRawResult),
      } as any);

    const beforePaymentHook = vi.fn();
    const afterPaymentHook = vi.fn();
    client.hooks.on('beforePayment', beforePaymentHook);
    client.hooks.on('afterPayment', afterPaymentHook);

    const result = await client.payments.pay({
      recipient: '0x1234567890123456789012345678901234567890',
      amount: '100.00',
      asset: 'USDC',
      memo: 'Coffee',
    });

    expect(result.paymentId).toBe('pay_intent_abc');
    expect(result.txHash).toBe('0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab');
    expect(result.status).toBe('success');
    expect(mockSigner.signTypedData).toHaveBeenCalledTimes(1);

    expect(beforePaymentHook).toHaveBeenCalledTimes(1);
    expect(afterPaymentHook).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });

  it('should fetch status details via payments.status()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawStatus),
    } as any);

    const status = await client.payments.status('pay_intent_abc');

    expect(status.paymentId).toBe('pay_intent_abc');
    expect(status.status).toBe('completed');
  });

  it('should estimate fees via payments.estimate()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawEstimate),
    } as any);

    const estimation = await client.payments.estimate({
      amount: '100.00',
      asset: 'USDC',
    });

    expect(estimation.estimatedFee).toBe('0.25');
    expect(estimation.gasLimit).toBe('150000');
    expect(estimation.route.length).toBe(1);
  });
});
