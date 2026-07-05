[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / BaseModule

# Class: BaseModule

Defined in: [src/modules/base.ts:7](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/base.ts#L7)

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

Defined in: [src/modules/base.ts:10](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/modules/base.ts#L10)

#### Parameters

##### context

[`SdkContext`](../interfaces/SdkContext.md)

#### Returns

`BaseModule`
