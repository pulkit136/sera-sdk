import { Address, TransactionHash, OrderId, QuoteId, BatchId } from '../shared/branded.js';
import { OrderSide, OrderStatus, LiquidityStatus, TransactionStatus, TimeInForce } from '../enums/index.js';

export * from './config.js';

/**
 * Registry details for supported FX tokens.
 */
export interface TokenInfo {
  /**
   * Currency ticker symbol (e.g., 'USDC', 'EURC').
   */
  readonly symbol: string;
  /**
   * Number of decimals used by the token contract (e.g. 6 for USDC, 18 for EURC).
   */
  readonly decimals: number;
  /**
   * EIP-55 checksum Ethereum address of the ERC-20 contract.
   * @example "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
   */
  readonly contractAddress: Address;
  /**
   * Minimum transaction size allowed for trades in base-10 decimals.
   * @example "5.00"
   */
  readonly minimumTradeAmount: string;
}

/**
 * Configuration and details of an active stablecoin trading pair.
 */
export interface MarketInfo {
  /**
   * Unique pair ticker identifier (e.g., 'USDC/EURC').
   */
  readonly symbol: string;
  /**
   * Target base currency token details (e.g. USDC).
   */
  readonly baseToken: TokenInfo;
  /**
   * Target quote currency token details (e.g. EURC).
   */
  readonly quoteToken: TokenInfo;
  /**
   * Minimum tick price movement in the order book.
   * @example "0.0001"
   */
  readonly minTickSize: string;
  /**
   * Minimum amount size step allowed for orders.
   * @example "1.00"
   */
  readonly minOrderSize: string;
}

/**
 * Collateral breakdown of a stablecoin within the Sera matching Vault.
 */
export interface BalanceDetails {
  /**
   * Available balance ready to be traded or withdrawn, in base-10 decimals.
   * @example "1250.75"
   */
  readonly available: string;
  /**
   * Collateral currently frozen in open limit orders or VL batches, in base-10 decimals.
   * @example "200.00"
   */
  readonly frozen: string;
  /**
   * Total balance currently sitting inside the vault (available + frozen), in base-10 decimals.
   * @example "1450.75"
   */
  readonly total: string;
}

/**
 * Complete balance matrix for an account, splitting wallet and vault states.
 */
export interface AccountBalances {
  /**
   * Ethereum address of the account owner.
   */
  readonly address: Address;
  /**
   * Wallet balance breakdown (in wallet) mapping symbol to base-10 decimal string.
   * @example { USDC: "150.50", EURC: "0.00" }
   */
  readonly wallet: Record<string, string>;
  /**
   * Vault balance details (inside Sera settlement ledger).
   */
  readonly vault: Record<string, BalanceDetails>;
}

/**
 * Parameters to construct a Vault transaction (e.g. deposit or withdrawal).
 */
export interface VaultTransactionParams {
  /**
   * Destination address on-chain.
   */
  readonly to: Address;
  /**
   * Hex encoded calldata payload for execution.
   */
  readonly data: string;
  /**
   * Estimated gas limit required, in base units.
   */
  readonly gasLimit: string;
  /**
   * Maximum priority fee per gas, in Wei base string.
   */
  readonly maxPriorityFeePerGas?: string;
  /**
   * Maximum fee per gas, in Wei base string.
   */
  readonly maxFeePerGas?: string;
}

/**
 * Represents a limit order in the Sera Central Limit Order Book (CLOB).
 */
export interface LimitOrder {
  /**
   * Unique order identifier.
   */
  readonly id: OrderId;
  /**
   * The market ticker traded (e.g., 'USDC/EURC').
   */
  readonly market: string;
  /**
   * Order side (BUY or SELL).
   */
  readonly side: OrderSide;
  /**
   * Total token amount to trade, in base-10 decimal string.
   * @example "10000.00"
   */
  readonly amount: string;
  /**
   * Price limit specified, in base-10 decimal string.
   * @example "0.9250"
   */
  readonly price: string;
  /**
   * Remaining amount unfilled, in base-10 decimal string.
   * @example "3500.00"
   */
  readonly remainingAmount: string;
  /**
   * Execution status of the order.
   */
  readonly status: OrderStatus;
  /**
   * Unix timestamp representing order placement.
   */
  readonly createdAt: number;
  /**
   * Unix timestamp when the order will expire if not filled (optional).
   */
  readonly expiresAt?: number;
  /**
   * Time-in-force instruction (GTC, IOC, FOK).
   */
  readonly timeInForce: TimeInForce;
}

/**
 * Route details for atomic multi-leg routing paths.
 */
export interface RouteLeg {
  readonly inputToken: Address;
  readonly outputToken: Address;
  readonly poolAddress: Address;
  readonly poolFeeBps: number;
}

/**
 * EIP-712 typed intent parameters to execute a swap on-chain.
 */
export interface Eip712Intent {
  readonly taker: Address;
  readonly inputToken: Address;
  readonly outputToken: Address;
  readonly maxInputAmount: string;
  readonly minOutputAmount: string;
  readonly recipient: Address;
  readonly initialDepositAmount: string;
  readonly uuid: string;
  readonly deadline: number;
  readonly chainId: number;
  readonly verifyingContract: Address;
}

/**
 * Estimated FX swap quote details returned by Smart Order Router.
 */
export interface SwapQuote {
  /**
   * Unique ID tracking this quote.
   */
  readonly uuid: QuoteId;
  /**
   * Input token symbol.
   */
  readonly inputToken: string;
  /**
   * Output token symbol.
   */
  readonly outputToken: string;
  /**
   * Requested input amount, in base-10 decimals.
   */
  readonly inputAmount: string;
  /**
   * Estimated output amount expected, in base-10 decimals.
   */
  readonly expectedOutputAmount: string;
  /**
   * Guaranteed minimum output amount after slippage checks.
   */
  readonly minOutputAmount: string;
  /**
   * Smart order router path legs.
   */
  readonly route: readonly RouteLeg[];
  /**
   * Fee breakdown in base-10 decimal string.
   */
  readonly protocolFee: string;
  /**
   * Unix timestamp when this quote expires.
   */
  readonly expiresAt: number;
  /**
   * Exact EIP-712 parameters required for wallet execution.
   */
  readonly routeParams: Eip712Intent;
}

/**
 * Results of a successful swap execution submission.
 */
export interface SwapResult {
  /**
   * Submitted transaction hash.
   */
  readonly txHash: TransactionHash;
  /**
   * Actual input amount consumed.
   */
  readonly inputAmountConsumed: string;
  /**
   * Actual output amount received.
   */
  readonly outputAmountReceived: string;
  /**
   * Execution status.
   */
  readonly status: TransactionStatus;
}

/**
 * Represents a Virtual Liquidity (VL) batch.
 */
export interface VirtualLiquidityBatch {
  /**
   * Unique batch identifier.
   */
  readonly batchId: BatchId;
  /**
   * Maximum budget shared across all orders in this batch.
   * @example "15000.00"
   */
  readonly sharedBudget: string;
  /**
   * List of active orders in the batch.
   */
  readonly orders: readonly LimitOrder[];
  /**
   * Status of this shared budget batch.
   */
  readonly status: LiquidityStatus;
}

/**
 * Details of on-chain transactions processed by the SDK.
 */
export interface TransactionInfo {
  readonly hash: TransactionHash;
  readonly blockNumber?: number;
  readonly status: TransactionStatus;
  readonly from: Address;
  readonly to?: Address;
  readonly gasUsed?: string;
}

export interface PaymentIntent {
  readonly id: string;
  readonly recipient: Address;
  readonly asset: string;
  readonly amount: string;
  readonly feeAmount: string;
  readonly memo?: string;
  readonly verifyingContract: Address;
  readonly chainId: number;
  readonly uuid: string;
  readonly deadline: number;
}

export interface PaymentResult {
  readonly paymentId: string;
  readonly txHash: TransactionHash;
  readonly recipient: Address;
  readonly asset: string;
  readonly amount: string;
  readonly status: string;
  readonly createdAt: number;
}

export interface PaymentStatusInfo {
  readonly paymentId: string;
  readonly status: string;
  readonly txHash?: TransactionHash;
  readonly updatedAt: number;
}

export interface PaymentEstimation {
  readonly estimatedFee: string;
  readonly gasLimit: string;
  readonly route: readonly RouteLeg[];
}
