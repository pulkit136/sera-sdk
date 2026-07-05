[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / HookPayloads

# Interface: HookPayloads

Defined in: src/hooks/types.ts:3

## Indexable

> \[`customHook`: `string`\]: `any`

## Properties

### afterBalanceLoad

> **afterBalanceLoad**: `object`

Defined in: src/hooks/types.ts:20

#### balances

> **balances**: `any`

***

### afterOrder

> **afterOrder**: `object`

Defined in: src/hooks/types.ts:14

#### durationMs

> **durationMs**: `number`

#### path

> **path**: `string`

#### response?

> `optional` **response?**: `any`

#### status

> **status**: `number`

***

### afterOrderCancel

> **afterOrderCancel**: `object`

Defined in: src/hooks/types.ts:18

#### orderId

> **orderId**: `any`

#### status

> **status**: `string`

***

### afterOrderCreate

> **afterOrderCreate**: `object`

Defined in: src/hooks/types.ts:16

#### order

> **order**: `any`

***

### afterPayment

> **afterPayment**: `object`

Defined in: src/hooks/types.ts:24

#### paymentId

> **paymentId**: `string`

#### status

> **status**: `string`

***

### afterPaymentSign

> **afterPaymentSign**: `object`

Defined in: src/hooks/types.ts:26

#### intent

> **intent**: `any`

#### signature

> **signature**: `string`

***

### afterQuote

> **afterQuote**: `object`

Defined in: src/hooks/types.ts:12

#### quote

> **quote**: `any`

***

### afterRequest

> **afterRequest**: `object`

Defined in: src/hooks/types.ts:6

#### durationMs

> **durationMs**: `number`

#### method

> **method**: `string`

#### path

> **path**: `string`

#### response?

> `optional` **response?**: `any`

#### status

> **status**: `number`

***

### afterSign

> **afterSign**: `object`

Defined in: src/hooks/types.ts:8

#### domain

> **domain**: `any`

#### signature

> **signature**: `string`

***

### afterSwap

> **afterSwap**: `object`

Defined in: src/hooks/types.ts:10

#### status

> **status**: `string`

#### txHash

> **txHash**: `string`

***

### afterSystemRequest

> **afterSystemRequest**: `object`

Defined in: src/hooks/types.ts:22

#### durationMs

> **durationMs**: `number`

#### type

> **type**: `string`

***

### afterVirtualLiquidity

> **afterVirtualLiquidity**: `object`

Defined in: src/hooks/types.ts:28

#### action

> **action**: `string`

#### result

> **result**: `any`

***

### afterVirtualLiquiditySign

> **afterVirtualLiquiditySign**: `object`

Defined in: src/hooks/types.ts:30

#### intent

> **intent**: `any`

#### signature

> **signature**: `string`

***

### beforeBalanceLoad

> **beforeBalanceLoad**: `object`

Defined in: src/hooks/types.ts:19

#### address?

> `optional` **address?**: `string`

***

### beforeOrder

> **beforeOrder**: `object`

Defined in: src/hooks/types.ts:13

#### body?

> `optional` **body?**: `any`

#### method

> **method**: `string`

#### path

> **path**: `string`

***

### beforeOrderCancel

> **beforeOrderCancel**: `object`

Defined in: src/hooks/types.ts:17

#### orderId

> **orderId**: `any`

***

### beforeOrderCreate

> **beforeOrderCreate**: `object`

Defined in: src/hooks/types.ts:15

#### amount

> **amount**: `string`

#### market

> **market**: `string`

#### price

> **price**: `string`

#### side

> **side**: `string`

***

### beforePayment

> **beforePayment**: `object`

Defined in: src/hooks/types.ts:23

#### amount

> **amount**: `string`

#### asset

> **asset**: `string`

#### memo?

> `optional` **memo?**: `string`

#### recipient

> **recipient**: `string`

***

### beforePaymentSign

> **beforePaymentSign**: `object`

Defined in: src/hooks/types.ts:25

#### intent

> **intent**: `any`

***

### beforeQuote

> **beforeQuote**: `object`

Defined in: src/hooks/types.ts:11

#### amount

> **amount**: `string`

#### inputToken

> **inputToken**: `string`

#### outputToken

> **outputToken**: `string`

***

### beforeRequest

> **beforeRequest**: `object`

Defined in: src/hooks/types.ts:5

#### body?

> `optional` **body?**: `any`

#### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

#### method

> **method**: `string`

#### path

> **path**: `string`

***

### beforeSign

> **beforeSign**: `object`

Defined in: src/hooks/types.ts:7

#### domain

> **domain**: `any`

#### types

> **types**: `any`

#### value

> **value**: `any`

***

### beforeSwap

> **beforeSwap**: `object`

Defined in: src/hooks/types.ts:9

#### amount

> **amount**: `string`

#### from

> **from**: `string`

#### recipient?

> `optional` **recipient?**: `string`

#### slippageToleranceBps?

> `optional` **slippageToleranceBps?**: `number`

#### to

> **to**: `string`

***

### beforeSystemRequest

> **beforeSystemRequest**: `object`

Defined in: src/hooks/types.ts:21

#### type

> **type**: `string`

***

### beforeVirtualLiquidity

> **beforeVirtualLiquidity**: `object`

Defined in: src/hooks/types.ts:27

#### action

> **action**: `string`

#### params

> **params**: `any`

***

### beforeVirtualLiquiditySign

> **beforeVirtualLiquiditySign**: `object`

Defined in: src/hooks/types.ts:29

#### intent

> **intent**: `any`

***

### client:init

> **client:init**: `object`

Defined in: src/hooks/types.ts:4

#### config

> **config**: `any`
