//@ts-nocheck
describe("Onboarding flow", () => {
  it("displays the company addresses page", () => {
    cy.visit("/onboarding/operating_address");
    cy.wait(5000);
    cy.get('[data-cy="arrow-icon"]').should("exist");
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Company Address");
    cy.get('[data-cy="subtitle"]').should("contain", "Where are you operating from?");
    cy.get('[data-cy="arrow-icon"]').click();
    cy.url().should("include", "/onboarding/company_website");
    cy.visit("/onboarding/operating_address");

    //country
    cy.get('[data-cy="country-state"]').click();
    cy.get("div#react-select-5-placeholder").should("be.visible").and("contain", "Select country");
    cy.get('input[role="combobox"]').should("be.visible").and("be.enabled");
    cy.get("svg.css-tj5bde-Svg").should("be.visible");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");

    cy.get('input[type="hidden"][name="country"]').invoke("val", "Nigeria");
    cy.get('input[type="hidden"][name="country"]').should("have.value", "Nigeria");
    cy.get('[data-cy="continue-btn"]').click();
    cy.contains("small", "Required").should("exist");

    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').should("exist");
      });

    //zipcode
    cy.get('[data-cy="zipcode-state"]').click();
    cy.get('input[name="zipCode"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.checkRequiredFieldError("zipcode-input", "continue-btn");
    cy.get('input[name="zipCode"]').clear().type("123456");
    cy.get('[data-cy="continue-btn"]').click();
    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').should("exist");
      });

    //province
    cy.get('[data-cy="province-state"]').click();
    cy.get('input[name="state"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.checkRequiredFieldError("province-input", "continue-btn");
    cy.get('input[name="state"]').clear().type("Lagos");
    cy.get('[data-cy="continue-btn"]').click();
    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').should("exist");
      });

    //city address
    cy.get('[data-cy="city-state"]').click();
    cy.get('input[name="addressLine1"]').should("be.visible").and("be.enabled");
    cy.get('input[name="addressLine2"]').should("be.visible").and("be.enabled");
    cy.get('input[name="addressLine3"]').should("be.visible").and("be.enabled");
    cy.contains("button", "Continue").should("be.visible").and("be.enabled");
    cy.checkRequiredFieldError("address-input1", "continue-btn");
    cy.checkRequiredFieldError("address-input3", "continue-btn");

    cy.get('input[name="addressLine1"]').clear().type("97 Lagos road");
    cy.get('input[name="addressLine3"]').clear().type("Mainland Ojota");

    cy.get('[data-cy="continue-btn"]').click();
    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').should("exist");
      });
  });
});
