# Sera Protocol SDK - Basic Node.js Example

This is a complete, runnable, production-quality Node.js application demonstrating how to initialize and consume the **Sera Protocol TypeScript SDK** to load configurations, fetch wallet balances, query active systems parameters, and request FX swap quote estimations.

---

## What this example demonstrates

1.  **Strict Environment Handling**: Validates environment parameters using a typed loader config.
2.  **Singleton Client Lifecycle**: Instantiates and configures a single shared `SeraClient` instance.
3.  **Local Wallet Signer Configuration**: Normalizes local EIP-712 transaction signing via the `PrivateKeySignerAdapter`.
4.  **Error Handling**: Extracts structured debug logs and displays readable `SeraError` states.

---

## Project Structure

```
examples/node-basic/
├── README.md           # Getting started overview guide
├── package.json        # Dependencies configurations
├── tsconfig.json       # Strict TypeScript configuration
├── .env.example        # Environment template variables
├── src/
│   ├── index.ts        # Main execution workflow pipeline
│   ├── config.ts       # Typed configurations loader
│   ├── client.ts       # Shared client singleton instance
│   └── logger.ts       # CLI step logging helper
```

---

## Prerequisites

*   **Node.js**: Version 18.0.0 or higher.
*   **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`.

---

## Installation

1.  Navigate to the basic example directory:
    ```bash
    cd examples/node-basic
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

---

## Environment Variables

Copy the template configuration file to configure credentials:
```bash
cp .env.example .env
```

Open `.env` in your editor and specify your values:
*   `SERA_API_KEY`: Your Sera developer API key credentials.
*   `SERA_PRIVATE_KEY`: A 32-byte hex private key (e.g. `0x...`) used for transaction signatures.
*   `SERA_ENVIRONMENT`: The target environment (`mainnet` | `testnet` | `development`).

---

## Running the Example

Run the application workflow pipeline command:
```bash
npm start
```

---

## Expected Output

Upon running the script, you will see structured console steps logs:

```
==================================================
🔷 STEP: Starting Sera Protocol Example Application
==================================================

==================================================
🔷 STEP: 1. Resolving Wallet Signer Credentials
==================================================
ℹ️  [INFO] API Key Configured: Yes
✅ [SUCCESS] Wallet address resolved: 0x1234567890123456789012345678901234567890

==================================================
🔷 STEP: 2. Inspecting Account Balances
==================================================
ℹ️  [INFO] Retrieving wallet and vault balances for: 0x1234567890123456789012345678901234567890...
ℹ️  [INFO] Balance fetch resolved with expected API status: [AUTHENTICATION_ERROR] Invalid API credentials

==================================================
🔷 STEP: 3. Fetching Protocol System Configuration
==================================================
ℹ️  [INFO] System parameters resolved with expected API status: [AUTHENTICATION_ERROR] Invalid API credentials

==================================================
🔷 STEP: 4. Fetching FX Swap Quote Estimate
==================================================
ℹ️  [INFO] Requesting quote: 1000.00 USDC -> EURC
ℹ️  [INFO] Swap quote resolved with expected API status: [AUTHENTICATION_ERROR] Invalid API credentials

==================================================
🔷 STEP: Workflow Execution Completed Cleanly
==================================================
```

---

## Next Examples to Explore

*   **Payment Tracking**: Learn how to monitor and poll transaction status changes in `examples/payments-tracking/`.
*   **Virtual Liquidity Vaults**: Learn how to allocate shared-budget batch order execution pipelines.
