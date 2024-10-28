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

    cy.visit("/settings/branch/667e5b66512d68b07bf41a7c");

    cy.url().should("include", "/settings/branch/667e5b66512d68b07bf41a7c");
  });

  it("Invite member modal when invite new member button is clicked", () => {
    cy.get('[data-testid="add-member"]').click();
    cy.get('[data-testid="invite-member"]').click();

    cy.get("[data-testid='invite-modal']").within(() => {
      cy.get("h2").should("contain.text", "Invite Member");
      cy.get('[data-testid="close-btn"]').should("be.visible").and("be.enabled");

      cy.get("label").should("contain.text", "Email address");
      cy.get('input[name="email"]').should("exist").and("not.be.disabled");

      cy.get("label").should("contain.text", "Team");
      cy.get("label").should("contain.text", "Role");

      cy.get("div.css-b62m3t-container").should("have.length", 2);

      cy.get("label").should("contain.text", "Job Title");
      cy.get('input[name="jobTitle"]').should("exist").and("not.be.disabled");

      cy.get("label").should("contain.text", "Invite another member");
      cy.get('button[role="checkbox"]').should("exist").and("not.be.disabled");

      cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");
      cy.get("button").contains("Send invitation").should("be.visible").and("be.enabled");
    });
  });

  it("closes invite member modal when cancel button is clicked", () => {
    cy.get('[data-testid="add-member"]').click();
    cy.get('[data-testid="invite-member"]').click();

    cy.get('[data-testid="close-btn"]').click();
    cy.get("[data-testid='invite-modal']").should("not.exist");
  });

  it("checks required fields in modal", () => {
    cy.get('[data-testid="add-member"]').click();
    cy.get('[data-testid="invite-member"]').click();

    cy.get("[data-testid='invite-modal']").within(() => {
      cy.get("button").contains("Send invitation").click();
      cy.get("small").filter(':contains("Required")').should("have.length", 3);
    });
  });

  it("successfully invites member with correct details", () => {
    cy.get('[data-testid="add-member"]').click();
    cy.get('[data-testid="invite-member"]').click();
    cy.get("[data-testid='invite-modal']").within(() => {
      cy.get('input[name="email"]').clear().type("changealways@email.com");

      cy.get("div.css-b62m3t-container")
        .eq(0)
        .within(() => {
          cy.get("div.css-1xc3v61-indicatorContainer").click();
          cy.wait(1000);
          cy.get("div.css-1nmdiq5-menu").should("exist");
          cy.get("div#react-select-7-option-0").should("be.visible").click();
        });

      cy.get("div.css-b62m3t-container")
        .eq(1)
        .within(() => {
          cy.get("div.css-1xc3v61-indicatorContainer").click();
          cy.wait(1000);
          cy.get("div.css-1nmdiq5-menu").should("exist");
          cy.get("div#react-select-9-option-0").should("be.visible").click();
        });

      cy.get('input[name="jobTitle"]').clear().type("Busboy");
      cy.get("button").contains("Send invitation").click();

      cy.get('[data-testid="close-btn"]').click();
    });
    cy.checkAndCloseToastNotification("Invite sent successfully");
  });

  it("throws error when inviting member that is already in the system", () => {
    cy.get('[data-testid="add-member"]').click();
    cy.get('[data-testid="invite-member"]').click();
    cy.get("[data-testid='invite-modal']").within(() => {
      cy.get('input[name="email"]').clear().type("ekeneikeokoro@gmail.com");

      cy.get("div.css-b62m3t-container")
        .eq(0)
        .within(() => {
          cy.get("div.css-1xc3v61-indicatorContainer").click();
          cy.wait(1000);
          cy.get("div.css-1nmdiq5-menu").should("exist");
          cy.get("div#react-select-7-option-0").should("be.visible").click();
        });

      cy.get("div.css-b62m3t-container")
        .eq(1)
        .within(() => {
          cy.get("div.css-1xc3v61-indicatorContainer").click();
          cy.wait(1000);
          cy.get("div.css-1nmdiq5-menu").should("exist");
          cy.get("div#react-select-9-option-0").should("be.visible").click();
        });

      cy.get('input[name="jobTitle"]').clear().type("Manager");
      cy.get("button").contains("Send invitation").click();

      cy.get('[data-testid="close-btn"]').click();
    });
    cy.checkAndCloseToastNotification(
      "ekeneikeokoro@gmail.com is a pending member of your organization"
    );
  });

  it("adds existing member successfully", () => {
    cy.get('[data-testid="add-member"]').click();
    cy.get('[data-testid="existing-member"]').click();

    cy.get('[data-testid="existing-members-modal"]').within(() => {
      cy.get('[data-testid="member-1"]').click();
      cy.get("button").contains("Add Selected Members").click();
    });
    cy.checkAndCloseToastNotification("Member added to branch successfully");
  });

  it("throws error when member is not part of a team", () => {
    cy.get('[data-testid="add-member"]').click();
    cy.get('[data-testid="existing-member"]').click();

    cy.get('[data-testid="existing-members-modal"]').within(() => {
      cy.get('[data-testid="member-0"]').click();
      cy.get("button").contains("Add Selected Members").click();
    });
    cy.checkAndCloseToastNotification(
      "You need to select a team in this branch for this user to join"
    );
  });
});
