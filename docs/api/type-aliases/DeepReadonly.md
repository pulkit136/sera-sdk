[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / DeepReadonly

# Type Alias: DeepReadonly\<T\>

> **DeepReadonly**\<`T`\> = `{ readonly [K in keyof T]: T[K] extends Record<string, any> ? DeepReadonly<T[K]> : T[K] }`

Defined in: src/types/shared/utilities.ts:21

Makes all properties of an object recursively readonly.

## Type Parameters

### T

`T`
