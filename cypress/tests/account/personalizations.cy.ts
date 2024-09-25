//@ts-nocheck
describe("Account Personalization Settings", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });

    cy.fixture("accDetailsMock").then((accDetailsMock) => {
      cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/acc/details", {
        statusCode: 200,
        body: accDetailsMock
      }).as("getAccDetails");
    });

    cy.fixture("orgPropertiesMock").then((orgPropertiesMock) => {
      cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/acc/org-attribute*", {
        statusCode: 200,
        body: orgPropertiesMock
      }).as("getOrgProperties");
    });

    cy.visit("/settings/personalizations");
    cy.url().should("include", "/settings/personalizations");
    cy.wait("@getAccDetails");
  });

  it("should successfully update system language", () => {
    cy.get("h2").eq(0).should("contain", "System Language");
    cy.contains("p", "Translate the app into your preferred language").should("be.visible");
    cy.get("svg.css-tj5bde-Svg").eq(0).should("be.visible").click();
    cy.get("div.css-1nmdiq5-menu").should("be.visible");
    cy.get("div.css-1n6sfyn-MenuList").should("be.visible");
    cy.get("div#react-select-3-option-0").should("be.visible").click();
    cy.get('[data-testid="save-btn"]').eq(0).click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("should successfully update your languages", () => {
    cy.get("h2").eq(1).should("contain", "Your Languages");
    cy.contains("p", "Indicate the languages you're fluent in").should("be.visible");

    cy.get("svg.css-tj5bde-Svg").eq(1).should("be.visible").click();
    cy.get("div.css-1nmdiq5-menu").should("be.visible");
    cy.get("div.css-1n6sfyn-MenuList").should("be.visible");
    cy.get("div#react-select-5-option-2").should("be.visible").click();

    cy.get('[data-testid="save-btn"]').eq(1).click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("should successfully update preferred date format", () => {
    cy.get("h2").eq(2).should("contain", "Preferred Date Format");
    cy.contains("p", "Choose the format in which you want dates to be presented to you").should(
      "be.visible"
    );

    cy.get("svg.css-tj5bde-Svg").eq(2).should("be.visible").click();
    cy.get("div.css-1nmdiq5-menu").should("be.visible");
    cy.get("div.css-1n6sfyn-MenuList").should("be.visible");
    cy.get("div#react-select-7-option-2").should("be.visible").click();

    cy.get('[data-testid="save-btn"]').eq(2).click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("should successfully update timezone", () => {
    cy.get("h2").eq(3).should("contain", "Time Zone");
    cy.contains("p", "Select your time zone").should("be.visible");

    cy.get("svg.css-tj5bde-Svg").eq(3).should("be.visible").click();
    cy.get("div.css-1nmdiq5-menu").should("be.visible");
    cy.get("div.css-1n6sfyn-MenuList").should("be.visible");
    cy.get("div#react-select-9-option-3").should("be.visible").click();

    cy.get('[data-testid="save-btn"]').eq(3).click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("Verify that the fields are rendered based on the API response", () => {
    cy.get("form").within(() => {
      cy.contains("label", "Test attribute").should("exist");
      cy.get('textarea[name="long-text_66f27dade7acb050da469011"]').should("exist");

      cy.contains("label", "Test attribute 2").should("exist");
      cy.get('input[name="text_66f27e79e7acb050da46901e"]').should("exist");

      cy.contains("label", "tracks").should("exist");
      cy.get('input[type="checkbox"]').should("have.length", 2);

      cy.contains("label", "favourites").should("exist");
      cy.get('input[type="radio"]').should("have.length", 2);

      cy.contains("label", "house number").should("exist");
      cy.get('input[type="number"]').should("exist");
    });
  });
  it("Fills and submits the dynamic form fields", () => {
    cy.get("form").within(() => {
      cy.get('textarea[name="long-text_66f27dade7acb050da469011"]').type("Some long text");

      cy.get('input[name="text_66f27e79e7acb050da46901e"]').type("Sample text");
    });
    cy.checkAndCloseToastNotification("Success");
  });
});
