describe("Onboarding flow", () => {
  it("displays the onboarding pages", () => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");

    cy.visit("/onboarding/user_details");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Enter your name");
    cy.get('[data-cy="subtitle"]').should("exist");
    cy.get('[data-cy="firstname"]').should("exist");
    cy.get('[data-cy="lastname"]').should("exist");
    cy.get('[data-cy="continue-btn"]').should("exist");

    cy.visit("/onboarding/company_details");
    cy.wait(500);
    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company information");
    cy.get('[data-cy="subtitle"]').should("exist");
    cy.get('[data-cy="onboarding-input"]').should("exist");
    cy.get('[data-cy="continue-btn"]').should("exist");

    cy.visit("/onboarding/company_website");
    cy.wait(500);
    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company Website");
    cy.get('[data-cy="subtitle"]').should("exist");
    cy.get('[data-cy="website-input"]').should("exist");
    cy.get('[data-cy="continue-btn"]').should("exist");

    cy.get('[data-cy="skip-btn"]').should("exist").click();
    cy.url().should("contain", "/operating_address");

    cy.visit("/onboarding/operating_address");
    cy.wait(500);
    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company Address");
    cy.get('[data-cy="subtitle"]').should("exist");
    cy.get('[data-cy="onboarding-input"]').should("exist");
    cy.get('[data-cy="continue-btn"]').should("exist");
  });

  // it("onboards the user", () => {
  //   cy.visit("/login");
  //   cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", '@Vobb123');
  //   cy.visit('/')
  // });
});
