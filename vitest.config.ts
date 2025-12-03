import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()] as any,
    test: {
        globals: true, // Makes Vitest globals (`describe`, `it`, `expect`) available without imports
        environment: "jsdom", // Uses jsdom to simulate browser environment for DOM testing
        setupFiles: ["./tests/setupTests.ts"], // Runs setup file before each test suite
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
            // Enables clean imports like `@src/webparts/helloWorld/components/HelloWorld`
        },
        
        reporters: ["junit", "default"],
        outputFile: {
            junit: "./tests/reports/junit.xml",
        },
    },
});