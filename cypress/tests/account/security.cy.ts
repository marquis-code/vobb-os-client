//@ts-nocheck
describe("Account Security Settings", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });

    cy.visit("/settings/security");
    cy.url().should("include", "/settings/security");
  });

  it("displays the page header nav and h1", () => {
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
                cy.get("li").eq(2).should("contain", "Security");
              });
          });
      });
    cy.get("h1").should("contain", "Account Security");
  });

  it("should display change password form and check for visibility toggle", () => {
    cy.get("h2").eq(0).should("contain", "Password");
    cy.contains("p", "Update your password").should("be.visible");
    cy.get("form")
      .should("exist")
      .within(() => {
        cy.contains("label", "Current Password").should("exist");
        cy.get('input[type="password"][name="currentPassword"]')
          .should("exist")
          .should("be.enabled");
        cy.togglePasswordVisibility("currentPassword", 0);

        cy.contains("label", "New Password").should("exist");
        cy.get('input[type="password"][name="password"]').should("exist").should("be.enabled");
        cy.togglePasswordVisibility("password", 1);

        cy.contains("label", "Confirm Password").should("exist");
        cy.get('input[type="password"][name="confirmPassword"]')
          .should("exist")
          .should("be.enabled");
        cy.togglePasswordVisibility("confirmPassword", 2);
      });
  });

  it("should check that the cancel and save buttons are disabled when there's no form input", () => {
    cy.get("form")
      .should("exist")
      .within(() => {
        cy.get('input[type="password"][name="currentPassword"]').clear();
        cy.get('input[type="password"][name="password"]').clear();
        cy.get('input[type="password"][name="confirmPassword"]').clear();

        cy.get("button").contains("Cancel").should("be.visible").and("not.be.enabled");
        cy.get("button").contains("Save").should("be.visible").and("not.be.enabled");
      });
  });

  it("should check that the cancel and save buttons forms are enabled when there's atleast one input", () => {
    cy.get("form")
      .should("exist")
      .within(() => {
        cy.get('input[type="password"][name="currentPassword"]').type("currentPassword");

        cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");
        cy.get("button").contains("Save").should("be.visible").and("be.enabled");
      });
  });

  it("should check that current password is required", () => {
    cy.get('input[type="password"][name="password"]').type("newPass");
    cy.get('input[type="password"][name="confirmPassword"]').type("confirmPass");
    cy.checkRequiredFieldError("currentPassword", "save-btn");
  });
  it("should check that new password is required", () => {
    cy.get('input[type="password"][name="currentPassword"]').type("currentPass");
    cy.get('input[type="password"][name="confirmPassword"]').type("confirmPass");
    cy.checkRequiredFieldError("newPassword", "save-btn");
  });

  it("should check that confirm password is required", () => {
    cy.get('input[type="password"][name="password"]').type("newPass");
    cy.get('input[type="password"][name="currentPassword"]').type("currentPass");
    cy.checkRequiredFieldError("confirmPassword", "save-btn");
  });

  it("should show specific errors for invalid password criteria", () => {
    cy.checkValidPasswordCriteria("newPassword", "weak", "save-btn");
    cy.checkValidPasswordCriteria("newPassword", "noUpperCase1", "save-btn");
    cy.checkValidPasswordCriteria("newPassword", "NoLowercase1", "save-btn");
    cy.checkValidPasswordCriteria("newPassword", "NoNumber_", "save-btn");
    cy.checkValidPasswordCriteria("newPassword", "NoSpecialCharacter8", "save-btn");
  });

  it("should check that confirm Password matches new password", () => {
    cy.get('input[type="password"][name="password"]').type("@Vobb123");
    cy.get('input[type="password"][name="confirmPassword"]').type("confirmPass");
    cy.get("button").contains("Save").click();
    cy.contains("small", "Passwords must match").should("exist");
  });

  it("should display error when updating with wrong current password", () => {
    cy.get('input[type="password"][name="currentPassword"]').type("currentPass");
    cy.get('input[type="password"][name="password"]').type("@Vobb123");
    cy.get('input[type="password"][name="confirmPassword"]').type("@Vobb123");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Current Password is Incorrect");
  });

  it("should display error when updating new password with old password", () => {
    cy.get('input[type="password"][name="currentPassword"]').type("@Vobb123");
    cy.get('input[type="password"][name="password"]').type("@Vobb123");
    cy.get('input[type="password"][name="confirmPassword"]').type("@Vobb123");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("New password must differ from the old one.");
  });

  it("should update password successfully when details are correct", () => {
    cy.get('input[type="password"][name="currentPassword"]').type("@Vobb123");
    cy.get('input[type="password"][name="password"]').type("@Vobb12345");
    cy.get('input[type="password"][name="confirmPassword"]').type("@Vobb12345");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Password changed successfully");
  });
});
