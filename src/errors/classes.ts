// Custom error hierarchy for the SDK

export class SeraError extends Error {
  public readonly code: string;
  public readonly requestId?: string;
  public readonly statusCode?: number;
  public readonly originalError?: any;

  constructor(message: string, code: string, options?: { requestId?: string; statusCode?: number; originalError?: any }) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.requestId = options?.requestId;
    this.statusCode = options?.statusCode;
    this.originalError = options?.originalError;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SeraAuthenticationError extends SeraError {
  constructor(message: string, options?: { requestId?: string; statusCode?: number; originalError?: any }) {
    super(message, 'AUTHENTICATION_ERROR', options);
  }
}

export class SeraValidationError extends SeraError {
  constructor(message: string, options?: { requestId?: string; statusCode?: number; originalError?: any }) {
    super(message, 'VALIDATION_ERROR', options);
  }
}

export class SeraRateLimitError extends SeraError {
  public readonly retryAfterSeconds?: number;

  constructor(message: string, options?: { requestId?: string; statusCode?: number; retryAfterSeconds?: number; originalError?: any }) {
    super(message, 'RATE_LIMIT_ERROR', options);
    this.retryAfterSeconds = options?.retryAfterSeconds;
  }
}

export class SeraNetworkError extends SeraError {
  constructor(message: string, options?: { originalError?: any }) {
    super(message, 'NETWORK_ERROR', options);
  }
}

export class SeraServerError extends SeraError {
  constructor(message: string, options?: { requestId?: string; statusCode?: number; originalError?: any }) {
    super(message, 'SERVER_ERROR', options);
  }
}

export class SeraUnknownError extends SeraError {
  constructor(message: string, options?: { originalError?: any }) {
    super(message, 'UNKNOWN_ERROR', options);
  }
}

export class SeraNoSignerConfiguredError extends SeraError {
  constructor(message: string, options?: { originalError?: any }) {
    super(message, 'NO_SIGNER_CONFIGURED', options);
  }
}

export class SeraUnsupportedSignerError extends SeraError {
  constructor(message: string, options?: { originalError?: any }) {
    super(message, 'UNSUPPORTED_SIGNER', options);
  }
}

export class SeraInvalidSignatureError extends SeraError {
  constructor(message: string, options?: { originalError?: any }) {
    super(message, 'INVALID_SIGNATURE', options);
  }
}

export class SeraAuthenticationRequiredError extends SeraError {
  constructor(message: string, options?: { originalError?: any }) {
    super(message, 'AUTHENTICATION_REQUIRED', options);
  }
}

export function isSeraError(error: any): error is SeraError {
  return error instanceof SeraError;
}
