//@ts-nocheck
describe("Onboarding - fullname flow", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/onboarding/user_details");
    cy.url().should("include", "/onboarding/user_details");
  });
  it("displays the fullname page", () => {
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Enter your name");
    cy.get('[data-cy="subtitle"]').should("contain", "As shown on a government issued ID");
    cy.get('input[name="firstName"]').should("be.visible").and("be.enabled");
    cy.get('input[name="lastName"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
  });

  it("validates required fields", () => {
    cy.checkRequiredFieldError("firstname", "continue-btn");
    cy.checkRequiredFieldError("lastname", "continue-btn");
  });

  it("fills in fullname, submits successfully and shows toast notification", () => {
    cy.get('input[name="firstName"]').clear().type("Poseph");
    cy.get('input[name="lastName"]').clear().type("Dewbottom");
    cy.get('[data-cy="continue-btn"]').click();

    cy.checkAndCloseToastNotification("First name and Last name saved sucessfully");
  });
});
