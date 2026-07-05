[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / VaultTransactionParams

# Interface: VaultTransactionParams

Defined in: src/types/domain/index.ts:101

Parameters to construct a Vault transaction (e.g. deposit or withdrawal).

## Properties

### data

> `readonly` **data**: `string`

Defined in: src/types/domain/index.ts:109

Hex encoded calldata payload for execution.

***

### gasLimit

> `readonly` **gasLimit**: `string`

Defined in: src/types/domain/index.ts:113

Estimated gas limit required, in base units.

***

### maxFeePerGas?

> `readonly` `optional` **maxFeePerGas?**: `string`

Defined in: src/types/domain/index.ts:121

Maximum fee per gas, in Wei base string.

***

### maxPriorityFeePerGas?

> `readonly` `optional` **maxPriorityFeePerGas?**: `string`

Defined in: src/types/domain/index.ts:117

Maximum priority fee per gas, in Wei base string.

***

### to

> `readonly` **to**: [`Address`](../type-aliases/Address.md)

Defined in: src/types/domain/index.ts:105

Destination address on-chain.
