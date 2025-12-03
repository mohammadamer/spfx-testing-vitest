## 2. Vitest.config.ts - Main Configuration File

This configuration file sets up Vitest specifically for our SPFx project:

### Plugins Configuration

```typescript
plugin: [react(), tsconfigPaths()]
```

- **`react()`**: Enables JSX/TSX transformation and React-specific optimizations
- **`tsconfigPaths()`**: Resolves TypeScript path aliases defined in `tsconfig.json`

### Test Environment Setup

```typescript
test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setupTests.ts"]
}
```

- **`globals: true`**: Makes Vitest globals (`describe`, `it`, `expect`) available without imports
- **`environment: "jsdom"`**: Uses jsdom to simulate browser environment for DOM testing
- **`setupFiles`**: Runs setup file before each test suite

### Coverage Configuration

```typescript
coverage: {
    enabled: true,
    provider: "v8",
    reporter: ["text-summary", "cobertura", "html", "lcov"],
    cleanOnRerun: true,
    reportsDirectory: "./tests/coverage",
    include: ["**/src/**/*.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/tests/**"]
}
```

**Key Features:**
- **Multiple reporters**: Generates coverage in different formats (summary, XML, HTML, LCOV)
- **Focused coverage**: Only includes source files, excludes test files and dependencies
- **Clean reports**: Removes old coverage data on each run

### Path Aliases

```typescript
alias: {
    "@src/": new URL("./src/", import.meta.url).pathname
}
```

- Enables clean imports like `@src/webparts/helloWorld/components/HelloWorld`

### Reporting Configuration

```typescript
reporters: ["junit", "default"],
outputFile: {
    junit: "./tests/reports/junit.xml"
}
```

- Generates JUnit XML reports for CI/CD integration
- Maintains default console output for development