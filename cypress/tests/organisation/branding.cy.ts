//@ts-nocheck
describe("Organisation Branding", () => {
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
          temporary_suspension_notify: true,
          indefinite_suspension_notify: true,
          name: "Killmon",
          sector: ["Tourism"],
          size: "21-50",
          primary_color: "#f8d4d4",
          secondary_color: "#ef1717"
        }
      }
    }).as("getOrgDetails");

    cy.visit("/settings/branding");
    cy.url().should("include", "/settings/branding");
  });

  it("should have saved brand colors after API call", () => {
    cy.wait("@getOrgDetails");

    cy.get("[data-testid='primary-color']").within(() => {
      cy.get("[data-testid='open-color']").click({ force: true });
      cy.get("[data-testid='color-input']").should("be.visible").and("have.value", "#f8d4d4");
    });

    cy.get("[data-testid='secondary-color']").within(() => {
      cy.get("[data-testid='open-color']").click({ force: true });
      cy.get("[data-testid='color-input']").should("be.visible").and("have.value", "#ef1717");
    });
  });

  it("Updates primary color value", () => {
    cy.get("[data-testid='primary-color']").within(() => {
      cy.get("[data-testid='open-color']").click();
      cy.get("[data-testid='color-input']").clear().type("#f2f2e6");
    });
    cy.get("button").contains("Save").click({ force: true });
    cy.checkAndCloseToastNotification("Company branding saved sucessfully");

    //check that value is updated
    cy.get("[data-testid='primary-color']").within(() => {
      cy.get("[data-testid='open-color']").click({ force: true });

      cy.get("[data-testid='color-input']").should("be.visible").and("have.value", "#f2f2e6");
    });
  });

  it("Updates secondary color value", () => {
    cy.get("[data-testid='secondary-color']").within(() => {
      cy.get("[data-testid='open-color']").click();
      cy.get("[data-testid='color-input']").clear().type("#181af0");
    });
    cy.get("button").contains("Save").click({ force: true });
    cy.checkAndCloseToastNotification("Company branding saved sucessfully");

    //check that value is updated
    cy.get("[data-testid='secondary-color']").within(() => {
      cy.get("[data-testid='open-color']").click({ force: true });

      cy.get("[data-testid='color-input']").should("be.visible").and("have.value", "#181af0");
    });
  });
});
