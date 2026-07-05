[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / BalanceQueryOptions

# Interface: BalanceQueryOptions

Defined in: [src/modules/balances.ts:11](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/balances.ts#L11)

Options parameters for balance inspections.

## Properties

### cacheTtl?

> `readonly` `optional` **cacheTtl?**: `number`

Defined in: [src/modules/balances.ts:19](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/balances.ts#L19)

Custom cache time-to-live in milliseconds. Defaults to 10 seconds (10000ms).

***

### forceRefresh?

> `readonly` `optional` **forceRefresh?**: `boolean`

Defined in: [src/modules/balances.ts:15](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/balances.ts#L15)

Bypasses cached balance values and forces a fetch from the server.
