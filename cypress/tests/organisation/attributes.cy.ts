//@ts-nocheck
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

  it("displays the header nav and the h1", () => {
    cy.verifyHeaderNavAndTitle("Workspace", "Attributes");
  });

  it("displays the title, paragraph and tabs", () => {
    cy.get("h1").should("contain", "Attributes");
    cy.contains("p", "Collect as much data as you want from your team members or clients")
      .should("exist")
      .and("be.visible");
    cy.get('[data-testid="attr-tablist"]')
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
    cy.get('[data-testid="add-memberAttr"]').should("be.visible").and("not.be.disabled");

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

  it("validates title and attribute required fields in add branch form", () => {
    cy.get('[data-testid="add-memberAttr"]').click();

    cy.get("[data-testid='addAttr-modal']").within(() => {
      cy.get("button").contains("Create").click();
      cy.get("small").filter(':contains("Required")').should("have.length", 2);
    });
  });

  it("successfully adds attribute in modal", () => {
    cy.get('[data-testid="add-memberAttr"]').click();

    cy.get("[data-testid='addAttr-modal']").within(() => {
      cy.get("h2").should("contain.text", "Create Attribute");
      cy.get("[data-testid='close-btn']").should("be.visible").and("be.enabled");

      cy.get("label").should("contain.text", "Title");
      cy.get('input[name="title"]').clear().type("Nickname");

      cy.get("label").should("contain.text", "Attribute Type");
      cy.get("div.css-b62m3t-container")
        .eq(0)
        .within(() => {
          cy.get("div.css-1xc3v61-indicatorContainer").click();
          cy.wait(1000);
          cy.get("div.css-1nmdiq5-menu").should("exist");
          cy.get("div#react-select-3-option-1").should("be.visible").click();
        });
      cy.get("button").contains("Create").click();
      cy.get("[data-testid='close-btn']").click();
    });
    cy.checkAndCloseToastNotification("Company attribute created successfully");
  });

  it("throws error when invalid title is used to create", () => {
    cy.get('[data-testid="add-memberAttr"]').click();

    cy.get("[data-testid='addAttr-modal']").within(() => {
      cy.get('input[name="title"]').clear().type("Date Format");

      cy.get("label").should("contain.text", "Attribute Type");
      cy.get("div.css-b62m3t-container")
        .eq(0)
        .within(() => {
          cy.get("div.css-1xc3v61-indicatorContainer").click();
          cy.wait(1000);
          cy.get("div.css-1nmdiq5-menu").should("exist");
          cy.get("div#react-select-3-option-1").should("be.visible").click();
        });
      cy.get("button").contains("Create").click();
      cy.get("[data-testid='close-btn']").click();
    });
    cy.checkAndCloseToastNotification(`"label" contains an invalid value`);
  });

  it("displays the pagination component and triggers API call on limit change", () => {
    cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/org/attribute*", (req) => {
      req.continue((res) => {});
    }).as("fetchData");

    cy.get("[data-testid='pagination']").should("exist");
    cy.get("[data-testid='select-limit']").should("be.visible").click();

    cy.get("div.css-1nmdiq5-menu").should("exist");

    cy.get("div#react-select-3-option-1").should("be.visible").click();

    cy.wait("@fetchData").its("response.statusCode").should("eq", 200);

    cy.get("[data-testid='move-left']").should("be.visible");
    cy.get("[data-testid='move-right']").should("be.visible");
  });

  it("Duplicate attribute details successfully", () => {
    cy.get("[data-testid='menu-sysAttr']").eq(0).click();

    cy.get("[data-testid='duplicate-attr']").click();
    cy.get("[data-testid='addAttr-modal']").within(() => {
      cy.get('input[name="title"]').clear().type("Newone");
      cy.get("button").contains("Create").click();
      cy.get("[data-testid='close-btn']").click();
    });
    cy.checkAndCloseToastNotification("Company attribute created successfully");
  });

  it("Edit attribute details successfully", () => {
    cy.get("[data-testid='menu-memberAttr']").eq(0).click();

    cy.get("[data-testid='edit-attr']").click();
    cy.get("[data-testid='editAttr-modal']").within(() => {
      cy.get("h2").should("contain.text", "Edit Attribute");
      cy.get("[data-testid='close-btn']").should("be.visible").and("be.enabled");

      cy.get('input[name="title"]').clear().type("Editme");
      cy.get("button").contains("Create").click();
      cy.get("[data-testid='close-btn']").click();
    });
    cy.checkAndCloseToastNotification("Attribute updated successfully");
  });
  it("Archive attribute successfully", () => {
    cy.get("[data-testid='menu-memberAttr']").eq(0).click();

    cy.get("[data-testid='archive-attr']").click();

    cy.checkAndCloseToastNotification("Attribute archived successfully");
  });

  it("Restore attribute successfully", () => {
    cy.get("[data-testid='menu-archivedAttr']").eq(1).click();

    cy.get("[data-testid='restore-attr']").click();

    cy.checkAndCloseToastNotification("Attribute restored successfully");
  });
});
