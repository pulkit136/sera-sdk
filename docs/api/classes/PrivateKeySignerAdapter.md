[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / PrivateKeySignerAdapter

# Class: PrivateKeySignerAdapter

Defined in: src/auth/adapters/private-key.ts:8

Adapter that signs EIP-712 messages in-process using a private key.
Dynamically resolves either 'ethers' or 'viem' peer dependencies.

## Implements

- [`ISeraSigner`](../interfaces/ISeraSigner.md)

## Constructors

### Constructor

> **new PrivateKeySignerAdapter**(`privateKey`): `PrivateKeySignerAdapter`

Defined in: src/auth/adapters/private-key.ts:12

#### Parameters

##### privateKey

`string`

#### Returns

`PrivateKeySignerAdapter`

## Methods

### getAddress()

> **getAddress**(): `Promise`\<`` `0x${string}` ``\>

Defined in: src/auth/adapters/private-key.ts:21

#### Returns

`Promise`\<`` `0x${string}` ``\>

#### Implementation of

[`ISeraSigner`](../interfaces/ISeraSigner.md).[`getAddress`](../interfaces/ISeraSigner.md#getaddress)

***

### signTypedData()

> **signTypedData**(`domain`, `types`, `value`): `Promise`\<`` `0x${string}` ``\>

Defined in: src/auth/adapters/private-key.ts:26

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
