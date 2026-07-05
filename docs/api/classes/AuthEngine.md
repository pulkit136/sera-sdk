[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / AuthEngine

# Class: AuthEngine

Defined in: src/auth/engine.ts:9

Authentication and credentials manager.
Determines SDK features dynamically (e.g. read-only vs execution modes).

## Constructors

### Constructor

> **new AuthEngine**(`config`): `AuthEngine`

Defined in: src/auth/engine.ts:13

#### Parameters

##### config

[`SdkConfig`](../interfaces/SdkConfig.md)

#### Returns

`AuthEngine`

## Methods

### getAuthHeaders()

> **getAuthHeaders**(): `Record`\<`string`, `string`\>

Defined in: src/auth/engine.ts:47

Compiles header credentials for API requests.

#### Returns

`Record`\<`string`, `string`\>

***

### getSigner()

> **getSigner**(): [`ISeraSigner`](../interfaces/ISeraSigner.md)

Defined in: src/auth/engine.ts:35

Resolves the current configured signer, or throws an error if missing.

#### Returns

[`ISeraSigner`](../interfaces/ISeraSigner.md)

***

### hasApiKey()

> **hasApiKey**(): `boolean`

Defined in: src/auth/engine.ts:21

Returns true if an API key is configured.

#### Returns

`boolean`

***

### hasSigner()

> **hasSigner**(): `boolean`

Defined in: src/auth/engine.ts:28

Returns true if a web3 wallet signer adapter is configured.

#### Returns

`boolean`

***

### validateRequiredSigner()

> **validateRequiredSigner**(): `void`

Defined in: src/auth/engine.ts:59

Enforces that a valid signer is configured for mutating operations.

#### Returns

`void`
