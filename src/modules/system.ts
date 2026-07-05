import { BaseModule } from './base.js';
import { TokenInfo, MarketInfo } from '../types/domain/index.js';
import { RawHealthResponse, RawToken, RawMarket } from '../types/api/index.js';
import { Address } from '../types/shared/branded.js';
import { Chain, AssetType } from '../types/enums/index.js';

export interface HealthInfo {
  readonly status: string;
  readonly version: string;
  readonly timestamp: string;
  readonly executorStatus: string;
  readonly signatureReady: boolean;
}

export interface SystemConfigInfo {
  readonly verifyingContract: Address;
  readonly chainId: number;
  readonly protocolFeeBps: number;
}

export interface SystemQueryOptions {
  readonly forceRefresh?: boolean;
  readonly cacheTtl?: number;
}

/**
 * Module responsible for fetching read-only protocol metadata, tokens, and active markets.
 */
export class SystemModule extends BaseModule {
  private readonly cache = new Map<string, { data: any; timestamp: number }>();
  private readonly defaultTtlMs = 60000; // 1 minute default for static metadata

  /**
   * Check the health status of Sera's matching engine and signature execution pipeline.
   */
  public async health(options: SystemQueryOptions = {}): Promise<HealthInfo> {
    return this.fetchWithCache('health', '/health', this.mapRawHealth, options);
  }

  /**
   * Retrieve protocol-wide configuration parameters (verifying contract address, chain IDs, fees).
   */
  public async config(options: SystemQueryOptions = {}): Promise<SystemConfigInfo> {
    return this.fetchWithCache('config', '/system/config', this.mapRawConfig, options);
  }

  /**
   * Returns list of all tokens registered on Sera Protocol.
   */
  public async tokens(options: SystemQueryOptions = {}): Promise<readonly TokenInfo[]> {
    return this.fetchWithCache('tokens', '/tokens', (raw: readonly RawToken[]) => {
      return raw.map(t => this.mapRawToken(t));
    }, options);
  }

  /**
   * Helper look-up for details of a specific token symbol (e.g. 'USDC').
   */
  public async token(symbol: string, options: SystemQueryOptions = {}): Promise<TokenInfo | undefined> {
    const list = await this.tokens(options);
    return list.find(t => t.symbol.toUpperCase() === symbol.toUpperCase());
  }

  /**
   * Returns list of all active stablecoin trading markets.
   */
  public async markets(options: SystemQueryOptions = {}): Promise<readonly MarketInfo[]> {
    return this.fetchWithCache('markets', '/markets', (raw: readonly RawMarket[]) => {
      return raw.map(m => this.mapRawMarket(m));
    }, options);
  }

  /**
   * Helper look-up for details of a specific trading market pair (e.g. 'USDC/EURC').
   */
  public async market(symbol: string, options: SystemQueryOptions = {}): Promise<MarketInfo | undefined> {
    const list = await this.markets(options);
    return list.find(m => m.symbol.toUpperCase() === symbol.toUpperCase());
  }

  /**
   * Returns a list of chains currently supported by the SDK.
   */
  public supportedChains(): readonly Chain[] {
    return [Chain.ETHEREUM, Chain.SEPOLIA, Chain.HARDHAT];
  }

  /**
   * Returns a list of asset types supported.
   */
  public supportedAssets(): readonly AssetType[] {
    return [AssetType.FIAT_STABLE, AssetType.CRYPTO_NATIVE];
  }

  /**
   * Evicts the entire local query cache.
   */
  public refresh(): void {
    const { events } = this.context;
    this.cache.clear();
    events.emit('system:refreshed', { type: 'all', data: null });
  }

  /* INNER CACHED HTTP ORCHESTRATION */

  private async fetchWithCache<T>(
    cacheKey: string,
    path: string,
    mapper: (raw: any) => T,
    options: SystemQueryOptions
  ): Promise<T> {
    const { hooks, events, httpClient, config } = this.context;
    const now = Date.now();
    const entry = this.cache.get(cacheKey);
    const ttl = options.cacheTtl ?? this.defaultTtlMs;

    // Check Cache Hit
    if (!options.forceRefresh && entry && now - entry.timestamp < ttl) {
      config.logger.debug(`[System Module] Cache hit for key: ${cacheKey}`);
      events.emit('system:cacheHit', { key: cacheKey });
      events.emit('system:loaded', { type: cacheKey, data: entry.data });
      return entry.data;
    }

    await hooks.emit('beforeSystemRequest', { type: cacheKey });

    const startTime = Date.now();
    try {
      const rawResponse = await httpClient.get<any>(path);
      const mappedResult = mapper(rawResponse);

      // Save in cache
      this.cache.set(cacheKey, { data: mappedResult, timestamp: now });

      if (options.forceRefresh) {
        events.emit('system:refreshed', { type: cacheKey, data: mappedResult });
      } else {
        events.emit('system:loaded', { type: cacheKey, data: mappedResult });
      }

      await hooks.emit('afterSystemRequest', {
        type: cacheKey,
        durationMs: Date.now() - startTime,
      });

      return mappedResult;
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      events.emit('system:failed', { error: errorObject });
      throw errorObject;
    }
  }

  /* UTILITY DATA MAPPERS */

  private mapRawHealth(raw: RawHealthResponse): HealthInfo {
    return {
      status: raw.status,
      version: raw.version,
      timestamp: raw.timestamp,
      executorStatus: raw.executor_status,
      signatureReady: raw.signature_ready,
    };
  }

  private mapRawConfig(raw: any): SystemConfigInfo {
    return {
      verifyingContract: raw.verifying_contract as Address,
      chainId: raw.chain_id ?? 1,
      protocolFeeBps: raw.protocol_fee_bps ?? 0,
    };
  }

  private mapRawToken(raw: RawToken): TokenInfo {
    return {
      symbol: raw.symbol,
      decimals: raw.decimals,
      contractAddress: raw.contract_address as Address,
      minimumTradeAmount: raw.minimum_trade_amount,
    };
  }

  private mapRawMarket(raw: RawMarket): MarketInfo {
    return {
      symbol: raw.symbol,
      baseToken: this.mapRawToken(raw.base_token),
      quoteToken: this.mapRawToken(raw.quote_token),
      minTickSize: raw.min_tick_size,
      minOrderSize: raw.min_order_size,
    };
  }
}
