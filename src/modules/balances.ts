import { BaseModule } from './base.js';
import { AccountBalances, BalanceDetails } from '../types/domain/index.js';
import { RawBalancesResponse } from '../types/api/index.js';
import { Address } from '../types/shared/branded.js';
import { normalizeAddress } from '../utils/signature.js';
import { SeraValidationError } from '../errors/classes.js';

/**
 * Options parameters for balance inspections.
 */
export interface BalanceQueryOptions {
  /**
   * Bypasses cached balance values and forces a fetch from the server.
   */
  readonly forceRefresh?: boolean;
  /**
   * Custom cache time-to-live in milliseconds. Defaults to 10 seconds (10000ms).
   */
  readonly cacheTtl?: number;
}

/**
 * Module responsible for fetching, caching, and helping developers inspect account balances.
 */
export class BalancesModule extends BaseModule {
  private readonly cache = new Map<string, { balances: AccountBalances; timestamp: number }>();
  private readonly defaultTtlMs = 10000; // 10 seconds

  /**
   * Fetches the account balances for a specific address or the configured signer.
   */
  public async get(address?: string, options: BalanceQueryOptions = {}): Promise<AccountBalances> {
    const { hooks, events, httpClient, auth, config } = this.context;

    // 1. Resolve and normalize destination address
    let targetAddress: Address;
    if (address) {
      targetAddress = normalizeAddress(address);
    } else {
      if (!auth.hasSigner()) {
        throw new SeraValidationError(
          'Balance check failed: Must provide a target address or configure a wallet signer on the client.'
        );
      }
      targetAddress = normalizeAddress(await auth.getSigner().getAddress());
    }

    // 2. Emit beforeBalanceLoad hook
    await hooks.emit('beforeBalanceLoad', { address: targetAddress });

    // 3. Cache lookup check
    const now = Date.now();
    const cacheEntry = this.cache.get(targetAddress);
    const ttl = options.cacheTtl ?? this.defaultTtlMs;

    if (!options.forceRefresh && cacheEntry && now - cacheEntry.timestamp < ttl) {
      config.logger.debug(`[Balances Module] Cache hit for address: ${targetAddress}`);
      events.emit('balance:cacheHit', { address: targetAddress });
      events.emit('balance:loaded', { balances: cacheEntry.balances });
      await hooks.emit('afterBalanceLoad', { balances: cacheEntry.balances });
      return cacheEntry.balances;
    }

    config.logger.debug(`[Balances Module] Fetching balances for address: ${targetAddress}`);

    try {
      // 4. Issue GET query request
      const rawResponse = await httpClient.get<RawBalancesResponse>(`/balances/${targetAddress}`);

      // 5. Convert snake_case fields to camelCase SDK model
      const balances = this.mapRawBalances(rawResponse);

      // Save in local cache
      this.cache.set(targetAddress, { balances, timestamp: now });

      // Emit loaded/refreshed events
      if (options.forceRefresh) {
        events.emit('balance:refreshed', { balances });
      } else {
        events.emit('balance:loaded', { balances });
      }

      await hooks.emit('afterBalanceLoad', { balances });

      return balances;
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      events.emit('balance:failed', { error: errorObject });
      throw errorObject;
    }
  }

  /**
   * Bypasses cached values and retrieves fresh balance details.
   */
  public async refresh(address?: string): Promise<AccountBalances> {
    return this.get(address, { forceRefresh: true });
  }

  /**
   * Helper that retrieves the wallet balance for a specific token symbol.
   */
  public async wallet(symbol: string, address?: string): Promise<string> {
    const balances = await this.get(address);
    return balances.wallet[symbol] ?? '0.00';
  }

  /**
   * Helper that retrieves the vault balance breakdown details for a token symbol.
   */
  public async vault(symbol: string, address?: string): Promise<BalanceDetails> {
    const balances = await this.get(address);
    return balances.vault[symbol] ?? { available: '0.00', frozen: '0.00', total: '0.00' };
  }

  /**
   * Helper that retrieves available vault collateral for a symbol.
   */
  public async available(symbol: string, address?: string): Promise<string> {
    const details = await this.vault(symbol, address);
    return details.available;
  }

  /**
   * Helper that retrieves frozen vault collateral for a symbol.
   */
  public async frozen(symbol: string, address?: string): Promise<string> {
    const details = await this.vault(symbol, address);
    return details.frozen;
  }

  /**
   * Helper that retrieves total vault collateral for a symbol.
   */
  public async total(symbol: string, address?: string): Promise<string> {
    const details = await this.vault(symbol, address);
    return details.total;
  }

  /* UTILITY DATA MAPPERS */

  private mapRawBalances(raw: RawBalancesResponse): AccountBalances {
    const vault: Record<string, BalanceDetails> = {};
    
    for (const [key, details] of Object.entries(raw.vault_balances)) {
      vault[key] = {
        available: details.available,
        frozen: details.frozen,
        total: details.total,
      };
    }

    return {
      address: raw.address as Address,
      wallet: { ...raw.wallet_balances },
      vault,
    };
  }
}
