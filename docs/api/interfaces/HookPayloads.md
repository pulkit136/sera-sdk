[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / HookPayloads

# Interface: HookPayloads

Defined in: [src/hooks/types.ts:3](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L3)

## Indexable

> \[`customHook`: `string`\]: `any`

## Properties

### afterBalanceLoad

> **afterBalanceLoad**: `object`

Defined in: [src/hooks/types.ts:20](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L20)

#### balances

> **balances**: `any`

***

### afterOrder

> **afterOrder**: `object`

Defined in: [src/hooks/types.ts:14](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L14)

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

Defined in: [src/hooks/types.ts:18](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L18)

#### orderId

> **orderId**: `any`

#### status

> **status**: `string`

***

### afterOrderCreate

> **afterOrderCreate**: `object`

Defined in: [src/hooks/types.ts:16](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L16)

#### order

> **order**: `any`

***

### afterPayment

> **afterPayment**: `object`

Defined in: [src/hooks/types.ts:24](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L24)

#### paymentId

> **paymentId**: `string`

#### status

> **status**: `string`

***

### afterPaymentSign

> **afterPaymentSign**: `object`

Defined in: [src/hooks/types.ts:26](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L26)

#### intent

> **intent**: `any`

#### signature

> **signature**: `string`

***

### afterQuote

> **afterQuote**: `object`

Defined in: [src/hooks/types.ts:12](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L12)

#### quote

> **quote**: `any`

***

### afterRequest

> **afterRequest**: `object`

Defined in: [src/hooks/types.ts:6](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L6)

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

Defined in: [src/hooks/types.ts:8](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L8)

#### domain

> **domain**: `any`

#### signature

> **signature**: `string`

***

### afterSwap

> **afterSwap**: `object`

Defined in: [src/hooks/types.ts:10](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L10)

#### status

> **status**: `string`

#### txHash

> **txHash**: `string`

***

### afterSystemRequest

> **afterSystemRequest**: `object`

Defined in: [src/hooks/types.ts:22](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L22)

#### durationMs

> **durationMs**: `number`

#### type

> **type**: `string`

***

### afterVirtualLiquidity

> **afterVirtualLiquidity**: `object`

Defined in: [src/hooks/types.ts:28](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L28)

#### action

> **action**: `string`

#### result

> **result**: `any`

***

### afterVirtualLiquiditySign

> **afterVirtualLiquiditySign**: `object`

Defined in: [src/hooks/types.ts:30](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L30)

#### intent

> **intent**: `any`

#### signature

> **signature**: `string`

***

### beforeBalanceLoad

> **beforeBalanceLoad**: `object`

Defined in: [src/hooks/types.ts:19](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L19)

#### address?

> `optional` **address?**: `string`

***

### beforeOrder

> **beforeOrder**: `object`

Defined in: [src/hooks/types.ts:13](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L13)

#### body?

> `optional` **body?**: `any`

#### method

> **method**: `string`

#### path

> **path**: `string`

***

### beforeOrderCancel

> **beforeOrderCancel**: `object`

Defined in: [src/hooks/types.ts:17](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L17)

#### orderId

> **orderId**: `any`

***

### beforeOrderCreate

> **beforeOrderCreate**: `object`

Defined in: [src/hooks/types.ts:15](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L15)

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

Defined in: [src/hooks/types.ts:23](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L23)

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

Defined in: [src/hooks/types.ts:25](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L25)

#### intent

> **intent**: `any`

***

### beforeQuote

> **beforeQuote**: `object`

Defined in: [src/hooks/types.ts:11](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L11)

#### amount

> **amount**: `string`

#### inputToken

> **inputToken**: `string`

#### outputToken

> **outputToken**: `string`

***

### beforeRequest

> **beforeRequest**: `object`

Defined in: [src/hooks/types.ts:5](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L5)

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

Defined in: [src/hooks/types.ts:7](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L7)

#### domain

> **domain**: `any`

#### types

> **types**: `any`

#### value

> **value**: `any`

***

### beforeSwap

> **beforeSwap**: `object`

Defined in: [src/hooks/types.ts:9](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L9)

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

Defined in: [src/hooks/types.ts:21](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L21)

#### type

> **type**: `string`

***

### beforeVirtualLiquidity

> **beforeVirtualLiquidity**: `object`

Defined in: [src/hooks/types.ts:27](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L27)

#### action

> **action**: `string`

#### params

> **params**: `any`

***

### beforeVirtualLiquiditySign

> **beforeVirtualLiquiditySign**: `object`

Defined in: [src/hooks/types.ts:29](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L29)

#### intent

> **intent**: `any`

***

### client:init

> **client:init**: `object`

Defined in: [src/hooks/types.ts:4](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/hooks/types.ts#L4)

#### config

> **config**: `any`
