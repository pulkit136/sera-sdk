import { SeraClient, PrivateKeySignerAdapter } from '@sera-protocol/sdk';
import { loadConfig } from './config.js';

// 1. Load validated configuration
const config = loadConfig();

// 2. Initialize signer adapter with the configured private key
const signer = new PrivateKeySignerAdapter(config.privateKey);

/**
 * Singleton instance of the SeraClient configured for the application.
 */
export const client = new SeraClient({
  apiKey: config.apiKey,
  environment: config.environment,
  signer,
  debug: config.isDebug,
});
