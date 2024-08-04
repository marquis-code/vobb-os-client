//@ts-nocheck
describe("Onboarding - Company website flow", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/onboarding/company_website");
    cy.url().should("include", "/onboarding/company_website");
  });

  it("displays the company website page", () => {
    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company Website");
    cy.get('[data-cy="subtitle"]').should("contain", "Enter the website url of your organisation");
    cy.get('input[name="website"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.contains("button", "Skip").should("be.visible").and("be.enabled");
  });

  it("back arrow goes back to company details page", () => {
    cy.get('[data-cy="arrow-icon"]').click();
    cy.url().should("include", "/onboarding/company_details");
  });

  it("skip button arrow goes to company's address page", () => {
    cy.get('[data-cy="skip-btn"]').click();
    cy.url().should("include", "/onboarding/operating_address");
  });

  it("validates valid url input", () => {
    cy.get('input[name="website"]').clear().type("ravelspace.ng");
    cy.get('[data-cy="continue-btn"]').click();
    cy.contains("small", "Enter a valid URL").should("exist");
  });

  it("validates valid url input and submits successfully", () => {
    cy.get('input[name="website"]').clear().type("https://travelspace.ng");
    cy.get('[data-cy="continue-btn"]').click();
    cy.checkAndCloseToastNotification("Company website saved sucessfully");
  });
});
