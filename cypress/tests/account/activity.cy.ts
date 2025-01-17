//@ts-nocheck
describe("Account Activities", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.setCookie("vobbOSAccess", this.vobbOSAccess);
    cy.setCookie("vobbOSRefresh", this.vobbOSRefresh);    
    cy.visit("/settings/account-activity");
    cy.url().should("include", "/settings/account-activity");
  });

  it("displays the header nav and it's elements", () => {
    cy.get("header")
      .should("exist")
      .within(() => {
        cy.get("nav")
          .should("exist")
          .within(() => {
            cy.get("ol")
              .should("exist")
              .within(() => {
                cy.get("li").should("have.length", 3);

                cy.get("li").eq(0).should("contain", "Account");
                cy.get("li").eq(1).find("svg").should("exist");
                cy.get("li").eq(2).should("contain", "Activity");
              });
          });
      });
  });

  it("displays the account activities if any", () => {
    cy.get("h1").should("contain", "Account Activity");
    cy.contains("p", "Monitor your account activities over time").should("exist").and("be.visible");

    cy.get('[data-testid="filter-div"]').should("exist").and("be.visible");

    cy.get("body").then(($body) => {
      if ($body.find('[data-testid="loading-spinner"]').length) {
        cy.get('[data-testid="loading-spinner"]').should("be.visible");
      } else if ($body.find("p:contains('No Account activities for this time.')").length) {
        cy.get("p").contains("No Account activities for this time.").should("be.visible");
      } else {
        cy.get('[data-testid="activity-card"]').should("exist").and("be.visible");

        cy.get('[data-testid="pagination"]').should("exist").and("be.visible");
      }
    });
  });
});
