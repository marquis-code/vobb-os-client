//@ts-nocheck
describe("Account Profile", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });

    cy.visit("/settings/profile");
    cy.url().should("include", "/settings/profile");
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

                cy.get("li").eq(0).should("contain", "Account");
                cy.get("li").eq(1).find("svg").should("exist");
                cy.get("li").eq(2).should("contain", "Profile");
              });
          });
      });
    cy.get("h1").should("contain", "Profile");
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
              cy.get("span").eq(1).should("contain", "PD");
            }
          });

        cy.get("div").within(() => {
          cy.get("p").first().should("contain", "Profile Picture");

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
    cy.get("label").contains("First Name").should("be.visible");
    cy.get("label").contains("Last Name").should("be.visible");
    cy.get("label").contains("Phone Number").should("be.visible");
    cy.get("label").contains("Job Title").should("be.visible");
    cy.get("label").contains("Primary Email Address").should("be.visible");
  });

  it("should allow typing in First Name and Last Name fields", () => {
    cy.get('input[name="firstName"]').type("Poseph");
    cy.get('input[name="lastName"]').type("Dewbottom");
  });

  it("should allow entering a phone number", () => {
    cy.get(".react-tel-input input").type("034 567 890 1");
  });

  it("should have Job Title and Email fields disabled", () => {
    cy.get('input[name="jobTitle"]').should("be.disabled");
    cy.get('input[name="email"]').should("be.disabled");
  });

  it("should display the correct tooltip for the email status icon", () => {
    cy.get('[data-testid="tooltip-trigger"]').trigger("mouseover");

    cy.get('[data-testid="tooltip-content"]', { timeout: 10000 })
      .should("be.visible")
      .then(($tooltip) => {
        if ($tooltip.text().includes("Email is verified!")) {
          cy.get('[data-testid="tooltip-content"]').should("contain.text", "Email is verified!");
        } else if ($tooltip.text().includes("Email is unverified")) {
          cy.get('[data-testid="tooltip-content"]').should(
            "contain.text",
            "Email is unverified, please request a new verification email"
          );
        }
      });
  });

  it('should allow clicking the "Change email address" button and display modal', () => {
    cy.get("button").contains("Change email address").should("be.visible").and("be.enabled");
    cy.get("button").contains("Change email address").click();

    cy.get("aside.fixed").should("be.visible");

    cy.get("aside.fixed").find("h2").should("contain.text", "Change email address");

    cy.get("aside.fixed").find("label").should("contain.text", "New Email Address");

    cy.get("aside.fixed").find('input[name="email"]').should("exist").type("test@example.com");
    cy.get("aside.fixed").find('input[name="email"]').should("have.value", "test@example.com");
    cy.get("aside.fixed").find('input[name="email"]').clear();

    cy.get("aside.fixed").find("button").contains("Cancel").should("be.visible").and("be.enabled");

    cy.get("aside.fixed")
      .find("button")
      .contains("Continue")
      .should("be.visible")
      .and("be.disabled");

    cy.get("aside.fixed").find('input[name="email"]').clear().type("newemail@example.com");
    cy.get("aside.fixed").find("button").contains("Continue").should("be.enabled");
  });

  it('should disable the "Save" and "Cancel" button when the form is not dirty', () => {
    cy.get("button").contains("Save").should("be.visible").and("not.be.enabled");
    cy.get("button").contains("Cancel").should("be.visible").and("not.be.enabled");
  });

  it('should enable the "Save" and "Cancel" button when the form is dirty', () => {
    cy.get('input[name="firstName"]').clear().type("Posepher", { delay: 0 });
    cy.get("button").contains("Save").should("not.be.disabled");
    cy.get("button").contains("Cancel").should("not.be.disabled");
  });

  it("should validate firstname input when empty", () => {
    cy.checkRequiredFieldError("firstName", "save-btn");
  });

  it("should submit firstName successfully", () => {
    cy.get('input[name="firstName"]').type("Posephine");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("should validate lastname input when empty", () => {
    cy.checkRequiredFieldError("lastName", "save-btn");
  });
  it("should submit lastName successfully", () => {
    cy.get('input[name="lastName"]').type("Dewmeter");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Success");
  });

  it('should allow clicking the "Change email address" button and display otp modal', () => {
    cy.get("button").contains("Change email address").click();
    cy.get("aside.fixed").find('input[name="email"]').type("test@example.com");
    cy.get("aside.fixed").find("button").contains("Continue").click();

    cy.get("aside.fixed").should("be.visible");

    cy.get("aside.fixed").find("h2").should("contain.text", "Verify Your Email");

    cy.get("aside.fixed")
      .find("p")
      .should(
        "contain.text",
        "We’ve sent a 6-character code to test@example.com The code expires shortly, so please enter it soon."
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

  it("should validate phone number input", () => {
    cy.get(".react-tel-input input").clear().type("234 634");
    cy.get("button").contains("Save").click();
    cy.contains("small", "Phone number must be at least 10 characters long").should("exist");
  });
  //submits valid number
  it("should submit valid phone number successfully", () => {
    cy.get(".react-tel-input input").clear().type("634 567 890 9");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Success");
  });

  //returns error on invalid number
  it("should throw an error if invalid phone number is submitted", () => {
    cy.get(".react-tel-input input").type("591 284 032 1");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification(`"phone_number" contains an invalid value`);
  });
});
