import { ISeraSigner, TypedDataDomain, TypedDataField } from '../types.js';

/**
 * Adapter that wraps an injected browser provider (like window.ethereum)
 * and issues standard JSON-RPC signing calls.
 */
export class BrowserWalletAdapter implements ISeraSigner {
  private readonly provider: any;

  constructor(provider?: any) {
    const resolvedProvider = provider ?? (typeof window !== 'undefined' ? (window as any).ethereum : undefined);
    if (!resolvedProvider) {
      throw new Error('BrowserWalletAdapter: No injected Ethereum provider detected.');
    }
    this.provider = resolvedProvider;
  }

  public async getAddress(): Promise<`0x${string}`> {
    const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts authorized in browser wallet.');
    }
    return accounts[0];
  }

  public async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, any>
  ): Promise<`0x${string}`> {
    const address = await this.getAddress();
    const primaryType = Object.keys(types)[0];

    const eip712Data = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        ...types,
      },
      domain,
      primaryType,
      message: value,
    };

    return this.provider.request({
      method: 'eth_signTypedData_v4',
      params: [address, JSON.stringify(eip712Data)],
    });
  }
}
