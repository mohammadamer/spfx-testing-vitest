# Notes for Vitest- NPM packages

## 1. Package.json Changes - NPM Dependencies

### Core Vitest Packages

- **`vitest: ^2.1.8`** - The main Vitest testing framework, which is a fast unit test framework powered by Vite
- **`@vitejs/plugin-react: ^4.3.4`** - Vite plugin that enables React support in Vitest
- **`@vitest/coverage-v8: ^2.1.8`** - Coverage provider using V8's built-in code coverage
- **`@vitest/ui: ^2.1.8`** - Web-based UI for running and viewing test results interactively

### Testing Utilities

- **`@testing-library/jest-dom: 5.17`** - Provides custom Jest DOM matchers for better assertions (e.g., `toBeInTheDocument()`)
- **`@testing-library/react: ^12.1.5`** - React Testing Library for rendering and interacting with React components
- **`@testing-library/user-event: ^14.4.3`** - Companion library for simulating user interactions

### Environment & Configuration

- **`jsdom: ^24.0.0`** - JavaScript implementation of WHATWG DOM and HTML standards for Node.js (enables DOM testing)
- **`vite-tsconfig-paths: ^4.2.0`** - Resolves TypeScript path mapping in Vite/Vitest
- **`ajv: ^6.12.5`** - JSON schema validator (likely needed for SPFx compatibility)

### NPM Scripts Added

```json
"test": "vitest run --coverage",
"test:local": "vitest --ui"
```