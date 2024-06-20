// @ts-nocheck
describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("should display the login form", () => {
    cy.get("h1").should("contain", "Sign in to your account");
    cy.get('[data-cy="email"]').should("exist");
    cy.get('[data-cy="password"]').should("exist");
    cy.get('[data-cy="rememberMe"]').should("exist");
    cy.contains("Forgot password?").should("exist");
    cy.get('[data-cy="recaptcha"]').should("exist");
    cy.get('[data-cy="signin-btn"]').should("exist");
    cy.get('[data-cy="signin-google-btn"]').should("exist");
    cy.get('[data-cy="dont-have-account"]').should("exist");
    cy.get('[data-cy="go-to-signup"]').should("exist");
  });

  it("should successfully go to sign up page", () => {
    cy.get('[data-cy="go-to-signup"]').click();
    cy.url().should("include", "/");
  });

  it("should successfully go to forgot password page", () => {
    cy.contains("Forgot password?").click();
    cy.url().should("include", "/forgot-password");
  });

  it("should log in successfully with valid email credentials", () => {
    cy.loginUserWithEmail("m.bystander12@gmail.com", "@Vobb123");
  });
});
