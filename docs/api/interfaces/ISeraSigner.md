[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / ISeraSigner

# Interface: ISeraSigner

Defined in: [src/auth/types.ts:16](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/types.ts#L16)

## Methods

### getAddress()

> **getAddress**(): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/auth/types.ts:17](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/types.ts#L17)

#### Returns

`Promise`\<`` `0x${string}` ``\>

***

### signTypedData()

> **signTypedData**(`domain`, `types`, `value`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/auth/types.ts:18](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/types.ts#L18)

#### Parameters

##### domain

[`TypedDataDomain`](TypedDataDomain.md)

##### types

`Record`\<`string`, [`TypedDataField`](TypedDataField.md)[]\>

##### value

`Record`\<`string`, `any`\>

#### Returns

`Promise`\<`` `0x${string}` ``\>
