import { Logger } from '../../utils/logger.js';
import { ISeraSigner } from '../../auth/types.js';
import { HookRegistry } from '../../hooks/index.js';
import { TypedEventEmitter } from '../../events/index.js';
import { SeraPlugin } from '../../plugins/base.js';

import { Middleware } from '../../http/middleware.js';

export type SeraEnvironmentName = 'mainnet' | 'testnet' | 'development' | 'custom';

/**
 * Options provided by the developer when instantiating the SDK.
 */
export interface SeraConfig {
  apiKey?: string;
  baseUrl?: string;
  environment?: SeraEnvironmentName;
  timeout?: number;
  maxRetries?: number;
  debug?: boolean;
  logger?: Logger;
  signer?: ISeraSigner;
  plugins?: SeraPlugin[];
  middlewares?: Middleware[];
  headers?: Record<string, string>;
  userAgent?: string;
}

/**
 * Fully resolved, immutable configuration object used internally at runtime.
 */
export interface SdkConfig {
  readonly apiKey?: string;
  readonly baseUrl: string;
  readonly environment: SeraEnvironmentName;
  readonly timeout: number;
  readonly maxRetries: number;
  readonly debug: boolean;
  readonly logger: Logger;
  readonly signer?: ISeraSigner;
  readonly middlewares: readonly Middleware[];
  readonly headers?: Record<string, string>;
  readonly userAgent?: string;
}

import { AuthEngine } from '../../auth/engine.js';
import { HttpClient } from '../../http/client.js';

/**
 * Shared context container passed to all namespaces to prevent global state dependencies.
 */
export interface SdkContext {
  readonly client: any;
  readonly config: SdkConfig;
  readonly auth: AuthEngine;
  readonly httpClient: HttpClient;
  readonly hooks: HookRegistry;
  readonly events: TypedEventEmitter;
}
