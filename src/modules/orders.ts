import { BaseModule } from './base.js';
import { LimitOrder } from '../types/domain/index.js';
import { RawCreateOrderResponse, RawCancelOrderResponse, RawOrder } from '../types/api/index.js';
import { OrderId } from '../types/shared/branded.js';
import { OrderSide, OrderStatus, TimeInForce } from '../types/enums/index.js';
import { SigningPipeline } from '../auth/pipeline.js';

/**
 * Fluent query builder to filter and retrieve orders with chained settings.
 */
export class OrderQueryBuilder {
  private readonly module: OrdersModule;
  private readonly filters: {
    market?: string;
    side?: OrderSide;
    status?: OrderStatus;
    limit?: number;
    offset?: number;
  } = {};

  constructor(module: OrdersModule) {
    this.module = module;
  }

  /**
   * Filter orders by market pair (e.g. 'USDC/EURC').
   */
  public market(market: string): this {
    this.filters.market = market;
    return this;
  }

  /**
   * Filter orders by execution side (BUY or SELL).
   */
  public side(side: OrderSide | 'BUY' | 'SELL'): this {
    this.filters.side = side as OrderSide;
    return this;
  }

  /**
   * Filter orders by active status (e.g. OPEN, FILLED).
   */
  public status(status: OrderStatus | 'OPEN' | 'FILLED' | 'PARTIALLY_FILLED' | 'CANCELLED' | 'EXPIRED'): this {
    this.filters.status = status as OrderStatus;
    return this;
  }

  /**
   * Limit the number of query results.
   */
  public limit(limit: number): this {
    this.filters.limit = limit;
    return this;
  }

  /**
   * Specify query offset pagination index.
   */
  public offset(offset: number): this {
    this.filters.offset = offset;
    return this;
  }

  /**
   * Execute the query and return matching limit orders.
   */
  public async fetch(): Promise<readonly LimitOrder[]> {
    return this.module.list(this.filters);
  }
}

/**
 * Module for placing, cancelling, and querying limit orders in the CLOB.
 */
export class OrdersModule extends BaseModule {

  /**
   * Places a limit order by building EIP-712 parameters, requesting signatures, and submitting to matching ledger.
   */
  public async create(params: {
    market: string;
    side: OrderSide | 'BUY' | 'SELL';
    amount: string;
    price: string;
    timeInForce?: TimeInForce;
  }): Promise<LimitOrder> {
    const { hooks, events, config } = this.context;

    // 1. Emit beforeOrderCreate hook
    await hooks.emit('beforeOrderCreate', params);
    
    config.logger.debug(`[Orders Module] Initiating order creation: ${params.side} ${params.amount} ${params.market} @ ${params.price}`);

    try {
      const intent = this.buildIntent({
        market: params.market,
        side: params.side as OrderSide,
        amount: params.amount,
        price: params.price,
      });

      // 2. Sign EIP-712 payload via pipeline
      const signature = await this.sign(intent);

      // 3. Submit payload to order book execution matching system
      const result = await this.submit({
        market: params.market,
        side: params.side as OrderSide,
        amount: params.amount,
        price: params.price,
        signature,
      });

      const order: LimitOrder = {
        id: result.order_id as OrderId,
        market: params.market,
        side: params.side as OrderSide,
        amount: params.amount,
        price: params.price,
        remainingAmount: result.remaining_amount,
        status: result.status.toUpperCase() as OrderStatus,
        createdAt: Date.now(),
        timeInForce: params.timeInForce ?? TimeInForce.GOOD_TILL_CANCELLED,
      };

      // 4. Emit afterOrderCreate hook & created event
      await hooks.emit('afterOrderCreate', { order });
      events.emit('order:created', { order });

      return order;
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      events.emit('order:failed', { error: errorObject });
      throw errorObject;
    }
  }

  /**
   * Cancel an open limit order, signing EIP-712 cancellation instruction.
   */
  public async cancel(orderId: OrderId): Promise<{ orderId: OrderId; status: OrderStatus }> {
    const { hooks, events, httpClient, config } = this.context;

    // 1. Emit beforeOrderCancel hook
    await hooks.emit('beforeOrderCancel', { orderId });

    config.logger.debug(`[Orders Module] Cancelling limit order: ${orderId}`);

    try {
      // 2. Construct cancel intent types
      const cancelIntent = { orderId };
      const cancelTypes = {
        CancelOrder: [{ name: 'orderId', type: 'string' }],
      };

      const domain = {
        name: 'Sera',
        version: '1',
        chainId: 1, // standard default
        verifyingContract: '0x1234567890123456789012345678901234567890' as `0x${string}`,
      };

      const pipeline = new SigningPipeline(this.context);
      const signature = await pipeline.sign(domain, cancelTypes, cancelIntent);

      const rawResponse = await httpClient.post<RawCancelOrderResponse>('/orders/cancel', {
        order_id: orderId,
        signature,
      });

      const status = rawResponse.status.toUpperCase() as OrderStatus;

      // 3. Emit afterOrderCancel hook & cancelled event
      await hooks.emit('afterOrderCancel', { orderId, status });
      events.emit('order:cancelled', { orderId });

      return {
        orderId: rawResponse.order_id as OrderId,
        status,
      };
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      events.emit('order:failed', { error: errorObject });
      throw errorObject;
    }
  }

  /**
   * Cancel all open orders for the active signer.
   */
  public async cancelAll(): Promise<void> {
    const { httpClient, config } = this.context;
    config.logger.debug('[Orders Module] Batch cancelling all open limit orders.');
    await httpClient.post('/orders/cancel-all', {});
  }

  /**
   * Get detail of a specific order.
   */
  public async get(orderId: OrderId): Promise<LimitOrder> {
    const { httpClient } = this.context;
    const rawOrder = await httpClient.get<RawOrder>(`/orders/${orderId}`);
    return this.mapRawOrder(rawOrder);
  }

  /**
   * List limit orders using paginated parameters.
   */
  public async list(filters?: {
    market?: string;
    side?: OrderSide;
    status?: OrderStatus;
    limit?: number;
    offset?: number;
  }): Promise<readonly LimitOrder[]> {
    const { httpClient, events } = this.context;

    const rawList = await httpClient.get<readonly RawOrder[]>('/orders', {
      query: filters,
    });

    const orders = rawList.map((raw) => this.mapRawOrder(raw));
    events.emit('order:list', { orders });

    return orders;
  }

  /**
   * Returns a fluent query builder to easily chain order filtering.
   */
  public query(): OrderQueryBuilder {
    return new OrderQueryBuilder(this);
  }

  /**
   * Format intent values from order configuration.
   */
  public buildIntent(params: { market: string; side: OrderSide; amount: string; price: string }) {
    return {
      market: params.market,
      side: params.side,
      amount: params.amount,
      price: params.price,
    };
  }

  /**
   * Signs EIP-712 order intent parameters.
   */
  public async sign(intent: any): Promise<string> {
    const pipeline = new SigningPipeline(this.context);

    const orderTypes = {
      Order: [
        { name: 'market', type: 'string' },
        { name: 'side', type: 'string' },
        { name: 'amount', type: 'uint256' },
        { name: 'price', type: 'uint256' },
      ],
    };

    const domain = {
      name: 'Sera',
      version: '1',
      chainId: 1, // standard default
      verifyingContract: '0x1234567890123456789012345678901234567890' as `0x${string}`,
    };

    return pipeline.sign(domain, orderTypes, intent);
  }

  /**
   * Submits order parameters and wallet signature to POST /orders.
   */
  public async submit(params: {
    market: string;
    side: OrderSide;
    amount: string;
    price: string;
    signature: string;
  }): Promise<RawCreateOrderResponse> {
    const { httpClient } = this.context;
    return httpClient.post<RawCreateOrderResponse>('/orders', {
      market: params.market,
      side: params.side,
      amount: params.amount,
      price: params.price,
      signature: params.signature,
    });
  }

  /* UTILITY DATA MAPPERS */

  private mapRawOrder(raw: RawOrder): LimitOrder {
    return {
      id: raw.id as OrderId,
      market: raw.market,
      side: raw.side.toUpperCase() as OrderSide,
      amount: raw.amount,
      price: raw.price,
      remainingAmount: raw.remaining_amount,
      status: raw.status.toUpperCase() as OrderStatus,
      createdAt: raw.created_at,
      expiresAt: raw.expires_at,
      timeInForce: raw.time_in_force as TimeInForce,
    };
  }
}
