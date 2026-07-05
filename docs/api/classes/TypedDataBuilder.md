[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / TypedDataBuilder

# Class: TypedDataBuilder

Defined in: src/auth/builder.ts:16

A reusable, generic builder for constructing EIP-712 typed data payloads.

## Constructors

### Constructor

> **new TypedDataBuilder**(): `TypedDataBuilder`

#### Returns

`TypedDataBuilder`

## Methods

### build()

> **build**(): [`Eip712Payload`](../interfaces/Eip712Payload.md)

Defined in: src/auth/builder.ts:48

Validates parameters and returns the complete EIP-712 payload.

#### Returns

[`Eip712Payload`](../interfaces/Eip712Payload.md)

***

### setDomain()

> **setDomain**(`domain`): `this`

Defined in: src/auth/builder.ts:24

Configure the EIP-712 Domain Separator.

#### Parameters

##### domain

[`TypedDataDomain`](../interfaces/TypedDataDomain.md)

#### Returns

`this`

***

### setMessage()

> **setMessage**(`message`): `this`

Defined in: src/auth/builder.ts:40

Configure the specific message values.

#### Parameters

##### message

`Record`\<`string`, `any`\>

#### Returns

`this`

***

### setTypes()

> **setTypes**(`types`): `this`

Defined in: src/auth/builder.ts:32

Configure the type definitions (e.g. types for Intent).

#### Parameters

##### types

`Record`\<`string`, [`TypedDataField`](../interfaces/TypedDataField.md)[]\>

#### Returns

`this`
