[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SwapQuote

# Interface: SwapQuote

Defined in: [src/types/domain/index.ts:203](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L203)

Estimated FX swap quote details returned by Smart Order Router.

## Properties

### expectedOutputAmount

> `readonly` **expectedOutputAmount**: `string`

Defined in: [src/types/domain/index.ts:223](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L223)

Estimated output amount expected, in base-10 decimals.

***

### expiresAt

> `readonly` **expiresAt**: `number`

Defined in: [src/types/domain/index.ts:239](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L239)

Unix timestamp when this quote expires.

***

### inputAmount

> `readonly` **inputAmount**: `string`

Defined in: [src/types/domain/index.ts:219](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L219)

Requested input amount, in base-10 decimals.

***

### inputToken

> `readonly` **inputToken**: `string`

Defined in: [src/types/domain/index.ts:211](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L211)

Input token symbol.

***

### minOutputAmount

> `readonly` **minOutputAmount**: `string`

Defined in: [src/types/domain/index.ts:227](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L227)

Guaranteed minimum output amount after slippage checks.

***

### outputToken

> `readonly` **outputToken**: `string`

Defined in: [src/types/domain/index.ts:215](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L215)

Output token symbol.

***

### protocolFee

> `readonly` **protocolFee**: `string`

Defined in: [src/types/domain/index.ts:235](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L235)

Fee breakdown in base-10 decimal string.

***

### route

> `readonly` **route**: readonly [`RouteLeg`](RouteLeg.md)[]

Defined in: [src/types/domain/index.ts:231](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L231)

Smart order router path legs.

***

### routeParams

> `readonly` **routeParams**: [`Eip712Intent`](Eip712Intent.md)

Defined in: [src/types/domain/index.ts:243](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L243)

Exact EIP-712 parameters required for wallet execution.

***

### uuid

> `readonly` **uuid**: [`QuoteId`](../type-aliases/QuoteId.md)

Defined in: [src/types/domain/index.ts:207](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L207)

Unique ID tracking this quote.
