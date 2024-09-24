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
      cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/org/activity/*", {
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

    cy.wait("@getActivities").its("request.url").should("include", "order=asc");
  });

  it("should trigger API call when sorting by descending", () => {
    cy.get('[data-testid="sort-dropdown"]').click();

    cy.contains("Descending").click();

    cy.wait("@getActivities").its("request.url").should("include", "order=desc");
  });

  it("should clear the sort and trigger the API call", () => {
    cy.get('[data-testid="sort-dropdown"]').click();

    cy.contains("Clear").click();

    cy.wait("@getActivities").its("request.url").should("not.include", "order=");
  });

  it("should paginate through the table", () => {
    cy.get('[data-testid="page-info"]').should("contain.text", "1 - 5 of 10 items");

    cy.get('[data-testid="next-page"]').click();
    cy.get('[data-testid="page-info"]').should("contain.text", "6 - 10 of 10 items");

    cy.get('[data-testid="prev-page"]').click();
    cy.get('[data-testid="page-info"]').should("contain.text", "1 - 5 of 10 items");
  });

  it("triggers API call on pagination limit change", () => {
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
