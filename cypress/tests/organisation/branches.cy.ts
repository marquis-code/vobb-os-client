describe("Organisation branches", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/settings/branches");
    cy.url().should("include", "/settings/branches");
  });

  it("displays the header nav and the h1", () => {
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
                cy.get("li").eq(2).should("contain", "Branches");
              });
          });
      });
    cy.get("h1").should("contain", "Branches");
  });

  it("displays add branch button and table", () => {
    cy.get('[data-cy="add-branch"]').should("be.visible").and("not.be.disabled");

    cy.get("table.w-full.caption-bottom.text-sm").within(() => {
      cy.get("thead").should("exist");
      cy.get("tbody").should("exist");

      cy.get("thead tr").within(() => {
        cy.get("th").should("have.length", 6);

        cy.get("th").eq(0).should("have.text", "Name");
        cy.get("th").eq(1).should("have.text", "Country");
        cy.get("th").eq(2).should("have.text", "State");
        cy.get("th").eq(3).should("have.text", "City");
        cy.get("th").eq(4).should("have.text", "Timezone");
        cy.get("th").eq(5).should("have.text", "");
      });
    });
    cy.get('[data-cy="pagination"]').should("exist");
  });
});
