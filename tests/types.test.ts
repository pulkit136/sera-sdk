import { describe, it, expect } from 'vitest';
import {
  toAddress,
  toOrderId,
  toQuoteId,
  OrderSide,
  OrderStatus,
  Address,
  OrderId
} from '../src/index.js';

describe('TypeScript SDK Type System compile-time tests', () => {
  it('should cast raw strings into branded types using utility casters', () => {
    const rawAddress = '0x1234567890123456789012345678901234567890';
    const address: Address = toAddress(rawAddress);
    
    expect(address).toBe(rawAddress);
  });

  it('should support checking enum value matching', () => {
    expect(OrderSide.BUY).toBe('BUY');
    expect(OrderStatus.FILLED).toBe('FILLED');
  });

  it('should allow types to compiles and run correctly', () => {
    const orderId: OrderId = toOrderId('order_123');
    const quoteId = toQuoteId('quote_abc');

    expect(orderId).toBe('order_123');
    expect(quoteId).toBe('quote_abc');
    
    // Compile-time assertion block (TypeScript will raise errors here if compile fails)
    const _addressVerify: Address = toAddress('0xabc');
    expect(_addressVerify).toBe('0xabc');
  });
});
