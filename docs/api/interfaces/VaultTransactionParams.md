[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / VaultTransactionParams

# Interface: VaultTransactionParams

Defined in: [src/types/domain/index.ts:101](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L101)

Parameters to construct a Vault transaction (e.g. deposit or withdrawal).

## Properties

### data

> `readonly` **data**: `string`

Defined in: [src/types/domain/index.ts:109](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L109)

Hex encoded calldata payload for execution.

***

### gasLimit

> `readonly` **gasLimit**: `string`

Defined in: [src/types/domain/index.ts:113](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L113)

Estimated gas limit required, in base units.

***

### maxFeePerGas?

> `readonly` `optional` **maxFeePerGas?**: `string`

Defined in: [src/types/domain/index.ts:121](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L121)

Maximum fee per gas, in Wei base string.

***

### maxPriorityFeePerGas?

> `readonly` `optional` **maxPriorityFeePerGas?**: `string`

Defined in: [src/types/domain/index.ts:117](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L117)

Maximum priority fee per gas, in Wei base string.

***

### to

> `readonly` **to**: [`Address`](../type-aliases/Address.md)

Defined in: [src/types/domain/index.ts:105](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L105)

Destination address on-chain.
