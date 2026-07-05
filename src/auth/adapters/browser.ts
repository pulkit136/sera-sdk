import { ISeraSigner, TypedDataDomain, TypedDataField } from '../types.js';

type BrowserProvider = {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
};

/**
 * Adapter that wraps an injected browser provider (like window.ethereum)
 * and issues standard JSON-RPC signing calls.
 */
export class BrowserWalletAdapter implements ISeraSigner {
  private readonly provider: BrowserProvider;

  constructor(provider?: BrowserProvider) {
    const resolvedProvider =
      provider ?? (typeof window !== 'undefined' ? (window as any).ethereum : undefined);
    if (!resolvedProvider) {
      throw new Error('BrowserWalletAdapter: No injected Ethereum provider detected.');
    }
    this.provider = resolvedProvider;
  }

  public async getAddress(): Promise<`0x${string}`> {
    const result = await this.provider.request({ method: 'eth_requestAccounts' });
    const accounts = result as unknown as string[];
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts authorized in browser wallet.');
    }
    return accounts[0] as `0x${string}`;
  }

  public async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, unknown>,
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

    return (await this.provider.request({
      method: 'eth_signTypedData_v4',
      params: [address, JSON.stringify(eip712Data)],
    })) as `0x${string}`;
  }
}
