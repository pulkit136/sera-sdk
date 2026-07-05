[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / ISeraSigner

# Interface: ISeraSigner

Defined in: src/auth/types.ts:16

## Methods

### getAddress()

> **getAddress**(): `Promise`\<`` `0x${string}` ``\>

Defined in: src/auth/types.ts:17

#### Returns

`Promise`\<`` `0x${string}` ``\>

***

### signTypedData()

> **signTypedData**(`domain`, `types`, `value`): `Promise`\<`` `0x${string}` ``\>

Defined in: src/auth/types.ts:18

#### Parameters

##### domain

[`TypedDataDomain`](TypedDataDomain.md)

##### types

`Record`\<`string`, [`TypedDataField`](TypedDataField.md)[]\>

##### value

`Record`\<`string`, `any`\>

#### Returns

`Promise`\<`` `0x${string}` ``\>
