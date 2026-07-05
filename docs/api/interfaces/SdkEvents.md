[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SdkEvents

# Interface: SdkEvents

Defined in: src/events/types.ts:11

## Properties

### balance:cacheHit

> **balance:cacheHit**: `object`

Defined in: src/events/types.ts:25

#### address

> **address**: `string`

***

### balance:failed

> **balance:failed**: `object`

Defined in: src/events/types.ts:26

#### error

> **error**: `Error`

***

### balance:loaded

> **balance:loaded**: `object`

Defined in: src/events/types.ts:23

#### balances

> **balances**: `any`

***

### balance:refreshed

> **balance:refreshed**: `object`

Defined in: src/events/types.ts:24

#### balances

> **balances**: `any`

***

### error:thrown

> **error:thrown**: `object`

Defined in: src/events/types.ts:41

#### error

> **error**: `Error`

***

### order:cancelled

> **order:cancelled**: `object`

Defined in: src/events/types.ts:19

#### orderId

> **orderId**: `any`

***

### order:created

> **order:created**: `object`

Defined in: src/events/types.ts:18

#### order

> **order**: [`LimitOrder`](LimitOrder.md)

***

### order:failed

> **order:failed**: `object`

Defined in: src/events/types.ts:22

#### error

> **error**: `Error`

***

### order:list

> **order:list**: `object`

Defined in: src/events/types.ts:21

#### orders

> **orders**: readonly [`LimitOrder`](LimitOrder.md)[]

***

### order:updated

> **order:updated**: `object`

Defined in: src/events/types.ts:20

#### order

> **order**: [`LimitOrder`](LimitOrder.md)

***

### payment:completed

> **payment:completed**: `object`

Defined in: src/events/types.ts:33

#### result

> **result**: `any`

***

### payment:failed

> **payment:failed**: `object`

Defined in: src/events/types.ts:34

#### error

> **error**: `Error`

***

### payment:prepared

> **payment:prepared**: `object`

Defined in: src/events/types.ts:31

#### intent

> **intent**: `any`

***

### payment:statusChanged

> **payment:statusChanged**: `object`

Defined in: src/events/types.ts:35

#### paymentId

> **paymentId**: `string`

#### status

> **status**: `string`

***

### payment:submitted

> **payment:submitted**: `object`

Defined in: src/events/types.ts:32

#### paymentId

> **paymentId**: `string`

***

### rate\_limit:exceeded

> **rate\_limit:exceeded**: `object`

Defined in: src/events/types.ts:40

#### retryAfterSeconds

> **retryAfterSeconds**: `number`

***

### swap:completed

> **swap:completed**: `object`

Defined in: src/events/types.ts:16

#### result

> **result**: [`SwapResult`](SwapResult.md)

***

### swap:executed

> **swap:executed**: `object`

Defined in: src/events/types.ts:12

#### amount

> **amount**: `string`

#### inputToken

> **inputToken**: `string`

#### outputToken

> **outputToken**: `string`

#### txHash

> **txHash**: `string`

***

### swap:failed

> **swap:failed**: `object`

Defined in: src/events/types.ts:17

#### error

> **error**: `Error`

***

### swap:quote

> **swap:quote**: `object`

Defined in: src/events/types.ts:13

#### quote

> **quote**: [`SwapQuote`](SwapQuote.md)

***

### swap:simulation

> **swap:simulation**: `object`

Defined in: src/events/types.ts:14

#### simulation

> **simulation**: [`SwapSimulation`](SwapSimulation.md)

***

### swap:submitted

> **swap:submitted**: `object`

Defined in: src/events/types.ts:15

#### quoteId

> **quoteId**: `string`

***

### system:cacheHit

> **system:cacheHit**: `object`

Defined in: src/events/types.ts:29

#### key

> **key**: `string`

***

### system:failed

> **system:failed**: `object`

Defined in: src/events/types.ts:30

#### error

> **error**: `Error`

***

### system:loaded

> **system:loaded**: `object`

Defined in: src/events/types.ts:27

#### data

> **data**: `any`

#### type

> **type**: `string`

***

### system:refreshed

> **system:refreshed**: `object`

Defined in: src/events/types.ts:28

#### data

> **data**: `any`

#### type

> **type**: `string`

***

### virtualLiquidity:cancelled

> **virtualLiquidity:cancelled**: `object`

Defined in: src/events/types.ts:37

#### batchId

> **batchId**: `any`

***

### virtualLiquidity:created

> **virtualLiquidity:created**: `object`

Defined in: src/events/types.ts:36

#### batch

> **batch**: `any`

***

### virtualLiquidity:failed

> **virtualLiquidity:failed**: `object`

Defined in: src/events/types.ts:39

#### error

> **error**: `Error`

***

### virtualLiquidity:updated

> **virtualLiquidity:updated**: `object`

Defined in: src/events/types.ts:38

#### batch

> **batch**: `any`
