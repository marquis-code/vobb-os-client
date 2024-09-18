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
      cy.wait(1000);
    });
});

Cypress.Commands.add("loginUserWithEmail", (email, password) => {
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.solveGoogleReCAPTCHA();
  cy.wait(2000);
  cy.get('[data-testid="signin-btn"]').click();

  cy.url({ timeout: 10000 }).should("not.include", "/login");

  cy.window().then((window) => {
    const vobbOSAccess = window.localStorage.getItem("vobbOSAccess");
    const vobbOSRefresh = window.localStorage.getItem("vobbOSRefresh");
    cy.wrap(vobbOSAccess).as("vobbOSAccess");
    cy.wrap(vobbOSRefresh).as("vobbOSRefresh");
  });
});

Cypress.Commands.add("checkAndCloseToastNotification", (message, timeout = 10000) => {
  cy.get('li[role="status"]', { timeout: timeout })
    .should("be.visible")
    .within(() => {
      cy.get("div > div").should("contain.text", message);
      cy.get('button[type="button"]').click();
    });

  cy.get('li[role="status"]', { timeout: 5000 }).should("not.exist");
});

Cypress.Commands.add("checkRequiredFieldError", (field, btnId) => {
  cy.get(`[data-testid="${field}"]`).clear(); // Clear the field if it has any value
  cy.get(`[data-testid="${btnId}"]`).click();
  cy.contains("small", "Required").should("exist");
});

Cypress.Commands.add("checkInvalidEmailError", (emailId, email, btnId) => {
  cy.get(`[data-testid="${emailId}"]`).clear().type(email); // Enter invalid email
  cy.get(`[data-testid="${btnId}"]`).click();
  cy.contains("small", "Enter a valid email").should("exist");
});

Cypress.Commands.add("checkRecaptchaValueExists", (btnId) => {
  cy.frameLoaded('iframe[title="reCAPTCHA"]');
  cy.iframe('iframe[title="reCAPTCHA"]').find(".recaptcha-checkbox-unchecked").should("be.visible");
  cy.get(`[data-testid="${btnId}"]`).click();
  cy.contains("small", "Required").should("exist");
});

Cypress.Commands.add("checkValidPasswordCriteria", (fieldId, password, btnId) => {
  cy.get(`[data-testid="${fieldId}"]`).clear().type(password);

  cy.get(`[data-testid="${btnId}"]`).click();
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
      "Password should contain at least one special character (e.g. @, #, &, $)"
    ).should("exist");
  }
});

Cypress.Commands.add("togglePasswordVisibility", (inputName, index = 0) => {
  cy.get(`input[name="${inputName}"]`).should("have.attr", "type", "password");
  cy.get('svg[role="button"]').eq(index).click();
  cy.get(`input[name="${inputName}"]`).should("have.attr", "type", "text");
  cy.get('svg[role="button"]').eq(index).click();
  cy.get(`input[name="${inputName}"]`).should("have.attr", "type", "password");
});

Cypress.Commands.add("testAddEmailAddressModal", (inputSelector, buttonSelector) => {
  cy.get(inputSelector).then(($input) => {
    const inputValue = $input.val();
    const expectedButtonText = inputValue ? "Change email address" : "Add email address";

    cy.get(buttonSelector)
      .should("contain.text", expectedButtonText)
      .should("be.visible")
      .and("be.enabled")
      .click();

    cy.get("aside.fixed")
      .eq(1)
      .within(() => {
        cy.get("h2").should("contain.text", "Change email address");
        cy.get("button:has(svg)").should("be.visible").and("be.enabled");
        cy.get("label").should("contain.text", "New Email Address");

        cy.get('input[name="email"]')
          .should("exist")
          .clear()
          .type("test@example.com")
          .should("have.value", "test@example.com")
          .clear();

        cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");

        cy.get("button").contains("Continue").should("be.visible").and("be.disabled");

        cy.get('input[name="email"]').clear().type("newemail@example.com");
        cy.get("button").contains("Continue").should("be.enabled");
        cy.get("button:has(svg)").should("be.visible").and("be.enabled").click();
      });
  });
});

Cypress.Commands.add("verifyHeaderNavAndTitle", (sectionText, pageText) => {
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

              cy.get("li").eq(0).should("contain", sectionText);
              cy.get("li").eq(1).find("svg").should("exist");
              cy.get("li").eq(2).should("contain", pageText);
            });
        });
    });
  cy.get("h1").should("contain", pageText);
});
