//@ts-nocheck
describe("Organisation Profile", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.setCookie("vobbOSAccess", this.vobbOSAccess);
    cy.setCookie("vobbOSRefresh", this.vobbOSRefresh); 

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
    cy.get('[data-testid="avatar-section"]')
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
        cy.get('input[name="primaryNumber"]').clear();
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
        cy.get('input[name="secondaryNumber"]').clear();
        cy.get(".flag-dropdown").click();
        cy.get("ul")
          .should("be.visible")
          .within(() => {
            cy.get('li[data-country-code="ng"]').click();
          });
        cy.get('input[name="secondaryNumber"]').type("634 567 890 5");
      });
  });

  it("should have primary email and secondary email fields disabled", () => {
    cy.get('input[name="primaryEmail"]').should("be.disabled");
    cy.get('input[name="secondaryEmail"]').should("be.disabled");
  });

  it("should display correct btn text for email buttons and display modal", () => {
    cy.testAddEmailAddressModal('input[name="primaryEmail"]', '[data-testid="primary-emailBtn"]');
    cy.testAddEmailAddressModal(
      'input[name="secondaryEmail"]',
      '[data-testid="secondary-emailBtn"]'
    );
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

  it("should validate company name and website", () => {
    cy.checkRequiredFieldError("name", "save-btn");
    cy.checkRequiredFieldError("website", "save-btn");
    cy.get('input[name="website"]').clear().type("travelspace");
    cy.get("button").contains("Save").click();
    cy.contains("small", "Enter a valid url").should("exist");
  });

  it("should validate company sector", () => {
    cy.get(".css-1hy9hrv-control").within(() => {
      cy.get(".css-1xc3v61-indicatorContainer").eq(0).click();
    });
    cy.get("button").contains("Save").click();

    cy.contains("small", "At least one sector must be selected").should("exist");
  });

  it("should submit company website successfully", () => {
    cy.get('input[name="website"]').clear().type("https://tulips.ng");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Company profile saved sucessfully");
  });

  it("should submit company name successfully", () => {
    cy.get('input[name="name"]').clear().type("Tulips");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Company profile saved sucessfully");
  });

  it("should submit company sector successfully", () => {
    cy.get(".css-1hy9hrv-control").within(() => {
      cy.get(".css-1xc3v61-indicatorContainer").eq(1).click();
    });

    cy.get(".css-1nmdiq5-menu").should("exist");
    cy.get("div.css-1n6sfyn-MenuList").should("be.visible");
    cy.get("div#react-select-3-option-0").should("be.visible").click();

    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Company profile saved sucessfully");
  });

  it("should allow updating of primary number", () => {
    cy.get(".react-tel-input")
      .eq(0)
      .within(() => {
        cy.get('input[name="primaryNumber"]').clear();
        cy.get(".flag-dropdown").click();
        cy.get("ul")
          .should("be.visible")
          .within(() => {
            cy.get('li[data-country-code="ng"]').click();
          });
        cy.get('input[name="primaryNumber"]').type("708 283 684 6");
      });

    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Company profile saved sucessfully");
  });

  it("should allow updating of secondary number", () => {
    cy.get(".react-tel-input")
      .eq(1)
      .within(() => {
        cy.get('input[name="secondaryNumber"]').clear();
        cy.get(".flag-dropdown").click();
        cy.get("ul")
          .should("be.visible")
          .within(() => {
            cy.get('li[data-country-code="ng"]').click();
          });
        cy.get('input[name="secondaryNumber"]').type("706 991 081 8");
      });
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Company profile saved sucessfully");
  });

  it("should update primary email and display otp modal", () => {
    cy.get("[data-testid='primary-emailBtn']").click();
    cy.get("aside.fixed").find('input[name="email"]').clear().type("test4@example.com");
    cy.get("aside.fixed").find("button").contains("Continue").click();
    cy.get("aside.fixed").should("be.visible");
    cy.get("aside.fixed").find("h2").should("contain.text", "Verify Your Email");
    cy.get("aside.fixed")
      .find("p")
      .should(
        "contain.text",
        "We’ve sent a 6-character code to test4@example.com The code expires shortly, so please enter it soon."
      );

    cy.get('div[data-input-otp-container="true"]')
      .should("exist")
      .as("otpContainer")
      .children("div")
      .should("have.length", 8);
    cy.get('[role="separator"]').should("exist");
    cy.get("svg").should("exist");

    cy.get("aside.fixed")
      .find("button")
      .contains("Continue")
      .should("be.visible")
      .and("be.disabled");

    cy.get('input[data-input-otp="true"]').should("be.enabled");
    cy.get('input[data-input-otp="true"]').type("123456");
    cy.contains("button", "Continue").should("be.visible").and("not.be.disabled");
  });

  it("should update secondary email and display otp modal", () => {
    cy.get("[data-testid='secondary-emailBtn']").click();
    cy.get("aside.fixed").find('input[name="email"]').clear().type("test3@example.com");
    cy.get("aside.fixed").find("button").contains("Continue").click();
    cy.get("aside.fixed").should("be.visible");
    cy.get("aside.fixed").find("h2").should("contain.text", "Verify Your Email");
    cy.get("aside.fixed")
      .find("p")
      .should(
        "contain.text",
        "We’ve sent a 6-character code to test3@example.com The code expires shortly, so please enter it soon."
      );

    cy.get('div[data-input-otp-container="true"]')
      .should("exist")
      .as("otpContainer")
      .children("div")
      .should("have.length", 8);
    cy.get('[role="separator"]').should("exist");
    cy.get("svg").should("exist");

    cy.get("aside.fixed")
      .find("button")
      .contains("Continue")
      .should("be.visible")
      .and("be.disabled");

    cy.get('input[data-input-otp="true"]').should("be.enabled");
    cy.get('input[data-input-otp="true"]').type("123456");
    cy.contains("button", "Continue").should("be.visible").and("not.be.disabled");
  });

  it("should throw an error if invalid primary number is submitted", () => {
    cy.get(".react-tel-input input").eq(0).clear().type("9 174 564 512 6");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification(`"phone_number" contains an invalid value`);
  });

  it("should throw an error if invalid secondary number is submitted", () => {
    cy.get(".react-tel-input input").eq(1).clear().type("4 634 567 890 9");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification(`"phone_number" contains an invalid value`);
  });
});
