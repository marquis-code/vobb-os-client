//@ts-nocheck
describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("should toggle password visibility when clicking the eye icon", () => {
    cy.get('input[name="password"]').should("have.attr", "type", "password");
    cy.get('svg[role="button"]').click();
    cy.get('input[name="password"]').should("have.attr", "type", "text");
    cy.get('svg[role="button"]').click();
    cy.get('input[name="password"]').should("have.attr", "type", "password");
  });

  it("should successfully go to sign up page", () => {
    cy.get('[data-testid="go-to-signup"]').click();
    cy.url().should("include", "/");
  });

  it("should successfully go to forgot password page", () => {
    cy.contains("Forgot password?").click();
    cy.url().should("include", "/forgot-password");
  });

  it("should show required error when email is left blank", () => {
    cy.get('input[name="password"]').type("myPassword");
    cy.checkRequiredFieldError("email", "signin-btn");
  });

  it("should show required error when password is left blank", () => {
    cy.get('input[name="email"]').type("hamsacodes@gmail.com");
    cy.checkRequiredFieldError("password", "signin-btn");
  });

  it("should show an error for invalid email format", () => {
    cy.checkInvalidEmailError("email", "invalid-email", "signin-btn");
  });

  it("should show required error when recaptcha value is absent", () => {
    cy.get('input[name="email"]').type("hamsacodes@gmail.com");
    cy.get('input[name="password"]').type("myPassword");
    cy.checkRecaptchaValueExists("signin-btn");
  });

  it("should show error when user with invalid credentials tries to log in", () => {
    cy.loginUserWithEmail("hamsacodes@gmail.com", "@Vobb12345");

    cy.checkAndCloseToastNotification("Incorrect Email or Password");
  });

  it("should show error when an unexisting user tries to log in", () => {
    cy.loginUserWithEmail("fauxpas@gmail.com", "@Vobb123");
    cy.checkAndCloseToastNotification("This account does not exist");
  });

  it("login user with valid credentials successfully", () => {
    cy.loginUserWithEmail("hamsacodes@gmail.com", "@Vobb123");
    cy.url().should((url) => {
      expect(url).to.satisfy(
        (url: string) => url.includes("/onboarding") || url.includes("/overview")
      );
    });
    cy.checkAndCloseToastNotification("Login Successful");
  });
});
