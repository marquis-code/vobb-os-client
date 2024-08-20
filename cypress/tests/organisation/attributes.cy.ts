describe("Member Attributes", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/settings/attributes");
    cy.url().should("include", "/settings/attributes");
  });

  it("displays the header nav and it's elements", () => {
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
                cy.get("li").eq(2).should("contain", "Attributes");
              });
          });
      });
  });

  it("displays the title, paragraph and tabs", () => {
    cy.get("h1").should("contain", "Attributes");
    cy.contains("p", "Collect as much data as you want from your team members or clients")
      .should("exist")
      .and("be.visible");
    cy.get('[data-cy="attr-tablist"]')
      .should("exist")
      .within(() => {
        cy.get("button")
          .contains("Team member attributes")
          .should("be.visible")
          .and("not.be.disabled");
        cy.get("button").contains("Client attributes").should("be.visible").and("not.be.disabled");
        cy.get("button").contains("Team member attributes").click();
      });
  });

  it("displays add member attribute button and table", () => {
    cy.get('[data-cy="add-memberAttr"]').should("be.visible").and("not.be.disabled");

    cy.get("table.w-full.caption-bottom.text-sm").within(() => {
      cy.get("thead").should("exist");
      cy.get("tbody").should("exist");

      cy.get("thead tr").within(() => {
        cy.get("th").should("have.length", 4);

        cy.get("th").eq(0).should("have.text", "Title");
        cy.get("th").eq(1).should("have.text", "Type");
        cy.get("th").eq(2).should("have.text", "Attribute properties");
        cy.get("th").eq(3).should("have.text", "");
      });
    });
    cy.get("sector.flex.items-center.justify-between.gap-4.text-vobb-neutral-90.mt-4").should(
      "exist"
    );
  });
});
