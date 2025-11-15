import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          reactAvatar: ["@radix-ui/react-avatar"],
          reactDialog: ["@radix-ui/react-dialog"],
          reactDropdownMenu: ["@radix-ui/react-dropdown-menu"],
          reactNavigationMenu: ["@radix-ui/react-navigation-menu"],
          reactSelect: ["@radix-ui/react-select"],
          reactSeparator: ["@radix-ui/react-separator"],
          reactSlot: ["@radix-ui/react-slot"],

          sentry: ["@sentry/react"],
          stripe: ["@stripe/react-stripe-js", "@stripe/stripe-js"],

          axios: ["axios"],
          classVariances: ["class-variance-authority", "clsx"],
          dayjs: ["dayjs"],
          highcharts: ["highcharts-react-official"],
          i18n: [
            "i18next",
            "i18next-browser-languagedetector",
            "i18next-http-backend",
            "react-i18next",
          ],
          keycloak: ["keycloak-js"],
          reactIcons: ["lucide-react"],

          react: ["react", "react-dom", "react-error-boundary", "react-router"],

          tostify: ["react-toastify"],
          tailwind: ["tailwind-merge", "tailwindcss", "tailwindcss-animate"],

          zustand: ["zustand"],
        },
      },
    },
  },
  server: {
    headers: {
      "Referrer-Policy": "no-referrer",
    },
    port: 5173,
    host: true,
    strictPort: true,
  },
  preview: {
    headers: {
      "Referrer-Policy": "no-referrer",
    },
    port: 5173,
    host: true,
    strictPort: true,
  },
  test: {
    globals: true,
    deps: {
      web: {
        transformCss: true,
        transformAssets: true,
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      exclude: [
        "src/*.{ts,tsx,js,jsx}",
        "src/**/index.{ts,tsx,js,jsx}",
        "src/tests",
      ],
      thresholds: {
        perFile: true,
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      clean: true,
      reportOnFailure: true,
    },
    reporters: [
      "default",
      ["vitest-sonar-reporter", { outputFile: "sonar-report.xml" }],
      ["junit", { outputFile: "test-report.xml" }],
    ],
    testTimeout: 60000,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    mockReset: true,
    exclude: [...configDefaults.exclude],
  },
});
