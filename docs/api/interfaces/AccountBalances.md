[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / AccountBalances

# Interface: AccountBalances

Defined in: src/types/domain/index.ts:82

Complete balance matrix for an account, splitting wallet and vault states.

## Properties

### address

> `readonly` **address**: [`Address`](../type-aliases/Address.md)

Defined in: src/types/domain/index.ts:86

Ethereum address of the account owner.

***

### vault

> `readonly` **vault**: `Record`\<`string`, [`BalanceDetails`](BalanceDetails.md)\>

Defined in: src/types/domain/index.ts:95

Vault balance details (inside Sera settlement ledger).

***

### wallet

> `readonly` **wallet**: `Record`\<`string`, `string`\>

Defined in: src/types/domain/index.ts:91

Wallet balance breakdown (in wallet) mapping symbol to base-10 decimal string.

#### Example

```ts
{ USDC: "150.50", EURC: "0.00" }
```
