/**
 * Represents a value that can be null.
 */
export type Nullable<T> = T | null;

/**
 * Represents a value that can be undefined.
 */
export type Optional<T> = T | undefined;

/**
 * flattens complex nested intersections into readable flat interface tooltips.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Makes all properties of an object recursively readonly.
 */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Record<string, any> ? DeepReadonly<T[K]> : T[K];
};

/**
 * standard response envelope containing client-correlation and server timings.
 */
export interface ApiResponse<T> {
  readonly data: T;
  readonly requestId: string;
  readonly serverTime: string;
}

/**
 * Represents standard paginated queries.
 */
export interface PaginationParams {
  limit?: number;
  offset?: number;
}

/**
 * Metadata structure returned alongside paginated collections.
 */
export interface PaginationMetadata {
  readonly total: number;
  readonly limit: number;
  readonly offset: number;
  readonly hasNextPage: boolean;
}

/**
 * Wrapper for collections returned with pagination metrics.
 */
export interface Paginated<T> {
  readonly items: readonly T[];
  readonly metadata: PaginationMetadata;
}

/**
 * Represents a promise returning execution results.
 */
export type AsyncResult<T> = Promise<T>;
