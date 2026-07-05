import dotenv from 'dotenv';
import path from 'path';

// Resolve and load environment variables from local .env file
dotenv.config();

export interface AppConfig {
  readonly apiKey: string;
  readonly privateKey: string;
  readonly environment: 'mainnet' | 'testnet' | 'development';
  readonly isDebug: boolean;
}

/**
 * Validates and resolves the environment configuration.
 * Throws a clear descriptive error if required values are missing.
 */
export function loadConfig(): AppConfig {
  const apiKey = process.env.SERA_API_KEY;
  const privateKey = process.env.SERA_PRIVATE_KEY;
  const environment = process.env.SERA_ENVIRONMENT ?? 'testnet';
  const isDebug = process.env.DEBUG === 'true';

  if (!apiKey || apiKey === 'your_sera_api_key_here') {
    throw new Error(
      'Config Error: SERA_API_KEY environment variable is not configured. Please define it in your .env file.'
    );
  }

  if (!privateKey || privateKey.startsWith('0x000000000')) {
    throw new Error(
      'Config Error: SERA_PRIVATE_KEY is not configured or uses the default zero key. Please specify a valid private key.'
    );
  }

  // Ensure environment maps correctly
  if (environment !== 'mainnet' && environment !== 'testnet' && environment !== 'development') {
    throw new Error(
      `Config Error: Invalid SERA_ENVIRONMENT value "${environment}". Must be one of: mainnet | testnet | development`
    );
  }

  return {
    apiKey,
    privateKey,
    environment: environment as 'mainnet' | 'testnet' | 'development',
    isDebug,
  };
}
