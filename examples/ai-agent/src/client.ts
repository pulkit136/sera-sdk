import { SeraClient, PrivateKeySignerAdapter } from '@sera-protocol/sdk';
import { loadConfig } from './config.js';

const config = loadConfig();
const signer = new PrivateKeySignerAdapter(config.privateKey);

/**
 * Singleton instance of the SeraClient configured for the AI agent context.
 */
export const client = new SeraClient({
  apiKey: config.apiKey,
  environment: config.environment,
  signer,
});
