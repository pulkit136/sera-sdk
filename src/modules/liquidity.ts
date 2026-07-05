import { BaseModule } from './base.js';
import { VirtualLiquidityBatch, LimitOrder } from '../types/domain/index.js';
import { RawCreateVlBatchResponse, RawVirtualLiquidityBatch, RawOrder } from '../types/api/index.js';
import { BatchId, OrderId } from '../types/shared/branded.js';
import { LiquidityStatus, OrderSide, OrderStatus, TimeInForce } from '../types/enums/index.js';
import { SigningPipeline } from '../auth/pipeline.js';

/**
 * Module responsible for virtual liquidity operations and managing shared budget batches.
 */
export class VirtualLiquidityModule extends BaseModule {

  /**
   * Orchestrates the creation of a virtual liquidity batch.
   */
  public async createBatch(params: {
    sharedBudget: string;
    orders: readonly {
      market: string;
      side: OrderSide | 'BUY' | 'SELL';
      amount: string;
      price: string;
    }[];
  }): Promise<VirtualLiquidityBatch> {
    const { hooks, events, config } = this.context;

    // 1. Emit beforeVirtualLiquidity hook
    await hooks.emit('beforeVirtualLiquidity', { action: 'create', params });

    config.logger.debug(`[Virtual Liquidity] Creating shared budget batch: Budget=${params.sharedBudget}, OrdersCount=${params.orders.length}`);

    try {
      // 2. Prepare EIP-712 payload
      const intent = this.prepare(params);

      // 3. Sign EIP-712 payload
      const signature = await this.sign(intent);

      // 4. Submit to matching engine endpoint
      const result = await this.submit({
        sharedBudget: params.sharedBudget,
        orders: params.orders,
        signature,
      });

      // Synthesize matching order objects
      const matchedOrders: LimitOrder[] = params.orders.map((o, idx) => ({
        id: (result.active_orders[idx] ?? `order_sub_${idx}`) as OrderId,
        market: o.market,
        side: o.side as OrderSide,
        amount: o.amount,
        price: o.price,
        remainingAmount: o.amount,
        status: OrderStatus.OPEN,
        createdAt: Date.now(),
        timeInForce: TimeInForce.GOOD_TILL_CANCELLED,
      }));

      const batch: VirtualLiquidityBatch = {
        batchId: result.batch_id as BatchId,
        sharedBudget: params.sharedBudget,
        orders: matchedOrders,
        status: result.status.toUpperCase() as LiquidityStatus,
      };

      // 5. Emit afterVirtualLiquidity hook & created event
      await hooks.emit('afterVirtualLiquidity', { action: 'create', result: batch });
      events.emit('virtualLiquidity:created', { batch });

      return batch;
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      events.emit('virtualLiquidity:failed', { error: errorObject });
      throw errorObject;
    }
  }

  /**
   * Cancel an active virtual liquidity batch, signing a cancellation payload.
   */
  public async cancelBatch(batchId: BatchId): Promise<{ batchId: BatchId; status: LiquidityStatus }> {
    const { hooks, events, httpClient, config } = this.context;

    await hooks.emit('beforeVirtualLiquidity', { action: 'cancel', params: { batchId } });

    config.logger.debug(`[Virtual Liquidity] Cancelling batch: ${batchId}`);

    try {
      const cancelIntent = { batchId };
      const cancelTypes = {
        CancelVlBatch: [{ name: 'batchId', type: 'string' }],
      };

      const domain = {
        name: 'Sera',
        version: '1',
        chainId: 1,
        verifyingContract: '0x1234567890123456789012345678901234567890' as `0x${string}`,
      };

      const pipeline = new SigningPipeline(this.context);
      const signature = await pipeline.sign(domain, cancelTypes, cancelIntent);

      const rawResponse = await httpClient.post<{ batch_id: string; status: string }>('/virtual-liquidity/batches/cancel', {
        batch_id: batchId,
        signature,
      });

      const status = rawResponse.status.toUpperCase() as LiquidityStatus;
      events.emit('virtualLiquidity:cancelled', { batchId });

      return {
        batchId: rawResponse.batch_id as BatchId,
        status,
      };
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      events.emit('virtualLiquidity:failed', { error: errorObject });
      throw errorObject;
    }
  }

  /**
   * Retrieve detail of a specific virtual liquidity batch.
   */
  public async batch(batchId: BatchId): Promise<VirtualLiquidityBatch> {
    const { httpClient } = this.context;
    const raw = await httpClient.get<RawVirtualLiquidityBatch>(`/virtual-liquidity/batches/${batchId}`);
    return this.mapRawBatch(raw);
  }

  /**
   * List virtual liquidity batches.
   */
  public async list(filters?: { limit?: number; offset?: number }): Promise<readonly VirtualLiquidityBatch[]> {
    const { httpClient } = this.context;
    const rawList = await httpClient.get<readonly RawVirtualLiquidityBatch[]>('/virtual-liquidity/batches', {
      query: filters,
    });
    return rawList.map((raw) => this.mapRawBatch(raw));
  }

  /**
   * Retrieve the status of a specific batch.
   */
  public async status(batchId: BatchId): Promise<LiquidityStatus> {
    const batchDetails = await this.batch(batchId);
    return batchDetails.status;
  }

  /**
   * Estimate fee metrics for deploying a virtual liquidity batch.
   */
  public async estimate(params: { sharedBudget: string; orderCount: number }): Promise<{ estimatedGas: string; feeAmount: string }> {
    const { httpClient } = this.context;
    const rawResponse = await httpClient.get<{ estimated_gas: string; fee_amount: string }>('/virtual-liquidity/batches/estimate', {
      query: {
        shared_budget: params.sharedBudget,
        order_count: params.orderCount,
      },
    });

    return {
      estimatedGas: rawResponse.estimated_gas,
      feeAmount: rawResponse.fee_amount,
    };
  }

  /**
   * Formats the intent value configuration.
   */
  public prepare(params: {
    sharedBudget: string;
    orders: readonly {
      market: string;
      side: OrderSide | 'BUY' | 'SELL';
      amount: string;
      price: string;
    }[];
  }) {
    return {
      sharedBudget: params.sharedBudget,
      orders: params.orders.map((o) => ({
        market: o.market,
        side: o.side,
        amount: o.amount,
        price: o.price,
      })),
    };
  }

  /**
   * Invokes signature pipeline over batch parameters.
   */
  public async sign(intent: any): Promise<string> {
    const { hooks } = this.context;

    await hooks.emit('beforeVirtualLiquiditySign', { intent });

    const vlTypes = {
      VirtualLiquidity: [
        { name: 'sharedBudget', type: 'uint256' },
        { name: 'orders', type: 'Order[]' },
      ],
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
      chainId: 1,
      verifyingContract: '0x1234567890123456789012345678901234567890' as `0x${string}`,
    };

    const pipeline = new SigningPipeline(this.context);
    const signature = await pipeline.sign(domain, vlTypes, intent);

    await hooks.emit('afterVirtualLiquiditySign', { intent, signature });

    return signature;
  }

  /**
   * Submits batch to executor.
   */
  public async submit(params: {
    sharedBudget: string;
    orders: readonly {
      market: string;
      side: OrderSide | 'BUY' | 'SELL';
      amount: string;
      price: string;
    }[];
    signature: string;
  }): Promise<RawCreateVlBatchResponse> {
    const { httpClient } = this.context;

    return httpClient.post<RawCreateVlBatchResponse>('/virtual-liquidity/batches', {
      shared_budget: params.sharedBudget,
      orders: params.orders.map((o) => ({
        market: o.market,
        side: o.side,
        amount: o.amount,
        price: o.price,
      })),
      signature: params.signature,
    });
  }

  /* UTILITY DATA MAPPERS */

  private mapRawBatch(raw: RawVirtualLiquidityBatch): VirtualLiquidityBatch {
    return {
      batchId: raw.batch_id as BatchId,
      sharedBudget: raw.shared_budget,
      orders: raw.orders.map((rawOrder) => this.mapRawOrder(rawOrder)),
      status: raw.status.toUpperCase() as LiquidityStatus,
    };
  }

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
