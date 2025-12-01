---
mode: agent
---
# Vitest Setup Prompt for SharePoint SPFx Projects

Use this prompt with GitHub Copilot or any AI assistant to configure Vitest testing in your SharePoint SPFx projects:

---

## Prompt:

I need to configure Vitest testing framework for my SharePoint SPFx project. Please help me set up a complete testing environment with the following requirements:

### 1. Update package.json
Add these NPM packages to devDependencies:
- `vitest: ^2.1.8` - Main Vitest testing framework
- `@vitejs/plugin-react: ^4.3.4` - React support for Vitest
- `@vitest/coverage-v8: ^2.1.8` - V8 coverage provider
- `@vitest/ui: ^2.1.8` - Web UI for interactive testing
- `@testing-library/jest-dom: 5.17` - Custom DOM matchers
- `@testing-library/react: ^12.1.5` - React Testing Library
- `@testing-library/user-event: ^14.4.3` - User interaction simulation
- `jsdom: ^24.0.0` - DOM environment for Node.js
- `vite-tsconfig-paths: ^4.2.0` - TypeScript path resolution
- `ajv: ^6.12.5` - JSON schema validator for SPFx compatibility

Also add these test scripts:
```json
"test": "vitest run --coverage",
"test:local": "vitest --ui"
```

### 2. Create vitest.config.ts
Create a Vitest configuration file with:
- React and TypeScript path plugins
- jsdom environment for DOM testing
- Global test functions (describe, it, expect)
- Setup file reference to `./tests/setupTests.ts`
- V8 coverage provider with multiple reporters (text-summary, cobertura, html, lcov)
- Coverage directory: `./tests/coverage`
- Include only `**/src/**/*.{ts,tsx}` files for coverage
- Exclude `**/node_modules/**` and `**/tests/**` from coverage
- Path alias: `@src/` pointing to `./src/`
- JUnit reporter for CI/CD with output to `./tests/reports/junit.xml`
- Clean coverage on rerun

### 3. Create tests/setupTests.ts
Create a global test setup file that:
- Imports `@testing-library/jest-dom` for custom matchers
- Sets up automatic cleanup after each test using `afterEach(() => cleanup())`
- Mocks `window.matchMedia` API for jsdom compatibility with all required methods (matches, media, onchange, addListener, removeListener, addEventListener, removeEventListener, dispatchEvent)

### 4. Create a sample test file
Create `tests/components/[ComponentName].test.tsx` with:
- Proper imports for React, testing utilities, and the component
- Test suite using `describe` and `it` blocks
- Base props object for component testing
- Sample tests for rendering, props validation, and conditional rendering
- Use of Testing Library queries and jest-dom matchers

### Requirements:
- Ensure all configurations are compatible with SharePoint SPFx
- Use modern ES modules and TypeScript
- Configure for both development (watch mode with UI) and CI/CD (single run with coverage)
- Include comprehensive coverage reporting
- Set up proper cleanup and mocking for browser APIs

Please create all necessary files with complete, production-ready configurations.

---

## Usage Instructions:

1. **Copy the prompt above** and paste it into your AI assistant
2. **Specify your component name** in the sample test file request
3. **Review the generated files** before applying to ensure they match your project structure
4. **Run the tests** using:
   - Development: `npm run test:local`
   - CI/CD: `npm run test`

## What This Prompt Will Generate:

✅ Updated `package.json` with all required dependencies and scripts  
✅ Complete `vitest.config.ts` configuration file  
✅ Global `tests/setupTests.ts` setup file  
✅ Sample test file for your components  
✅ Proper TypeScript and React integration  
✅ Coverage reporting setup  
✅ CI/CD compatibility with JUnit XML output  

## Customization Options:

After running the prompt, you can customize:
- **Coverage thresholds**: Add minimum coverage requirements
- **Test patterns**: Modify file inclusion/exclusion patterns
- **Additional setup**: Add more global mocks or utilities
- **Reporters**: Add or remove coverage report formats
- **Path aliases**: Modify or add more path mappings

## Troubleshooting:

If you encounter issues after setup:
1. Ensure Node.js version compatibility (>=18.0.0)
2. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
3. Check TypeScript configuration compatibility
4. Verify SPFx version compatibility with React versions

This prompt ensures consistent Vitest setup across all your SPFx projects with modern testing practices and comprehensive coverage reporting.