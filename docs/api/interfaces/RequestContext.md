[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / RequestContext

# Interface: RequestContext

Defined in: [src/http/types.ts:23](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L23)

Execution context of an outbound request passed through middleware.

## Extended by

- [`ResponseContext`](ResponseContext.md)

## Properties

### attempt

> `readonly` **attempt**: `number`

Defined in: [src/http/types.ts:30](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L30)

***

### body?

> `readonly` `optional` **body?**: `any`

Defined in: [src/http/types.ts:28](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L28)

***

### client

> `readonly` **client**: [`SeraClient`](../classes/SeraClient.md)

Defined in: [src/http/types.ts:32](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L32)

***

### headers

> `readonly` **headers**: `Record`\<`string`, `string`\>

Defined in: [src/http/types.ts:27](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L27)

***

### method

> `readonly` **method**: [`HttpMethod`](../type-aliases/HttpMethod.md)

Defined in: [src/http/types.ts:25](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L25)

***

### options

> `readonly` **options**: [`HttpRequestOptions`](HttpRequestOptions.md)

Defined in: [src/http/types.ts:31](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L31)

***

### path

> `readonly` **path**: `string`

Defined in: [src/http/types.ts:24](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L24)

***

### requestId

> `readonly` **requestId**: `string`

Defined in: [src/http/types.ts:29](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L29)

***

### url

> `readonly` **url**: `string`

Defined in: [src/http/types.ts:26](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/http/types.ts#L26)
