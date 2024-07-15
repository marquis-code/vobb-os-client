//@ts-nocheck
describe("Onboarding - Company info flow", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/onboarding/company_details");
    cy.url().should("include", "/onboarding/company_details");
  });

  it("displays the company infomation page", () => {
    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company information");
    cy.get('[data-cy="subtitle"]').should("contain", "Enter your company details.");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.get('[data-cy="organisation-name-state"]').should("exist");
    cy.get('[data-cy="teamsize-state"]').should("exist");
    cy.get('[data-cy="sector-state"]').should("exist");
  });

  it("back arrow goes back to user details page", () => {
    cy.get('[data-cy="arrow-icon"]').click();
    cy.url().should("include", "/onboarding/user_details");
  });

  it("displays and validates organisation name input", () => {
    cy.get('[data-cy="organisation-name-state"]').click();
    cy.get('input[name="organisation"]').should("be.visible").and("be.enabled");
    cy.checkRequiredFieldError("organisation-name", "continue-btn");
  });

  it("submits organisation name successfully", () => {
    cy.get('input[name="organisation"]').clear().type("Turound");
    cy.get('[data-cy="continue-btn"]').click();
    cy.checkAndCloseToastNotification("Company name saved sucessfully");
  });

  it("displays team size input", () => {
    cy.get('[data-cy="teamsize-state"]').click();
    // cy.get("div#react-select-3-placeholder")
    // .should("be.visible")
    // .and("contain", "What is the size of your team?");
    cy.get('input[type="hidden"][name="size"]').should("exist");
    cy.get('input[role="combobox"]').should("be.visible").and("be.enabled");
    cy.get("svg.css-tj5bde-Svg").should("be.visible");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
  });

  it("displays sector input", () => {
    cy.get('[data-cy="sector-state"]').click();
    // cy.get("div#react-select-5-placeholder")
    //   .should("be.visible")
    //   .and("contain", "Select travel industry");
    cy.get('input[type="hidden"][name="sector"]').should("exist");
    cy.get('input[role="combobox"]').should("be.visible").and("be.enabled");
    cy.get("svg.css-tj5bde-Svg").should("be.visible");
    cy.contains("button", "Submit").should("be.visible").and("be.enabled");
  });
});
