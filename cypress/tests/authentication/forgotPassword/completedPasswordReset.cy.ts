describe("Completed password reset page", () => {
  beforeEach(() => {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", "fake-auth-token");
      window.localStorage.setItem("vobbOSRefresh", "fake-refresh-token");
    });
    cy.visit("/new-password/completed");
    cy.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught Exception:", err.message);
      return false;
    });
  });

  it("should have necessary tokens in local storage", () => {
    cy.window().then((win) => {
      cy.wrap(win.localStorage.getItem("vobbOSAccess")).should("exist");
      cy.wrap(win.localStorage.getItem("vobbOSRefresh")).should("exist");
    });
  });

  it("Continue button takes user to sign in page", () => {
    cy.get('[data-testid="continue-btn"]').click();
    cy.url().should("include", "/login");
  });

  it("go back button successfully goes back to sign in page", () => {
    cy.get('[data-testid="back-btn"]').click();
    cy.url().should("include", "/login");
  });
});
