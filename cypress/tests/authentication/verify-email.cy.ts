describe("Signup page", () => {
  beforeEach(() => {
    cy.visit("/verify-email");
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
    cy.get("resend-btn").should("be.visible").and("be.disabled");
    cy.get("back-btn").should("be.visible").and("be.enabled");
    cy.get("[data-cy='arrow-icon']").should("exist");
  });

  it("should successfully go back to sign up page", () => {
    cy.get('[data-cy="back-btn"]').click();
    cy.url().should("include", "/");
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
    cy.get('div[data-input-otp-container="true"]').as("otpInputs"); // Alias for easier reference

    cy.contains("button", "Continue").should("be.visible").and("be.disabled");

    // Type numbers into each OTP input div
    cy.get("@otpInputs").each(($otpInput, index) => {
      const number = index + 1;
      // Temporarily convert div to input for typing
      cy.wrap($otpInput)
        .invoke("text") // Get current text content
        .then((text) => {
          if (text.trim() === "") {
            // Create an input element with the same text content
            const $input = Cypress.$("<input>", { type: "text", value: text.trim() });
            $otpInput.empty().append($input); // Replace div content with input
          }
        })
        .type(`${number}`); // Type number into the input
    });

    // Check that the submit button becomes enabled after typing numbers
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
  });
});
