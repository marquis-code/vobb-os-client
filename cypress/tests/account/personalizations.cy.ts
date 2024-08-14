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

    cy.visit("/settings/personalizations");
    cy.url().should("include", "/settings/personalizations");
  });

  it("displays the page header nav and h1", () => {
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
                cy.get("li").eq(2).should("contain", "Personalizations");
              });
          });
      });
    cy.get("h1").should("contain", "Your Personalizations");
  });

  it("should display system language and successfully update", () => {
    cy.get("h2").eq(0).should("contain", "System Language");
    cy.contains("p", "Translate the app into your preferred language").should("be.visible");
    cy.get("svg.css-tj5bde-Svg").eq(0).should("be.visible").click();
    cy.get("div.css-1nmdiq5-menu").should("be.visible");
    cy.get("div.css-1n6sfyn-MenuList").should("be.visible");
    cy.get("div#react-select-3-option-0").should("be.visible").click();
    cy.get('[data-cy="save-btn"]').eq(0).click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("should display your languages and successfully update", () => {
    cy.get("h2").eq(1).should("contain", "Your Languages");
    cy.contains("p", "Indicate the languages you're fluent in").should("be.visible");

    cy.get("svg.css-tj5bde-Svg").eq(1).should("be.visible").click();
    cy.get("div.css-1nmdiq5-menu").should("be.visible");
    cy.get("div.css-1n6sfyn-MenuList").should("be.visible");
    cy.get("div#react-select-5-option-2").should("be.visible").click();

    cy.get('[data-cy="save-btn"]').eq(1).click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("should display preferred date format and successfully update", () => {
    cy.get("h2").eq(2).should("contain", "Preferred Date Format");
    cy.contains("p", "Choose the format in which you want dates to be presented to you").should(
      "be.visible"
    );

    cy.get("svg.css-tj5bde-Svg").eq(2).should("be.visible").click();
    cy.get("div.css-1nmdiq5-menu").should("be.visible");
    cy.get("div.css-1n6sfyn-MenuList").should("be.visible");
    cy.get("div#react-select-7-option-2").should("be.visible").click();

    cy.get('[data-cy="save-btn"]').eq(2).click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("should timezone and successfully update", () => {
    cy.get("h2").eq(3).should("contain", "Time Zone");
    cy.contains("p", "Select your time zone").should("be.visible");

    cy.get("svg.css-tj5bde-Svg").eq(3).should("be.visible").click();
    cy.get("div.css-1nmdiq5-menu").should("be.visible");
    cy.get("div.css-1n6sfyn-MenuList").should("be.visible");
    cy.get("div#react-select-9-option-3").should("be.visible").click();

    cy.get('[data-cy="save-btn"]').eq(3).click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("should display your organisational properties", () => {
    cy.get("h2").eq(4).should("contain", "Organization Properties");
    cy.contains(
      "p",
      "These are the properties your organization administrator has defined for all members"
    ).should("be.visible");
  });
});
