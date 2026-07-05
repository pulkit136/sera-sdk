[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / VirtualLiquidityModule

# Class: VirtualLiquidityModule

Defined in: src/modules/liquidity.ts:11

Module responsible for virtual liquidity operations and managing shared budget batches.

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new VirtualLiquidityModule**(`context`): `VirtualLiquidityModule`

Defined in: src/modules/base.ts:10

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

Defined in: src/modules/liquidity.ts:126

Retrieve detail of a specific virtual liquidity batch.

#### Parameters

##### batchId

[`BatchId`](../type-aliases/BatchId.md)

#### Returns

`Promise`\<[`VirtualLiquidityBatch`](../interfaces/VirtualLiquidityBatch.md)\>

***

### cancelBatch()

> **cancelBatch**(`batchId`): `Promise`\<\{ `batchId`: [`BatchId`](../type-aliases/BatchId.md); `status`: [`LiquidityStatus`](../enumerations/LiquidityStatus.md); \}\>

Defined in: src/modules/liquidity.ts:81

Cancel an active virtual liquidity batch, signing a cancellation payload.

#### Parameters

##### batchId

[`BatchId`](../type-aliases/BatchId.md)

#### Returns

`Promise`\<\{ `batchId`: [`BatchId`](../type-aliases/BatchId.md); `status`: [`LiquidityStatus`](../enumerations/LiquidityStatus.md); \}\>

***

### createBatch()

> **createBatch**(`params`): `Promise`\<[`VirtualLiquidityBatch`](../interfaces/VirtualLiquidityBatch.md)\>

Defined in: src/modules/liquidity.ts:16

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

Defined in: src/modules/liquidity.ts:154

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

Defined in: src/modules/liquidity.ts:135

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

Defined in: src/modules/liquidity.ts:172

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

Defined in: src/modules/liquidity.ts:195

Invokes signature pipeline over batch parameters.

#### Parameters

##### intent

`any`

#### Returns

`Promise`\<`string`\>

***

### status()

> **status**(`batchId`): `Promise`\<[`LiquidityStatus`](../enumerations/LiquidityStatus.md)\>

Defined in: src/modules/liquidity.ts:146

Retrieve the status of a specific batch.

#### Parameters

##### batchId

[`BatchId`](../type-aliases/BatchId.md)

#### Returns

`Promise`\<[`LiquidityStatus`](../enumerations/LiquidityStatus.md)\>

***

### submit()

> **submit**(`params`): `Promise`\<[`RawCreateVlBatchResponse`](../interfaces/RawCreateVlBatchResponse.md)\>

Defined in: src/modules/liquidity.ts:231

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
