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

    cy.fixture("activitiesMock").then((activitiesMock) => {
      cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/org/activity*", {
        statusCode: 200,
        body: activitiesMock
      }).as("getActivities");
    });
    cy.visit("/settings/organization-activity");
    cy.wait("@getActivities");
    cy.url().should("include", "/settings/organization-activity");
  });

  it("should trigger API call when sorting by ascending", () => {
    cy.get('[data-testid="sort-dropdown"]').click();
    cy.contains("Ascending").click();
    cy.get('[data-testid^="activity-card"]').then(($cards) => {
      const dates = [...$cards].map((card) => {
        const dateText = card.querySelector(".text-xs").textContent.split(" at ")[0];
        const [day, month, year] = dateText.split("/");
        return new Date(`${year}-${month}-${day}`);
      });
      const isSortedAsc = dates.every((date, i) => i === 0 || date >= dates[i - 1]);
      expect(isSortedAsc).to.be.true();
    });
  });

  it("should trigger API call when sorting by descending", () => {
    cy.get('[data-testid="sort-dropdown"]').click();
    cy.contains("Descending").click();
    cy.get('[data-testid^="activity-card"]').then(($cards) => {
      const dates = [...$cards].map((card) => {
        const dateText = card.querySelector(".text-xs").textContent.split(" at ")[0];
        const [day, month, year] = dateText.split("/");
        return new Date(`${year}-${month}-${day}`);
      });
      const isSortedDesc = dates.every((date, i) => i === 0 || date <= dates[i - 1]);
      expect(isSortedDesc).to.be.true();
    });
  });

  it("should default sort to desc in the API call", () => {
    cy.get('[data-testid="sort-dropdown"]').click();
    cy.contains("Clear").click();
    cy.wait("@getActivities").its("request.url").should("not.include", "sort=asc");
  });

  it("should paginate through the table", () => {
    cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/org/activity*", (req) => {
      req.continue((res) => {});
    }).as("fetchData");
    cy.get('[data-testid="page-info"]').should("contain.text", "1 - 10 of 15 items");
    cy.get('[data-testid="next-page"]').click();
    cy.get('[data-testid="page-info"]').should("contain.text", "10 - 15 of 15 items");
    cy.get('[data-testid="prev-page"]').click();
    cy.get('[data-testid="page-info"]').should("contain.text", "1 - 10 of 15 items");
  });

  it("triggers API call on pagination limit change", () => {
    cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/org/activity*", (req) => {
      req.continue((res) => {});
    }).as("fetchData");
    cy.get("[data-testid='pagination']").should("exist");
    cy.get("[data-testid='select-limit']").should("be.visible").click();
    cy.get("div.css-1nmdiq5-menu").should("exist");
    cy.get("div#react-select-3-option-1").should("be.visible").click();
    cy.wait("@fetchData").its("response.statusCode").should("eq", 200);
  });
});
