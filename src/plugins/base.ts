import { SdkConfig } from '../types/domain/config.js';
import { TypedEventEmitter } from '../events/index.js';
import { HookRegistry } from '../hooks/index.js';

/**
 * Context payload passed to the plugin setup routine.
 */
export interface SeraPluginContext {
  readonly client: any; // Using any to decouple plugin definitions from SeraClient class declaration
  readonly config: SdkConfig;
  readonly events: TypedEventEmitter;
  readonly hooks: HookRegistry;
}

/**
 * Interface that all Sera Protocol SDK Plugins must implement.
 */
export interface SeraPlugin {
  readonly name: string;
  readonly version: string;
  setup(context: SeraPluginContext): Promise<void> | void;
}
