import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SeraClient } from '../src/client.js';
import { ISeraSigner } from '../src/auth/types.js';
import { RawCreateVlBatchResponse, RawVirtualLiquidityBatch } from '../src/types/api/index.js';
import { OrderSide, LiquidityStatus } from '../src/types/enums/index.js';
import { BatchId } from '../src/types/shared/branded.js';

describe('VirtualLiquidityModule Integration Pipeline Tests', () => {
  let client: SeraClient;
  let mockSigner: ISeraSigner;
  const originalFetch = globalThis.fetch;

  const mockRawCreate: RawCreateVlBatchResponse = {
    batch_id: 'batch_uuid_123',
    status: 'active',
    active_orders: ['order_sub_0', 'order_sub_1'],
  };

  const mockRawBatch: RawVirtualLiquidityBatch = {
    batch_id: 'batch_uuid_123',
    shared_budget: '15000.00',
    orders: [
      {
        id: 'order_sub_0',
        market: 'USDC/EURC',
        side: 'buy',
        amount: '1000.00',
        price: '0.925',
        remaining_amount: '1000.00',
        status: 'open',
        created_at: 1700000000,
        time_in_force: 'GTC',
      },
    ],
    status: 'active',
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

  it('should create a batch automatically executing signing pipeline in virtualLiquidity.createBatch()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawCreate),
    } as any);

    const beforeVlHook = vi.fn();
    const afterVlHook = vi.fn();
    client.hooks.on('beforeVirtualLiquidity', beforeVlHook);
    client.hooks.on('afterVirtualLiquidity', afterVlHook);

    const batch = await client.virtualLiquidity.createBatch({
      sharedBudget: '15000.00',
      orders: [
        { market: 'USDC/EURC', side: OrderSide.BUY, amount: '1000.00', price: '0.925' },
        { market: 'USDC/EURC', side: OrderSide.SELL, amount: '500.00', price: '0.930' },
      ],
    });

    expect(batch.batchId).toBe('batch_uuid_123');
    expect(batch.sharedBudget).toBe('15000.00');
    expect(batch.status).toBe(LiquidityStatus.ACTIVE);
    expect(batch.orders.length).toBe(2);
    expect(mockSigner.signTypedData).toHaveBeenCalledTimes(1);

    expect(beforeVlHook).toHaveBeenCalledTimes(1);
    expect(afterVlHook).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('should cancel a batch via virtualLiquidity.cancelBatch()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify({ batch_id: 'batch_uuid_123', status: 'cancelled' }),
    } as any);

    const result = await client.virtualLiquidity.cancelBatch('batch_uuid_123' as BatchId);

    expect(result.batchId).toBe('batch_uuid_123');
    expect(result.status).toBe(LiquidityStatus.CANCELLED);
    expect(mockSigner.signTypedData).toHaveBeenCalledTimes(1);
  });

  it('should fetch batch details via virtualLiquidity.batch()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawBatch),
    } as any);

    const batch = await client.virtualLiquidity.batch('batch_uuid_123' as BatchId);

    expect(batch.batchId).toBe('batch_uuid_123');
    expect(batch.orders[0].id).toBe('order_sub_0');
  });

  it('should estimate batch deploying costs via virtualLiquidity.estimate()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify({ estimated_gas: '200000', fee_amount: '1.50' }),
    } as any);

    const est = await client.virtualLiquidity.estimate({
      sharedBudget: '15000.00',
      orderCount: 5,
    });

    expect(est.estimatedGas).toBe('200000');
    expect(est.feeAmount).toBe('1.50');
  });
});
