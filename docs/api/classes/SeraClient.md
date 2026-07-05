[**@sera-protocol/sdk**](../README.md)

***

[@sera-protocol/sdk](../README.md) / SeraClient

# Class: SeraClient

Defined in: [src/client.ts:16](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L16)

The central orchestration class for the Sera Protocol SDK.
Holds immutable config, lifecycle hook registers, typed event pipelines, and module access.

## Constructors

### Constructor

> **new SeraClient**(`options?`): `SeraClient`

Defined in: [src/client.ts:30](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L30)

#### Parameters

##### options?

[`SeraConfig`](../interfaces/SeraConfig.md) = `{}`

#### Returns

`SeraClient`

## Properties

### auth

> `readonly` **auth**: [`AuthEngine`](AuthEngine.md)

Defined in: [src/client.ts:18](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L18)

***

### config

> `readonly` **config**: [`SdkConfig`](../interfaces/SdkConfig.md)

Defined in: [src/client.ts:17](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L17)

***

### events

> `readonly` **events**: [`TypedEventEmitter`](TypedEventEmitter.md)

Defined in: [src/client.ts:21](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L21)

***

### hooks

> `readonly` **hooks**: [`HookRegistry`](HookRegistry.md)

Defined in: [src/client.ts:20](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L20)

***

### httpClient

> `readonly` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [src/client.ts:19](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L19)

## Accessors

### balances

#### Get Signature

> **get** **balances**(): [`BalancesModule`](BalancesModule.md)

Defined in: [src/client.ts:134](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L134)

##### Returns

[`BalancesModule`](BalancesModule.md)

***

### context

#### Get Signature

> **get** **context**(): [`SdkContext`](../interfaces/SdkContext.md)

Defined in: [src/client.ts:82](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L82)

Returns the shared dependency injection context for downstream modules.

##### Returns

[`SdkContext`](../interfaces/SdkContext.md)

***

### orders

#### Get Signature

> **get** **orders**(): [`OrdersModule`](OrdersModule.md)

Defined in: [src/client.ts:127](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L127)

##### Returns

[`OrdersModule`](OrdersModule.md)

***

### payments

#### Get Signature

> **get** **payments**(): [`PaymentsModule`](PaymentsModule.md)

Defined in: [src/client.ts:148](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L148)

##### Returns

[`PaymentsModule`](PaymentsModule.md)

***

### swap

#### Get Signature

> **get** **swap**(): [`SwapModule`](SwapModule.md)

Defined in: [src/client.ts:120](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L120)

##### Returns

[`SwapModule`](SwapModule.md)

***

### system

#### Get Signature

> **get** **system**(): [`SystemModule`](SystemModule.md)

Defined in: [src/client.ts:141](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L141)

##### Returns

[`SystemModule`](SystemModule.md)

***

### virtualLiquidity

#### Get Signature

> **get** **virtualLiquidity**(): [`VirtualLiquidityModule`](VirtualLiquidityModule.md)

Defined in: [src/client.ts:155](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L155)

##### Returns

[`VirtualLiquidityModule`](VirtualLiquidityModule.md)

## Methods

### use()

> **use**(`plugin`): `this`

Defined in: [src/client.ts:96](https://github.com/pulkit136/sera-sdk/blob/2ed7dad754971ad4ba0274a7b1580b8f7b81abbb/src/client.ts#L96)

Register and initialize a new plugin into the SDK.

#### Parameters

##### plugin

[`SeraPlugin`](../interfaces/SeraPlugin.md)

#### Returns

`this`
