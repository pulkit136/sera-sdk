[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SdkConfig

# Interface: SdkConfig

Defined in: src/types/domain/config.ts:32

Fully resolved, immutable configuration object used internally at runtime.

## Properties

### apiKey?

> `readonly` `optional` **apiKey?**: `string`

Defined in: src/types/domain/config.ts:33

***

### baseUrl

> `readonly` **baseUrl**: `string`

Defined in: src/types/domain/config.ts:34

***

### debug

> `readonly` **debug**: `boolean`

Defined in: src/types/domain/config.ts:38

***

### environment

> `readonly` **environment**: [`SeraEnvironmentName`](../type-aliases/SeraEnvironmentName.md)

Defined in: src/types/domain/config.ts:35

***

### headers?

> `readonly` `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: src/types/domain/config.ts:42

***

### logger

> `readonly` **logger**: [`Logger`](Logger.md)

Defined in: src/types/domain/config.ts:39

***

### maxRetries

> `readonly` **maxRetries**: `number`

Defined in: src/types/domain/config.ts:37

***

### middlewares

> `readonly` **middlewares**: readonly [`Middleware`](Middleware.md)[]

Defined in: src/types/domain/config.ts:41

***

### signer?

> `readonly` `optional` **signer?**: [`ISeraSigner`](ISeraSigner.md)

Defined in: src/types/domain/config.ts:40

***

### timeout

> `readonly` **timeout**: `number`

Defined in: src/types/domain/config.ts:36

***

### userAgent?

> `readonly` `optional` **userAgent?**: `string`

Defined in: src/types/domain/config.ts:43
