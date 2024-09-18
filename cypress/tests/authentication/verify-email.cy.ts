describe("Verify Email page", () => {
  beforeEach(() => {
    cy.visit("/verify-email");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("should display the verify email page", () => {
    cy.get('[data-testid="logo"]').should("exist");
    cy.get("h1").should("contain", "Check your email");
    cy.get('[data-testid="subtitle"]').should("exist");
    cy.contains("span", "Didn't receive the code?").should("exist");
    cy.get('[data-testid="resend-btn"]').should("be.visible").and("be.disabled");
    cy.get('[data-testid="back-btn"]').should("be.visible").and("be.enabled");
    cy.get("[data-testid='arrow-icon']").should("exist");
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

  it("should successfully go back to sign up page", () => {
    cy.get('[data-testid="back-btn"]').click();
    cy.url().should("include", "/");
  });

  it("should show resend code button after 30 seconds", () => {
    cy.wait(30000);
    cy.contains("button", "Click to resend").should("be.visible").and("be.enabled");
  });
});
