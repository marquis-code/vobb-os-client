// @ts-nocheck
describe("Signup page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("should display the sign up form", () => {
    cy.get("h1").should("contain", "Create a Vobb account");
    cy.get('[data-cy="subtitle"]').should(
      "contain",
      `Access all Vobb's tools with just one account.`
    );
    cy.get('[data-cy="email"]').should("exist");
    cy.get('[data-cy="password"]').should("exist");
    cy.get('[data-cy="recaptcha"]').should("exist");
    cy.get('[data-cy="signup-btn"]').should("exist");
    cy.get('[data-cy="signup-google-btn"]').should("exist");
    cy.get('[data-cy="already-have-account"]').should("exist");
    cy.get('[data-cy="go-to-signin"]').should("exist");
  });

  it("should successfully go to sign in page", () => {
    cy.get('[data-cy="go-to-signin"]').click();
    cy.url().should("include", "/login");
  });

  const mailer = "@mailinator.com";

  // Random string generator for the first name
  const randomFirstName = () => {
    const possible = "abcdefghijklmnopqrstuvwxyz";
    const length = Math.floor(Math.random() * 8) + 10;
    let randomName = "";
    for (let i = 0; i < length; i++) {
      randomName += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomName;
  };

  // Append random firstname to email
  const randomEmail = () => {
    return randomFirstName() + mailer;
  };

  it("should register successfully", () => {
    cy.get('[data-cy="email"]').type(randomEmail());
    cy.get('[data-cy="password"]').type("@Password123");
    cy.solveGoogleReCAPTCHA();
    cy.get('[data-cy="signup-btn"]').click().wait(500);
    cy.url().should("includes", "/verify-email");
  });
});
