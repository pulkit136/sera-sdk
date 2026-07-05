# Contributing to the Sera Protocol SDK

Thank you for your interest in contributing to the Sera Protocol TypeScript SDK! We welcome pull requests, bug reports, and suggestions.

---

## Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Development Setup

1.  **Fork and Clone**: Fork the repository on GitHub and clone it locally.
2.  **Install Node.js**: Ensure Node.js 18.0.0+ is installed.
3.  **Install Dependencies**: Install root packages:
    ```bash
    npm install
    ```

---

## Commands Checklist

### 1. Verification & Styling
Always lint and check your changes before committing:
```bash
# Run ESLint validation
npm run lint

# Automatically fix linting warnings
npm run lint:fix
```

### 2. Type Checking
Ensure your exports and types are valid:
```bash
npm run typecheck
```

### 3. Running Unit Tests
All changes must be verified using the Vitest test suite:
```bash
npm run test
```

### 4. Build Package
Compile ESM, CommonJS, and declaration files:
```bash
npm run build
```

### 5. Generate API Docs
Update TypeDoc references when changing public APIs:
```bash
npm run docs
```

---

## Directory Structure

*   `src/`: Main library code. Keep namespaces decoupled.
*   `tests/`: Unit and integration mock tests.
*   `examples/`: Target starter applications (basic CLI, Next.js payments, and AI agent).

---

## Commit Guidelines

We recommend using clear, descriptive commits. We use the conventional commits standard:
*   `feat: add support for virtual liquidity query parameters`
*   `fix: resolve EIP-712 typing warnings inside Payments module`
*   `docs: update quickstart instructions inside README`

---

## Pull Request Workflow

1.  Create a branch for your changes: `git checkout -b feat/my-new-feature`.
2.  Commit your modifications following styling rules.
3.  Ensure all 44 tests pass and compilation succeeds.
4.  Open a Pull Request on GitHub against the `main` branch.
5.  Complete the Pull Request template checklist. Core reviewers will check and approve your changes.
