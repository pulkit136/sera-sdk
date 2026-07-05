/**
 * Branded Type utility structure.
 */
declare const brandSymbol: unique symbol;

export interface Brand<TBrand extends string> {
  readonly [brandSymbol]: TBrand;
}

/**
 * An Ethereum address (EIP-55 checksum format).
 */
export type Address = string & Brand<'Address'>;

/**
 * An Ethereum transaction hash (0x... format).
 */
export type TransactionHash = string & Brand<'TransactionHash'>;

/**
 * A unique identifier for a Limit Order.
 */
export type OrderId = string & Brand<'OrderId'>;

/**
 * A unique identifier for a Swap Quote.
 */
export type QuoteId = string & Brand<'QuoteId'>;

/**
 * A unique identifier for a Virtual Liquidity Batch.
 */
export type BatchId = string & Brand<'BatchId'>;

/**
 * An API credential key.
 */
export type ApiKey = string & Brand<'ApiKey'>;

/**
 * A correlation trace identifier.
 */
export type CorrelationId = string & Brand<'CorrelationId'>;

/**
 * A request trace identifier.
 */
export type RequestId = string & Brand<'RequestId'>;


/* SCRIPT SKELETON CASTERS FOR DX */

export const toAddress = (val: string): Address => val as Address;
export const toTransactionHash = (val: string): TransactionHash => val as TransactionHash;
export const toOrderId = (val: string): OrderId => val as OrderId;
export const toQuoteId = (val: string): QuoteId => val as QuoteId;
export const toBatchId = (val: string): BatchId => val as BatchId;
export const toApiKey = (val: string): ApiKey => val as ApiKey;
export const toCorrelationId = (val: string): CorrelationId => val as CorrelationId;
export const toRequestId = (val: string): RequestId => val as RequestId;
