//@ts-nocheck
describe("Onboarding flow", () => {
  it("displays the company infomation page", () => {
    cy.visit("/onboarding/company_details");
    cy.wait(5000);
    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company information");
    cy.get('[data-cy="subtitle"]').should("contain", "Enter your company details.");
    cy.get('[data-cy="arrow-icon"]').click();
    cy.url().should("include", "/onboarding/user_details");
    cy.visit("/onboarding/company_details");

    cy.get('[data-cy="organisation-name-state"]').click();
    cy.get('input[name="organisation"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.checkRequiredFieldError("organisation-name", "continue-btn");
    cy.get('input[name="organisation"]').clear().type("Turound");
    cy.get('[data-cy="continue-btn"]').click();
    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').should("exist");
      });

    //teamsize
    cy.get('[data-cy="teamsize-state"]').click();
    cy.get("div#react-select-3-placeholder")
      .should("be.visible")
      .and("contain", "What is the size of your team?");
    cy.get('input[role="combobox"]').should("be.visible").and("be.enabled");
    cy.get("svg.css-tj5bde-Svg").should("be.visible");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");

    cy.get('input[type="hidden"][name="size"]').invoke("val", "6-10");
    cy.get('input[type="hidden"][name="size"]').should("have.value", "6-10");
    cy.get('[data-cy="continue-btn"]').click();
    cy.contains("small", "Required").should("exist");

    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').should("exist");
      });

    //sector
    cy.get('[data-cy="sector-state"]').click();
    cy.get("div#react-select-5-placeholder")
      .should("be.visible")
      .and("contain", "Select travel industry");
    cy.get('input[role="combobox"]').should("be.visible").and("be.enabled");
    cy.get("svg.css-tj5bde-Svg").should("be.visible");
    cy.contains("button", "Submit").should("be.visible").and("be.enabled");

    cy.get('input[type="hidden"][name="sector"]').invoke("val", "Tourism");
    cy.get('input[type="hidden"][name="sector"]').should("have.value", "Tourism");
    cy.get('[data-cy="continue-btn"]').click();
    cy.contains("small", "Required").should("exist");

    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').should("exist");
      });
  });
});
