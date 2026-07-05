import { HookPayloads } from './types.js';

export type HookCallback<T> = (data: T) => void | Promise<void | T>;

/**
 * A lightweight synchronous and asynchronous lifecycle hook registry.
 * Hooks execute sequentially, allowing callbacks to inspect or mutate payloads.
 */
export class HookRegistry {
  private hooks = new Map<string, Set<HookCallback<any>>>();

  /**
   * Register a callback for a specific lifecycle hook.
   */
  public on<K extends keyof HookPayloads>(event: K, callback: HookCallback<HookPayloads[K]>): this;
  public on(event: string, callback: HookCallback<any>): this {
    if (!this.hooks.has(event)) {
      this.hooks.set(event, new Set());
    }
    this.hooks.get(event)!.add(callback);
    return this;
  }

  /**
   * Unregister a callback from a hook.
   */
  public off<K extends keyof HookPayloads>(event: K, callback: HookCallback<HookPayloads[K]>): this;
  public off(event: string, callback: HookCallback<any>): this {
    const registry = this.hooks.get(event);
    if (registry) {
      registry.delete(callback);
    }
    return this;
  }

  /**
   * Emit a hook sequentially, awaiting async callbacks and passing mutated payloads.
   */
  public async emit<K extends keyof HookPayloads>(event: K, data: HookPayloads[K]): Promise<HookPayloads[K]>;
  public async emit(event: string, data: any): Promise<any> {
    const registry = this.hooks.get(event);
    if (!registry || registry.size === 0) {
      return data;
    }

    let currentData = data;
    for (const callback of registry) {
      try {
        const result = await callback(currentData);
        if (result !== undefined) {
          currentData = result;
        }
      } catch (err) {
        // Log errors to console since throwing inside hooks can disrupt client execution flows
        console.error(`[Sera Hook Error] Callback failed on "${event}":`, err);
      }
    }
    return currentData;
  }

  /**
   * Remove all hook listeners.
   */
  public removeAllHooks(): void {
    this.hooks.clear();
  }
}

export * from './types.js';
