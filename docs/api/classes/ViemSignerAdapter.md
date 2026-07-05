[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / ViemSignerAdapter

# Class: ViemSignerAdapter

Defined in: [src/auth/adapters/viem.ts:6](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/adapters/viem.ts#L6)

Adapter that wraps a Viem WalletClient and maps it to the universal ISeraSigner interface.

## Implements

- [`ISeraSigner`](../interfaces/ISeraSigner.md)

## Constructors

### Constructor

> **new ViemSignerAdapter**(`walletClient`): `ViemSignerAdapter`

Defined in: [src/auth/adapters/viem.ts:9](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/adapters/viem.ts#L9)

#### Parameters

##### walletClient

`any`

#### Returns

`ViemSignerAdapter`

## Methods

### getAddress()

> **getAddress**(): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/auth/adapters/viem.ts:16](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/adapters/viem.ts#L16)

#### Returns

`Promise`\<`` `0x${string}` ``\>

#### Implementation of

[`ISeraSigner`](../interfaces/ISeraSigner.md).[`getAddress`](../interfaces/ISeraSigner.md#getaddress)

***

### signTypedData()

> **signTypedData**(`domain`, `types`, `value`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/auth/adapters/viem.ts:21](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/adapters/viem.ts#L21)

#### Parameters

##### domain

[`TypedDataDomain`](../interfaces/TypedDataDomain.md)

##### types

`Record`\<`string`, [`TypedDataField`](../interfaces/TypedDataField.md)[]\>

##### value

`Record`\<`string`, `any`\>

#### Returns

`Promise`\<`` `0x${string}` ``\>

#### Implementation of

[`ISeraSigner`](../interfaces/ISeraSigner.md).[`signTypedData`](../interfaces/ISeraSigner.md#signtypeddata)
