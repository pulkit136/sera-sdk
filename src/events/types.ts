import { SwapQuote, SwapResult, LimitOrder } from '../types/index.js';

export interface SwapSimulation {
  readonly expectedOutputAmount: string;
  readonly protocolFee: string;
  readonly priceImpactBps: number;
  readonly route: readonly any[];
  readonly warnings: readonly string[];
}

export interface SdkEvents {
  'swap:executed': { amount: string; inputToken: string; outputToken: string; txHash: string };
  'swap:quote': { quote: SwapQuote };
  'swap:simulation': { simulation: SwapSimulation };
  'swap:submitted': { quoteId: string };
  'swap:completed': { result: SwapResult };
  'swap:failed': { error: Error };
  'order:created': { order: LimitOrder };
  'order:cancelled': { orderId: any };
  'order:updated': { order: LimitOrder };
  'order:list': { orders: readonly LimitOrder[] };
  'order:failed': { error: Error };
  'balance:loaded': { balances: any };
  'balance:refreshed': { balances: any };
  'balance:cacheHit': { address: string };
  'balance:failed': { error: Error };
  'system:loaded': { type: string; data: any };
  'system:refreshed': { type: string; data: any };
  'system:cacheHit': { key: string };
  'system:failed': { error: Error };
  'payment:prepared': { intent: any };
  'payment:submitted': { paymentId: string };
  'payment:completed': { result: any };
  'payment:failed': { error: Error };
  'payment:statusChanged': { paymentId: string; status: string };
  'virtualLiquidity:created': { batch: any };
  'virtualLiquidity:cancelled': { batchId: any };
  'virtualLiquidity:updated': { batch: any };
  'virtualLiquidity:failed': { error: Error };
  'rate_limit:exceeded': { retryAfterSeconds: number };
  'error:thrown': { error: Error };
}
