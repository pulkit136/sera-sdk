[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / BalanceDetails

# Interface: BalanceDetails

Defined in: src/types/domain/index.ts:61

Collateral breakdown of a stablecoin within the Sera matching Vault.

## Properties

### available

> `readonly` **available**: `string`

Defined in: src/types/domain/index.ts:66

Available balance ready to be traded or withdrawn, in base-10 decimals.

#### Example

```ts
"1250.75"
```

***

### frozen

> `readonly` **frozen**: `string`

Defined in: src/types/domain/index.ts:71

Collateral currently frozen in open limit orders or VL batches, in base-10 decimals.

#### Example

```ts
"200.00"
```

***

### total

> `readonly` **total**: `string`

Defined in: src/types/domain/index.ts:76

Total balance currently sitting inside the vault (available + frozen), in base-10 decimals.

#### Example

```ts
"1450.75"
```
