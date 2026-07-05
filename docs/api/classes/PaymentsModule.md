[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / PaymentsModule

# Class: PaymentsModule

Defined in: src/modules/payments.ts:11

Module responsible for creating, signing, executing, and tracking payments.

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new PaymentsModule**(`context`): `PaymentsModule`

Defined in: src/modules/base.ts:10

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`PaymentsModule`

#### Inherited from

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### estimate()

> **estimate**(`params`): `Promise`\<[`PaymentEstimation`](../interfaces/PaymentEstimation.md)\>

Defined in: src/modules/payments.ts:193

Estimates transaction fees for executing a transfer.

#### Parameters

##### params

###### amount

`string`

###### asset

`string`

#### Returns

`Promise`\<[`PaymentEstimation`](../interfaces/PaymentEstimation.md)\>

***

### history()

> **history**(`filters?`): `Promise`\<readonly [`PaymentResult`](../interfaces/PaymentResult.md)[]\>

Defined in: src/modules/payments.ts:180

Retrieves paginated payment history logs.

#### Parameters

##### filters?

###### limit?

`number`

###### offset?

`number`

#### Returns

`Promise`\<readonly [`PaymentResult`](../interfaces/PaymentResult.md)[]\>

***

### pay()

> **pay**(`params`): `Promise`\<[`PaymentResult`](../interfaces/PaymentResult.md)\>

Defined in: src/modules/payments.ts:17

High-level flagship method to execute a complete payment.
Automatically prepares the transfer details, requests EIP-712 signature from the wallet, submits, and returns execution.

#### Parameters

##### params

###### amount

`string`

###### asset

`string`

###### memo?

`string`

###### recipient

`string`

#### Returns

`Promise`\<[`PaymentResult`](../interfaces/PaymentResult.md)\>

***

### prepare()

> **prepare**(`params`): `Promise`\<[`PaymentIntent`](../interfaces/PaymentIntent.md)\>

Defined in: src/modules/payments.ts:57

Prepares a payment by creating a transfer intent on the backend.

#### Parameters

##### params

###### amount

`string`

###### asset

`string`

###### memo?

`string`

###### recipient

`string`

#### Returns

`Promise`\<[`PaymentIntent`](../interfaces/PaymentIntent.md)\>

***

### sign()

> **sign**(`intent`): `Promise`\<`string`\>

Defined in: src/modules/payments.ts:85

Invokes EIP-712 message signing over prepared payment parameters.

#### Parameters

##### intent

[`PaymentIntent`](../interfaces/PaymentIntent.md)

#### Returns

`Promise`\<`string`\>

***

### status()

> **status**(`paymentId`): `Promise`\<[`PaymentStatusInfo`](../interfaces/PaymentStatusInfo.md)\>

Defined in: src/modules/payments.ts:163

Retrieves the current processing status of a specific payment.

#### Parameters

##### paymentId

`string`

#### Returns

`Promise`\<[`PaymentStatusInfo`](../interfaces/PaymentStatusInfo.md)\>

***

### submit()

> **submit**(`intent`, `signature`): `Promise`\<[`PaymentResult`](../interfaces/PaymentResult.md)\>

Defined in: src/modules/payments.ts:132

Submits a signed payment instruction to the execution backend.

#### Parameters

##### intent

[`PaymentIntent`](../interfaces/PaymentIntent.md)

##### signature

`string`

#### Returns

`Promise`\<[`PaymentResult`](../interfaces/PaymentResult.md)\>
