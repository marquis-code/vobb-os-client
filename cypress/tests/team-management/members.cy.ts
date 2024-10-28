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
    cy.verifyHeaderNavAndTitle("Workspace", "Members");
  });

  it("displays the filter component", () => {
    cy.get('[aria-haspopup="dialog"]').should("exist").and("not.be.disabled");
    cy.get('[aria-haspopup="dialog"]').click();
    cy.get("[data-radix-popper-content-wrapper]").should("exist");
  });

  it("displays the invite member button", () => {
    cy.get('[data-testid="invite-member"]').should("be.visible").and("not.be.disabled");
  });

  it("displays the member table", () => {
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
  });

  it("displays the pagination component and triggers API call on limit change", () => {
    cy.intercept("GET", "https://os-stg-api.vobb.io/api/v1/org/members*", (req) => {
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

  it("displays invite member modal when button is clicked", () => {
    cy.get('[data-testid="invite-member"]').click();

    cy.get("[data-testid='invite-modal']").within(() => {
      cy.get("h2").should("contain.text", "Invite Member");
      cy.get('[data-testid="close-btn"]').should("be.visible").and("be.enabled");

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
    });
  });

  it("closes invite member modal when cancel button is clicked", () => {
    cy.get('[data-testid="close-btn"]').click();
    cy.get("[data-testid='invite-modal']").should("not.exist");
  });

  it("checks required fields, icon and name, in modal", () => {
    cy.get('[data-testid="invite-member"]').click();

    cy.get("[data-testid='invite-modal']").within(() => {
      cy.get("button").contains("Send invitation").click();
      cy.get("small").filter(':contains("Required")').should("have.length", 3);
    });
  });

  it("successfully invites member with correct details", () => {
    cy.get('[data-testid="invite-member"]').click();

    cy.get("[data-testid='invite-modal']").within(() => {
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

      cy.get('[data-testid="close-btn"]').click();
    });
    cy.checkAndCloseToastNotification("Invite sent successfully");
  });

  it("throws error when inviting member that is already in the system", () => {
    cy.get('[data-testid="invite-member"]').click();

    cy.get("[data-testid='invite-modal']").within(() => {
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

      cy.get('[data-testid="close-btn"]').click();
    });

    cy.checkAndCloseToastNotification(
      "An account with this ekeneikeokoro@gmail.com exists already"
    );
  });

  it("Resends invitation", () => {
    cy.get("[data-testid='menu-inactiveUser']").eq(0).click();
    cy.get("div").contains("Actions").should("exist");
    cy.get("[data-testid='cancel-invite']")
      .contains("Cancel invitation")
      .within(() => {
        cy.get("svg").should("exist");
      });
    cy.get("[data-testid='resend-invite']").contains("Resend invitation").click();

    cy.get("[data-testid='confirm-modal']").within(() => {
      cy.get("h2").should("contain.text", "Confirm Action");
      cy.get("button:has(svg)").should("be.visible").and("be.enabled");

      cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");
      cy.get("button").contains("Continue").should("be.visible").click();
      cy.get('[data-testid="close-btn"]').click();
    });
    cy.checkAndCloseToastNotification("Invite resent successfully");
  });

  it("Cancels invitation", () => {
    cy.get("[data-testid='menu-inactiveUser']").eq(1).click();
    cy.get("div").contains("Actions").should("exist");
    cy.get("[data-testid='resend-invite']")
      .contains("Resend invitation")
      .within(() => {
        cy.get("svg").should("exist");
      });
    cy.get("[data-testid='cancel-invite']").contains("Cancel invitation").click();

    cy.get("[data-testid='confirm-modal']").within(() => {
      cy.get("h2").should("contain.text", "Confirm Action");
      cy.get("button:has(svg)").should("be.visible").and("be.enabled");

      cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");
      cy.get("button").contains("Continue").should("be.visible").click();
      cy.get('[data-testid="close-btn"]').click();
    });
    cy.checkAndCloseToastNotification("Invite cancelled successfully");
  });

  it("displays actions options for active user", () => {
    cy.get("[data-testid='menu-activeUser']").eq(0).click();

    cy.get("div").contains("Actions").should("exist");
    cy.get("[data-testid='view-member']")
      .contains("View member")
      .within(() => {
        cy.get("svg").should("exist");
      });
    cy.get("[data-testid='change-role']")
      .contains("Change role")
      .within(() => {
        cy.get("svg").should("exist");
      });
    cy.get("[data-testid='suspend-member']")
      .contains("Suspend member")
      .within(() => {
        cy.get("svg").should("exist");
      });
  });

  it("displays change role modal for active user", () => {
    cy.get("[data-testid='menu-activeUser']").click();
    cy.get("[data-testid='change-role']").contains("Change role").click();

    cy.get("[data-testid='changeRole-modal']").within(() => {
      cy.get("[data-testid='close-btn']").should("be.visible").and("be.enabled");

      cy.get("label").should("contain.text", "Select role");
      cy.get("div.css-b62m3t-container").should("exist");

      cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");
      cy.get("button").contains("Save").should("be.visible").and("be.enabled");
      cy.get("[data-testid='close-btn']").click();
    });
  });

  it("displays suspend member modal for active user", () => {
    cy.get("[data-testid='menu-activeUser']").click();
    cy.get("[data-testid='suspend-member']").contains("Suspend member").click();

    cy.get("[data-testid='suspendMember-modal']").within(() => {
      cy.get("[data-testid='close-btn']").should("be.visible").and("be.enabled");

      cy.get("p")
        .contains(
          "You can select a start and end date to temporarily suspend an account, or choose indefinite suspension to deactivate an account."
        )
        .should("exist");

      cy.get("label").should("contain.text", "Reason (optional)");
      cy.get("textarea[name='reason']").should("be.visible").and("be.enabled");

      cy.get("label").should("contain.text", "From");
      cy.get("label").should("contain.text", "To");
      cy.get("span").filter(':contains("Pick a date")').should("have.length", 2);

      cy.get("label").should("contain.text", "Indefinite suspension");
      cy.get("button[role='checkbox']").should("exist");

      cy.get("p")
        .contains(
          "NB: These actions are reversible so the accounts will still be visible on your dashboard if you need to restore them"
        )
        .should("exist");

      cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");
      cy.get("button").contains("Suspend account").should("be.visible").and("be.enabled");
      cy.get('[data-testid="close-btn"]').click();
    });
  });

  it("view member button for active user leads to member's page", () => {
    cy.get("[data-testid='menu-activeUser']").eq(0).click();
    cy.get("[data-testid='view-member']").click();
    cy.url().should("match", /\/members\/[a-zA-Z0-9]+\/activity$/);
  });
});
