import { ISeraSigner, TypedDataDomain, TypedDataField } from '../types.js';

/**
 * Adapter that wraps an Ethers.js v6 Signer and maps it to the universal ISeraSigner interface.
 */
export class EthersSignerAdapter implements ISeraSigner {
  private readonly signer: unknown;

  constructor(ethersSigner: unknown) {
    if (!ethersSigner || typeof ethersSigner.signTypedData !== 'function') {
      throw new Error('Invalid Ethers signer: must implement signTypedData');
    }
    this.signer = ethersSigner;
  }

  public async getAddress(): Promise<`0x${string}`> {
    return this.signer.getAddress();
  }

  public async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, unknown>
  ): Promise<`0x${string}`> {
    return this.signer.signTypedData(domain, types, value);
  }
}
