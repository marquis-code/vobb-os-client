import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}"
  },
  chromeWebSecurity: false,
  viewportWidth: 1440,
  viewportHeight: 900
});
