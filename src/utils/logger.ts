/**
 * Interface representing a pluggable logging engine for the SDK.
 */
export interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

/**
 * Default logger that outputs formatted messages to console.
 */
export class ConsoleLogger implements Logger {
  private prefix = '[Sera SDK]';

  public debug(message: string, ...args: any[]): void {
    console.debug(`${this.prefix} [DEBUG] ${message}`, ...args);
  }

  public info(message: string, ...args: any[]): void {
    console.info(`${this.prefix} [INFO] ${message}`, ...args);
  }

  public warn(message: string, ...args: any[]): void {
    console.warn(`${this.prefix} [WARN] ${message}`, ...args);
  }

  public error(message: string, ...args: any[]): void {
    console.error(`${this.prefix} [ERROR] ${message}`, ...args);
  }
}

/**
 * Silent logger used when debug mode is disabled.
 */
export class SilentLogger implements Logger {
  public debug(): void {}
  public info(): void {}
  public warn(): void {}
  public error(): void {}
}
