//@ts-nocheck
describe("Member notes", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/members/671a0c2a91741ac200e8c84e/notes");
    cy.url().should("include", "/members/671a0c2a91741ac200e8c84e/notes");
  });

  it("triggers API call on visibility parameter change", () => {
    cy.intercept(
      "GET",
      "https://os-stg-api.vobb.io/api/v1/note/all/user/671a0c2a91741ac200e8c84e/?page=1&limit=6",
      (req) => {
        req.continue((res) => {});
      }
    ).as("fetchNotes");

    cy.get("[data-testid='public-notes']").click();
    cy.wait("@fetchNotes").its("response.statusCode").should("eq", 200);
  });

  it("triggers API call on sort parameter change", () => {
    cy.intercept(
      "GET",
      "https://os-stg-api.vobb.io/api/v1/note/all/user/671a0c2a91741ac200e8c84e/?page=1&limit=6",
      (req) => {
        req.continue((res) => {});
      }
    ).as("fetchNotes");

    cy.get("[data-testid='sort-btn']").click();
    cy.get("[data-testid='sort-desc']").click();

    cy.wait("@fetchNotes").its("response.statusCode").should("eq", 200);
  });

  it("should open the Add Note modal and submit a new note", () => {
    cy.get('[data-testid="add-note-button"]').click();

    cy.get("[data-testid='addNote-modal']").within(() => {
      cy.get('input[name="title"]').type("New Note Title 5");
      cy.get('textarea[name="body"]').type("Description for the new note now five.");

      cy.wait(1000);
    });
    cy.checkAndCloseToastNotification("Success");
  });

  it("should change visibility of a note", () => {
    cy.get('[data-testid="change-visibility"]').eq(0).click();

    cy.get("div[role='menuitem']").eq(1).click();
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Note visibility updated");
  });

  it("should change delete a note", () => {
    cy.get('[data-testid="menu-note"]').eq(0).click();

    cy.get("div[role='menuitem']").eq(1).click();
    cy.wait(1000);
    cy.checkAndCloseToastNotification("Note deleted successfully");
  });

  it("should edit a note", () => {
    cy.get('[data-testid="note-body"]').eq(0).click();

    cy.get("[data-testid='editNote-modal']").within(() => {
      cy.get('textarea[name="body"]').clear().type("Description for the new note now edited.");

      cy.wait(1000);
    });
  });
});
