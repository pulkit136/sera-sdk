[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SwapModule

# Class: SwapModule

Defined in: [src/modules/swap.ts:13](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/swap.ts#L13)

Flagship module for executing stablecoin swaps on the Sera Protocol.
Provides both high-level all-in-one executions and fine-grained low-level steps.

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new SwapModule**(`context`): `SwapModule`

Defined in: [src/modules/base.ts:10](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/base.ts#L10)

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`SwapModule`

#### Inherited from

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### buildIntent()

> **buildIntent**(`quote`): [`Eip712Intent`](../interfaces/Eip712Intent.md)

Defined in: [src/modules/swap.ts:135](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/swap.ts#L135)

Format the intent value extracted from a quote.

#### Parameters

##### quote

[`SwapQuote`](../interfaces/SwapQuote.md)

#### Returns

[`Eip712Intent`](../interfaces/Eip712Intent.md)

***

### execute()

> **execute**(`params`): `Promise`\<[`SwapResult`](../interfaces/SwapResult.md)\>

Defined in: [src/modules/swap.ts:19](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/swap.ts#L19)

The flagship all-in-one method to execute a swap.
Automatically requests a quote, prompts signature execution, submits, and returns results.

#### Parameters

##### params

###### amount

`string`

###### from

`string`

###### recipient?

`string`

###### slippageToleranceBps?

`number`

###### to

`string`

#### Returns

`Promise`\<[`SwapResult`](../interfaces/SwapResult.md)\>

***

### quote()

> **quote**(`params`): `Promise`\<[`SwapQuote`](../interfaces/SwapQuote.md)\>

Defined in: [src/modules/swap.ts:71](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/swap.ts#L71)

Fetch a quote for an instant stablecoin swap.

#### Parameters

##### params

###### amount

`string`

###### inputToken

`string`

###### outputToken

`string`

###### slippageToleranceBps?

`number`

#### Returns

`Promise`\<[`SwapQuote`](../interfaces/SwapQuote.md)\>

***

### sign()

> **sign**(`intent`): `Promise`\<`string`\>

Defined in: [src/modules/swap.ts:142](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/swap.ts#L142)

Trigger EIP-712 signature over an intent payload.

#### Parameters

##### intent

`any`

#### Returns

`Promise`\<`string`\>

***

### simulate()

> **simulate**(`params`): `Promise`\<[`SwapSimulation`](../interfaces/SwapSimulation.md)\>

Defined in: [src/modules/swap.ts:104](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/swap.ts#L104)

Simulate a swap transaction to estimate output, fees, and path legs without signing.

#### Parameters

##### params

###### amount

`string`

###### from

`string`

###### slippageToleranceBps?

`number`

###### to

`string`

#### Returns

`Promise`\<[`SwapSimulation`](../interfaces/SwapSimulation.md)\>

***

### submit()

> **submit**(`quoteId`, `signature`, `routeParams`): `Promise`\<[`SwapResult`](../interfaces/SwapResult.md)\>

Defined in: [src/modules/swap.ts:173](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/swap.ts#L173)

Submit the signature and the quote parameters to execute the transaction.

#### Parameters

##### quoteId

`string`

##### signature

`string`

##### routeParams

`any`

#### Returns

`Promise`\<[`SwapResult`](../interfaces/SwapResult.md)\>
