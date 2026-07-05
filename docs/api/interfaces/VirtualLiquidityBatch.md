[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / VirtualLiquidityBatch

# Interface: VirtualLiquidityBatch

Defined in: src/types/domain/index.ts:271

Represents a Virtual Liquidity (VL) batch.

## Properties

### batchId

> `readonly` **batchId**: [`BatchId`](../type-aliases/BatchId.md)

Defined in: src/types/domain/index.ts:275

Unique batch identifier.

***

### orders

> `readonly` **orders**: readonly [`LimitOrder`](LimitOrder.md)[]

Defined in: src/types/domain/index.ts:284

List of active orders in the batch.

***

### sharedBudget

> `readonly` **sharedBudget**: `string`

Defined in: src/types/domain/index.ts:280

Maximum budget shared across all orders in this batch.

#### Example

```ts
"15000.00"
```

***

### status

> `readonly` **status**: [`LiquidityStatus`](../enumerations/LiquidityStatus.md)

Defined in: src/types/domain/index.ts:288

Status of this shared budget batch.
