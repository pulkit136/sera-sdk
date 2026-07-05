import { Address, TransactionHash } from '../types/shared/branded.js';
import { SeraValidationError } from '../errors/classes.js';

/**
 * Normalizes a hex string to ensure it has a single '0x' prefix and is formatted correctly.
 */
export function normalizeHex(value: string): string {
  const clean = value.replace(/^0x/i, '');
  if (!/^[0-9a-f]*$/i.test(clean)) {
    throw new SeraValidationError(`Invalid hex string value: "${value}"`);
  }
  return `0x${clean.toLowerCase()}`;
}

/**
 * Normalizes an Ethereum address, performing basic length and hexadecimal checks.
 */
export function normalizeAddress(address: string): Address {
  const clean = address.replace(/^0x/i, '');
  if (clean.length !== 40 || !/^[0-9a-f]{40}$/i.test(clean)) {
    throw new SeraValidationError(`Invalid Ethereum address format: "${address}"`);
  }
  return `0x${clean}` as Address;
}

/**
 * Validates whether a signature string is a valid Ethereum signature.
 */
export function isValidSignatureFormat(signature: string): boolean {
  try {
    const norm = normalizeHex(signature);
    // Standard signature length is 130 hex characters + '0x' = 132 chars (r, s, v)
    // Or 128 hex characters + '0x' = 130 chars (compact representation)
    return norm.length === 132 || norm.length === 130;
  } catch {
    return false;
  }
}

/**
 * Normalizes a transaction hash.
 */
export function normalizeTxHash(hash: string): TransactionHash {
  const clean = hash.replace(/^0x/i, '');
  if (clean.length !== 64 || !/^[0-9a-f]{64}$/i.test(clean)) {
    throw new SeraValidationError(`Invalid Ethereum transaction hash format: "${hash}"`);
  }
  return `0x${clean.toLowerCase()}` as TransactionHash;
}
