[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / OrderQueryBuilder

# Class: OrderQueryBuilder

Defined in: [src/modules/orders.ts:11](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/orders.ts#L11)

Fluent query builder to filter and retrieve orders with chained settings.

## Constructors

### Constructor

> **new OrderQueryBuilder**(`module`): `OrderQueryBuilder`

Defined in: [src/modules/orders.ts:21](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/orders.ts#L21)

#### Parameters

##### module

[`OrdersModule`](OrdersModule.md)

#### Returns

`OrderQueryBuilder`

## Methods

### fetch()

> **fetch**(): `Promise`\<readonly [`LimitOrder`](../interfaces/LimitOrder.md)[]\>

Defined in: [src/modules/orders.ts:68](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/orders.ts#L68)

Execute the query and return matching limit orders.

#### Returns

`Promise`\<readonly [`LimitOrder`](../interfaces/LimitOrder.md)[]\>

***

### limit()

> **limit**(`limit`): `this`

Defined in: [src/modules/orders.ts:52](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/orders.ts#L52)

Limit the number of query results.

#### Parameters

##### limit

`number`

#### Returns

`this`

***

### market()

> **market**(`market`): `this`

Defined in: [src/modules/orders.ts:28](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/orders.ts#L28)

Filter orders by market pair (e.g. 'USDC/EURC').

#### Parameters

##### market

`string`

#### Returns

`this`

***

### offset()

> **offset**(`offset`): `this`

Defined in: [src/modules/orders.ts:60](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/orders.ts#L60)

Specify query offset pagination index.

#### Parameters

##### offset

`number`

#### Returns

`this`

***

### side()

> **side**(`side`): `this`

Defined in: [src/modules/orders.ts:36](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/orders.ts#L36)

Filter orders by execution side (BUY or SELL).

#### Parameters

##### side

`"BUY"` \| `"SELL"` \| [`OrderSide`](../enumerations/OrderSide.md)

#### Returns

`this`

***

### status()

> **status**(`status`): `this`

Defined in: [src/modules/orders.ts:44](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/orders.ts#L44)

Filter orders by active status (e.g. OPEN, FILLED).

#### Parameters

##### status

`"OPEN"` \| `"FILLED"` \| `"PARTIALLY_FILLED"` \| `"CANCELLED"` \| `"EXPIRED"` \| [`OrderStatus`](../enumerations/OrderStatus.md)

#### Returns

`this`
