//@ts-nocheck
describe("Account Activities", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/settings/account-activity");
    cy.url().should("include", "/settings/account-activity");
  });

  it("displays the account activities page", () => {
    cy.get("h1").should("contain", "Account Activity");
    cy.get("p").first().should("contain", "Monitor your account activities over time");

    cy.get('[data-cy="filter-div"]').should("exist").and("be.visible");

    cy.get("body").then(($body) => {
      if ($body.find('[data-cy="loading-spinner"]').length) {
        cy.get('[data-cy="loading-spinner"]').should("be.visible");
      } else if ($body.find("p:contains('No Account activities for this time.')").length) {
        cy.get("p").contains("No Account activities for this time.").should("be.visible");
      } else {
        cy.get('[data-cy="activity-card"]').should("exist").and("be.visible");

        cy.get('[data-cy="pagination"]').should("exist").and("be.visible");
      }
    });
  });
});
