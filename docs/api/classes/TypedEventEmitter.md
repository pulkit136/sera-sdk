[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / TypedEventEmitter

# Class: TypedEventEmitter

Defined in: [src/events/index.ts:8](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/events/index.ts#L8)

A lightweight, dependency-free, strongly-typed event emitter.

## Constructors

### Constructor

> **new TypedEventEmitter**(): `TypedEventEmitter`

#### Returns

`TypedEventEmitter`

## Methods

### emit()

> **emit**\<`K`\>(`event`, `data`): `void`

Defined in: [src/events/index.ts:52](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/events/index.ts#L52)

Emit an event, invoking all registered listeners with the provided payload.

#### Type Parameters

##### K

`K` *extends* keyof [`SdkEvents`](../interfaces/SdkEvents.md)

#### Parameters

##### event

`K`

##### data

[`SdkEvents`](../interfaces/SdkEvents.md)\[`K`\]

#### Returns

`void`

***

### off()

> **off**\<`K`\>(`event`, `listener`): `this`

Defined in: [src/events/index.ts:37](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/events/index.ts#L37)

Remove a listener from a specific event.

#### Type Parameters

##### K

`K` *extends* keyof [`SdkEvents`](../interfaces/SdkEvents.md)

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<[`SdkEvents`](../interfaces/SdkEvents.md)\[`K`\]\>

#### Returns

`this`

***

### on()

> **on**\<`K`\>(`event`, `listener`): `this`

Defined in: [src/events/index.ts:15](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/events/index.ts#L15)

Register a persistent listener for a specific event.

#### Type Parameters

##### K

`K` *extends* keyof [`SdkEvents`](../interfaces/SdkEvents.md)

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<[`SdkEvents`](../interfaces/SdkEvents.md)\[`K`\]\>

#### Returns

`this`

***

### once()

> **once**\<`K`\>(`event`, `listener`): `this`

Defined in: [src/events/index.ts:26](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/events/index.ts#L26)

Register a single-use listener for a specific event.

#### Type Parameters

##### K

`K` *extends* keyof [`SdkEvents`](../interfaces/SdkEvents.md)

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<[`SdkEvents`](../interfaces/SdkEvents.md)\[`K`\]\>

#### Returns

`this`

***

### removeAllListeners()

> **removeAllListeners**(): `void`

Defined in: [src/events/index.ts:86](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/events/index.ts#L86)

Helper to clear all event listeners.

#### Returns

`void`
