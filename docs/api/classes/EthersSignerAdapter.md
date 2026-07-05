[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / EthersSignerAdapter

# Class: EthersSignerAdapter

Defined in: [src/auth/adapters/ethers.ts:6](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/adapters/ethers.ts#L6)

Adapter that wraps an Ethers.js v6 Signer and maps it to the universal ISeraSigner interface.

## Implements

- [`ISeraSigner`](../interfaces/ISeraSigner.md)

## Constructors

### Constructor

> **new EthersSignerAdapter**(`ethersSigner`): `EthersSignerAdapter`

Defined in: [src/auth/adapters/ethers.ts:9](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/adapters/ethers.ts#L9)

#### Parameters

##### ethersSigner

`any`

#### Returns

`EthersSignerAdapter`

## Methods

### getAddress()

> **getAddress**(): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/auth/adapters/ethers.ts:16](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/adapters/ethers.ts#L16)

#### Returns

`Promise`\<`` `0x${string}` ``\>

#### Implementation of

[`ISeraSigner`](../interfaces/ISeraSigner.md).[`getAddress`](../interfaces/ISeraSigner.md#getaddress)

***

### signTypedData()

> **signTypedData**(`domain`, `types`, `value`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/auth/adapters/ethers.ts:20](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/adapters/ethers.ts#L20)

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
