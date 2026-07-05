[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SystemModule

# Class: SystemModule

Defined in: [src/modules/system.ts:29](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/system.ts#L29)

Module responsible for fetching read-only protocol metadata, tokens, and active markets.

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new SystemModule**(`context`): `SystemModule`

Defined in: [src/modules/base.ts:10](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/base.ts#L10)

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`SystemModule`

#### Inherited from

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### config()

> **config**(`options?`): `Promise`\<[`SystemConfigInfo`](../interfaces/SystemConfigInfo.md)\>

Defined in: [src/modules/system.ts:43](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/system.ts#L43)

Retrieve protocol-wide configuration parameters (verifying contract address, chain IDs, fees).

#### Parameters

##### options?

[`SystemQueryOptions`](../interfaces/SystemQueryOptions.md) = `{}`

#### Returns

`Promise`\<[`SystemConfigInfo`](../interfaces/SystemConfigInfo.md)\>

***

### health()

> **health**(`options?`): `Promise`\<[`HealthInfo`](../interfaces/HealthInfo.md)\>

Defined in: [src/modules/system.ts:36](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/system.ts#L36)

Check the health status of Sera's matching engine and signature execution pipeline.

#### Parameters

##### options?

[`SystemQueryOptions`](../interfaces/SystemQueryOptions.md) = `{}`

#### Returns

`Promise`\<[`HealthInfo`](../interfaces/HealthInfo.md)\>

***

### market()

> **market**(`symbol`, `options?`): `Promise`\<[`MarketInfo`](../interfaces/MarketInfo.md) \| `undefined`\>

Defined in: [src/modules/system.ts:76](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/system.ts#L76)

Helper look-up for details of a specific trading market pair (e.g. 'USDC/EURC').

#### Parameters

##### symbol

`string`

##### options?

[`SystemQueryOptions`](../interfaces/SystemQueryOptions.md) = `{}`

#### Returns

`Promise`\<[`MarketInfo`](../interfaces/MarketInfo.md) \| `undefined`\>

***

### markets()

> **markets**(`options?`): `Promise`\<readonly [`MarketInfo`](../interfaces/MarketInfo.md)[]\>

Defined in: [src/modules/system.ts:67](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/system.ts#L67)

Returns list of all active stablecoin trading markets.

#### Parameters

##### options?

[`SystemQueryOptions`](../interfaces/SystemQueryOptions.md) = `{}`

#### Returns

`Promise`\<readonly [`MarketInfo`](../interfaces/MarketInfo.md)[]\>

***

### refresh()

> **refresh**(): `void`

Defined in: [src/modules/system.ts:98](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/system.ts#L98)

Evicts the entire local query cache.

#### Returns

`void`

***

### supportedAssets()

> **supportedAssets**(): readonly [`AssetType`](../enumerations/AssetType.md)[]

Defined in: [src/modules/system.ts:91](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/system.ts#L91)

Returns a list of asset types supported.

#### Returns

readonly [`AssetType`](../enumerations/AssetType.md)[]

***

### supportedChains()

> **supportedChains**(): readonly [`Chain`](../enumerations/Chain.md)[]

Defined in: [src/modules/system.ts:84](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/system.ts#L84)

Returns a list of chains currently supported by the SDK.

#### Returns

readonly [`Chain`](../enumerations/Chain.md)[]

***

### token()

> **token**(`symbol`, `options?`): `Promise`\<[`TokenInfo`](../interfaces/TokenInfo.md) \| `undefined`\>

Defined in: [src/modules/system.ts:59](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/system.ts#L59)

Helper look-up for details of a specific token symbol (e.g. 'USDC').

#### Parameters

##### symbol

`string`

##### options?

[`SystemQueryOptions`](../interfaces/SystemQueryOptions.md) = `{}`

#### Returns

`Promise`\<[`TokenInfo`](../interfaces/TokenInfo.md) \| `undefined`\>

***

### tokens()

> **tokens**(`options?`): `Promise`\<readonly [`TokenInfo`](../interfaces/TokenInfo.md)[]\>

Defined in: [src/modules/system.ts:50](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/system.ts#L50)

Returns list of all tokens registered on Sera Protocol.

#### Parameters

##### options?

[`SystemQueryOptions`](../interfaces/SystemQueryOptions.md) = `{}`

#### Returns

`Promise`\<readonly [`TokenInfo`](../interfaces/TokenInfo.md)[]\>
