'use client';

import { useState } from 'react';
import PaymentForm from '../components/PaymentForm';
import PaymentStatus from '../components/PaymentStatus';

export default function Home() {
  const [activeStep, setActiveStep] = useState<'form' | 'status'>('form');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  const handlePaymentSuccess = (id: string, hash?: string) => {
    setPaymentId(id);
    setTxHash(hash);
    setActiveStep('status');
  };

  const handleReset = () => {
    setPaymentId(null);
    setTxHash(undefined);
    setActiveStep('form');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Sera Protocol Payments</h1>
        <p style={styles.subtitle}>
          Secure stablecoin FX settlement client portal
        </p>
      </header>

      <div style={styles.cardContainer}>
        {activeStep === 'form' ? (
          <PaymentForm onSuccess={handlePaymentSuccess} />
        ) : (
          paymentId && (
            <PaymentStatus
              paymentId={paymentId}
              txHash={txHash}
              onReset={handleReset}
            />
          )
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '32px',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #0070f3, #00dfd8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    margin: 0,
    fontSize: '16px',
    color: '#888',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
};
