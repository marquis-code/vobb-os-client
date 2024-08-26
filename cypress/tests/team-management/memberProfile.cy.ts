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
    cy.visit("/members/6673e51f01d00acae3b83475/activity");
    cy.url().should("include", "/members/6673e51f01d00acae3b83475/activity");
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
                cy.get("li").should("have.length", 4);

                cy.get("li").eq(0).should("contain", "Workspace");
                cy.get("li").eq(1).find("svg").should("exist");
                cy.get("a").should("contain", "Members");
                cy.get("li").eq(2).find("svg").should("exist");
                cy.get("li").eq(3).should("contain", "Member");
              });
          });
      });
  });

  it("displays the avatar section", () => {
    cy.get('[data-cy="avatar-section"]')
      .should("exist")
      .within(() => {
        cy.get("span")
          .first()
          .then(($span) => {
            if ($span.find("img").length) {
              cy.get("img").should("exist");
            }
          });

        cy.get("div")
          .eq(0)
          .within(() => {
            cy.get("p").should("have.length", 2);
          });

        cy.get("div")
          .eq(1)
          .within(() => {
            cy.get("button").click();
          });
      });
    cy.get('div[role="menuitem"]').eq(0).contains("Change role").should("exist");
    cy.get('div[role="menuitem"]').eq(1).contains("Change team").should("exist");
    cy.get('div[role="menuitem"]').eq(2).contains("Change branch").should("exist");
    cy.get('div[role="menuitem"]').eq(3).contains("Compose email").should("exist");
    cy.get('div[role="menuitem"]').eq(4).contains("Suspend account").should("exist");
  });

  it("displays the tabs section showing job title and role", () => {
    cy.get('[data-cy="tabs-section"]')
      .should("exist")
      .within(() => {
        cy.get("button").should("have.length", 2);
      });
  });

  it("displays the profile tabs and ensures they're clickable", () => {
    cy.get('[data-cy="tabs-section2"]')
      .should("exist")
      .within(() => {
        cy.get("div")
          .first()
          .within(() => {
            cy.get("button")
              .contains("Activity")
              .within(() => {
                cy.get("svg").should("exist");
              })
              .should("be.visible")
              .and("not.be.disabled");
            cy.get("button")
              .contains("Emails")
              .within(() => {
                cy.get("svg").should("exist");
              })
              .should("be.visible")
              .and("not.be.disabled");
            cy.get("button")
              .contains("Assigned Clients")
              .within(() => {
                cy.get("svg").should("exist");
              })
              .should("be.visible")
              .and("not.be.disabled");
            cy.get("button")
              .contains("Tasks")
              .within(() => {
                cy.get("svg").should("exist");
              })
              .should("be.visible")
              .and("not.be.disabled");
            cy.get("button")
              .contains("Notes")
              .within(() => {
                cy.get("svg").should("exist");
              })
              .should("be.visible")
              .and("not.be.disabled");
            cy.get("button")
              .contains("Files")
              .within(() => {
                cy.get("svg").should("exist");
              })
              .should("be.visible")
              .and("not.be.disabled");
          });
        cy.get("div")
          .last()
          .within(() => {
            cy.get("button")
              .contains("Details")
              .within(() => {
                cy.get("svg").should("exist");
              })
              .should("be.visible")
              .and("not.be.disabled");
            cy.get("button")
              .contains("Comments")
              .within(() => {
                cy.get("svg").should("exist");
              })
              .should("be.visible")
              .and("not.be.disabled");
          });
      });
  });

  it("displays member details", () => {
    cy.get('[data-cy="member-details"]')
      .should("exist")
      .within(() => {
        cy.get("p").first().should("contain", "Member Details");

        cy.get("label").contains("First name").should("exist");
        cy.get('input[name="firstName"]').should("exist").and("not.be.disabled");

        cy.get("label").contains("Last name").should("exist");
        cy.get('input[name="lastName"]').should("exist").and("not.be.disabled");

        cy.get("label").contains("Email address").should("exist");
        cy.get('input[name="email"]').should("exist").and("not.be.disabled");

        cy.get("label").contains("Phone number").should("exist");
        cy.get('input[name="phoneNumber"]').should("exist").and("not.be.disabled");
      });

    cy.get("label").contains("Avatar").should("exist");
    cy.get('input[type="file"]').should("not.be.visible");

    cy.get("label").contains("System Language").should("exist");

    cy.get("label").contains("Timezone").should("exist");

    cy.get("label").contains("Date format").should("exist");
    cy.get("div.css-1pyxht1-control").should("have.length", 3);

    cy.get("label").contains("Job Title").should("exist");
    cy.get('input[name="jobTitle"]').should("exist").and("not.be.disabled");
  });

  it("updates member details after a second on edit", () => {
    cy.get('input[name="firstName"]').clear().type("Poseph");
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Success");

    cy.get('input[name="lastName"]').clear().type("Dewbottom");
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Success");

    cy.get('input[name="jobTitle"]').clear().type("Overseer");
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Success");
  });

  it("updates member email after a second on edit", () => {
    cy.get('input[name="email"]').clear().type("tezt@example.com");
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Verification code has been sent to tezt@example.com");
  });
});
