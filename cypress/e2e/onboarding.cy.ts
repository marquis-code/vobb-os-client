// @ts-nocheck
describe("Onboarding flow", () => {
  it("displays the onboarding pages", () => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");

    //user details
    cy.visit("/onboarding/user_details");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Enter your name");
    cy.get('[data-cy="subtitle"]').should("exist");
    cy.get('[data-cy="firstname"]').should("exist").type("Poseph");
    cy.get('[data-cy="lastname"]').should("exist").type("Dewbottom");
    cy.get('[data-cy="continue-btn"]').should("exist").click();
    cy.url().should("include", "/onboarding/company_details");

    //company info
    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company information");
    cy.get('[data-cy="subtitle"]').should("exist");
    cy.get('[data-cy="organisation-name-state"]').click();
    cy.get('[data-cy="organisation-name"]').should("exist").type("Merrigold");
    cy.get('[data-cy="continue-btn"]').should("exist").click();

    cy.get('[data-cy="teamsize-state"]').click();
    cy.get('input[name="size"]').type("6-10");
    cy.get('[data-cy="continue-btn"]').should("exist").click();

    cy.get('[data-cy="sector-state"]').click();
    cy.get('input[name="sector"]').should("exist").type("Tourism");
    cy.get('[data-cy="continue-btn"]').should("exist").click();

    cy.get('[data-cy="skip-btn"]').should("exist").click();
    cy.url().should("contain", "/operating_address");
    cy.visit("/onboarding/company_website");
    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company Website");
    cy.get('[data-cy="subtitle"]').should("exist");
    cy.get('[data-cy="website-input"]').should("exist").type("https://hamsa.com");
    cy.get('[data-cy="continue-btn"]').should("exist").click();

    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company Address");
    cy.get('[data-cy="subtitle"]').should("exist");
    cy.get('[data-cy="continue-btn"]').should("exist");
  });
});
