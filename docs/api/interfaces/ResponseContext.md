[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / ResponseContext

# Interface: ResponseContext

Defined in: [src/http/types.ts:38](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L38)

Execution context of a received response passed through middleware.

## Extends

- [`RequestContext`](RequestContext.md)

## Properties

### attempt

> `readonly` **attempt**: `number`

Defined in: [src/http/types.ts:30](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L30)

#### Inherited from

[`RequestContext`](RequestContext.md).[`attempt`](RequestContext.md#attempt)

***

### body?

> `readonly` `optional` **body?**: `any`

Defined in: [src/http/types.ts:28](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L28)

#### Inherited from

[`RequestContext`](RequestContext.md).[`body`](RequestContext.md#body)

***

### client

> `readonly` **client**: [`SeraClient`](../classes/SeraClient.md)

Defined in: [src/http/types.ts:32](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L32)

#### Inherited from

[`RequestContext`](RequestContext.md).[`client`](RequestContext.md#client)

***

### durationMs

> `readonly` **durationMs**: `number`

Defined in: [src/http/types.ts:44](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L44)

***

### headers

> `readonly` **headers**: `Record`\<`string`, `string`\>

Defined in: [src/http/types.ts:27](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L27)

#### Inherited from

[`RequestContext`](RequestContext.md).[`headers`](RequestContext.md#headers)

***

### method

> `readonly` **method**: [`HttpMethod`](../type-aliases/HttpMethod.md)

Defined in: [src/http/types.ts:25](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L25)

#### Inherited from

[`RequestContext`](RequestContext.md).[`method`](RequestContext.md#method)

***

### options

> `readonly` **options**: [`HttpRequestOptions`](HttpRequestOptions.md)

Defined in: [src/http/types.ts:31](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L31)

#### Inherited from

[`RequestContext`](RequestContext.md).[`options`](RequestContext.md#options)

***

### parsedBody

> `readonly` **parsedBody**: `any`

Defined in: [src/http/types.ts:41](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L41)

***

### path

> `readonly` **path**: `string`

Defined in: [src/http/types.ts:24](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L24)

#### Inherited from

[`RequestContext`](RequestContext.md).[`path`](RequestContext.md#path)

***

### rawBody

> `readonly` **rawBody**: `string`

Defined in: [src/http/types.ts:40](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L40)

***

### requestId

> `readonly` **requestId**: `string`

Defined in: [src/http/types.ts:29](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L29)

#### Inherited from

[`RequestContext`](RequestContext.md).[`requestId`](RequestContext.md#requestid)

***

### response

> `readonly` **response**: `Response`

Defined in: [src/http/types.ts:39](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L39)

***

### responseHeaders

> `readonly` **responseHeaders**: `Record`\<`string`, `string`\>

Defined in: [src/http/types.ts:43](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L43)

***

### status

> `readonly` **status**: `number`

Defined in: [src/http/types.ts:42](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L42)

***

### url

> `readonly` **url**: `string`

Defined in: [src/http/types.ts:26](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L26)

#### Inherited from

[`RequestContext`](RequestContext.md).[`url`](RequestContext.md#url)
