//@ts-nocheck
describe("Onboarding flow", () => {
  it("displays the fullname onboarding process", () => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
    cy.visit("/onboarding/user_details");

    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Enter your name");
    cy.get('[data-cy="subtitle"]').should("contain", "As shown on a government issued ID");
    cy.get('input[name="firstName"]').should("be.visible").and("be.enabled");
    cy.get('input[name="lastName"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");

    //validation
    cy.checkRequiredFieldError("firstname", "continue-btn");
    cy.checkRequiredFieldError("lastname", "continue-btn");

    cy.get('input[name="firstName"]').clear().type("Poseph");
    cy.get('input[name="lastName"]').clear().type("Dewbottom");
    cy.get('[data-cy="continue-btm"]').click();

    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').should("exist");
      });
  });
});
