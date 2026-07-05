import { ISeraSigner, TypedDataDomain, TypedDataField } from '../types.js';

/**
 * Adapter that wraps a Viem WalletClient and maps it to the universal ISeraSigner interface.
 */
export class ViemSignerAdapter implements ISeraSigner {
  private readonly client: any;

  constructor(walletClient: any) {
    if (!walletClient || typeof walletClient.signTypedData !== 'function') {
      throw new Error('Invalid Viem client: must implement signTypedData');
    }
    this.client = walletClient;
  }

  public async getAddress(): Promise<`0x${string}`> {
    const [address] = await this.client.getAddresses();
    return address;
  }

  public async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, any>
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
