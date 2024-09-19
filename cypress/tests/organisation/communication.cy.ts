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
    cy.visit("/settings/communication");
    cy.url().should("include", "/settings/communication");
  });

  it("displays the header nav and the h1", () => {
    cy.verifyHeaderNavAndTitle("Workspace", "Communication");
  });

  it("displays the title and paragraph", () => {
    cy.contains("h1", "Communication").should("exist").and("be.visible");
    cy.contains("p", "Control the email notices that go out to the members of your organization")
      .should("exist")
      .and("be.visible");
  });

  it("displays and updates temporary suspension notice", () => {
    cy.contains("p", "Temporary suspension notice").should("exist").and("be.visible");
    let message = "";
    cy.get("span.flex.items-center.gap-4")
      .eq(0)
      .should("exist")
      .within(() => {
        cy.get("button").contains("Preview mail").should("not.be.disabled");
        cy.get("button:has(span)")
          .should("be.visible")
          .and("be.enabled")
          .click()
          .invoke("attr", "aria-checked")
          .then((ariaChecked) => {
            ariaChecked === "true"
              ? (message = "Temporary suspension notice disabled")
              : (message = "Temporary suspension notice enabled");
          });
      });
    cy.checkAndCloseToastNotification(message);
  });

  it("displays and updates indefinite suspension notice", () => {
    cy.contains("p", "Deactivation notice").should("exist").and("be.visible");
    let message = "";
    cy.get("span.flex.items-center.gap-4")
      .eq(1)
      .should("exist")
      .within(() => {
        cy.get("button").contains("Preview mail").should("not.be.disabled");
        cy.get("button:has(span)")
          .should("be.visible")
          .and("be.enabled")
          .click()
          .invoke("attr", "aria-checked")
          .then((ariaChecked) => {
            ariaChecked === "true"
              ? (message = "Indefinite suspension notice disabled")
              : (message = "Indefinite suspension notice enabled");
          });
      });
    cy.checkAndCloseToastNotification(message);
  });

  it("displays the selected email preview", () => {
    cy.get('[data-testid="preview"]').should("exist");
  });
});
