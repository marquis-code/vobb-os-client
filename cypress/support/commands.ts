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
  cy.get('[data-cy="signin-btn"]').click().wait(500);

  cy.url().should((url) => {
    expect(url).to.satisfy(
      (url: string) => url.includes("/onboarding") || url.includes("/overview")
    );
  });
});
