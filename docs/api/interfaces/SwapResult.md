[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SwapResult

# Interface: SwapResult

Defined in: src/types/domain/index.ts:249

Results of a successful swap execution submission.

## Properties

### inputAmountConsumed

> `readonly` **inputAmountConsumed**: `string`

Defined in: src/types/domain/index.ts:257

Actual input amount consumed.

***

### outputAmountReceived

> `readonly` **outputAmountReceived**: `string`

Defined in: src/types/domain/index.ts:261

Actual output amount received.

***

### status

> `readonly` **status**: [`TransactionStatus`](../enumerations/TransactionStatus.md)

Defined in: src/types/domain/index.ts:265

Execution status.

***

### txHash

> `readonly` **txHash**: [`TransactionHash`](../type-aliases/TransactionHash.md)

Defined in: src/types/domain/index.ts:253

Submitted transaction hash.
