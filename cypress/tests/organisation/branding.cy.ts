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

    cy.visit("/settings/branding");
    cy.url().should("include", "/settings/branding");
  });

  it("displays the profile header nav and h1", () => {
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

                cy.get("li").eq(0).should("contain", "Workspace");
                cy.get("li").eq(1).find("svg").should("exist");
                cy.get("li").eq(2).should("contain", "Branding");
              });
          });
      });
    cy.get("h1").should("contain", "Branding");
  });

  it("displays enabled buttons and updates branding on save", () => {
    cy.get("button").contains("Cancel").should("not.be.disabled");
    cy.get("button").contains("Save").should("not.be.disabled");
  });

  it("displays brand colors and update value", () => {
    cy.get("[data-cy='primary-color']")
      .should("exist")
      .within(() => {
        cy.contains("p", "Primary Brand Color").should("exist").and("be.visible");
        cy.get("button:has(svg)").should("be.visible").and("be.enabled").click();
        cy.get("div.react-colorful").should("exist");
        cy.get('input[spellcheck="false"]').should("exist").and("be.enabled");
        cy.get('input[spellcheck="false"]').clear().type("#feddff");
      });
    cy.get("[data-cy='secondary-color']")
      .should("exist")
      .within(() => {
        cy.contains("p", "Secondary Brand Color").should("exist").and("be.visible");
        cy.get("button:has(svg)").should("be.visible").and("be.enabled").click({ force: true });
        cy.get("div.react-colorful").should("exist");
        cy.get('input[spellcheck="false"]').should("exist").and("be.enabled");
        cy.get('input[spellcheck="false"]').clear().type("#e16def");
      });
    cy.get("button").contains("Save").click({ force: true });
    cy.checkAndCloseToastNotification("Company branding saved sucessfully");
  });

  it("displays preview of brand colors", () => {
    cy.get("[data-cy='preview']").should("exist");
  });
});
