//@ts-nocheck
describe("Organisation teams", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.setCookie("vobbOSAccess", this.vobbOSAccess);
    cy.setCookie("vobbOSRefresh", this.vobbOSRefresh); 
    cy.visit("/teams/66c5bbb762b93ae2b8f274ca");
    cy.url().should("include", "/teams/66c5bbb762b93ae2b8f274ca");
  });

  it("displays page heading", () => {
    cy.get("h1").should("contain", "Sunshine Delight");
  });

  it("clicks the team history button to display activities", () => {
    cy.get('[data-testid="team-history"]').should("be.visible").and("not.be.disabled");
    cy.get('[data-testid="team-history"]').click();

    cy.get('[data-testid="activity-card"]').eq(0).should("exist");
  });

  it("displays the pagination component and triggers API call on limit change", () => {
    cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/teams/history/*", (req) => {
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
