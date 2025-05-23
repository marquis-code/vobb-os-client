//@ts-nocheck
describe("Completed onboarding page", () => {
  it("displays the onboarding completed page", () => {
    cy.visit("/onboarding/completed");

    cy.get('[data-testid="logo"]').should("exist");
    cy.get("h1").should("contain", "All done, yay!");
    cy.get('[data-testid="subtitle"]').should("contain", "You've officially set sail with us.");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.get('[data-testid="continue-btn"]').click();
    cy.url().should("include", "/overview");
  });
});
