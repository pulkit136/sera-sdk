[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / BaseModule

# Class: BaseModule

Defined in: src/modules/base.ts:7

Base module class that all namespaced SDK endpoints inherit from.
Enforces shared SdkContext injection to prevent reliance on global state.

## Extended by

- [`SwapModule`](SwapModule.md)
- [`OrdersModule`](OrdersModule.md)
- [`VirtualLiquidityModule`](VirtualLiquidityModule.md)
- [`BalancesModule`](BalancesModule.md)
- [`SystemModule`](SystemModule.md)
- [`PaymentsModule`](PaymentsModule.md)

## Constructors

### Constructor

> **new BaseModule**(`context`): `BaseModule`

Defined in: src/modules/base.ts:10

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`BaseModule`
