import { SdkEvents } from './types.js';

export type Listener<T> = (data: T) => void | Promise<void>;

/**
 * A lightweight, dependency-free, strongly-typed event emitter.
 */
export class TypedEventEmitter {
  private listeners = new Map<keyof SdkEvents, Set<Listener<any>>>();
  private onceListeners = new Map<keyof SdkEvents, Set<Listener<any>>>();

  /**
   * Register a persistent listener for a specific event.
   */
  public on<K extends keyof SdkEvents>(event: K, listener: Listener<SdkEvents[K]>): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
    return this;
  }

  /**
   * Register a single-use listener for a specific event.
   */
  public once<K extends keyof SdkEvents>(event: K, listener: Listener<SdkEvents[K]>): this {
    if (!this.onceListeners.has(event)) {
      this.onceListeners.set(event, new Set());
    }
    this.onceListeners.get(event)!.add(listener);
    return this;
  }

  /**
   * Remove a listener from a specific event.
   */
  public off<K extends keyof SdkEvents>(event: K, listener: Listener<SdkEvents[K]>): this {
    const normal = this.listeners.get(event);
    if (normal) {
      normal.delete(listener);
    }
    const once = this.onceListeners.get(event);
    if (once) {
      once.delete(listener);
    }
    return this;
  }

  /**
   * Emit an event, invoking all registered listeners with the provided payload.
   */
  public emit<K extends keyof SdkEvents>(event: K, data: SdkEvents[K]): void {
    const normal = this.listeners.get(event);
    if (normal) {
      for (const listener of normal) {
        try {
          listener(data);
        } catch (err) {
          // Fallback log or emit error event to avoid throwing during event loop
          if (event !== 'error:thrown') {
            this.emit('error:thrown', { error: err instanceof Error ? err : new Error(String(err)) });
          }
        }
      }
    }

    const once = this.onceListeners.get(event);
    if (once && once.size > 0) {
      const runList = Array.from(once);
      once.clear(); // Clear before execution to avoid re-trigger loops
      for (const listener of runList) {
        try {
          listener(data);
        } catch (err) {
          if (event !== 'error:thrown') {
            this.emit('error:thrown', { error: err instanceof Error ? err : new Error(String(err)) });
          }
        }
      }
    }
  }

  /**
   * Helper to clear all event listeners.
   */
  public removeAllListeners(): void {
    this.listeners.clear();
    this.onceListeners.clear();
  }
}
export * from './types.js';
