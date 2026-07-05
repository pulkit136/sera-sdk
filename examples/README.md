# Sera Protocol SDK Example Applications Index

This directory contains production-quality starter applications demonstrating how to integrate the **Sera Protocol TypeScript SDK** across different environments, frameworks, and architecture patterns.

---

## Recommended Learning Path

To get familiar with the SDK, we recommend exploring the examples in the following order:

```
1. node-basic (CLI Onboarding)
   │
   ▼
2. nextjs-payments (Web App Integration)
   │
   ▼
3. ai-agent (Autonomous Natural Language Agent)
```

---

## Examples Catalog

| Example | Learning Focus | Target Platform | Description |
| :--- | :--- | :--- | :--- |
| **[`node-basic`](./node-basic)** | API Core & In-Process Signatures | Node.js / CLI | Demonstrates basic client initialization, loading configurations via `dotenv`, registering signer adapters, and fetching prices/balances. |
| **[`nextjs-payments`](./nextjs-payments)** | Server/Client Boundaries & Status Polling | Next.js App Router / Web | Showcases how to isolate the SDK server-side, validate user requests, process transactions, and poll transaction status indicators. |
| **[`ai-agent`](./ai-agent)** | Semantic Parsing & Transaction Guardrails | Node.js / AI Agent | Flagship example demonstrating how to parse natural language prompts, request user transaction confirmations, and execute SDK methods. |

---

## Security Best Practices in Examples

1.  **Server-Side signing**: Private keys and API keys should never be exposed to browser clients. Ensure credentials reside securely in environment variables.
2.  **Explicit confirmation**: For state-mutating actions (like payments or swaps), write workflows should always confirm actions with the user before signing.
3.  **Strict payload checks**: Check client inputs for correct formats (e.g. EVM addresses and positive decimals) before calling SDK endpoints.
