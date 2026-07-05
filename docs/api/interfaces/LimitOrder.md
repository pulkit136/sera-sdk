[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / LimitOrder

# Interface: LimitOrder

Defined in: src/types/domain/index.ts:127

Represents a limit order in the Sera Central Limit Order Book (CLOB).

## Properties

### amount

> `readonly` **amount**: `string`

Defined in: src/types/domain/index.ts:144

Total token amount to trade, in base-10 decimal string.

#### Example

```ts
"10000.00"
```

***

### createdAt

> `readonly` **createdAt**: `number`

Defined in: src/types/domain/index.ts:162

Unix timestamp representing order placement.

***

### expiresAt?

> `readonly` `optional` **expiresAt?**: `number`

Defined in: src/types/domain/index.ts:166

Unix timestamp when the order will expire if not filled (optional).

***

### id

> `readonly` **id**: [`OrderId`](../type-aliases/OrderId.md)

Defined in: src/types/domain/index.ts:131

Unique order identifier.

***

### market

> `readonly` **market**: `string`

Defined in: src/types/domain/index.ts:135

The market ticker traded (e.g., 'USDC/EURC').

***

### price

> `readonly` **price**: `string`

Defined in: src/types/domain/index.ts:149

Price limit specified, in base-10 decimal string.

#### Example

```ts
"0.9250"
```

***

### remainingAmount

> `readonly` **remainingAmount**: `string`

Defined in: src/types/domain/index.ts:154

Remaining amount unfilled, in base-10 decimal string.

#### Example

```ts
"3500.00"
```

***

### side

> `readonly` **side**: [`OrderSide`](../enumerations/OrderSide.md)

Defined in: src/types/domain/index.ts:139

Order side (BUY or SELL).

***

### status

> `readonly` **status**: [`OrderStatus`](../enumerations/OrderStatus.md)

Defined in: src/types/domain/index.ts:158

Execution status of the order.

***

### timeInForce

> `readonly` **timeInForce**: [`TimeInForce`](../enumerations/TimeInForce.md)

Defined in: src/types/domain/index.ts:170

Time-in-force instruction (GTC, IOC, FOK).
