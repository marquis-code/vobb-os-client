//@ts-nocheck
describe("Organisation teams", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/settings/teams");
    cy.url().should("include", "/settings/teams");
  });

  it("displays the header nav and the h1", () => {
    cy.verifyHeaderNavAndTitle("Workspace", "Teams");
  });

  it("displays the filter component", () => {
    cy.get('[aria-haspopup="dialog"]').should("exist").and("not.be.disabled");
    cy.get('[aria-haspopup="dialog"]').click();
    cy.get("[data-radix-popper-content-wrapper]").should("exist");
  });

  it("displays the add team button", () => {
    cy.get('[data-testid="add-team"]').should("be.visible").and("not.be.disabled");
  });

  it("displays add team table headers", () => {
    cy.get("table.w-full.caption-bottom.text-sm").within(() => {
      cy.get("thead").should("exist");
      cy.get("tbody").should("exist");

      cy.get("thead tr").within(() => {
        cy.get("th").should("have.length", 7);

        cy.get("th").eq(0).should("have.text", "Name");
        cy.get("th").eq(1).should("have.text", "Team Manager(s)");
        cy.get("th").eq(2).should("have.text", "Team Lead(s)");
        cy.get("th").eq(3).should("have.text", "Branches");
        cy.get("th").eq(4).should("have.text", "Members");
        cy.get("th").eq(5).should("have.text", "Date added");
        cy.get("th").eq(6).should("have.text", "");
      });
    });
  });

  it("displays the pagination component and triggers API call on limit change", () => {
    cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/teams/all*", (req) => {
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

  it("displays add team modal when button is clicked", () => {
    cy.get("[data-testid='add-team']").click();

    cy.get("[data-testid='addTeam-modal']").within(() => {
      cy.get("h2").should("contain.text", "Create New Team");
      cy.get("[data-testid='close-btn']").should("be.visible").and("be.enabled");

      cy.get("div.reactIconsPickerContainer").should("exist");

      cy.get("label").should("contain.text", "Team Name");
      cy.get('input[name="name"]').should("exist").and("not.be.disabled");

      cy.get("label").should("contain.text", "Description (optional)");
      cy.get('textarea[name="description"]').should("exist").and("not.be.disabled");

      cy.get("label").should("contain.text", "Automatically add me to the team");
      cy.get('input[type="checkbox"]').eq(0).should("exist").and("not.be.disabled");

      cy.get("label").should("contain.text", "Automatically add the team to every branch");
      cy.get('input[type="checkbox"]').eq(1).should("exist").and("not.be.disabled");

      cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");
      cy.get("button").contains("Create").should("be.visible").and("be.enabled");
    });
  });

  it("closes add team modal when cancel button is clicked", () => {
    cy.get('[data-testid="close-btn"]').click();
    cy.get("[data-testid='addTeam-modal']").should("not.exist");
  });

  it("validates required fields, icon and name, in add team modal", () => {
    cy.get('[data-testid="add-team"]').click();

    cy.get("[data-testid='addTeam-modal']").within(() => {
      cy.get('input[name="name"]').clear().type("Newman team");
      cy.get("button").contains("Create").click();
      cy.get("small").filter(':contains("Required")').should("have.length", 1);

      cy.get('input[name="name"]').clear();
      cy.get("button").contains("Create").click();
      cy.get("small").filter(':contains("Required")').should("have.length", 2);
    });
  });

  it("submits form and successfully initiates team creation when all details are correct", () => {
    cy.get('[data-testid="add-team"]').click();

    cy.get("[data-testid='addTeam-modal']").within(() => {
      cy.get("div.reactIconsPickerContainer").within(() => {
        cy.get("div.pickButton").click();
        cy.get("div.modalFade").within(() => {
          cy.get("input.searchInput").type("media{enter}");
        });
        cy.get("div.modalIcons").eq(2).click();
      });

      cy.get('input[name="name"]').clear().type("Media 2");
      cy.get('textarea[name="description"]').clear().type("Media content management");

      cy.get('input[type="checkbox"]').eq(0).uncheck({ force: true });
      cy.get('input[type="checkbox"]').eq(1).uncheck({ force: true });

      cy.get("button").contains("Create").click();

      cy.get("h2").should("contain.text", "Set Team Permissions");
      cy.get("[data-testid='close-btn']").click();
    });
    cy.checkAndCloseToastNotification("Proceed to define permissions for team roles");
  });

  it("throws error when team name already exists in the system", () => {
    cy.get('[data-testid="add-team"]').click();

    cy.get("[data-testid='addTeam-modal']").within(() => {
      cy.get("div.reactIconsPickerContainer").within(() => {
        cy.get("div.pickButton").click();
        cy.get("div.modalFade").within(() => {
          cy.get("input.searchInput").type("light{enter}");
        });
        cy.get("div.modalIcons").eq(0).click();
      });

      cy.get('input[name="name"]').clear().type("Newman team");
      cy.get('textarea[name="description"]').clear().type("Talent team arm of organisation");

      cy.get('input[type="checkbox"]').eq(0).check({ force: true });
      cy.get('input[type="checkbox"]').eq(1).check({ force: true });

      cy.get("button").contains("Create").click();
      cy.get("[data-testid='close-btn']").eq(0).click();
    });
    cy.checkAndCloseToastNotification("This team already exists in your company");
  });

  it("displays actions options for a team", () => {
    cy.get("[data-testid='menu-team']").eq(0).click();
    cy.get("div").contains("Actions").should("exist");

    cy.get("[data-testid='edit-team']")
      .contains("Edit team")
      .within(() => {
        cy.get("svg").should("exist");
      });
    cy.get("[data-testid='view-team']")
      .contains("View team")
      .within(() => {
        cy.get("svg").should("exist");
      });
    cy.get("[data-testid='team-history']")
      .contains("View team history")
      .within(() => {
        cy.get("svg").should("exist");
      });
  });

  it("Edits team details", () => {
    cy.get("[data-testid='menu-team']").eq(0).click();

    cy.get("[data-testid='edit-team']").click();
    cy.get("[data-testid='editTeam-modal']").within(() => {
      cy.get("h2").should("contain.text", "Edit Team");
      cy.get("[data-testid='close-btn']").should("be.visible").and("be.enabled");
      cy.wait(1000);

      cy.get("div.reactIconsPickerContainer").within(() => {
        cy.get("div.pickButton").click();
        cy.get("div.modalFade").within(() => {
          cy.get("input.searchInput").type("sun{enter}");
        });
        cy.get("div.modalIcons").eq(0).click();
      });

      cy.get('input[name="name"]').clear().type("Sunshine Delight");
      cy.get('textarea[name="description"]').clear().type("FUn team arm of organisation");

      cy.get('input[type="checkbox"]').eq(0).check({ force: true });

      cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");
      cy.get("button").contains("Save").click();
      cy.get("[data-testid='close-btn']").click();
    });
    cy.checkAndCloseToastNotification("Team details updated successfully");
  });

  it("view team button leads to team's page", () => {
    cy.get("[data-testid='menu-team']").eq(0).click();
    cy.get("[data-testid='view-team']").click();
    cy.url().should("match", /http:\/\/localhost:3000\/teams\/[a-zA-Z0-9]+$/);
  });
});
