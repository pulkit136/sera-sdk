[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / LimitOrder

# Interface: LimitOrder

Defined in: [src/types/domain/index.ts:127](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L127)

Represents a limit order in the Sera Central Limit Order Book (CLOB).

## Properties

### amount

> `readonly` **amount**: `string`

Defined in: [src/types/domain/index.ts:144](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L144)

Total token amount to trade, in base-10 decimal string.

#### Example

```ts
"10000.00"
```

***

### createdAt

> `readonly` **createdAt**: `number`

Defined in: [src/types/domain/index.ts:162](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L162)

Unix timestamp representing order placement.

***

### expiresAt?

> `readonly` `optional` **expiresAt?**: `number`

Defined in: [src/types/domain/index.ts:166](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L166)

Unix timestamp when the order will expire if not filled (optional).

***

### id

> `readonly` **id**: [`OrderId`](../type-aliases/OrderId.md)

Defined in: [src/types/domain/index.ts:131](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L131)

Unique order identifier.

***

### market

> `readonly` **market**: `string`

Defined in: [src/types/domain/index.ts:135](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L135)

The market ticker traded (e.g., 'USDC/EURC').

***

### price

> `readonly` **price**: `string`

Defined in: [src/types/domain/index.ts:149](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L149)

Price limit specified, in base-10 decimal string.

#### Example

```ts
"0.9250"
```

***

### remainingAmount

> `readonly` **remainingAmount**: `string`

Defined in: [src/types/domain/index.ts:154](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L154)

Remaining amount unfilled, in base-10 decimal string.

#### Example

```ts
"3500.00"
```

***

### side

> `readonly` **side**: [`OrderSide`](../enumerations/OrderSide.md)

Defined in: [src/types/domain/index.ts:139](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L139)

Order side (BUY or SELL).

***

### status

> `readonly` **status**: [`OrderStatus`](../enumerations/OrderStatus.md)

Defined in: [src/types/domain/index.ts:158](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L158)

Execution status of the order.

***

### timeInForce

> `readonly` **timeInForce**: [`TimeInForce`](../enumerations/TimeInForce.md)

Defined in: [src/types/domain/index.ts:170](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L170)

Time-in-force instruction (GTC, IOC, FOK).
