//@ts-nocheck
describe("Member tasks", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/members/6718c8f96425ba1f755f4cc2/tasks");
    cy.url().should("include", "/members/6718c8f96425ba1f755f4cc2/tasks");
  });

  it("should open the Add Task modal and submit a new task", () => {
    cy.get('[data-testid="add-task-button"]').click();

    cy.get("[data-testid='addTask-modal']").within(() => {
      cy.get('input[name="title"]').type("New Task Title");
      cy.get('input[name="description"]').type("Description for the new task.");

      cy.get('[data-testid="submit-btn"]').click();
    });
    cy.checkAndCloseToastNotification("Success");
  });

  it("should open the EDit Task modal and submit update a task", () => {
    cy.get('[data-testid="incomplete-task"]').eq[0].click();

    cy.get("[data-testid='editTask-modal']").within(() => {
      cy.get('input[name="title"]').clear.type("New Task Title");
      cy.get('input[name="description"]').clear.type("Description for the new task.");

      cy.get('[data-testid="submit-btn"]').click();
    });
    cy.checkAndCloseToastNotification("Task updated successfully");
  });

  it("deletes a task", () => {
    cy.get("[data-testid='menu-tasks']").eq(0).click();

    cy.get("[data-testid='edit-task']");
    cy.checkAndCloseToastNotification("Task deleted successfully");
  });

  it("archives a task", () => {
    cy.get("[data-testid='menu-tasks']").eq(0).click();

    cy.get("[data-testid='archive-task']");
    cy.checkAndCloseToastNotification("Task archived successfully");
  });

  it("unarchives a task", () => {
    cy.get("[data-testid='menu-tasks']").eq(0).click();

    cy.get("[data-testid='unarchive-task']");
    cy.checkAndCloseToastNotification("Success");
  });
});
