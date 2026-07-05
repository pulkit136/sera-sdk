import { SdkContext } from '../types/domain/config.js';

/**
 * Base module class that all namespaced SDK endpoints inherit from.
 * Enforces shared SdkContext injection to prevent reliance on global state.
 */
export class BaseModule {
  protected readonly context: SdkContext;

  constructor(context: SdkContext) {
    this.context = context;
  }
}
