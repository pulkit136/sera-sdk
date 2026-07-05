import { SeraEnvironmentName } from '../types/domain/config.js';
import { SeraValidationError } from '../errors/classes.js';

const ENVIRONMENT_URLS: Record<Exclude<SeraEnvironmentName, 'custom'>, string> = {
  mainnet: 'https://api.sera.cx/api/v1',
  testnet: 'https://api-sepolia.sera.cx/api/v1',
  development: 'http://localhost:8080/api/v1',
};

/**
 * Resolves the final baseUrl based on the environment name and custom overrides.
 */
export function resolveBaseUrl(
  environment: SeraEnvironmentName,
  customBaseUrl?: string
): string {
  if (environment === 'custom') {
    if (!customBaseUrl) {
      throw new SeraValidationError(
        'A custom baseUrl must be specified when using the "custom" environment.'
      );
    }
    return customBaseUrl;
  }

  if (customBaseUrl) {
    return customBaseUrl;
  }

  return ENVIRONMENT_URLS[environment];
}
