[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / calculateBackoff

# Function: calculateBackoff()

> **calculateBackoff**(`attempt`, `baseDelayMs?`, `maxDelayMs?`): `number`

Defined in: [src/utils/http.ts:76](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/utils/http.ts#L76)

Computes exponential backoff delay with random jitter.

## Parameters

### attempt

`number`

### baseDelayMs?

`number` = `500`

### maxDelayMs?

`number` = `10000`

## Returns

`number`
