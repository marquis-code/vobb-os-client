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

  it("displays the header nav and the h1", () => {
    cy.verifyHeaderNavAndTitle("Workspace", "Activity");
  });

  it("displays the titles and account activities if any", () => {
    cy.get("h1").should("contain", "Organization Activity");
    cy.contains("p", "Monitor your organization activities over time")
      .should("exist")
      .and("be.visible");

    cy.get('[data-testid="filter-div"]').should("exist").and("be.visible");

    cy.get("body").then(($body) => {
      if ($body.find('[data-testid="loading-spinner"]').length) {
        cy.get('[data-testid="loading-spinner"]').should("be.visible");
      } else if ($body.find("p:contains('No Account activities for this time.')").length) {
        cy.get("p").contains("No Account activities for this time.").should("be.visible");
      } else {
        cy.get('[data-testid="activity-card"]').eq(0).should("exist").and("be.visible");

        cy.get('[data-testid="pagination"]').should("exist").and("be.visible");
      }
    });
  });

  it("displays the pagination component and triggers API call on limit change", () => {
    cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/org/activity/*", (req) => {
      req.continue((res) => {});
    }).as("fetchData");

    cy.get("[data-testid='pagination']").should("exist");
    cy.get("[data-testid='select-limit']").should("be.visible").click();

    cy.get("div.css-1nmdiq5-menu").should("exist");

    cy.get("div#react-select-3-option-1").should("be.visible").click();

    cy.wait("@fetchData").its("response.statusCode").should("eq", 200);

    cy.get("[data-testid='move-left']").should("be.visible");
    cy.get("[data-testid='move-right']").should("be.visible");
  });
});
