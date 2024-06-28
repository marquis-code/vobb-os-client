//@ts-nocheck
describe("Onboarding flow", () => {
  it("displays the company website page", () => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
    cy.visit("/onboarding/company_website");

    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company Website");
    cy.get('[data-cy="subtitle"]').should("contain", "Enter the website url of your organisation");
    cy.get('input[name="website"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.contains("button", "Skip").should("be.visible").and("be.enabled");

    cy.get('[data-cy="arrow-icon"]').click();
    cy.url().should("include", "/onboarding/company_details");
    cy.visit("/onboarding/company_website");

    cy.get('[data-cy="skip-btn"]').click();
    cy.url().should("include", "/onboarding/operating_address");
    cy.visit("/onboarding/company_website");

    cy.get('input[name="website"]').clear().type("ravelspace.ng");
    cy.get('[data-cy="continue-btn"]').click();
    cy.contains("small", "Enter a valid URL").should("exist");

    cy.get('input[name="website"]').clear().type("https://travelspace.ng");
    cy.get('[data-cy="continue-btn"]').click();
    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').should("exist");
      });
  });
});
