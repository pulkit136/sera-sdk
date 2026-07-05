[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / MarketInfo

# Interface: MarketInfo

Defined in: [src/types/domain/index.ts:33](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L33)

Configuration and details of an active stablecoin trading pair.

## Properties

### baseToken

> `readonly` **baseToken**: [`TokenInfo`](TokenInfo.md)

Defined in: [src/types/domain/index.ts:41](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L41)

Target base currency token details (e.g. USDC).

***

### minOrderSize

> `readonly` **minOrderSize**: `string`

Defined in: [src/types/domain/index.ts:55](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L55)

Minimum amount size step allowed for orders.

#### Example

```ts
"1.00"
```

***

### minTickSize

> `readonly` **minTickSize**: `string`

Defined in: [src/types/domain/index.ts:50](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L50)

Minimum tick price movement in the order book.

#### Example

```ts
"0.0001"
```

***

### quoteToken

> `readonly` **quoteToken**: [`TokenInfo`](TokenInfo.md)

Defined in: [src/types/domain/index.ts:45](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L45)

Target quote currency token details (e.g. EURC).

***

### symbol

> `readonly` **symbol**: `string`

Defined in: [src/types/domain/index.ts:37](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L37)

Unique pair ticker identifier (e.g., 'USDC/EURC').
