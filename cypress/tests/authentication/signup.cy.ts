// @ts-nocheck
describe("Signup page", () => {
  beforeEach(() => {
    cy.visit("/");
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

  it("should show required error when email is left blank", () => {
    cy.get('input[name="password"]').type("@Vobb123");
    cy.checkRequiredFieldError("email", "signup-btn");
  });
  it("should show required error when password is left blank", () => {
    cy.get('input[name="email"]').type("hamsacodes@gmail.com");
    cy.checkRequiredFieldError("password", "signup-btn");
  });

  it("should show an error for invalid email format", () => {
    cy.checkInvalidEmailError("email", "invalid-email", "signup-btn");
  });

  it("should show required error when recaptcha value is absent", () => {
    cy.get('input[name="email"]').type("hamsacodes@gmail.com");
    cy.get('input[name="password"]').type("myPassword");
    cy.checkRecaptchaValueExists("signup-btn");
  });

  it("should show specific errors for invalid password criteria", () => {
    cy.checkValidPasswordCriteria("password", "weak", "signup-btn");
    cy.checkValidPasswordCriteria("password", "noUpperCase1", "signup-btn");
    cy.checkValidPasswordCriteria("password", "NoLowercase1", "signup-btn");
    cy.checkValidPasswordCriteria("password", "NoNumber@", "signup-btn");
    cy.checkValidPasswordCriteria("password", "NoSpecialCharacter8", "signup-btn");
  });

  it("should successfully go to sign in page", () => {
    cy.get('[data-testid="go-to-signin"]').click();
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

  it("should register successfully", () => {
    cy.get('[data-testid="email"]').type(randomEmail());
    cy.get('[data-testid="password"]').type("@Password123");
    cy.solveGoogleReCAPTCHA();
    cy.get('[data-testid="signup-btn"]').click().wait(500);
    cy.url().should("includes", "/verify-email");
    cy.get('li[role="status"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[type="button"]').click();
      });
    cy.get('li[role="status"]').should("not.exist");
  });

  it("should should error when user exists", () => {
    cy.get('[data-testid="email"]').type("hamsacodes@gmail.com");
    cy.get('[data-testid="password"]').type("@Password123");
    cy.solveGoogleReCAPTCHA();
    cy.get('[data-testid="signup-btn"]').click();
    cy.checkAndCloseToastNotification("An account with this email exists already");
  });
});
