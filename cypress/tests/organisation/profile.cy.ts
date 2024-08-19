//@ts-nocheck
describe("Organisation Profile", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });

    cy.visit("/settings/organisation");
    cy.url().should("include", "/settings/organisation");
  });

  it("displays the profile header nav and h1", () => {
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
                cy.get("li").eq(2).should("contain", "Organization");
              });
          });
      });
    cy.get("h1").should("contain", "Organization Profile");
  });

  it("displays the upload avatar section", () => {
    cy.get('[data-cy="avatar-section"]')
      .should("exist")
      .within(() => {
        cy.get("span")
          .first()
          .then(($span) => {
            if ($span.find("img").length) {
              cy.get("img").should("exist");
            } else {
              cy.get("span").eq(1).should("have.text", "Tu");
            }
          });

        cy.get("div").within(() => {
          cy.get("p").first().should("contain", "Logo");

          cy.get("label")
            .should("exist")
            .within(() => {
              cy.get("svg").should("exist");
              cy.get("span").should("contain", "Upload image");
              cy.get('input[type="file"]').should("exist");
            });

          cy.get("p").eq(1).should("contain", "We support PNGs and JPEGs under 10MB");
        });
      });
  });

  it("should display all form fields with correct labels", () => {
    cy.get("label").contains("Company Name").should("be.visible");
    cy.get("label").contains("Company Website").should("be.visible");
    cy.get("label").contains("Sectors").should("be.visible");
    cy.get("label").contains("Primary Phone Number").should("be.visible");
    cy.get("label").contains("Secondary Phone Number").should("be.visible");
    cy.get("label").contains("Primary Email Address").should("be.visible");

    cy.get("label").contains("Secondary Email Address").should("be.visible");
  });

  it("should allow typing in Company Name and Company website fields", () => {
    cy.get('input[name="name"]').clear().type("Turound");
    cy.get('input[name="website"]').clear().type("https://travelspace.ng");
  });

  it("should allow selection and typing of phone numbers with country code", () => {
    cy.get(".react-tel-input")
      .eq(0)
      .within(() => {
        cy.get(".flag-dropdown").click();
        cy.get("ul")
          .should("be.visible")
          .within(() => {
            cy.get('li[data-country-code="ng"]').click();
          });
        cy.get('input[name="primaryNumber"]').type("634 567 890 9");
      });

    cy.get(".react-tel-input")
      .eq(1)
      .within(() => {
        cy.get(".flag-dropdown").click();
        cy.get("ul")
          .should("be.visible")
          .within(() => {
            cy.get('li[data-country-code="ng"]').click();
          });
        cy.get('input[name="primaryNumber"]').type("634 567 890 5");
      });
  });

  it("should have primary email and secondary email fields disabled", () => {
    cy.get('input[name="primaryEmail"]').should("be.disabled");
    cy.get('input[name="secondaryEmail"]').should("be.disabled");
  });

  it("should display correct btn text for email buttons and display modal", () => {
    cy.testAddEmailAddressModal('input[name="primaryEmail"]', '[data-cy="primary-emailBtn"]');
    cy.testAddEmailAddressModal('input[name="secondaryEmail"]', '[data-cy="secondary-emailBtn"]');
  });

  it('should disable the "Save" and "Cancel" button when the form is not dirty', () => {
    cy.get("button").contains("Save").should("be.visible").and("not.be.enabled");
    cy.get("button").contains("Cancel").should("be.visible").and("not.be.enabled");
  });

  it('should enable the "Save" and "Cancel" button when the form is dirty', () => {
    cy.get('input[name="name"]').clear().type("Tutounder", { delay: 0 });
    cy.get("button").contains("Save").should("not.be.disabled");
    cy.get("button").contains("Cancel").should("not.be.disabled");
  });
});
