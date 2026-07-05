// Authentication and cryptographic type definitions for the SDK

export interface TypedDataDomain {
  name?: string;
  version?: string;
  chainId?: number | bigint;
  verifyingContract?: `0x${string}`;
  salt?: `0x${string}`;
}

export interface TypedDataField {
  name: string;
  type: string;
}

export interface ISeraSigner {
  getAddress(): Promise<`0x${string}`>;
  signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, unknown>
  ): Promise<`0x${string}`>;
}

export interface AuthStrategy {
  getAuthHeaders(): Record<string, string>;
}
