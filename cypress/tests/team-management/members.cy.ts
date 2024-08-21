//@ts-nocheck
describe("Organisation Members", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/settings/members");
    cy.url().should("include", "/settings/members");
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
                cy.get("li").eq(2).should("contain", "Members");
              });
          });
      });
    cy.get("h1").should("contain", "Members");
  });

  it("displays invite member button and member's table", () => {
    cy.get('[aria-haspopup="dialog"]').should("exist").and("not.be.disabled");
    cy.get('[aria-haspopup="dialog"]').click();
    cy.get("[data-radix-popper-content-wrapper]").should("exist");
    cy.get('[data-cy="invite-member"]').should("be.visible").and("not.be.disabled");

    cy.get("table.w-full.caption-bottom.text-sm").within(() => {
      cy.get("thead").should("exist");
      cy.get("tbody").should("exist");

      cy.get("thead tr").within(() => {
        cy.get("th").should("have.length", 9);

        cy.get("th").eq(0).should("have.text", "Name");
        cy.get("th").eq(1).should("have.text", "Email");
        cy.get("th").eq(2).should("have.text", "Branches");
        cy.get("th").eq(3).should("have.text", "Teams");
        cy.get("th").eq(4).should("have.text", "Role");
        cy.get("th").eq(5).should("have.text", "Date added");
        cy.get("th").eq(6).should("have.text", "Last Active");
        cy.get("th").eq(7).should("have.text", "Status");
        cy.get("th").eq(8).should("have.text", "");
      });
    });
    cy.get("section.paginate").should("exist");
  });
});
