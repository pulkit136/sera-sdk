[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SdkConfig

# Interface: SdkConfig

Defined in: [src/types/domain/config.ts:32](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L32)

Fully resolved, immutable configuration object used internally at runtime.

## Properties

### apiKey?

> `readonly` `optional` **apiKey?**: `string`

Defined in: [src/types/domain/config.ts:33](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L33)

***

### baseUrl

> `readonly` **baseUrl**: `string`

Defined in: [src/types/domain/config.ts:34](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L34)

***

### debug

> `readonly` **debug**: `boolean`

Defined in: [src/types/domain/config.ts:38](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L38)

***

### environment

> `readonly` **environment**: [`SeraEnvironmentName`](../type-aliases/SeraEnvironmentName.md)

Defined in: [src/types/domain/config.ts:35](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L35)

***

### headers?

> `readonly` `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [src/types/domain/config.ts:42](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L42)

***

### logger

> `readonly` **logger**: [`Logger`](Logger.md)

Defined in: [src/types/domain/config.ts:39](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L39)

***

### maxRetries

> `readonly` **maxRetries**: `number`

Defined in: [src/types/domain/config.ts:37](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L37)

***

### middlewares

> `readonly` **middlewares**: readonly [`Middleware`](Middleware.md)[]

Defined in: [src/types/domain/config.ts:41](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L41)

***

### signer?

> `readonly` `optional` **signer?**: [`ISeraSigner`](ISeraSigner.md)

Defined in: [src/types/domain/config.ts:40](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L40)

***

### timeout

> `readonly` **timeout**: `number`

Defined in: [src/types/domain/config.ts:36](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L36)

***

### userAgent?

> `readonly` `optional` **userAgent?**: `string`

Defined in: [src/types/domain/config.ts:43](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/config.ts#L43)
