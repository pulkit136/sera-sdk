import { ISeraSigner } from './types.js';
import { SdkConfig } from '../types/domain/config.js';
import { SeraNoSignerConfiguredError, SeraAuthenticationRequiredError } from '../errors/classes.js';

/**
 * Authentication and credentials manager.
 * Determines SDK features dynamically (e.g. read-only vs execution modes).
 */
export class AuthEngine {
  private readonly config: SdkConfig;
  private readonly signer?: ISeraSigner;

  constructor(config: SdkConfig) {
    this.config = config;
    this.signer = config.signer;
  }

  /**
   * Returns true if an API key is configured.
   */
  public hasApiKey(): boolean {
    return !!this.config.apiKey;
  }

  /**
   * Returns true if a web3 wallet signer adapter is configured.
   */
  public hasSigner(): boolean {
    return !!this.signer;
  }

  /**
   * Resolves the current configured signer, or throws an error if missing.
   */
  public getSigner(): ISeraSigner {
    if (!this.signer) {
      throw new SeraNoSignerConfiguredError(
        'No web3 wallet signer adapter configured on this client instance.'
      );
    }
    return this.signer;
  }

  /**
   * Compiles header credentials for API requests.
   */
  public getAuthHeaders(): Record<string, string> {
    if (!this.config.apiKey) {
      return {};
    }
    return {
      'x-api-key': this.config.apiKey,
    };
  }

  /**
   * Enforces that a valid signer is configured for mutating operations.
   */
  public validateRequiredSigner(): void {
    if (!this.hasSigner()) {
      throw new SeraAuthenticationRequiredError(
        'Write mutation requested but no signer adapter has been configured on the SeraClient.'
      );
    }
  }
}
