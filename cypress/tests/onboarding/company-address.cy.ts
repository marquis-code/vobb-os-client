//@ts-nocheck
describe("Onboarding - Company address flow", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/onboarding/operating_address");
    cy.url().should("include", "/onboarding/operating_address");
  });

  it("displays the company addresses page", () => {
    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company Address");
    cy.get('[data-cy="subtitle"]').should("contain", "Where are you operating from?");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.get('[data-cy="country-state"]').should("exist");
    cy.get('[data-cy="zipcode-state"]').should("exist");
    cy.get('[data-cy="province-state"]').should("exist");
    cy.get('[data-cy="city-state"]').should("exist");
  });

  it("back arrow goes back to company website page", () => {
    cy.get('[data-cy="country-state"]').click();
    cy.get('[data-cy="arrow-icon"]').click();
    cy.url({ timeout: 10000 }).should("include", "/onboarding/company_website");
  });

  it("displays country input", () => {
    cy.get('[data-cy="country-state"]').click();
    cy.get('input[type="hidden"][name="country"]').should("exist");
    cy.get('input[role="combobox"]').should("be.visible").and("be.enabled");
    cy.get("svg.css-tj5bde-Svg").should("be.visible");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
  });

  it("selects country and submits successfully", () => {
    cy.get('[data-cy="country-state"]').click();
    cy.get("svg.css-tj5bde-Svg").should("be.visible").click();
    cy.get("div.css-1nmdiq5-menu").should("be.visible");
    cy.get("div.css-1n6sfyn-MenuList").should("be.visible");
    cy.get("div#react-select-5-option-6").should("be.visible").click();
    cy.get('[data-cy="continue-btn"]').click();
    cy.checkAndCloseToastNotification("Company country saved sucessfully");
  });

  it("displays and validates zipcode input", () => {
    cy.get('[data-cy="zipcode-state"]').click();
    cy.get('input[name="zipCode"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.checkRequiredFieldError("zipcode-input", "continue-btn");
  });

  it("submits organisation zipcode successfully", () => {
    cy.get('[data-cy="zipcode-state"]').click();
    cy.get('input[name="zipCode"]').clear().type("12345");
    cy.get('[data-cy="continue-btn"]').click();
    cy.checkAndCloseToastNotification("Company Zip code saved sucessfully");
  });

  it("displays and validates province input", () => {
    cy.get('[data-cy="province-state"]').click();
    cy.get('input[name="state"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.checkRequiredFieldError("province-input", "continue-btn");
  });

  it("submits organisation province successfully", () => {
    cy.get('[data-cy="province-state"]').click();
    cy.get('input[name="state"]').clear().type("Lagos");
    cy.get('[data-cy="continue-btn"]').click();
    cy.checkAndCloseToastNotification("Company state saved sucessfully");
  });

  it("displays and validates city and addresses input", () => {
    cy.get('[data-cy="city-state"]').click();
    cy.get('input[name="addressLine1"]').should("be.visible").and("be.enabled");
    cy.get('input[name="addressLine2"]').should("be.visible").and("be.enabled");
    cy.get('input[name="city"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.checkRequiredFieldError("address-input1", "continue-btn");
    cy.checkRequiredFieldError("city", "continue-btn");
  });

  it("submits organisation province successfully", () => {
    cy.get('[data-cy="city-state"]').click();

    cy.get('input[name="addressLine1"]').clear().type("97 Lagos road");
    cy.get('input[name="city"]').clear().type("Mainland Ojota");

    cy.get('[data-cy="continue-btn"]').click();
    cy.checkAndCloseToastNotification("Login successful");
  });
});
