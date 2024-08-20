//@ts-nocheck
describe("Organisation Activities", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/settings/organization-activity");
    cy.url().should("include", "/settings/organization-activity");
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

                cy.get("li").eq(0).should("contain", "Workspace");
                cy.get("li").eq(1).find("svg").should("exist");
                cy.get("li").eq(2).should("contain", "Activity");
              });
          });
      });
  });

  it("displays the titles and account activities if any", () => {
    cy.get("h1").should("contain", "Organization Activity");
    cy.contains("p", "Monitor your organization activities over time")
      .should("exist")
      .and("be.visible");

    cy.get('[data-cy="filter-div"]').should("exist").and("be.visible");

    cy.get("body").then(($body) => {
      if ($body.find('[data-cy="loading-spinner"]').length) {
        cy.get('[data-cy="loading-spinner"]').should("be.visible");
      } else if ($body.find("p:contains('No Account activities for this time.')").length) {
        cy.get("p").contains("No Account activities for this time.").should("be.visible");
      } else {
        cy.get('[data-cy="activity-card"]').eq(0).should("exist").and("be.visible");

        cy.get('[data-cy="pagination"]').should("exist").and("be.visible");
      }
    });
  });
});
