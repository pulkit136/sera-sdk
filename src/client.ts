import { SeraConfig, SdkConfig, SdkContext, SeraEnvironmentName } from './types/domain/config.js';
import { resolveBaseUrl } from './utils/environment.js';
import { ConsoleLogger, SilentLogger, Logger } from './utils/logger.js';
import { HookRegistry } from './hooks/index.js';
import { TypedEventEmitter } from './events/index.js';
import { SeraPlugin } from './plugins/base.js';
import { SwapModule, OrdersModule, BalancesModule, SystemModule, PaymentsModule, VirtualLiquidityModule } from './modules/index.js';
import { VERSION } from './index.js';
import { AuthEngine } from './auth/engine.js';
import { HttpClient } from './http/client.js';

/**
 * The central orchestration class for the Sera Protocol SDK.
 * Holds immutable config, lifecycle hook registers, typed event pipelines, and module access.
 */
export class SeraClient {
  public readonly config: SdkConfig;
  public readonly auth: AuthEngine;
  public readonly httpClient: HttpClient;
  public readonly hooks: HookRegistry = new HookRegistry();
  public readonly events: TypedEventEmitter = new TypedEventEmitter();

  private _swap?: SwapModule;
  private _orders?: OrdersModule;
  private _balances?: BalancesModule;
  private _system?: SystemModule;
  private _payments?: PaymentsModule;
  private _virtualLiquidity?: VirtualLiquidityModule;

  constructor(options: SeraConfig = {}) {
    // 1. Resolve configuration with defaults
    const environment: SeraEnvironmentName = options.environment ?? 'mainnet';
    const baseUrl = resolveBaseUrl(environment, options.baseUrl);
    const debug = options.debug ?? false;
    const logger: Logger = options.logger ?? (debug ? new ConsoleLogger() : new SilentLogger());
    const timeout = options.timeout ?? 10000;
    const maxRetries = options.maxRetries ?? 3;
    const userAgent = options.userAgent ?? `sera-sdk-js/${VERSION}`;

    const headers = {
      ...(options.headers ?? {}),
    };

    // Construct final resolved configuration
    const resolvedConfig: SdkConfig = {
      apiKey: options.apiKey,
      baseUrl,
      environment,
      timeout,
      maxRetries,
      debug,
      logger,
      signer: options.signer,
      middlewares: Object.freeze(options.middlewares ?? []),
      headers,
      userAgent,
    };

    // Deep freeze configuration to guarantee immutability
    this.config = this.deepFreeze(resolvedConfig);

    // Instantiate AuthEngine
    this.auth = new AuthEngine(this.config);

    // Instantiate HttpClient
    this.httpClient = new HttpClient(this.context);

    // Emit initial event
    this.hooks.emit('client:init', { config: this.config });

    // 2. Initialize plugins if supplied in options
    if (options.plugins) {
      for (const plugin of options.plugins) {
        this.use(plugin);
      }
    }
  }

  /**
   * Returns the shared dependency injection context for downstream modules.
   */
  public get context(): SdkContext {
    return {
      client: this,
      config: this.config,
      auth: this.auth,
      httpClient: this.httpClient,
      hooks: this.hooks,
      events: this.events,
    };
  }

  /**
   * Register and initialize a new plugin into the SDK.
   */
  public use(plugin: SeraPlugin): this {
    try {
      this.config.logger.debug(`Registering plugin: ${plugin.name}@${plugin.version}`);
      
      const setupResult = plugin.setup({
        client: this,
        config: this.config,
        events: this.events,
        hooks: this.hooks,
      });

      if (setupResult instanceof Promise) {
        setupResult.catch((err) => {
          this.config.logger.error(`Failed async setup for plugin "${plugin.name}":`, err);
        });
      }
    } catch (err) {
      this.config.logger.error(`Error setup for plugin "${plugin.name}":`, err);
    }
    return this;
  }

  /* LAZY GETTERS FOR NAMESPACED API MODULES */

  public get swap(): SwapModule {
    if (!this._swap) {
      this._swap = new SwapModule(this.context);
    }
    return this._swap;
  }

  public get orders(): OrdersModule {
    if (!this._orders) {
      this._orders = new OrdersModule(this.context);
    }
    return this._orders;
  }

  public get balances(): BalancesModule {
    if (!this._balances) {
      this._balances = new BalancesModule(this.context);
    }
    return this._balances;
  }

  public get system(): SystemModule {
    if (!this._system) {
      this._system = new SystemModule(this.context);
    }
    return this._system;
  }

  public get payments(): PaymentsModule {
    if (!this._payments) {
      this._payments = new PaymentsModule(this.context);
    }
    return this._payments;
  }

  public get virtualLiquidity(): VirtualLiquidityModule {
    if (!this._virtualLiquidity) {
      this._virtualLiquidity = new VirtualLiquidityModule(this.context);
    }
    return this._virtualLiquidity;
  }

  /**
   * Recursively freezes an object to make it completely read-only.
   */
  private deepFreeze<T extends Record<string, any>>(obj: T): T {
    const propNames = Object.getOwnPropertyNames(obj);
    for (const name of propNames) {
      const value = obj[name];
      if (value && typeof value === 'object') {
        const proto = Object.getPrototypeOf(value);
        const isPlainObject = proto === Object.prototype || proto === null;
        if (isPlainObject || Array.isArray(value)) {
          this.deepFreeze(value);
        }
      }
    }
    return Object.freeze(obj);
  }
}
export * from './types/domain/config.js';
