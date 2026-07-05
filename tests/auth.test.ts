import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SeraClient } from '../src/client.js';
import { TypedDataBuilder } from '../src/auth/builder.js';
import { AuthEngine } from '../src/auth/engine.js';
import { SigningPipeline } from '../src/auth/pipeline.js';
import { ISeraSigner } from '../src/auth/types.js';
import { ViemSignerAdapter } from '../src/auth/adapters/viem.js';
import { EthersSignerAdapter } from '../src/auth/adapters/ethers.js';
import { BrowserWalletAdapter } from '../src/auth/adapters/browser.js';
import {
  SeraNoSignerConfiguredError,
  SeraAuthenticationRequiredError,
  SeraValidationError,
} from '../src/errors/classes.js';

describe('AuthEngine, Adapters, and SigningPipeline Tests', () => {
  let mockSigner: ISeraSigner;

  beforeEach(() => {
    mockSigner = {
      getAddress: vi.fn().mockResolvedValue('0x1234567890123456789012345678901234567890'),
      signTypedData: vi.fn().mockResolvedValue('0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab'),
    };
  });

  describe('TypedDataBuilder', () => {
    it('should build a valid EIP-712 payload', () => {
      const builder = new TypedDataBuilder();
      const payload = builder
        .setDomain({ name: 'Sera', verifyingContract: '0x1234567890123456789012345678901234567890', chainId: 1 })
        .setTypes({ Intent: [{ name: 'taker', type: 'address' }] })
        .setMessage({ taker: '0x1234567890123456789012345678901234567890' })
        .build();

      expect(payload.domain.name).toBe('Sera');
      expect(payload.message.taker).toBe('0x1234567890123456789012345678901234567890');
    });

    it('should throw validation error if parameters are missing', () => {
      const builder = new TypedDataBuilder();
      expect(() => builder.build()).toThrow(SeraValidationError);
    });
  });

  describe('AuthEngine checks', () => {
    it('should throw error when validateRequiredSigner is called on read-only configuration', () => {
      const client = new SeraClient({ apiKey: 'some_key' });
      const engine = new AuthEngine(client.config);

      expect(engine.hasSigner()).toBe(false);
      expect(engine.hasApiKey()).toBe(true);
      expect(() => engine.validateRequiredSigner()).toThrow(SeraAuthenticationRequiredError);
    });

    it('should validate correctly when signer is configured', () => {
      const client = new SeraClient({ signer: mockSigner });
      const engine = new AuthEngine(client.config);

      expect(engine.hasSigner()).toBe(true);
      expect(engine.getSigner()).toBe(mockSigner);
      expect(() => engine.validateRequiredSigner()).not.toThrow();
    });
  });

  describe('Signer Adapters normalization check', () => {
    it('should delegate properly inside ViemSignerAdapter', async () => {
      const mockViemClient = {
        getAddresses: vi.fn().mockResolvedValue(['0xviem_addr']),
        signTypedData: vi.fn().mockResolvedValue('0xviem_sig'),
      };

      const adapter = new ViemSignerAdapter(mockViemClient);
      const addr = await adapter.getAddress();
      const sig = await adapter.signTypedData({ name: 'Sera' }, { Intent: [] }, { foo: 'bar' });

      expect(addr).toBe('0xviem_addr');
      expect(sig).toBe('0xviem_sig');
      expect(mockViemClient.signTypedData).toHaveBeenCalled();
    });

    it('should delegate properly inside EthersSignerAdapter', async () => {
      const mockEthersSigner = {
        getAddress: vi.fn().mockResolvedValue('0xethers_addr'),
        signTypedData: vi.fn().mockResolvedValue('0xethers_sig'),
      };

      const adapter = new EthersSignerAdapter(mockEthersSigner);
      const addr = await adapter.getAddress();
      const sig = await adapter.signTypedData({ name: 'Sera' }, { Intent: [] }, { foo: 'bar' });

      expect(addr).toBe('0xethers_addr');
      expect(sig).toBe('0xethers_sig');
    });

    it('should delegate properly inside BrowserWalletAdapter', async () => {
      const mockProvider = {
        request: vi.fn().mockImplementation(async ({ method }) => {
          if (method === 'eth_requestAccounts') return ['0xbrowser_addr'];
          if (method === 'eth_signTypedData_v4') return '0xbrowser_sig';
        }),
      };

      const adapter = new BrowserWalletAdapter(mockProvider);
      const addr = await adapter.getAddress();
      const sig = await adapter.signTypedData({ name: 'Sera' }, { Intent: [] }, { foo: 'bar' });

      expect(addr).toBe('0xbrowser_addr');
      expect(sig).toBe('0xbrowser_sig');
    });
  });

  describe('SigningPipeline orchestration', () => {
    it('should orchestrate pipeline, triggering hooks and normalizing signature output', async () => {
      const client = new SeraClient({ signer: mockSigner });
      const pipeline = new SigningPipeline(client.context);

      const beforeSignHook = vi.fn();
      const afterSignHook = vi.fn();

      client.hooks.on('beforeSign', beforeSignHook);
      client.hooks.on('afterSign', afterSignHook);

      const signature = await pipeline.sign(
        { name: 'Sera', verifyingContract: '0x1234567890123456789012345678901234567890', chainId: 1 },
        { Intent: [{ name: 'taker', type: 'address' }] },
        { taker: '0x1234567890123456789012345678901234567890' }
      );

      expect(signature.startsWith('0x')).toBe(true);
      expect(mockSigner.signTypedData).toHaveBeenCalled();

      expect(beforeSignHook).toHaveBeenCalledTimes(1);
      expect(afterSignHook).toHaveBeenCalledTimes(1);
    });
  });
});
