describe("Completed password reset page", () => {
  beforeEach(() => {
    cy.visit("/new-password/completed");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("Continue button takes user to sign in page", () => {
    cy.get('[data-testid="continue-btn"]').click();
    cy.url().should("include", "/login");
  });

  it("go back button successfully goes back to sign in page", () => {
    cy.get('[data-testid="back-btn"]').click();
    cy.url().should("include", "/login");
  });
});
