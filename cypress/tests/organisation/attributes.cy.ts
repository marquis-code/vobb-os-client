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

    cy.fixture("attributesMock").then((attributesMock) => {
      cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/org/attribute*", {
        statusCode: 200,
        body: attributesMock
      }).as("getAttributes");
    });

    cy.visit("/settings/attributes");

    cy.wait("@getAttributes");

    cy.url().should("include", "/settings/attributes");
  });

  it("should toggle between Team member attributes and Client attributes tabs", () => {
    cy.get('[data-testid="attr-tablist"]').within(() => {
      cy.contains("Team member attributes").click();
      cy.contains("button", "Team member attributes").should("have.attr", "data-state", "active");
      cy.contains("button", "Client attributes").should("not.have.attr", "data-state", "active");

      cy.contains("Client attributes").click();
      cy.contains("button", "Client attributes").should("have.attr", "data-state", "active");
      cy.contains("button", "Team member attributes").should(
        "not.have.attr",
        "data-state",
        "active"
      );
    });
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
          cy.get("div#react-select-7-option-1").should("be.visible").click();
        });
      cy.get("button").contains("Create").click();
      cy.get("[data-testid='close-btn']").click();
    });
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
          cy.get("div#react-select-7-option-1").should("be.visible").click();
        });
      cy.get("button").contains("Create").click();
      cy.get("[data-testid='close-btn']").click();
    });
  });

  it("should paginate attributes correctly", () => {
    cy.get('[data-testid="page-info"]').should("contain.text", "1 - 20 of 30 items");

    // cy.get('[data-testid="next-page"]').click();
    // cy.get('[data-testid="page-info"]').should("contain.text", "11 - 20 of 30 items");

    // cy.get('[data-testid="next-page"]').click();
    // cy.get('[data-testid="page-info"]').should("contain.text", "21 - 30 of 30 items");

    cy.get("table tbody tr").should("have.length", 10);

    // cy.get('[data-testid="prev-page"]').click();
    // cy.get('[data-testid="page-info"]').should("contain.text", "11 - 20 of 30 items");
  });

  it("triggers API call on pagination limit change", () => {
    cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/org/attribute*", (req) => {
      req.continue((res) => {});
    }).as("fetchData");

    cy.get("[data-testid='pagination']").should("exist");
    cy.get("[data-testid='select-limit']").should("be.visible").click();

    cy.get("div.css-1nmdiq5-menu").should("exist");

    cy.get("div#react-select-5-option-1").should("be.visible").click();

    cy.wait("@fetchData").its("response.statusCode").should("eq", 200);
  });

  it("Duplicate attribute details successfully", () => {
    cy.get("[data-testid='menu-sysAttr']").eq(0).click();

    cy.get("[data-testid='duplicate-attr']").click();
    cy.get("[data-testid='addAttr-modal']").within(() => {
      cy.get('input[name="title"]').clear().type("Newone");
      cy.get("button").contains("Create").click();
      cy.get("[data-testid='close-btn']").click();
    });
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
