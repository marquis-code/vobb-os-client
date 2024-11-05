//@ts-nocheck
describe("Communication", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });

    cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/org/details", {
      statusCode: 200,
      body: {
        data: {
          _id: "66e40dc582934b8cf68ca1d4",
          temporary_suspension_notify: false,
          indefinite_suspension_notify: false,
          name: "Killmon",
          sector: ["Tourism"],
          size: "21-50",
          primary_color: "#f8d4d4",
          secondary_color: "#ef1717"
        }
      }
    }).as("getOrgDetails");

    cy.visit("/settings/communication");
    cy.url().should("include", "/settings/communication");
  });

  it("should update temporary suspension notice", () => {
    cy.wait("@getOrgDetails");
    cy.get("[data-testid='temporary-suspension']").click();
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Temporary suspension notice enabled");
  });

  it("should update indefinite suspension notice", () => {
    cy.wait("@getOrgDetails");
    cy.get("[data-testid='deactivation']").click();
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Indefinite suspension notice enabled");
  });
});
