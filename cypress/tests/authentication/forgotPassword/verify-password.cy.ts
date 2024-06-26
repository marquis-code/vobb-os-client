describe("Signup page", () => {
  beforeEach(() => {
    cy.visit("/forgot-password/verify");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("should display the verify email page", () => {
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Check your email");
    cy.get('[data-cy="subtitle"]').should("exist");
    cy.contains("span", "Didn't receive the code?").should("exist");
    cy.get('[data-cy="resend-btn"]').should("be.visible").and("be.disabled");
    cy.wait(30000);
    cy.contains("button", "Click to resend").should("be.visible").and("be.enabled");
    cy.get('[data-cy="back-btn"]').should("be.visible").and("be.enabled");
    cy.get("[data-cy='arrow-icon']").should("exist");
  });

  it("should successfully go back to sign in page", () => {
    cy.get('[data-cy="back-btn"]').click();
    cy.url().should("include", "/login");
  });

  it("should find OTP container with specific conditions", () => {
    cy.get('div[data-input-otp-container="true"]')
      .should("exist")
      .as("otpContainer")
      .children("div")
      .should("have.length", 8);
    cy.get('[role="separator"]').should("exist");
    cy.get("svg").should("exist");
  });

  it("should enable submit button when all OTP inputs have numbers", () => {
    cy.get('div[data-input-otp-container="true"]').as("otpInputs");

    cy.contains("button", "Continue").should("be.visible").and("be.disabled");
  });
});
