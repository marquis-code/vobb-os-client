describe("Completed email verify page", () => {
  beforeEach(() => {
    cy.visit("/verify-email/completed");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("Continue button takes user to onboarding process page", () => {
    cy.get('[data-testid="continue-btn"]').click();
    cy.url().should("include", "/onboarding/user_details");
  });
});
