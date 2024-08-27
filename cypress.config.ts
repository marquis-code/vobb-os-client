import { defineConfig } from "cypress";
import startDevServer from "@cypress/webpack-dev-server";
import webpackConfig from "react-scripts/config/webpack.config";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    chromeWebSecurity: false,
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    }
  },
  component: {
    specPattern: "cypress/components/**/*.cy.{ts,tsx,js,jsx}",
    supportFile: "cypress/support/component.ts",
    indexHtmlFile: "cypress/support/component-index.html",
    setupNodeEvents(on, config) {
      return config;
    },
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
      webpackConfig: webpackConfig("development")
    }
  },
  chromeWebSecurity: false,
  viewportWidth: 1440,
  viewportHeight: 900
});
