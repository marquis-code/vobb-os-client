//@ts-nocheck
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
    cy.verifyHeaderNavAndTitle("Workspace", "Branches");
  });

  it("displays add branch modal when button is clicked", () => {
    cy.get('[data-testid="add-branch"]').click();

    cy.get("[data-testid='addBranch-modal']").within(() => {
      cy.get("h2").should("contain.text", "Create New Branch");
      cy.get("[data-testid='close-btn']").should("be.visible").and("be.enabled");

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
    cy.get('[data-testid="add-branch"]').click();

    cy.get("[data-testid='addBranch-modal']").within(() => {
      cy.get('input[name="name"]').type("menco").clear();
      cy.get("button").contains("Create").click();
      cy.get("small").filter(':contains("Required")').should("have.length", 7);
    });
  });

  it("successfully adds new branch with correct details", () => {
    cy.get('[data-testid="add-branch"]').click();

    cy.get("[data-testid='addBranch-modal']").within(() => {
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
      cy.get("[data-testid='close-btn']").click();
    });
    cy.checkAndCloseToastNotification("1 branch created");
  });

  it("Throws error when there is existing branch with name", () => {
    cy.get('[data-testid="add-branch"]').click();

    cy.get("[data-testid='addBranch-modal']").within(() => {
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
      cy.get("[data-testid='close-btn']").click();
    });
    cy.checkAndCloseToastNotification("Duplicate branch address not allowed, found at pos [0]");
  });

  it("closes add branch modal when cancel button is clicked", () => {
    cy.get("[data-testid='add-branch']").click(); //open modal

    cy.get('[data-testid="close-btn"]').click();
    cy.get("[data-testid='addBranch-modal']").should("not.exist");
  });

  it("displays the pagination component and triggers API call on limit change", () => {
    cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/settings/org/branch*", (req) => {
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

  it("Edits branch details", () => {
    cy.get("[data-testid='menu-branch']").eq(1).click();

    cy.get("[data-testid='edit-branch']").click();
    cy.get("[data-testid='editBranch-modal']").within(() => {
      cy.get("h2").should("contain.text", "Edit Branch");
      cy.get('input[name="name"]').clear().type("Eskimo");
      cy.get('input[name="state"]').clear().type("Ekiti");

      cy.get("button").contains("Create").click();
      cy.get("[data-testid='close-btn']").click();
    });
    cy.checkAndCloseToastNotification("Company branch saved successfully");
  });

  it("view branch button leads to branch's page", () => {
    cy.get("[data-testid='menu-branch']").eq(0).click();
    cy.get("[data-testid='view-branch']").click();
    cy.url().should("match", /http:\/\/localhost:3000\/branch\/[a-zA-Z0-9]+$/);
  });

  it("Mark branch as primary", () => {
    cy.get("[data-testid='menu-branch']").eq(0).click();
    cy.get("[data-testid='mark-primary']").click();
    cy.checkAndCloseToastNotification("Escrow set as primary branch");
  });
});
