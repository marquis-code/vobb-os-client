//@ts-nocheck
describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("should display the login page", () => {
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Sign in to your account");
    cy.contains("label", "Email").should("exist");
    cy.contains("label", "Password").should("exist");
    cy.get('input[name="email"]').should("be.visible").and("be.enabled");
    cy.get('input[name="password"]').should("be.visible").and("be.enabled");
    cy.get('svg[role="button"]').should("be.visible");
    cy.get('button[role="checkbox"]').should("be.visible").and("be.enabled");
    cy.contains("label", "Stay signed in for a week").should("exist");
    cy.contains("Forgot password?").should("have.attr", "href").and("not.be.empty");
    cy.contains("Forgot password?").should("not.have.class", "disabled");
    cy.contains("Forgot password?")
      .invoke("attr", "href")
      .should("match", /^\/forgot-password$/);
    cy.get('[data-cy="recaptcha"]').should("exist"); //further checks for contents of recaptcha is done in cy.solveGoogleReCAPTCHA() where the iframe is properly accessed;

    cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    cy.get('[data-cy="signin-google-btn"]').should("be.visible").and("be.enabled");
    cy.get('[data-cy="dont-have-account"]').should("exist");
    cy.contains("Sign up").should("have.attr", "href").and("not.be.empty");
    cy.contains("Sign up").should("not.have.class", "disabled");
    cy.contains("Sign up").invoke("attr", "href").should("match", /^\/$/);
  });

  it("should toggle password visibility when clicking the eye icon", () => {
    cy.togglePasswordVisibility("password");
  });

  it("should successfully go to sign up page", () => {
    cy.get('[data-cy="go-to-signup"]').click();
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
