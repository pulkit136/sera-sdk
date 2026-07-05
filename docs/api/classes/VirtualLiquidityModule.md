[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / VirtualLiquidityModule

# Class: VirtualLiquidityModule

Defined in: [src/modules/liquidity.ts:11](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/liquidity.ts#L11)

Module responsible for virtual liquidity operations and managing shared budget batches.

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new VirtualLiquidityModule**(`context`): `VirtualLiquidityModule`

Defined in: [src/modules/base.ts:10](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/base.ts#L10)

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`VirtualLiquidityModule`

#### Inherited from

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### batch()

> **batch**(`batchId`): `Promise`\<[`VirtualLiquidityBatch`](../interfaces/VirtualLiquidityBatch.md)\>

Defined in: [src/modules/liquidity.ts:126](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/liquidity.ts#L126)

Retrieve detail of a specific virtual liquidity batch.

#### Parameters

##### batchId

[`BatchId`](../type-aliases/BatchId.md)

#### Returns

`Promise`\<[`VirtualLiquidityBatch`](../interfaces/VirtualLiquidityBatch.md)\>

***

### cancelBatch()

> **cancelBatch**(`batchId`): `Promise`\<\{ `batchId`: [`BatchId`](../type-aliases/BatchId.md); `status`: [`LiquidityStatus`](../enumerations/LiquidityStatus.md); \}\>

Defined in: [src/modules/liquidity.ts:81](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/liquidity.ts#L81)

Cancel an active virtual liquidity batch, signing a cancellation payload.

#### Parameters

##### batchId

[`BatchId`](../type-aliases/BatchId.md)

#### Returns

`Promise`\<\{ `batchId`: [`BatchId`](../type-aliases/BatchId.md); `status`: [`LiquidityStatus`](../enumerations/LiquidityStatus.md); \}\>

***

### createBatch()

> **createBatch**(`params`): `Promise`\<[`VirtualLiquidityBatch`](../interfaces/VirtualLiquidityBatch.md)\>

Defined in: [src/modules/liquidity.ts:16](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/liquidity.ts#L16)

Orchestrates the creation of a virtual liquidity batch.

#### Parameters

##### params

###### orders

readonly `object`[]

###### sharedBudget

`string`

#### Returns

`Promise`\<[`VirtualLiquidityBatch`](../interfaces/VirtualLiquidityBatch.md)\>

***

### estimate()

> **estimate**(`params`): `Promise`\<\{ `estimatedGas`: `string`; `feeAmount`: `string`; \}\>

Defined in: [src/modules/liquidity.ts:154](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/liquidity.ts#L154)

Estimate fee metrics for deploying a virtual liquidity batch.

#### Parameters

##### params

###### orderCount

`number`

###### sharedBudget

`string`

#### Returns

`Promise`\<\{ `estimatedGas`: `string`; `feeAmount`: `string`; \}\>

***

### list()

> **list**(`filters?`): `Promise`\<readonly [`VirtualLiquidityBatch`](../interfaces/VirtualLiquidityBatch.md)[]\>

Defined in: [src/modules/liquidity.ts:135](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/liquidity.ts#L135)

List virtual liquidity batches.

#### Parameters

##### filters?

###### limit?

`number`

###### offset?

`number`

#### Returns

`Promise`\<readonly [`VirtualLiquidityBatch`](../interfaces/VirtualLiquidityBatch.md)[]\>

***

### prepare()

> **prepare**(`params`): `object`

Defined in: [src/modules/liquidity.ts:172](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/liquidity.ts#L172)

Formats the intent value configuration.

#### Parameters

##### params

###### orders

readonly `object`[]

###### sharedBudget

`string`

#### Returns

`object`

##### orders

> **orders**: `object`[]

##### sharedBudget

> **sharedBudget**: `string` = `params.sharedBudget`

***

### sign()

> **sign**(`intent`): `Promise`\<`string`\>

Defined in: [src/modules/liquidity.ts:195](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/liquidity.ts#L195)

Invokes signature pipeline over batch parameters.

#### Parameters

##### intent

`any`

#### Returns

`Promise`\<`string`\>

***

### status()

> **status**(`batchId`): `Promise`\<[`LiquidityStatus`](../enumerations/LiquidityStatus.md)\>

Defined in: [src/modules/liquidity.ts:146](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/liquidity.ts#L146)

Retrieve the status of a specific batch.

#### Parameters

##### batchId

[`BatchId`](../type-aliases/BatchId.md)

#### Returns

`Promise`\<[`LiquidityStatus`](../enumerations/LiquidityStatus.md)\>

***

### submit()

> **submit**(`params`): `Promise`\<[`RawCreateVlBatchResponse`](../interfaces/RawCreateVlBatchResponse.md)\>

Defined in: [src/modules/liquidity.ts:231](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/liquidity.ts#L231)

Submits batch to executor.

#### Parameters

##### params

###### orders

readonly `object`[]

###### sharedBudget

`string`

###### signature

`string`

#### Returns

`Promise`\<[`RawCreateVlBatchResponse`](../interfaces/RawCreateVlBatchResponse.md)\>
