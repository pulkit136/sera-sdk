[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / ResponseContext

# Interface: ResponseContext

Defined in: src/http/types.ts:38

Execution context of a received response passed through middleware.

## Extends

- [`RequestContext`](RequestContext.md)

## Properties

### attempt

> `readonly` **attempt**: `number`

Defined in: src/http/types.ts:30

#### Inherited from

[`RequestContext`](RequestContext.md).[`attempt`](RequestContext.md#attempt)

***

### body?

> `readonly` `optional` **body?**: `any`

Defined in: src/http/types.ts:28

#### Inherited from

[`RequestContext`](RequestContext.md).[`body`](RequestContext.md#body)

***

### client

> `readonly` **client**: [`SeraClient`](../classes/SeraClient.md)

Defined in: src/http/types.ts:32

#### Inherited from

[`RequestContext`](RequestContext.md).[`client`](RequestContext.md#client)

***

### durationMs

> `readonly` **durationMs**: `number`

Defined in: src/http/types.ts:44

***

### headers

> `readonly` **headers**: `Record`\<`string`, `string`\>

Defined in: src/http/types.ts:27

#### Inherited from

[`RequestContext`](RequestContext.md).[`headers`](RequestContext.md#headers)

***

### method

> `readonly` **method**: [`HttpMethod`](../type-aliases/HttpMethod.md)

Defined in: src/http/types.ts:25

#### Inherited from

[`RequestContext`](RequestContext.md).[`method`](RequestContext.md#method)

***

### options

> `readonly` **options**: [`HttpRequestOptions`](HttpRequestOptions.md)

Defined in: src/http/types.ts:31

#### Inherited from

[`RequestContext`](RequestContext.md).[`options`](RequestContext.md#options)

***

### parsedBody

> `readonly` **parsedBody**: `any`

Defined in: src/http/types.ts:41

***

### path

> `readonly` **path**: `string`

Defined in: src/http/types.ts:24

#### Inherited from

[`RequestContext`](RequestContext.md).[`path`](RequestContext.md#path)

***

### rawBody

> `readonly` **rawBody**: `string`

Defined in: src/http/types.ts:40

***

### requestId

> `readonly` **requestId**: `string`

Defined in: src/http/types.ts:29

#### Inherited from

[`RequestContext`](RequestContext.md).[`requestId`](RequestContext.md#requestid)

***

### response

> `readonly` **response**: `Response`

Defined in: src/http/types.ts:39

***

### responseHeaders

> `readonly` **responseHeaders**: `Record`\<`string`, `string`\>

Defined in: src/http/types.ts:43

***

### status

> `readonly` **status**: `number`

Defined in: src/http/types.ts:42

***

### url

> `readonly` **url**: `string`

Defined in: src/http/types.ts:26

#### Inherited from

[`RequestContext`](RequestContext.md).[`url`](RequestContext.md#url)
