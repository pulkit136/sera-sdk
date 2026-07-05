// Lifecycle hooks type definitions

export interface HookPayloads {
  'client:init': { config: any };
  'beforeRequest': { path: string; method: string; body?: any; headers?: Record<string, string> };
  'afterRequest': { path: string; method: string; status: number; durationMs: number; response?: any };
  'beforeSign': { domain: any; types: any; value: any };
  'afterSign': { domain: any; signature: string };
  'beforeSwap': { from: string; to: string; amount: string; slippageToleranceBps?: number; recipient?: string };
  'afterSwap': { txHash: string; status: string };
  'beforeQuote': { inputToken: string; outputToken: string; amount: string };
  'afterQuote': { quote: any };
  'beforeOrder': { path: string; method: string; body?: any };
  'afterOrder': { path: string; status: number; durationMs: number; response?: any };
  'beforeOrderCreate': { market: string; side: string; amount: string; price: string };
  'afterOrderCreate': { order: any };
  'beforeOrderCancel': { orderId: any };
  'afterOrderCancel': { orderId: any; status: string };
  'beforeBalanceLoad': { address?: string };
  'afterBalanceLoad': { balances: any };
  'beforeSystemRequest': { type: string };
  'afterSystemRequest': { type: string; durationMs: number };
  'beforePayment': { recipient: string; amount: string; asset: string; memo?: string };
  'afterPayment': { paymentId: string; status: string };
  'beforePaymentSign': { intent: any };
  'afterPaymentSign': { intent: any; signature: string };
  'beforeVirtualLiquidity': { action: string; params: any };
  'afterVirtualLiquidity': { action: string; result: any };
  'beforeVirtualLiquiditySign': { intent: any };
  'afterVirtualLiquiditySign': { intent: any; signature: string };
  [customHook: string]: any; // Allow custom hooks as well
}
