# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0-beta.0] - 2026-07-05

This is the initial beta release of the official-quality Sera Protocol TypeScript SDK.

### Added
- **Core SDK Infrastructure**: Resolves configuration structures, sets environment parameters, registers custom plugins, logs runtime behaviors, and handles event/hook lifecycles.
- **HTTP Transport Layer (`HttpClient`)**: Implements native `fetch` requests with exponential retry backoff, jitter, timeouts, and masks credentials in debug logs.
- **EIP-712 Signing Pipeline**: Automates typed data builder serialization, supporting Viem, Ethers.js v6, Injected Browser Wallets, and Private Key adapters.
- **API Modules**: Exposes namespaced modules:
  - `client.swap`: Quotes, transaction simulation, and high-level swap execution.
  - `client.orders`: Placing limit orders, cancelling orders, and fluent query filtering.
  - `client.balances`: Account balance inquiries and vault available/frozen collateral shortcuts.
  - `client.payments`: Fast stablecoin payments execution and polling status checks.
  - `client.virtualLiquidity`: Deploying and cancelling limit order batches sharing a unified budget.
  - `client.system`: Protocol health queries and static token registers caching.
- **Examples Starter Templates**:
  - `examples/node-basic`: Standalone CLI script utilizing `PrivateKeySignerAdapter`.
  - `examples/nextjs-payments`: App Router payments portal isolating signing client-side.
  - `examples/ai-agent`: AI natural language agent resolving prompts to transaction execution.
- **TypeDoc API Reference**: Fully automated documentation generator.
