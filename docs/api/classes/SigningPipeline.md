[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SigningPipeline

# Class: SigningPipeline

Defined in: src/auth/pipeline.ts:10

Orchestrator pipeline that executes signature routines.
Validates authentication settings, builds typed payloads, triggers hooks, and resolves signatures.

## Constructors

### Constructor

> **new SigningPipeline**(`context`): `SigningPipeline`

Defined in: src/auth/pipeline.ts:13

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`SigningPipeline`

## Methods

### sign()

> **sign**(`domain`, `types`, `message`): `Promise`\<`string`\>

Defined in: src/auth/pipeline.ts:20

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
