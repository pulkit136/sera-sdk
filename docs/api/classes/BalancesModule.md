[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / BalancesModule

# Class: BalancesModule

Defined in: src/modules/balances.ts:25

Module responsible for fetching, caching, and helping developers inspect account balances.

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new BalancesModule**(`context`): `BalancesModule`

Defined in: src/modules/base.ts:10

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`BalancesModule`

#### Inherited from

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### available()

> **available**(`symbol`, `address?`): `Promise`\<`string`\>

Defined in: src/modules/balances.ts:119

Helper that retrieves available vault collateral for a symbol.

#### Parameters

##### symbol

`string`

##### address?

`string`

#### Returns

`Promise`\<`string`\>

***

### frozen()

> **frozen**(`symbol`, `address?`): `Promise`\<`string`\>

Defined in: src/modules/balances.ts:127

Helper that retrieves frozen vault collateral for a symbol.

#### Parameters

##### symbol

`string`

##### address?

`string`

#### Returns

`Promise`\<`string`\>

***

### get()

> **get**(`address?`, `options?`): `Promise`\<[`AccountBalances`](../interfaces/AccountBalances.md)\>

Defined in: src/modules/balances.ts:32

Fetches the account balances for a specific address or the configured signer.

#### Parameters

##### address?

`string`

##### options?

[`BalanceQueryOptions`](../interfaces/BalanceQueryOptions.md) = `{}`

#### Returns

`Promise`\<[`AccountBalances`](../interfaces/AccountBalances.md)\>

***

### refresh()

> **refresh**(`address?`): `Promise`\<[`AccountBalances`](../interfaces/AccountBalances.md)\>

Defined in: src/modules/balances.ts:96

Bypasses cached values and retrieves fresh balance details.

#### Parameters

##### address?

`string`

#### Returns

`Promise`\<[`AccountBalances`](../interfaces/AccountBalances.md)\>

***

### total()

> **total**(`symbol`, `address?`): `Promise`\<`string`\>

Defined in: src/modules/balances.ts:135

Helper that retrieves total vault collateral for a symbol.

#### Parameters

##### symbol

`string`

##### address?

`string`

#### Returns

`Promise`\<`string`\>

***

### vault()

> **vault**(`symbol`, `address?`): `Promise`\<[`BalanceDetails`](../interfaces/BalanceDetails.md)\>

Defined in: src/modules/balances.ts:111

Helper that retrieves the vault balance breakdown details for a token symbol.

#### Parameters

##### symbol

`string`

##### address?

`string`

#### Returns

`Promise`\<[`BalanceDetails`](../interfaces/BalanceDetails.md)\>

***

### wallet()

> **wallet**(`symbol`, `address?`): `Promise`\<`string`\>

Defined in: src/modules/balances.ts:103

Helper that retrieves the wallet balance for a specific token symbol.

#### Parameters

##### symbol

`string`

##### address?

`string`

#### Returns

`Promise`\<`string`\>
