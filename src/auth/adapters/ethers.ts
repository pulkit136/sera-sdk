import { ISeraSigner, TypedDataDomain, TypedDataField } from '../types.js';

/**
 * Minimal interface representing the subset of an Ethers.js Signer we require.
 */
interface EthersSigner {
  getAddress(): Promise<`0x${string}`>;
  signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, unknown>,
  ): Promise<`0x${string}`>;
}

/**
 * Adapter that wraps an Ethers.js v6 Signer and maps it to the universal ISeraSigner interface.
 */
export class EthersSignerAdapter implements ISeraSigner {
  private readonly signer: EthersSigner;

  constructor(ethersSigner: EthersSigner) {
    if (!ethersSigner || typeof (ethersSigner as any).signTypedData !== 'function') {
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
    value: Record<string, unknown>,
  ): Promise<`0x${string}`> {
    return this.signer.signTypedData(domain, types, value);
  }
}
