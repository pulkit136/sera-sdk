[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SigningPipeline

# Class: SigningPipeline

Defined in: [src/auth/pipeline.ts:10](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/pipeline.ts#L10)

Orchestrator pipeline that executes signature routines.
Validates authentication settings, builds typed payloads, triggers hooks, and resolves signatures.

## Constructors

### Constructor

> **new SigningPipeline**(`context`): `SigningPipeline`

Defined in: [src/auth/pipeline.ts:13](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/pipeline.ts#L13)

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`SigningPipeline`

## Methods

### sign()

> **sign**(`domain`, `types`, `message`): `Promise`\<`string`\>

Defined in: [src/auth/pipeline.ts:20](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/auth/pipeline.ts#L20)

Generates a normalized EIP-712 signature for the given domain, types, and values.

#### Parameters

##### domain

[`TypedDataDomain`](../interfaces/TypedDataDomain.md)

##### types

`Record`\<`string`, [`TypedDataField`](../interfaces/TypedDataField.md)[]\>

##### message

`Record`\<`string`, `any`\>

#### Returns

`Promise`\<`string`\>
