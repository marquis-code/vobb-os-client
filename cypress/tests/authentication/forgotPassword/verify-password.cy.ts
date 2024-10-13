describe("Verify email page", () => {
  beforeEach(() => {
    cy.visit("/forgot-password/verify");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
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

  it("should check that submit button is disabled when OTP is empty", () => {
    cy.get('input[data-input-otp="true"]').should("exist").and("be.enabled");
    cy.get('input[data-input-otp="true"]').clear();
    cy.contains("button", "Continue").should("be.visible").and("be.disabled");
  });

  it("should enable submit button when all OTP inputs have numbers", () => {
    cy.get('input[data-input-otp="true"]').should("exist").and("be.enabled");
    cy.get('input[data-input-otp="true"]').type("123456");
    cy.contains("button", "Continue").should("be.visible").and("not.be.disabled");
  });

  it("should successfully go back to sign in page", () => {
    cy.get('[data-testid="back-btn"]').click();
    cy.url().should("include", "/login");
  });

  it("should show resend code button after 30 seconds", () => {
    cy.wait(30000);
    cy.contains("button", "Click to resend").should("be.visible").and("be.enabled");
  });
});
