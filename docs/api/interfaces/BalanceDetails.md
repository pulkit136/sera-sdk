[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / BalanceDetails

# Interface: BalanceDetails

Defined in: [src/types/domain/index.ts:61](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L61)

Collateral breakdown of a stablecoin within the Sera matching Vault.

## Properties

### available

> `readonly` **available**: `string`

Defined in: [src/types/domain/index.ts:66](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L66)

Available balance ready to be traded or withdrawn, in base-10 decimals.

#### Example

```ts
"1250.75"
```

***

### frozen

> `readonly` **frozen**: `string`

Defined in: [src/types/domain/index.ts:71](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L71)

Collateral currently frozen in open limit orders or VL batches, in base-10 decimals.

#### Example

```ts
"200.00"
```

***

### total

> `readonly` **total**: `string`

Defined in: [src/types/domain/index.ts:76](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/types/domain/index.ts#L76)

Total balance currently sitting inside the vault (available + frozen), in base-10 decimals.

#### Example

```ts
"1450.75"
```
