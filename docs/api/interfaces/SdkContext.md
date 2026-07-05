[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SdkContext

# Interface: SdkContext

Defined in: src/types/domain/config.ts:52

Shared context container passed to all namespaces to prevent global state dependencies.

## Properties

### auth

> `readonly` **auth**: [`AuthEngine`](../classes/AuthEngine.md)

Defined in: src/types/domain/config.ts:55

***

### client

> `readonly` **client**: `any`

Defined in: src/types/domain/config.ts:53

***

### config

> `readonly` **config**: [`SdkConfig`](SdkConfig.md)

Defined in: src/types/domain/config.ts:54

***

### events

> `readonly` **events**: [`TypedEventEmitter`](../classes/TypedEventEmitter.md)

Defined in: src/types/domain/config.ts:58

***

### hooks

> `readonly` **hooks**: [`HookRegistry`](../classes/HookRegistry.md)

Defined in: src/types/domain/config.ts:57

***

### httpClient

> `readonly` **httpClient**: [`HttpClient`](../classes/HttpClient.md)

Defined in: src/types/domain/config.ts:56
