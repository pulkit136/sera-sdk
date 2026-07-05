[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / RequestContext

# Interface: RequestContext

Defined in: src/http/types.ts:23

Execution context of an outbound request passed through middleware.

## Extended by

- [`ResponseContext`](ResponseContext.md)

## Properties

### attempt

> `readonly` **attempt**: `number`

Defined in: src/http/types.ts:30

***

### body?

> `readonly` `optional` **body?**: `any`

Defined in: src/http/types.ts:28

***

### client

> `readonly` **client**: [`SeraClient`](../classes/SeraClient.md)

Defined in: src/http/types.ts:32

***

### headers

> `readonly` **headers**: `Record`\<`string`, `string`\>

Defined in: src/http/types.ts:27

***

### method

> `readonly` **method**: [`HttpMethod`](../type-aliases/HttpMethod.md)

Defined in: src/http/types.ts:25

***

### options

> `readonly` **options**: [`HttpRequestOptions`](HttpRequestOptions.md)

Defined in: src/http/types.ts:31

***

### path

> `readonly` **path**: `string`

Defined in: src/http/types.ts:24

***

### requestId

> `readonly` **requestId**: `string`

Defined in: src/http/types.ts:29

***

### url

> `readonly` **url**: `string`

Defined in: src/http/types.ts:26
