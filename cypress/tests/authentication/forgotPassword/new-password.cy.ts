describe("New password page", () => {
  beforeEach(() => {
    cy.visit("/new-password");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("should display the verify email page", () => {
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Set new Password");
    cy.get('[data-cy="subtitle"]').should(
      "contain",
      "Your new password must be different to previously used passwords."
    );

    cy.contains("label", "New Password").should("exist");
    cy.contains("label", "Confirm password").should("exist");
    cy.get('input[name="newPassword"]').should("be.visible").and("be.enabled");
    cy.get('input[name="confirmPassword"]').should("be.visible").and("be.enabled");
    cy.get('svg[role="button"]').should("be.visible");
    cy.contains("button", "Reset Password").should("be.visible").and("be.enabled");
  });

  it("should toggle new password visibility when clicking the eye icon", () => {
    cy.get('input[name="newPassword"]').should("have.attr", "type", "password");
    cy.get('svg[role="button"]').first().click();
    cy.get('input[name="newPassword"]').should("have.attr", "type", "text");
    cy.get('svg[role="button"]').first().click();
    cy.get('input[name="newPassword"]').should("have.attr", "type", "password");
  });

  it("should toggle confirm password visibility when clicking the eye icon", () => {
    cy.get('input[name="confirmPassword"]').should("have.attr", "type", "password");
    cy.get('svg[role="button"]').last().click();
    cy.get('input[name="confirmPassword"]').should("have.attr", "type", "text");
    cy.get('svg[role="button"]').last().click();
    cy.get('input[name="confirmPassword"]').should("have.attr", "type", "password");
  });

  it("should show required error when new password is left blank", () => {
    cy.get('input[name="confirmPassword"]').type("myPassword");
    cy.checkRequiredFieldError("newPassword", "reset-btn");
  });

  it("should show required error when confirm password is left blank", () => {
    cy.get('input[name="newPassword"]').type("@Vobb123");
    cy.checkRequiredFieldError("confirmPassword", "reset-btn");
  });

  it("should show specific errors for invalid password criteria", () => {
    cy.checkValidPasswordCriteria("newPassword", "weak", "reset-btn");
    cy.checkValidPasswordCriteria("newPassword", "noUpperCase1", "reset-btn");
    cy.checkValidPasswordCriteria("newPassword", "NoLowercase1", "reset-btn");
    cy.checkValidPasswordCriteria("newPassword", "NoNumber@", "reset-btn");
    cy.checkValidPasswordCriteria("newPassword", "NoSpecialCharacter8", "reset-btn");
  });

  it("should show error when confirm password is not equal to new password", () => {
    cy.get('input[name="newPassword"]').type("@Vobb123");
    cy.get('input[name="confirmPassword"]').type("obb123");
    cy.get('[data-cy="reset-btn"]').click();
    cy.contains("small", "Passwords must match").should("exist");
  });

  //Reminder: Backend isn't throwing an error when new password is set to old password
});
