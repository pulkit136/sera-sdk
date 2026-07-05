import { ISeraSigner, TypedDataDomain, TypedDataField } from '../types.js';
import { SeraValidationError } from '../../errors/classes.js';

/**
 * Adapter that signs EIP-712 messages in-process using a private key.
 * Dynamically resolves either 'ethers' or 'viem' peer dependencies.
 */
export class PrivateKeySignerAdapter implements ISeraSigner {
  private readonly privateKey: string;
  private delegateSigner?: DelegateSigner;

  constructor(privateKey: string) {
    const formatted = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
    // Private keys are 32 bytes = 64 hex characters + '0x' prefix
    if (formatted.length !== 66 || !/^0x[0-9a-f]{64}$/i.test(formatted)) {
      throw new SeraValidationError('Invalid private key format: Must be a 32-byte hex string.');
    }
    this.privateKey = formatted;
  }

  public async getAddress(): Promise<`0x${string}`> {
    await this.resolveDelegate();
    // delegateSigner is guaranteed after resolveDelegate
    return this.delegateSigner!.getAddress();
  }

  public async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, unknown>,
  ): Promise<`0x${string}`> {
    await this.resolveDelegate();
    return this.delegateSigner!.signTypedData(domain, types, value);
  }

  private async resolveDelegate(): Promise<void> {
    if (this.delegateSigner) return;

    // Try ethers first
    try {
      const { Wallet } = await import('ethers');
      const wallet = new Wallet(this.privateKey);
      this.delegateSigner = {
        getAddress: () => wallet.getAddress(),
        signTypedData: (domain, types, value) => wallet.signTypedData(domain, types, value),
      } as DelegateSigner;
      return;
    } catch {
      // fallback
    }

    // Try viem
    try {
      const { privateKeyToAccount } = await import('viem/accounts');
      const account = privateKeyToAccount(this.privateKey as `0x${string}`);
      this.delegateSigner = {
        getAddress: async () => account.address,
        signTypedData: async (domain, types, value) => {
          return account.signTypedData({
            domain,
            types,
            primaryType: Object.keys(types)[0],
            message: value as Record<string, unknown>,
          });
        },
      } as DelegateSigner;
      return;
    } catch (err: unknown) {
      throw new Error(
        `PrivateKeySignerAdapter: Local in-process signing requires "ethers" or "viem" installed as a peer dependency. (Details: ${(err as any)?.message || err})`,
      );
    }
  }
}

/** Minimal interface for delegate signer */
interface DelegateSigner {
  getAddress(): Promise<`0x${string}`>;
  signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, unknown>,
  ): Promise<`0x${string}`>;
}
