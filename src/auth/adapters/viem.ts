import { ISeraSigner, TypedDataDomain, TypedDataField } from '../types.js';

interface ViemWalletClient {
  getAddresses(): Promise<`0x${string}`[]>;
  signTypedData(args: {
    account: `0x${string}`;
    domain: TypedDataDomain;
    types: Record<string, TypedDataField[]>;
    primaryType: string;
    message: Record<string, unknown>;
  }): Promise<`0x${string}`>;
}

/**
 * Adapter that wraps a Viem WalletClient and maps it to the universal ISeraSigner interface.
 */
export class ViemSignerAdapter implements ISeraSigner {
  private readonly client: ViemWalletClient;

  constructor(walletClient: unknown) {
    if (!walletClient || typeof (walletClient as Record<string, unknown>).signTypedData !== 'function') {
      throw new Error('Invalid Viem client: must implement signTypedData');
    }
    this.client = walletClient as ViemWalletClient;
  }

  public async getAddress(): Promise<`0x${string}`> {
    const [address] = await this.client.getAddresses();
    return address;
  }

  public async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, unknown>
  ): Promise<`0x${string}`> {
    const address = await this.getAddress();
    
    // Retrieve primaryType (e.g. 'Intent')
    const primaryType = Object.keys(types)[0];

    return this.client.signTypedData({
      account: address,
      domain,
      types,
      primaryType,
      message: value,
    });
  }
}
