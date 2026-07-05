[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / TokenInfo

# Interface: TokenInfo

Defined in: src/types/domain/index.ts:9

Registry details for supported FX tokens.

## Properties

### contractAddress

> `readonly` **contractAddress**: [`Address`](../type-aliases/Address.md)

Defined in: src/types/domain/index.ts:22

EIP-55 checksum Ethereum address of the ERC-20 contract.

#### Example

```ts
"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
```

***

### decimals

> `readonly` **decimals**: `number`

Defined in: src/types/domain/index.ts:17

Number of decimals used by the token contract (e.g. 6 for USDC, 18 for EURC).

***

### minimumTradeAmount

> `readonly` **minimumTradeAmount**: `string`

Defined in: src/types/domain/index.ts:27

Minimum transaction size allowed for trades in base-10 decimals.

#### Example

```ts
"5.00"
```

***

### symbol

> `readonly` **symbol**: `string`

Defined in: src/types/domain/index.ts:13

Currency ticker symbol (e.g., 'USDC', 'EURC').
