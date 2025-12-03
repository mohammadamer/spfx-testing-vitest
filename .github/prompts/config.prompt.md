---
mode: agent
---
# Vitest Configuration Guide for SharePoint SPFx Projects

This comprehensive guide provides all the necessary changes to configure Vitest testing framework for your SharePoint Framework (SPFx) project.

## 1. Package.json Updates

### Add Development Dependencies

Add the following packages to your `package.json` under the `devDependencies` section:

```json
{
  "devDependencies": {
    "vitest": "^2.1.8",
    "@vitejs/plugin-react": "^4.3.4",
    "@vitest/coverage-v8": "^2.1.8",
    "@vitest/ui": "^2.1.8",
    "vite-tsconfig-paths": "^4.2.0",
    "@testing-library/jest-dom": "5.17",
    "@testing-library/react": "^12.1.5",
    "@testing-library/user-event": "^14.4.3",
    "jsdom": "^24.0.0",
    "ajv": "^6.12.5"
  }
}
```

### Add NPM Scripts

Add these test scripts to the `scripts` section of your `package.json`:

```json
{
  "scripts": {
    "test": "vitest run --coverage",
    "test:local": "vitest --ui"
  }
}
```

### Package Descriptions

| Package | Version | Purpose |
|---------|---------|---------|
| `vitest` | ^2.1.8 | Fast unit test framework powered by Vite |
| `@vitejs/plugin-react` | ^4.3.4 | Vite plugin for React support in testing |
| `@vitest/coverage-v8` | ^2.1.8 | Code coverage provider using V8's built-in coverage |
| `@vitest/ui` | ^2.1.8 | Web-based UI for interactive test running |
| `vite-tsconfig-paths` | ^4.2.0 | Resolves TypeScript path mappings in Vitest |
| `@testing-library/jest-dom` | 5.17 | Custom Jest DOM matchers for better assertions |
| `@testing-library/react` | ^12.1.5 | Simple and complete React DOM testing utilities |
| `@testing-library/user-event` | ^14.4.3 | Fire events for user interactions in tests |
| `jsdom` | ^24.0.0 | Pure JavaScript implementation of WHATWG DOM |
| `ajv` | ^6.12.5 | JSON Schema validator (required for SPFx compatibility) |

## 2. TSConfig.json Updates

### Update Types Array

Add the following entries to the `types` array in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "es6-promise",
      "webpack-env",
      "vitest/globals",
      "@testing-library/jest-dom"
    ]
  }
}
```

### Optional: Add Path Mapping

For cleaner imports, add these path configurations:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@src/*": ["./*"]
    }
  }
}
```

### Complete TSConfig Example

Here's how your complete `tsconfig.json` should look with Vitest support:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-5.3/includes/tsconfig-web.json",
  "compilerOptions": {
    "target": "es5",
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "jsx": "react",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "outDir": "lib",
    "inlineSources": false,
    "noImplicitAny": true,
    "typeRoots": [
      "./node_modules/@types",
      "./node_modules/@microsoft"
    ],
    "types": [
      "es6-promise",
      "webpack-env",
      "vitest/globals",
      "@testing-library/jest-dom"
    ],
    "lib": [
      "es5",
      "dom",
      "es2015.collection",
      "es2015.promise"
    ],
    "baseUrl": "./src",
    "paths": {
      "@src/*": ["./*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "exclude": [
    "node_modules",
    "lib",
    "tests"
  ]
}
```

## 3. vitest.config.ts File

Create a new file `vitest.config.ts` in the root directory of your project:

```typescript
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],

    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./tests/setupTests.ts"],

        coverage: {
            enabled: true,
            provider: "v8",
            reporter: ["text-summary", "cobertura", "html", "lcov"],
            cleanOnRerun: true,
            reportsDirectory: "./tests/coverage",
            include: ["**/src/**/*.{ts,tsx}"],
            exclude: [
                "**/node_modules/**",
                "**/tests/**",
            ],
        },

        alias: {
            "@src/": new URL("./src/", import.meta.url).pathname,
        },
        
        reporters: ["junit", "default"],
        outputFile: {
            junit: "./tests/reports/junit.xml",
        },
    },
});
```

### Configuration Breakdown

| Setting | Purpose |
|---------|---------|
| `plugins` | Enables React JSX transformation and TypeScript path resolution |
| `globals: true` | Makes Vitest globals (describe, it, expect) available without imports |
| `environment: "jsdom"` | Uses jsdom to simulate browser environment for DOM testing |
| `setupFiles` | Runs setup configuration before each test suite |
| `coverage.enabled` | Enables code coverage collection |
| `coverage.provider` | Uses V8 for fast, built-in coverage reporting |
| `coverage.reporter` | Generates multiple coverage report formats |
| `alias` | Enables clean imports using @src/ prefix |
| `reporters` | Generates both console output and JUnit XML for CI/CD |

## 4. tests/setupTests.ts File

Create a `tests` directory in your project root, then create `setupTests.ts`:

```typescript
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

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

afterEach(() => {
    cleanup();
});
```

### Setup File Features

| Feature | Purpose |
|---------|---------|
| `@testing-library/jest-dom` | Adds custom DOM matchers like `toBeInTheDocument()` |
| `cleanup()` | Automatically unmounts React components after each test |
| `matchMedia` mock | Prevents errors when components use CSS media queries |
| `vi.fn()` | Vitest's function mocking utility for creating mock functions |

### Enhanced Setup (Optional)

For more comprehensive mocking, you can extend the setup file:

```typescript
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock window.matchMedia for jsdom compatibility
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

// Mock ResizeObserver for components that use it
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Mock URL.createObjectURL for file upload testing
Object.defineProperty(URL, "createObjectURL", {
    writable: true,
    value: vi.fn(() => "mocked-url"),
});

// Mock fetch for API testing
global.fetch = vi.fn();

// Mock SharePoint context for SPFx testing
beforeAll(() => {
    Object.defineProperty(window, 'location', {
        value: {
            href: 'https://tenant.sharepoint.com',
            hostname: 'tenant.sharepoint.com',
            pathname: '/sites/test',
            search: '',
            hash: ''
        },
        writable: true
    });
});
```

## 5. Sample Test File

Create `tests/components/HelloWorld.test.tsx` to demonstrate testing patterns:

```typescript
import * as React from "react";
import { render, screen } from '@testing-library/react';
import HelloWorld from '@src/webparts/helloWorld/components/HelloWorld';

describe('HelloWorld component', () => {
  const baseProps = {
    description: 'Test description',
    isDarkTheme: false,
    environmentMessage: 'Test environment',
    hasTeamsContext: false,
    userDisplayName: 'Test User'
  };

  it('renders user display name and description', () => {
    render(<HelloWorld {...baseProps} />);
    expect(screen.getByText(/Well done, Test User!/)).toBeInTheDocument();
    expect(screen.getByText(/Web part property value:/)).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders environment message', () => {
    render(<HelloWorld {...baseProps} />);
    expect(screen.getByText('Test environment')).toBeInTheDocument();
  });

  it('shows dark image when isDarkTheme is true', () => {
    render(<HelloWorld {...baseProps} isDarkTheme={true} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('welcome-dark.png'));
  });

  it('shows light image when isDarkTheme is false', () => {
    render(<HelloWorld {...baseProps} isDarkTheme={false} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('welcome-light.png'));
  });

  it('applies Teams style when hasTeamsContext is true', () => {
    const { container } = render(<HelloWorld {...baseProps} hasTeamsContext={true} />);
    expect(container.querySelector('section')?.className).toMatch(/teams/);
  });
});
```

## 6. Installation and Setup Instructions

### Step 1: Install Dependencies

Run the following command to install all required packages:

```bash
npm install --save-dev vitest @vitejs/plugin-react @vitest/coverage-v8 @vitest/ui vite-tsconfig-paths @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom ajv
```

### Step 2: Create Directory Structure

Create the necessary test directories:

```bash
mkdir tests
mkdir tests/components
mkdir tests/reports
mkdir tests/coverage
```

### Step 3: Apply Configuration Changes

1. Update your `package.json` with the dependencies and scripts above
2. Update your `tsconfig.json` with the types array and path mapping
3. Create the `vitest.config.ts` file in your project root
4. Create the `tests/setupTests.ts` file
5. Create sample test files

### Step 4: Verify Setup

Run tests to ensure everything is working:

```bash
# Run tests once with coverage
npm run test

# Run tests with interactive UI (opens in browser)
npm run test:local
```

## 7. Expected Results

After successful setup, you should see:

✅ **Fast test execution** with Vitest's optimized engine  
✅ **Code coverage reports** in multiple formats  
✅ **Interactive web UI** for development testing  
✅ **CI/CD compatible** JUnit XML output  
✅ **TypeScript intellisense** for test functions  
✅ **Clean imports** using @src/ path alias  
✅ **SPFx compatibility** with proper mocking  

## 8. Coverage Report Locations

Your test coverage reports will be generated in:

- **HTML Report**: `./tests/coverage/index.html` (open in browser)
- **LCOV Report**: `./tests/coverage/lcov.info` (for IDE extensions)
- **Cobertura XML**: `./tests/coverage/cobertura-coverage.xml` (for CI/CD)
- **JUnit XML**: `./tests/reports/junit.xml` (for build pipelines)

## 9. Benefits of This Vitest Setup

### Performance Benefits
- **Faster execution**: Vitest is significantly faster than Jest due to Vite's optimization
- **Hot module replacement**: Instant test re-runs on file changes
- **Parallel test execution**: Built-in support for running tests in parallel

### Developer Experience
- **Interactive UI**: Web-based interface for running and debugging tests
- **Modern tooling**: Native TypeScript and ESM support
- **Better error messages**: More informative test failure reports

### SPFx Compatibility
- **Framework optimized**: Properly configured for SharePoint Framework requirements
- **React support**: Full JSX/TSX transformation support
- **Path resolution**: Clean imports with TypeScript path mapping

### CI/CD Integration
- **Multiple report formats**: Coverage in HTML, LCOV, Cobertura formats
- **JUnit output**: XML reports for build pipeline integration
- **Configurable thresholds**: Set minimum coverage requirements

## 10. Troubleshooting Common Issues

### Module Resolution Errors
If you encounter module resolution issues:

1. Ensure `vite-tsconfig-paths` is installed and configured
2. Verify path aliases in both `tsconfig.json` and `vitest.config.ts`
3. Check that base URLs are consistent

### React Version Conflicts
If you see React version warnings:

1. Ensure React versions match between dependencies and devDependencies
2. Update `@vitejs/plugin-react` to the latest version
3. Clear node_modules and reinstall if necessary

### Coverage Not Working
If coverage reports aren't generated:

1. Verify `@vitest/coverage-v8` is installed
2. Check that source files are included in coverage configuration
3. Ensure test files are properly excluded from coverage

This configuration provides a complete, production-ready Vitest testing environment optimized specifically for SharePoint Framework development!