import { SdkContext } from '../types/domain/config.js';
import { TypedDataDomain, TypedDataField } from './types.js';
import { TypedDataBuilder } from './builder.js';
import { normalizeHex } from '../utils/signature.js';

/**
 * Orchestrator pipeline that executes signature routines.
 * Validates authentication settings, builds typed payloads, triggers hooks, and resolves signatures.
 */
export class SigningPipeline {
  private readonly context: SdkContext;

  constructor(context: SdkContext) {
    this.context = context;
  }

  /**
   * Generates a normalized EIP-712 signature for the given domain, types, and values.
   */
  public async sign(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    message: Record<string, any>
  ): Promise<string> {
    const { auth, hooks, events } = this.context;

    // 1. Enforce that a valid web3 wallet signer is configured
    auth.validateRequiredSigner();
    const signer = auth.getSigner();

    // 2. Construct and validate EIP-712 parameters via the builder
    const builder = new TypedDataBuilder();
    const payload = builder
      .setDomain(domain)
      .setTypes(types)
      .setMessage(message)
      .build();

    // 3. Emit hook before signing to allow mutations or checks
    await hooks.emit('beforeSign', {
      domain: payload.domain,
      types: payload.types,
      value: payload.message,
    });

    try {
      // 4. Trigger EIP-712 message signing via the resolved adapter
      const rawSignature = await signer.signTypedData(
        payload.domain,
        payload.types,
        payload.message
      );

      // 5. Normalize hex prefix format
      const normalizedSignature = normalizeHex(rawSignature);

      // 6. Emit hook after signing to log or register traces
      await hooks.emit('afterSign', {
        domain: payload.domain,
        signature: normalizedSignature,
      });

      return normalizedSignature;
    } catch (err) {
      const errorObject = err instanceof Error ? err : new Error(String(err));
      events.emit('error:thrown', { error: errorObject });
      throw errorObject;
    }
  }
}
