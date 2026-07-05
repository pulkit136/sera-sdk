'use client';

import { useState } from 'react';
import { PaymentRequestPayload, PaymentResponsePayload } from '../lib/types';

interface PaymentFormProps {
  onSuccess: (paymentId: string, txHash?: string) => void;
}

export default function PaymentForm({ onSuccess }: PaymentFormProps) {
  const [recipient, setRecipient] = useState('0x19E7E376E7C213B7E7e7e46cc70A5dD086DAff2A');
  const [amount, setAmount] = useState('150.00');
  const [asset, setAsset] = useState('USDC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload: PaymentRequestPayload = {
      recipient,
      amount,
      asset,
    };

    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: PaymentResponsePayload = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Payment execution failed');
      }

      if (data.paymentId) {
        onSuccess(data.paymentId, data.txHash);
      } else {
        throw new Error('Payment succeeded but no paymentId was returned');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during payment submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Send a Secure Stablecoin Payment</h2>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.formGroup}>
        <label htmlFor="recipient" style={styles.label}>Recipient EVM Address</label>
        <input
          id="recipient"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0x..."
          disabled={loading}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.row}>
        <div style={{ ...styles.formGroup, flex: 2 }}>
          <label htmlFor="amount" style={styles.label}>Amount</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            disabled={loading}
            required
            style={styles.input}
          />
        </div>

        <div style={{ ...styles.formGroup, flex: 1 }}>
          <label htmlFor="asset" style={styles.label}>Stablecoin Asset</label>
          <select
            id="asset"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            disabled={loading}
            style={styles.select}
          >
            <option value="USDC">USDC</option>
            <option value="EURC">EURC</option>
            <option value="USDT">USDT</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Processing Payment...' : 'Initiate Payment'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: '#1a1a1a',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #333',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    color: '#fff',
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  row: {
    display: 'flex',
    gap: '12px',
  },
  label: {
    fontSize: '14px',
    color: '#aaa',
    marginBottom: '6px',
  },
  input: {
    background: '#111',
    border: '1px solid #333',
    borderRadius: '4px',
    padding: '10px 12px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
  },
  select: {
    background: '#111',
    border: '1px solid #333',
    borderRadius: '4px',
    padding: '10px 12px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background 0.2s',
  },
  error: {
    background: '#3a1111',
    color: '#ff8888',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '16px',
    fontSize: '14px',
    border: '1px solid #5a2222',
  },
};
