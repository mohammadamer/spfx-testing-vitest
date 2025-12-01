## 3. SetupTests.ts - Global Test Setup

This file configures the global testing environment:

### Testing Library Extensions

```typescript
import "@testing-library/jest-dom";
```

- Adds custom matchers like `toBeInTheDocument()`, `toHaveClass()`, etc.

### Cleanup After Each Test

```typescript
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
    cleanup();
});
```

- Automatically unmounts React components after each test
- Prevents memory leaks and test interference

### Browser API Mocking

```typescript
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
```

**Purpose:**
- Mocks `window.matchMedia` API which isn't available in jsdom
- Essential for testing responsive components or CSS-in-JS libraries
- Prevents runtime errors when components use media queries

## Benefits of This Vitest Setup for SPFx

1. **Fast Execution**: Vitest is significantly faster than Jest due to Vite's optimization
2. **Modern Tooling**: Native TypeScript and ESM support
3. **SPFx Compatibility**: Properly configured for SharePoint Framework requirements
4. **Comprehensive Coverage**: Multiple coverage report formats for different needs
5. **Developer Experience**: Web UI for interactive testing during development
6. **CI/CD Ready**: JUnit XML output for build pipeline integration
