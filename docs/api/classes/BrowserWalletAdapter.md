[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / BrowserWalletAdapter

# Class: BrowserWalletAdapter

Defined in: src/auth/adapters/browser.ts:7

Adapter that wraps an injected browser provider (like window.ethereum)
and issues standard JSON-RPC signing calls.

## Implements

- [`ISeraSigner`](../interfaces/ISeraSigner.md)

## Constructors

### Constructor

> **new BrowserWalletAdapter**(`provider?`): `BrowserWalletAdapter`

Defined in: src/auth/adapters/browser.ts:10

#### Parameters

##### provider?

`any`

#### Returns

`BrowserWalletAdapter`

## Methods

### getAddress()

> **getAddress**(): `Promise`\<`` `0x${string}` ``\>

Defined in: src/auth/adapters/browser.ts:18

#### Returns

`Promise`\<`` `0x${string}` ``\>

#### Implementation of

[`ISeraSigner`](../interfaces/ISeraSigner.md).[`getAddress`](../interfaces/ISeraSigner.md#getaddress)

***

### signTypedData()

> **signTypedData**(`domain`, `types`, `value`): `Promise`\<`` `0x${string}` ``\>

Defined in: src/auth/adapters/browser.ts:26

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
