// Stub type declarations for optional peer dependencies used by the SDK

declare module 'ethers' {
  export class Wallet {
    constructor(privateKey: string);
    getAddress(): Promise<`0x${string}`>;
    signTypedData(
      domain: any,
      types: Record<string, any>,
      value: Record<string, unknown>,
    ): Promise<`0x${string}`>;
  }
}

declare module 'viem/accounts' {
  export function privateKeyToAccount(privateKey: `0x${string}`): {
    address: `0x${string}`;
    signTypedData(params: {
      domain: any;
      types: Record<string, any>;
      primaryType: string;
      message: Record<string, unknown>;
    }): Promise<`0x${string}`>;
  };
}
