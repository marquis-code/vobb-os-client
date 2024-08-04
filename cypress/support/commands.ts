//@ts-nocheck
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare namespace Cypress {
  interface Chainable {
    solveGoogleReCAPTCHA(value?: string /* eslint-disable-line */): Chainable<JQuery<HTMLElement>>;
    loginUserWithEmail(email: string, password: string): void;
    checkAndCloseToastNotification(message: string): void;
    checkRequiredFieldError(field: string, btnId: string): void;
    checkInvalidEmailError(emailId: string, email: string, btnId: string): void;
    checkRecaptchaValueExists(
      value?: string /* eslint-disable-line */
    ): Chainable<JQuery<HTMLElement>>;
    checkValidPasswordCriteria(fieldId: string, password: string, btnId: string): void;
  }
}

Cypress.Commands.add("solveGoogleReCAPTCHA", () => {
  cy.frameLoaded('iframe[title="reCAPTCHA"]');

  cy.iframe('iframe[title="reCAPTCHA"]')
    .find(".recaptcha-checkbox-unchecked")
    .should("be.visible")
    .click();

  const timeout = 120000;

  cy.iframe('iframe[title="reCAPTCHA"]')
    .find(".recaptcha-checkbox-checked", { timeout: timeout })
    .should("be.visible")
    .then(($checkbox) => {
      cy.wrap($checkbox).should("have.class", "recaptcha-checkbox-checked");
    });
});

Cypress.Commands.add("loginUserWithEmail", (email, password) => {
  cy.get('[data-cy="email"]').type(email);
  cy.get('[data-cy="password"]').type(password);
  cy.solveGoogleReCAPTCHA();
  cy.get('[data-cy="signin-btn"]').click();

  cy.url({ timeout: 10000 }).should("not.include", "/login");
  // Wait additional time if necessary
  cy.wait(2000);

  cy.window().then((window) => {
    const vobbOSAccess = window.localStorage.getItem("vobbOSAccess");
    const vobbOSRefresh = window.localStorage.getItem("vobbOSRefresh");
    cy.wrap(vobbOSAccess).as("vobbOSAccess");
    cy.wrap(vobbOSRefresh).as("vobbOSRefresh");
  });
});

Cypress.Commands.add("checkAndCloseToastNotification", (message) => {
  cy.get('li[role="status"]')
    .should("be.visible")
    .within(() => {
      cy.get("div > div").should("contain.text", message);
      cy.get('button[type="button"]').click();
    });

  cy.get('li[role="status"]').should("not.exist");
});
Cypress.Commands.add("checkRequiredFieldError", (field, btnId) => {
  cy.get(`[data-cy="${field}"]`).clear(); // Clear the field if it has any value
  cy.get(`[data-cy="${btnId}"]`).click();
  cy.contains("small", "Required").should("exist");
});

Cypress.Commands.add("checkInvalidEmailError", (emailId, email, btnId) => {
  cy.get(`[data-cy="${emailId}"]`).clear().type(email); // Enter invalid email
  cy.get(`[data-cy="${btnId}"]`).click();
  cy.contains("small", "Enter a valid email").should("exist");
});

Cypress.Commands.add("checkRecaptchaValueExists", (btnId) => {
  cy.frameLoaded('iframe[title="reCAPTCHA"]');
  cy.iframe('iframe[title="reCAPTCHA"]').find(".recaptcha-checkbox-unchecked").should("be.visible");
  cy.get(`[data-cy="${btnId}"]`).click();
  cy.contains("small", "Required").should("exist");
});

Cypress.Commands.add("checkValidPasswordCriteria", (fieldId, password, btnId) => {
  cy.get(`[data-cy="${fieldId}"]`).clear().type(password);

  cy.get(`[data-cy="${btnId}"]`).click();
  if (password.length < 8) {
    cy.contains("small", "Password should be at least 8 characters long").should("exist");
  } else if (!/[A-Z]/.test(password)) {
    cy.contains("small", "Password should contain an uppercase character").should("exist");
  } else if (!/[a-z]/.test(password)) {
    cy.contains("small", "Password should contain an lowercase character").should("exist");
  } else if (!/\d/.test(password)) {
    cy.contains("small", "Password should contain at least one number").should("exist");
  } else if (!/@|#|&|\$]/.test(password)) {
    cy.contains(
      "small",
      "Password should contain at least special character (e.g. @, #, &, $)"
    ).should("exist");
  }
});
