import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SeraClient } from '../src/client.js';
import { ISeraSigner } from '../src/auth/types.js';
import { RawCreateOrderResponse, RawCancelOrderResponse, RawOrder } from '../src/types/api/index.js';
import { OrderSide, OrderStatus, TimeInForce } from '../src/types/enums/index.js';
import { OrderId } from '../src/types/shared/branded.js';

describe('OrdersModule and Query Builder Integration Tests', () => {
  let client: SeraClient;
  let mockSigner: ISeraSigner;
  const originalFetch = globalThis.fetch;

  const mockRawCreate: RawCreateOrderResponse = {
    order_id: 'order_uuid_abc',
    status: 'open',
    remaining_amount: '500.00',
  };

  const mockRawCancel: RawCancelOrderResponse = {
    order_id: 'order_uuid_abc',
    status: 'cancelled',
  };

  const mockRawOrder: RawOrder = {
    id: 'order_uuid_abc',
    market: 'USDC/EURC',
    side: 'buy',
    amount: '500.00',
    price: '0.925',
    remaining_amount: '200.00',
    status: 'partially_filled',
    created_at: 1700000000,
    time_in_force: 'GTC',
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

  it('should place an order automatically executing signing pipeline in orders.create()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawCreate),
    } as any);

    const beforeCreateHook = vi.fn();
    const afterCreateHook = vi.fn();
    client.hooks.on('beforeOrderCreate', beforeCreateHook);
    client.hooks.on('afterOrderCreate', afterCreateHook);

    const order = await client.orders.create({
      market: 'USDC/EURC',
      side: OrderSide.BUY,
      amount: '500.00',
      price: '0.925',
    });

    expect(order.id).toBe('order_uuid_abc');
    expect(order.remainingAmount).toBe('500.00');
    expect(order.status).toBe(OrderStatus.OPEN);
    expect(mockSigner.signTypedData).toHaveBeenCalledTimes(1);

    expect(beforeCreateHook).toHaveBeenCalledTimes(1);
    expect(afterCreateHook).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('should cancel an order with sign verification in orders.cancel()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawCancel),
    } as any);

    const result = await client.orders.cancel('order_uuid_abc' as OrderId);

    expect(result.orderId).toBe('order_uuid_abc');
    expect(result.status).toBe(OrderStatus.CANCELLED);
    expect(mockSigner.signTypedData).toHaveBeenCalledTimes(1);
  });

  it('should fetch order details in orders.get()', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify(mockRawOrder),
    } as any);

    const order = await client.orders.get('order_uuid_abc' as OrderId);

    expect(order.id).toBe('order_uuid_abc');
    expect(order.side).toBe(OrderSide.BUY);
    expect(order.status).toBe(OrderStatus.PARTIALLY_FILLED);
  });

  it('should run queries through the fluent OrderQueryBuilder', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      text: async () => JSON.stringify([mockRawOrder]),
    } as any);

    const orders = await client.orders
      .query()
      .market('USDC/EURC')
      .side(OrderSide.BUY)
      .status(OrderStatus.PARTIALLY_FILLED)
      .limit(10)
      .fetch();

    expect(orders.length).toBe(1);
    expect(orders[0].id).toBe('order_uuid_abc');

    const [calledUrl] = vi.mocked(globalThis.fetch).mock.calls[0] as [string, RequestInit];
    expect(calledUrl).toContain('market=USDC%2FEURC');
    expect(calledUrl).toContain('side=BUY');
    expect(calledUrl).toContain('status=PARTIALLY_FILLED');
    expect(calledUrl).toContain('limit=10');
  });
});
