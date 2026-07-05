[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / HttpClient

# Class: HttpClient

Defined in: src/http/client.ts:9

Production-grade HTTP client wrapper around native fetch.
Acts as the single source of truth for all SDK HTTP communication.

## Constructors

### Constructor

> **new HttpClient**(`context`): `HttpClient`

Defined in: src/http/client.ts:12

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`HttpClient`

## Methods

### delete()

> **delete**\<`TResponse`\>(`path`, `options?`): `Promise`\<`TResponse`\>

Defined in: src/http/client.ts:62

Send a DELETE request.

#### Type Parameters

##### TResponse

`TResponse`

#### Parameters

##### path

`string`

##### options?

`Omit`\<[`HttpRequestOptions`](../interfaces/HttpRequestOptions.md), `"path"` \| `"method"`\>

#### Returns

`Promise`\<`TResponse`\>

***

### get()

> **get**\<`TResponse`\>(`path`, `options?`): `Promise`\<`TResponse`\>

Defined in: src/http/client.ts:19

Send a GET request.

#### Type Parameters

##### TResponse

`TResponse`

#### Parameters

##### path

`string`

##### options?

`Omit`\<[`HttpRequestOptions`](../interfaces/HttpRequestOptions.md), `"path"` \| `"method"`\>

#### Returns

`Promise`\<`TResponse`\>

***

### patch()

> **patch**\<`TResponse`\>(`path`, `body?`, `options?`): `Promise`\<`TResponse`\>

Defined in: src/http/client.ts:51

Send a PATCH request.

#### Type Parameters

##### TResponse

`TResponse`

#### Parameters

##### path

`string`

##### body?

`any`

##### options?

`Omit`\<[`HttpRequestOptions`](../interfaces/HttpRequestOptions.md), `"path"` \| `"method"` \| `"body"`\>

#### Returns

`Promise`\<`TResponse`\>

***

### post()

> **post**\<`TResponse`\>(`path`, `body?`, `options?`): `Promise`\<`TResponse`\>

Defined in: src/http/client.ts:29

Send a POST request.

#### Type Parameters

##### TResponse

`TResponse`

#### Parameters

##### path

`string`

##### body?

`any`

##### options?

`Omit`\<[`HttpRequestOptions`](../interfaces/HttpRequestOptions.md), `"path"` \| `"method"` \| `"body"`\>

#### Returns

`Promise`\<`TResponse`\>

***

### put()

> **put**\<`TResponse`\>(`path`, `body?`, `options?`): `Promise`\<`TResponse`\>

Defined in: src/http/client.ts:40

Send a PUT request.

#### Type Parameters

##### TResponse

`TResponse`

#### Parameters

##### path

`string`

##### body?

`any`

##### options?

`Omit`\<[`HttpRequestOptions`](../interfaces/HttpRequestOptions.md), `"path"` \| `"method"` \| `"body"`\>

#### Returns

`Promise`\<`TResponse`\>

***

### request()

> **request**\<`TResponse`\>(`options`): `Promise`\<`TResponse`\>

Defined in: src/http/client.ts:72

Core request runner that handles timeouts, retries, headers, and middleware hooks.

#### Type Parameters

##### TResponse

`TResponse`

#### Parameters

##### options

[`HttpRequestOptions`](../interfaces/HttpRequestOptions.md)

#### Returns

`Promise`\<`TResponse`\>
