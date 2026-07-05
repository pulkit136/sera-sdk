[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SeraPlugin

# Interface: SeraPlugin

Defined in: [src/plugins/base.ts:18](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/plugins/base.ts#L18)

Interface that all Sera Protocol SDK Plugins must implement.

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/plugins/base.ts:19](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/plugins/base.ts#L19)

***

### version

> `readonly` **version**: `string`

Defined in: [src/plugins/base.ts:20](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/plugins/base.ts#L20)

## Methods

### setup()

> **setup**(`context`): `void` \| `Promise`\<`void`\>

Defined in: [src/plugins/base.ts:21](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/plugins/base.ts#L21)

#### Parameters

##### context

[`SeraPluginContext`](SeraPluginContext.md)

#### Returns

`void` \| `Promise`\<`void`\>
