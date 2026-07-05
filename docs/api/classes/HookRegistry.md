[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / HookRegistry

# Class: HookRegistry

Defined in: src/hooks/index.ts:9

A lightweight synchronous and asynchronous lifecycle hook registry.
Hooks execute sequentially, allowing callbacks to inspect or mutate payloads.

## Constructors

### Constructor

> **new HookRegistry**(): `HookRegistry`

#### Returns

`HookRegistry`

## Methods

### emit()

> **emit**\<`K`\>(`event`, `data`): `Promise`\<[`HookPayloads`](../interfaces/HookPayloads.md)\[`K`\]\>

Defined in: src/hooks/index.ts:39

Emit a hook sequentially, awaiting async callbacks and passing mutated payloads.

#### Type Parameters

##### K

`K` *extends* keyof [`HookPayloads`](../interfaces/HookPayloads.md)

#### Parameters

##### event

`K`

##### data

[`HookPayloads`](../interfaces/HookPayloads.md)\[`K`\]

#### Returns

`Promise`\<[`HookPayloads`](../interfaces/HookPayloads.md)\[`K`\]\>

***

### off()

> **off**\<`K`\>(`event`, `callback`): `this`

Defined in: src/hooks/index.ts:27

Unregister a callback from a hook.

#### Type Parameters

##### K

`K` *extends* keyof [`HookPayloads`](../interfaces/HookPayloads.md)

#### Parameters

##### event

`K`

##### callback

[`HookCallback`](../type-aliases/HookCallback.md)\<[`HookPayloads`](../interfaces/HookPayloads.md)\[`K`\]\>

#### Returns

`this`

***

### on()

> **on**\<`K`\>(`event`, `callback`): `this`

Defined in: src/hooks/index.ts:15

Register a callback for a specific lifecycle hook.

#### Type Parameters

##### K

`K` *extends* keyof [`HookPayloads`](../interfaces/HookPayloads.md)

#### Parameters

##### event

`K`

##### callback

[`HookCallback`](../type-aliases/HookCallback.md)\<[`HookPayloads`](../interfaces/HookPayloads.md)\[`K`\]\>

#### Returns

`this`

***

### removeAllHooks()

> **removeAllHooks**(): `void`

Defined in: src/hooks/index.ts:64

Remove all hook listeners.

#### Returns

`void`
