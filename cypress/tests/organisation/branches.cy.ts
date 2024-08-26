//@ts-ignore
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
    cy.get("section.paginate").should("exist");
  });

  it("displays add branch modal when button is clicked", () => {
    cy.get('[data-cy="add-branch"]').click();

    cy.get("aside.fixed")
      .eq(1)
      .within(() => {
        cy.get("h2").should("contain.text", "Create New Branch");
        cy.get("button:has(svg)").should("be.visible").and("be.enabled");

        cy.get("label").should("contain.text", "Branch Name");
        cy.get('input[name="name"]').should("exist").and("not.be.disabled");

        cy.get("label").should("contain.text", "Country of Operation");
        cy.get("label").should("contain.text", "Timezone");
        cy.get("div.css-1gmin95-control").should("have.length", 2);

        cy.get("label").should("contain.text", "State");
        cy.get('input[name="state"]').should("exist").and("not.be.disabled");

        cy.get("label").should("contain.text", "City");
        cy.get('input[name="city"]').should("exist").and("not.be.disabled");

        cy.get("label").should("contain.text", "Address Line 1");
        cy.get('input[name="addressLine1"]').should("exist").and("not.be.disabled");

        cy.get("label").should("contain.text", "Address Line 2 (Optional)");
        cy.get('input[name="addressLine2"]').should("exist").and("not.be.disabled");

        cy.get("label").should("contain.text", "Postal Code");
        cy.get('input[name="postalCode"]').should("exist").and("not.be.disabled");

        cy.get("button").contains("Cancel").should("be.visible").and("not.be.enabled");
        cy.get("button").contains("Create").should("be.visible").and("not.be.enabled");
      });
  });

  it("validates the seven required fields in add branch form", () => {
    cy.get('[data-cy="add-branch"]').click();

    cy.get("aside.fixed")
      .eq(1)
      .within(() => {
        cy.get('input[name="name"]').type("menco").clear();
        cy.get("button").contains("Create").click();
        cy.get("small").filter(':contains("Required")').should("have.length", 7);
      });
  });

  it("successfully adds new branch with correct details", () => {
    cy.get('[data-cy="add-branch"]').click();

    cy.get("aside.fixed")
      .eq(1)
      .within(() => {
        cy.get('input[name="name"]').clear().type("Blamo");
        cy.get('input[name="state"]').clear().type("Ekiti");
        cy.get('input[name="city"]').clear().type("Ado");
        cy.get('input[name="addressLine1"]').clear().type("54 Akamu street");
        cy.get('input[name="postalCode"]').clear().type("104140");

        cy.get("div.css-b62m3t-container")
          .eq(0)
          .within(() => {
            cy.get("div.css-1xc3v61-indicatorContainer").click();
            cy.wait(1000);
            cy.get("div.css-1nmdiq5-menu").should("exist");
            cy.get("div#react-select-7-option-6").should("be.visible").click();
          });
        cy.get("div.css-b62m3t-container")
          .eq(1)
          .within(() => {
            cy.get("div.css-1xc3v61-indicatorContainer").click();
            cy.wait(1000);
            cy.get("div.css-1nmdiq5-menu").should("exist");
            cy.get("div#react-select-9-option-1").should("be.visible").click();
          });

        cy.get("button").contains("Create").click();
        cy.get("button:has(svg)").eq(0).click();
      });
    cy.checkAndCloseToastNotification("1 branch created");
  });

  it("Throws error when there is existing branch with name", () => {
    cy.get('[data-cy="add-branch"]').click();

    cy.get("aside.fixed")
      .eq(1)
      .within(() => {
        cy.get('input[name="name"]').clear().type("Blamo");
        cy.get('input[name="state"]').clear().type("Lagos");
        cy.get('input[name="city"]').clear().type("Ado");
        cy.get('input[name="addressLine1"]').clear().type("54 Imani street");
        cy.get('input[name="postalCode"]').clear().type("104140");

        cy.get("div.css-b62m3t-container")
          .eq(0)
          .within(() => {
            cy.get("div.css-1xc3v61-indicatorContainer").click();
            cy.wait(1000);
            cy.get("div.css-1nmdiq5-menu").should("exist");
            cy.get("div#react-select-7-option-6").should("be.visible").click();
          });
        cy.get("div.css-b62m3t-container")
          .eq(1)
          .within(() => {
            cy.get("div.css-1xc3v61-indicatorContainer").click();
            cy.wait(1000);
            cy.get("div.css-1nmdiq5-menu").should("exist");
            cy.get("div#react-select-9-option-1").should("be.visible").click();
          });

        cy.get("button").contains("Create").click();
        cy.get("button:has(svg)").eq(0).click();
      });
    cy.checkAndCloseToastNotification("Duplicate branch address not allowed, found at pos [0]");
  });
});
