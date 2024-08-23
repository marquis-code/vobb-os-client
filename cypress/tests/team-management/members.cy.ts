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

  it("displays invite member modal when button is clicked", () => {
    cy.get('[data-cy="invite-member"]').click();

    cy.get("aside.fixed")
      .eq(1)
      .within(() => {
        cy.get("h2").should("contain.text", "Invite Member");
        cy.get("button:has(svg)").should("be.visible").and("be.enabled");

        cy.get("label").should("contain.text", "Email address");
        cy.get('input[name="email"]').should("exist").and("not.be.disabled");

        cy.get("label").should("contain.text", "Branch");
        cy.get("label").should("contain.text", "Team");
        cy.get("label").should("contain.text", "Role");

        cy.get("div.css-b62m3t-container")
          .should("have.length", 3)
          .each(($el) => {
            cy.wrap($el).within(() => {
              cy.get("div.css-qbdosj-Input").should("exist");
              cy.get("div.css-1xc3v61-indicatorContainer").should("exist");
            });
          });

        cy.get("label").should("contain.text", "Job Title");
        cy.get('input[name="jobTitle"]').should("exist").and("not.be.disabled");

        cy.get("label").should("contain.text", "Invite another member");
        cy.get('button[role="checkbox"]').should("exist").and("not.be.disabled");

        cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");
        cy.get("button").contains("Send invitation").should("be.visible").and("be.enabled");

        cy.get("button:has(svg)").click();
      });
  });

  it("checks required fields, icon and name, in modal", () => {
    cy.get('[data-cy="invite-member"]').click();

    cy.get("aside.fixed")
      .eq(1)
      .within(() => {
        cy.get("button").contains("Send invitation").click();
        cy.get("small").filter(':contains("Required")').should("have.length", 3);
      });
  });

  it("successfully invites member with correct details", () => {
    cy.get('[data-cy="invite-member"]').click();

    cy.get("aside.fixed")
      .eq(1)
      .within(() => {
        cy.get('input[name="email"]').clear().type("testing@email.com");

        cy.get("div.css-b62m3t-container")
          .eq(0)
          .within(() => {
            cy.get("div.css-1xc3v61-indicatorContainer").click();
            cy.wait(1000);
            cy.get("div.css-1nmdiq5-menu").should("exist");
            cy.get("div#react-select-5-option-0").should("be.visible").click();
          });
        cy.get("div.css-b62m3t-container")
          .eq(1)
          .within(() => {
            cy.get("div.css-1xc3v61-indicatorContainer").click();
            cy.wait(1000);
            cy.get("div.css-1nmdiq5-menu").should("exist");
            cy.get("div#react-select-7-option-0").should("be.visible").click();
          });

        cy.get("div.css-b62m3t-container")
          .eq(2)
          .within(() => {
            cy.get("div.css-1xc3v61-indicatorContainer").click();
            cy.wait(1000);
            cy.get("div.css-1nmdiq5-menu").should("exist");
            cy.get("div#react-select-9-option-0").should("be.visible").click();
          });

        cy.get('input[name="jobTitle"]').clear().type("Busboy");
        cy.get("button").contains("Send invitation").click();

        cy.get("button:has(svg)").eq(0).click();
      });
    cy.checkAndCloseToastNotification("Invite sent successfully");
  });

  it("throws error when inviting member that is already in the system", () => {
    cy.get('[data-cy="invite-member"]').click();

    cy.get("aside.fixed")
      .eq(1)
      .within(() => {
        cy.get('input[name="email"]').clear().type("ekeneikeokoro@gmail.com");

        cy.get("div.css-b62m3t-container")
          .eq(0)
          .within(() => {
            cy.get("div.css-1xc3v61-indicatorContainer").click();
            cy.wait(1000);
            cy.get("div.css-1nmdiq5-menu").should("exist");
            cy.get("div#react-select-5-option-0").should("be.visible").click();
          });
        cy.get("div.css-b62m3t-container")
          .eq(1)
          .within(() => {
            cy.get("div.css-1xc3v61-indicatorContainer").click();
            cy.wait(1000);
            cy.get("div.css-1nmdiq5-menu").should("exist");
            cy.get("div#react-select-7-option-0").should("be.visible").click();
          });

        cy.get("div.css-b62m3t-container")
          .eq(2)
          .within(() => {
            cy.get("div.css-1xc3v61-indicatorContainer").click();
            cy.wait(1000);
            cy.get("div.css-1nmdiq5-menu").should("exist");
            cy.get("div#react-select-9-option-1").should("be.visible").click();
          });

        cy.get('input[name="jobTitle"]').clear().type("Management personnel");
        cy.get("button").contains("Send invitation").click();

        cy.get("button:has(svg)").eq(0).click();
      });

    cy.checkAndCloseToastNotification(
      "An account with this ekeneikeokoro@gmail.com exists already"
    );
  });
});
