import { describe, it, expect } from 'vitest';
import { VERSION } from '../src/index.js';

describe('Sera SDK Foundation Test', () => {
  it('should expose the correct package version', () => {
    expect(VERSION).toBe('1.0.0-beta.0');
  });
});
