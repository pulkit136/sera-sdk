/**
 * SDK Supported Environments
 */
export enum Environment {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  DEVELOPMENT = 'development',
  CUSTOM = 'custom',
}

/**
 * EVM Blockchains Supported by Sera
 */
export enum Chain {
  ETHEREUM = 1,
  SEPOLIA = 11155111,
  HARDHAT = 31337,
}

/**
 * Limit Order Side
 */
export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

/**
 * Limit Order Execution Status
 */
export enum OrderStatus {
  OPEN = 'OPEN',
  FILLED = 'FILLED',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

/**
 * Virtual Liquidity Batch Status
 */
export enum LiquidityStatus {
  ACTIVE = 'ACTIVE',
  FILLED = 'FILLED',
  CANCELLED = 'CANCELLED',
}

/**
 * On-chain Transaction Settlement Status
 */
export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

/**
 * Standard SDK and API Error Codes
 */
export enum ErrorCode {
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  INSUFFICIENT_COLLATERAL = 'INSUFFICIENT_COLLATERAL',
  SLIPPAGE_EXCEEDED = 'SLIPPAGE_EXCEEDED',
  QUOTE_EXPIRED = 'QUOTE_EXPIRED',
  INVALID_SIGNATURE = 'INVALID_SIGNATURE',
}

/**
 * Supported Network Names
 */
export enum Network {
  MAINNET = 'ethereum-mainnet',
  SEPOLIA = 'ethereum-sepolia',
}

/**
 * Token Asset Classification
 */
export enum AssetType {
  FIAT_STABLE = 'FIAT_STABLE',
  CRYPTO_NATIVE = 'CRYPTO_NATIVE',
}

/**
 * Limit Order Time-in-Force Instructions
 */
export enum TimeInForce {
  GOOD_TILL_CANCELLED = 'GTC',
  IMMEDIATE_OR_CANCEL = 'IOC',
  FILL_OR_KILL = 'FOK',
}

/**
 * Standard HTTP Request Methods
 */
export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
