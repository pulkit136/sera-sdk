[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / Middleware

# Interface: Middleware

Defined in: src/http/middleware.ts:6

Interface that all HTTP interceptor middlewares must implement.

## Properties

### name

> `readonly` **name**: `string`

Defined in: src/http/middleware.ts:7

## Methods

### afterResponse()?

> `optional` **afterResponse**(`context`): `void` \| [`ResponseContext`](ResponseContext.md) \| `Promise`\<`void` \| [`ResponseContext`](ResponseContext.md)\>

Defined in: src/http/middleware.ts:21

Executed sequentially after a successful (ok) response is received.
Can inspect or mutate the ResponseContext. Returning a mutated ResponseContext overrides the active one.

#### Parameters

##### context

[`ResponseContext`](ResponseContext.md)

#### Returns

`void` \| [`ResponseContext`](ResponseContext.md) \| `Promise`\<`void` \| [`ResponseContext`](ResponseContext.md)\>

***

### beforeRequest()?

> `optional` **beforeRequest**(`context`): `void` \| [`RequestContext`](RequestContext.md) \| `Promise`\<`void` \| [`RequestContext`](RequestContext.md)\>

Defined in: src/http/middleware.ts:13

Executed sequentially before fetch is triggered.
Can inspect or mutate the RequestContext. Returning a mutated RequestContext overrides the active one.

#### Parameters

##### context

[`RequestContext`](RequestContext.md)

#### Returns

`void` \| [`RequestContext`](RequestContext.md) \| `Promise`\<`void` \| [`RequestContext`](RequestContext.md)\>

***

### onError()?

> `optional` **onError**(`context`): `void` \| `Error` \| `Promise`\<`void` \| `Error`\>

Defined in: src/http/middleware.ts:29

Executed sequentially when a request fails due to status code, abort, or network drop.
Can inspect or replace the thrown Error. Returning a new Error overrides the active one.

#### Parameters

##### context

[`RequestContext`](RequestContext.md) & `object`

#### Returns

`void` \| `Error` \| `Promise`\<`void` \| `Error`\>
