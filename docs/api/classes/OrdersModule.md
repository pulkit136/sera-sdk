[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / OrdersModule

# Class: OrdersModule

Defined in: src/modules/orders.ts:76

Module for placing, cancelling, and querying limit orders in the CLOB.

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new OrdersModule**(`context`): `OrdersModule`

Defined in: src/modules/base.ts:10

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`OrdersModule`

#### Inherited from

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### buildIntent()

> **buildIntent**(`params`): `object`

Defined in: src/modules/orders.ts:239

Format intent values from order configuration.

#### Parameters

##### params

###### amount

`string`

###### market

`string`

###### price

`string`

###### side

[`OrderSide`](../enumerations/OrderSide.md)

#### Returns

`object`

##### amount

> **amount**: `string` = `params.amount`

##### market

> **market**: `string` = `params.market`

##### price

> **price**: `string` = `params.price`

##### side

> **side**: [`OrderSide`](../enumerations/OrderSide.md) = `params.side`

***

### cancel()

> **cancel**(`orderId`): `Promise`\<\{ `orderId`: [`OrderId`](../type-aliases/OrderId.md); `status`: [`OrderStatus`](../enumerations/OrderStatus.md); \}\>

Defined in: src/modules/orders.ts:142

Cancel an open limit order, signing EIP-712 cancellation instruction.

#### Parameters

##### orderId

[`OrderId`](../type-aliases/OrderId.md)

#### Returns

`Promise`\<\{ `orderId`: [`OrderId`](../type-aliases/OrderId.md); `status`: [`OrderStatus`](../enumerations/OrderStatus.md); \}\>

***

### cancelAll()

> **cancelAll**(): `Promise`\<`void`\>

Defined in: src/modules/orders.ts:192

Cancel all open orders for the active signer.

#### Returns

`Promise`\<`void`\>

***

### create()

> **create**(`params`): `Promise`\<[`LimitOrder`](../interfaces/LimitOrder.md)\>

Defined in: src/modules/orders.ts:81

Places a limit order by building EIP-712 parameters, requesting signatures, and submitting to matching ledger.

#### Parameters

##### params

###### amount

`string`

###### market

`string`

###### price

`string`

###### side

`"BUY"` \| `"SELL"` \| [`OrderSide`](../enumerations/OrderSide.md)

###### timeInForce?

[`TimeInForce`](../enumerations/TimeInForce.md)

#### Returns

`Promise`\<[`LimitOrder`](../interfaces/LimitOrder.md)\>

***

### get()

> **get**(`orderId`): `Promise`\<[`LimitOrder`](../interfaces/LimitOrder.md)\>

Defined in: src/modules/orders.ts:201

Get detail of a specific order.

#### Parameters

##### orderId

[`OrderId`](../type-aliases/OrderId.md)

#### Returns

`Promise`\<[`LimitOrder`](../interfaces/LimitOrder.md)\>

***

### list()

> **list**(`filters?`): `Promise`\<readonly [`LimitOrder`](../interfaces/LimitOrder.md)[]\>

Defined in: src/modules/orders.ts:210

List limit orders using paginated parameters.

#### Parameters

##### filters?

###### limit?

`number`

###### market?

`string`

###### offset?

`number`

###### side?

[`OrderSide`](../enumerations/OrderSide.md)

###### status?

[`OrderStatus`](../enumerations/OrderStatus.md)

#### Returns

`Promise`\<readonly [`LimitOrder`](../interfaces/LimitOrder.md)[]\>

***

### query()

> **query**(): [`OrderQueryBuilder`](OrderQueryBuilder.md)

Defined in: src/modules/orders.ts:232

Returns a fluent query builder to easily chain order filtering.

#### Returns

[`OrderQueryBuilder`](OrderQueryBuilder.md)

***

### sign()

> **sign**(`intent`): `Promise`\<`string`\>

Defined in: src/modules/orders.ts:251

Signs EIP-712 order intent parameters.

#### Parameters

##### intent

`any`

#### Returns

`Promise`\<`string`\>

***

### submit()

> **submit**(`params`): `Promise`\<[`RawCreateOrderResponse`](../interfaces/RawCreateOrderResponse.md)\>

Defined in: src/modules/orders.ts:276

Submits order parameters and wallet signature to POST /orders.

#### Parameters

##### params

###### amount

`string`

###### market

`string`

###### price

`string`

###### side

[`OrderSide`](../enumerations/OrderSide.md)

###### signature

`string`

#### Returns

`Promise`\<[`RawCreateOrderResponse`](../interfaces/RawCreateOrderResponse.md)\>
