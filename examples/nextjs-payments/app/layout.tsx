import React from 'react';

export const metadata = {
  title: 'Sera Protocol Next.js Payments Demo',
  description: 'Production-ready Next.js Integration Example for Sera Protocol SDK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <main style={styles.main}>
          {children}
        </main>
      </body>
    </html>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: 0,
    background: '#0d0d0d',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
};
