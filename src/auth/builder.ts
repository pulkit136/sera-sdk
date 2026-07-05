import { TypedDataDomain, TypedDataField } from './types.js';
import { SeraValidationError } from '../errors/classes.js';

/**
 * Standard structured output from the EIP-712 builder.
 */
export interface Eip712Payload {
  readonly domain: TypedDataDomain;
  readonly types: Record<string, TypedDataField[]>;
  readonly message: Record<string, any>;
}

/**
 * A reusable, generic builder for constructing EIP-712 typed data payloads.
 */
export class TypedDataBuilder {
  private domain: TypedDataDomain = {};
  private types: Record<string, TypedDataField[]> = {};
  private message: Record<string, any> = {};

  /**
   * Configure the EIP-712 Domain Separator.
   */
  public setDomain(domain: TypedDataDomain): this {
    this.domain = domain;
    return this;
  }

  /**
   * Configure the type definitions (e.g. types for Intent).
   */
  public setTypes(types: Record<string, TypedDataField[]>): this {
    this.types = types;
    return this;
  }

  /**
   * Configure the specific message values.
   */
  public setMessage(message: Record<string, any>): this {
    this.message = message;
    return this;
  }

  /**
   * Validates parameters and returns the complete EIP-712 payload.
   */
  public build(): Eip712Payload {
    if (!this.domain.name) {
      throw new SeraValidationError('EIP-712 Build Error: Domain name is required.');
    }
    if (!this.domain.verifyingContract) {
      throw new SeraValidationError('EIP-712 Build Error: Verifying contract is required.');
    }
    if (Object.keys(this.types).length === 0) {
      throw new SeraValidationError('EIP-712 Build Error: Types configuration cannot be empty.');
    }
    if (Object.keys(this.message).length === 0) {
      throw new SeraValidationError('EIP-712 Build Error: Message body cannot be empty.');
    }

    return {
      domain: { ...this.domain },
      types: { ...this.types },
      message: { ...this.message },
    };
  }
}
