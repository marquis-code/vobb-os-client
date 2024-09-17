describe("Forgot password page", () => {
  beforeEach(() => {
    cy.visit("/forgot-password");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("should display the enter email page", () => {
    cy.get('[data-testid="logo"]').should("exist");
    cy.get("h1").should("contain", "Forgot Password?");
    cy.get('[data-testid="subtitle"]').should(
      "contain",
      "No worries, we’ll send you reset instructions."
    );
    cy.contains("label", "Email").should("exist");
    cy.get('input[name="email"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");

    cy.get('[data-testid="back-btn"]').should("be.visible").and("be.enabled");
    cy.get("[data-testid='arrow-icon']").should("exist");
  });

  it("should successfully go back to sign in page", () => {
    cy.get('[data-testid="back-btn"]').click();
    cy.url().should("include", "/login");
  });

  it("should show required error when email is left blank", () => {
    cy.checkRequiredFieldError("email", "continue-btn");
  });

  it("should show an error for invalid email format", () => {
    cy.checkInvalidEmailError("email", "invalid-email", "continue-btn");
  });

  it("should send reset code to email and navigate to otp verification page", () => {
    cy.get('input[name="email"]').type("user@gmail.com");
    cy.get('[data-testid="continue-btn"]').click();
    cy.url().should("includes", "/forgot-password/verify");
    cy.checkAndCloseToastNotification(
      "A password reset email has been sent to your registered address."
    );
  });
});
