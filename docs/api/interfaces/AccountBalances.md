[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / AccountBalances

# Interface: AccountBalances

Defined in: [src/types/domain/index.ts:82](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L82)

Complete balance matrix for an account, splitting wallet and vault states.

## Properties

### address

> `readonly` **address**: [`Address`](../type-aliases/Address.md)

Defined in: [src/types/domain/index.ts:86](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L86)

Ethereum address of the account owner.

***

### vault

> `readonly` **vault**: `Record`\<`string`, [`BalanceDetails`](BalanceDetails.md)\>

Defined in: [src/types/domain/index.ts:95](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L95)

Vault balance details (inside Sera settlement ledger).

***

### wallet

> `readonly` **wallet**: `Record`\<`string`, `string`\>

Defined in: [src/types/domain/index.ts:91](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L91)

Wallet balance breakdown (in wallet) mapping symbol to base-10 decimal string.

#### Example

```ts
{ USDC: "150.50", EURC: "0.00" }
```
