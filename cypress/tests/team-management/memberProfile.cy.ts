//@ts-nocheck
describe("Organisation Members", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.setCookie("vobbOSAccess", this.vobbOSAccess);
    cy.setCookie("vobbOSRefresh", this.vobbOSRefresh); 
    cy.fixture("accountDetails").then((accountDetails) => {
      cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/acc/details", {
        statusCode: 200,
        body: accountDetails
      }).as("getAccountDetails");
    });

    cy.visit("/members/6673e51f01d00acae3b83475/activity");
    cy.url().should("include", "/members/6673e51f01d00acae3b83475/activity");
  });

  it("member details should be prefilled with fetched data", () => {
    cy.wait("@getAccountDetails");

    cy.get('[data-testid="member-details"]').within(() => {
      cy.get('input[name="firstName"]').should("have.value", "Posepher");

      cy.get('input[name="lastName"]').should("have.value", "Dewbottom");

      cy.get('input[name="email"]').should("have.value", "tezt@example.com");

      cy.get('input[name="phoneNumber"]').should("have.value", "2347078901156");

      cy.get('input[name="jobTitle"]').should("have.value", "Overseer");

      cy.get('select[name="systemLanguage"]').should("have.value", "English");

      cy.get('select[name="timezone"]').should("have.value", "Africa/Lagos (GMT+01:00)");

      cy.get('select[name="dateFormat"]').should("have.value", "DD/MM/YYYY");
    });
  });

  it("updates member details after a second on edit", () => {
    cy.get('input[name="firstName"]').clear().type("Poseph");
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Success");

    cy.get('input[name="lastName"]').clear().type("Dewbottom");
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Success");

    cy.get('input[name="jobTitle"]').clear().type("Overseer");
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Success");
  });

  it("updates member email after a second on edit", () => {
    cy.get('input[name="email"]').clear().type("tezt@example.com");
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Verification code has been sent to tezt@example.com");
  });
});
