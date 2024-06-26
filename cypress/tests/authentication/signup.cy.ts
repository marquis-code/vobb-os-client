// @ts-nocheck
describe("Signup page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("should display the sign up page", () => {
    cy.get('[data-cy="logo"]').should("exist");
    cy.get("h1").should("contain", "Create a Vobb account");
    cy.get('[data-cy="subtitle"]').should(
      "contain",
      "Access all Vobb's tools with just one account."
    );
    cy.contains("label", "Email").should("exist");
    cy.contains("label", "Password").should("exist");
    cy.get('input[name="email"]').should("be.visible").and("be.enabled");
    cy.get('input[name="password"]').should("be.visible").and("be.enabled");
    cy.get('svg[role="button"]').should("be.visible");
    cy.get('[data-cy="recaptcha"]').should("exist"); //further checks for contents of recaptcha is done in cy.solveGoogleReCAPTCHA() where the iframe is properly accessed;

    cy.contains("button", "Get started").should("be.visible").and("be.enabled");
    cy.get('[data-cy="signup-google-btn"]').should("be.visible").and("be.enabled");
    cy.get('[data-cy="already-have-account"]').should("exist");
    cy.contains("Sign in").should("have.attr", "href").and("not.be.empty");
    cy.contains("Sign in").should("not.have.class", "disabled");
    cy.contains("Sign in")
      .invoke("attr", "href")
      .should("match", /^\/login$/);
  });

  it("should toggle password visibility when clicking the eye icon", () => {
    cy.get('input[name="password"]').should("have.attr", "type", "password");
    cy.get('svg[role="button"]').click();
    cy.get('input[name="password"]').should("have.attr", "type", "text");
    cy.get('svg[role="button"]').click();
    cy.get('input[name="password"]').should("have.attr", "type", "password");
  });

  it("should show required error when email is left blank", () => {
    cy.get('input[name="password"]').type("@Vobb123");
    cy.checkRequiredFieldError("email", "signup-btn");
  });
  it("should show required error when password is left blank", () => {
    cy.get('input[name="email"]').type("hamsacodes@gmail.com");
    cy.checkRequiredFieldError("password", "signup-btn");
  });

  it("should show an error for invalid email format", () => {
    cy.checkInvalidEmailError("invalid-email", "signup-btn");
  });

  it("should show required error when recaptcha value is absent", () => {
    cy.get('input[name="email"]').type("hamsacodes@gmail.com");
    cy.get('input[name="password"]').type("myPassword");
    cy.checkRecaptchaValueExists("signup-btn");
  });

  it("should show specific errors for invalid password criteria", () => {
    cy.checkValidPasswordCriteria("weak", "signup-btn");
    cy.checkValidPasswordCriteria("noUpperCase1", "signup-btn");
    cy.checkValidPasswordCriteria("NoLowercase1", "signup-btn");
    cy.checkValidPasswordCriteria("NoNumber@", "signup-btn");
    cy.checkValidPasswordCriteria("NoSpecialCharacter8", "signup-btn");
  });

  it("should successfully go to sign in page", () => {
    cy.get('[data-cy="go-to-signin"]').click();
    cy.url().should("include", "/login");
  });

  //REgistration
  const mailer = "@mailinator.com";

  //Random string generator for the first name
  const randomFirstName = () => {
    const possible = "abcdefghijklmnopqrstuvwxyz";
    const length = Math.floor(Math.random() * 8) + 10;
    let randomName = "";
    for (let i = 0; i < length; i++) {
      randomName += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomName;
  };

  //Append random firstname to email
  const randomEmail = () => {
    return randomFirstName() + mailer;
  };

  it("should should error when user exists", () => {
    cy.get('[data-cy="email"]').type("hamsacodes@gmail.com");
    cy.get('[data-cy="password"]').type("@Password123");
    cy.solveGoogleReCAPTCHA();
    cy.checkAndCloseToastNotification("An account with this email exists already");
  });

  it("should register successfully", () => {
    cy.get('[data-cy="email"]').type(randomEmail());
    cy.get('[data-cy="password"]').type("@Password123");
    cy.solveGoogleReCAPTCHA();
    cy.get('[data-cy="signup-btn"]').click().wait(500);
    cy.url().should("includes", "/verify-email");
    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').click();
      });
    cy.get('li[role="status"]').should("not.exist");
  });
});
