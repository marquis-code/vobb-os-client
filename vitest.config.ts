import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/__tests__/setup.ts"
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      router: path.resolve(__dirname, "src/router"),
      hooks: path.resolve(__dirname, "src/hooks"),
      lib: path.resolve(__dirname, "src/lib"),
      context: path.resolve(__dirname, "src/context"),
      pages: path.resolve(__dirname, "src/pages"),
      api: path.resolve(__dirname, "src/api"),
      layout: path.resolve(__dirname, "src/layout"),
      types: path.resolve(__dirname, "src/types"),
      modules: path.resolve(__dirname, "src/modules"), // Add this line
      "@": path.resolve(__dirname, "src") // Add this line for root src alias
    }
  }
});
