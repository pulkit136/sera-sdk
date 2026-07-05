/**
 * Raw API payloads mapping exactly to the Sera Protocol REST v1 endpoints.
 * These schemas use snake_case properties, mimicking server JSON formatting.
 */

export interface RawHealthResponse {
  readonly status: string;
  readonly version: string;
  readonly timestamp: string;
  readonly executor_status: string;
  readonly signature_ready: boolean;
}

export interface RawToken {
  readonly symbol: string;
  readonly decimals: number;
  readonly contract_address: string;
  readonly minimum_trade_amount: string;
}

export interface RawMarket {
  readonly symbol: string;
  readonly base_token: RawToken;
  readonly quote_token: RawToken;
  readonly min_tick_size: string;
  readonly min_order_size: string;
}

export interface RawBalanceDetails {
  readonly available: string;
  readonly frozen: string;
  readonly total: string;
}

export interface RawBalancesResponse {
  readonly address: string;
  readonly wallet_balances: Record<string, string>;
  readonly vault_balances: Record<string, RawBalanceDetails>;
}

export interface RawEip712Intent {
  readonly taker: string;
  readonly input_token: string;
  readonly output_token: string;
  readonly max_input_amount: string;
  readonly min_output_amount: string;
  readonly recipient: string;
  readonly initial_deposit_amount: string;
  readonly uuid: string;
  readonly deadline: number;
  readonly chain_id: number;
  readonly verifying_contract: string;
}

export interface RawRouteLeg {
  readonly input_token: string;
  readonly output_token: string;
  readonly pool_address: string;
  readonly pool_fee_bps: number;
}

export interface RawQuoteResponse {
  readonly uuid: string;
  readonly input_token: string;
  readonly output_token: string;
  readonly input_amount: string;
  readonly expected_output_amount: string;
  readonly min_output_amount: string;
  readonly route: readonly RawRouteLeg[];
  readonly protocol_fee: string;
  readonly expires_at: number;
  readonly route_params: RawEip712Intent;
}

export interface RawExecuteSwapRequest {
  readonly quote_id: string;
  readonly signature: string;
  readonly route_params: RawEip712Intent;
}

export interface RawExecuteSwapResponse {
  readonly tx_hash: string;
  readonly input_amount_consumed: string;
  readonly output_amount_received: string;
  readonly status: string;
}

export interface RawCreateOrderRequest {
  readonly market: string;
  readonly side: string;
  readonly amount: string;
  readonly price: string;
  readonly signature: string;
}

export interface RawCreateOrderResponse {
  readonly order_id: string;
  readonly status: string;
  readonly remaining_amount: string;
}

export interface RawCancelOrderRequest {
  readonly order_id: string;
  readonly signature: string;
}

export interface RawCancelOrderResponse {
  readonly order_id: string;
  readonly status: string;
}

export interface RawCreateVlBatchRequest {
  readonly shared_budget: string;
  readonly orders: readonly {
    readonly market: string;
    readonly side: string;
    readonly amount: string;
    readonly price: string;
  }[];
  readonly signature: string;
}

export interface RawCreateVlBatchResponse {
  readonly batch_id: string;
  readonly status: string;
  readonly active_orders: readonly string[];
}

export interface RawOrder {
  readonly id: string;
  readonly market: string;
  readonly side: string;
  readonly amount: string;
  readonly price: string;
  readonly remaining_amount: string;
  readonly status: string;
  readonly created_at: number;
  readonly expires_at?: number;
  readonly time_in_force: string;
}

export interface RawPaymentIntent {
  readonly id: string;
  readonly recipient: string;
  readonly asset: string;
  readonly amount: string;
  readonly fee_amount: string;
  readonly memo?: string;
  readonly verifying_contract: string;
  readonly chain_id: number;
  readonly uuid: string;
  readonly deadline: number;
}

export interface RawPaymentResult {
  readonly payment_id: string;
  readonly tx_hash: string;
  readonly recipient: string;
  readonly asset: string;
  readonly amount: string;
  readonly status: string;
  readonly created_at: number;
}

export interface RawPaymentStatusInfo {
  readonly payment_id: string;
  readonly status: string;
  readonly tx_hash?: string;
  readonly updated_at: number;
}

export interface RawPaymentEstimation {
  readonly estimated_fee: string;
  readonly gas_limit: string;
  readonly route: readonly RawRouteLeg[];
}

export interface RawVirtualLiquidityBatch {
  readonly batch_id: string;
  readonly shared_budget: string;
  readonly orders: readonly RawOrder[];
  readonly status: string;
}
