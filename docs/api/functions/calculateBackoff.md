[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / calculateBackoff

# Function: calculateBackoff()

> **calculateBackoff**(`attempt`, `baseDelayMs?`, `maxDelayMs?`): `number`

Defined in: src/utils/http.ts:76

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
