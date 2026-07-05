'use client';

import { useState, useEffect } from 'react';
import { StatusResponsePayload } from '../lib/types';

interface PaymentStatusProps {
  paymentId: string;
  txHash?: string;
  onReset: () => void;
}

export default function PaymentStatus({ paymentId, txHash, onReset }: PaymentStatusProps) {
  const [status, setStatus] = useState<string>('prepared');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/status?paymentId=${paymentId}`);
        const data: StatusResponsePayload = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to poll payment status');
        }

        const currentStatus = data.status ?? 'unknown';
        setStatus(currentStatus);

        // Stop polling if we reached a final state
        if (currentStatus === 'completed' || currentStatus === 'failed') {
          setLoading(false);
          clearInterval(intervalId);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred polling payment status.');
        setLoading(false);
        clearInterval(intervalId);
      }
    };

    // Poll status immediately and then every 2 seconds
    checkStatus();
    intervalId = setInterval(checkStatus, 2000);

    return () => clearInterval(intervalId);
  }, [paymentId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Payment Status Tracking</h2>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.detailsGroup}>
        <span style={styles.label}>Payment Identifier</span>
        <span style={styles.valueCode}>{paymentId}</span>
      </div>

      {txHash && (
        <div style={styles.detailsGroup}>
          <span style={styles.label}>Transaction Hash</span>
          <span style={styles.valueCode}>{txHash}</span>
        </div>
      )}

      <div style={styles.statusBox}>
        <span style={styles.label}>Current Execution Status</span>
        <div style={{
          ...styles.statusText,
          color: status === 'completed' ? '#00e676' : status === 'failed' ? '#ff1744' : '#ffea00'
        }}>
          {status.toUpperCase()}
        </div>
        {loading && <div style={styles.spinner}>Polling status updates...</div>}
      </div>

      <button onClick={onReset} style={styles.button}>
        Send Another Payment
      </button>
    </div>
  );
}

const styles = {
  container: {
    background: '#1a1a1a',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #333',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    color: '#fff',
    fontWeight: '600',
  },
  detailsGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  label: {
    fontSize: '13px',
    color: '#aaa',
  },
  valueCode: {
    background: '#111',
    border: '1px solid #222',
    padding: '8px 10px',
    borderRadius: '4px',
    color: '#00e676',
    fontSize: '14px',
    fontFamily: 'monospace',
    wordBreak: 'break-all' as const,
  },
  statusBox: {
    background: '#222',
    padding: '16px',
    borderRadius: '6px',
    border: '1px solid #333',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '8px',
  },
  statusText: {
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  spinner: {
    fontSize: '13px',
    color: '#888',
    animation: 'pulse 1.5s infinite',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#333',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  error: {
    background: '#3a1111',
    color: '#ff8888',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '14px',
    border: '1px solid #5a2222',
  },
};
