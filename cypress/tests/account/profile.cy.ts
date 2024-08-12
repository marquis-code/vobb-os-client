//@ts-nocheck
describe("Account Profile", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.setItem("vobbOSAccess", this.vobbOSAccess);
      window.localStorage.setItem("vobbOSRefresh", this.vobbOSRefresh);
    });
    cy.visit("/settings/profile");
    cy.url().should("include", "/settings/profile");
  });

  it("displays the profile page", () => {
    cy.get("h1").should("contain", "Profile");
    cy.get('[data-cy="avatar-section"]').should("exist");
    cy.get("p").contains("Profile Picture").should("be.visible");
    cy.get("label")
      .contains("Upload image")
      .should("be.visible")
      .and("have.css", "cursor", "pointer");
    cy.get('input[type="file"]').should("not.be.visible");
    cy.get("p").contains("We support PNGs and JPEGs under 10MB").should("be.visible");
  });

  it("should display all form fields with correct labels", () => {
    cy.get("label").contains("First Name").should("be.visible");
    cy.get("label").contains("Last Name").should("be.visible");
    cy.get("label").contains("Phone Number").should("be.visible");
    cy.get("label").contains("Job Title").should("be.visible");
    cy.get("label").contains("Primary Email Address").should("be.visible");
  });

  it("should allow typing in First Name and Last Name fields", () => {
    cy.get('input[name="firstName"]').type("Poseph").should("have.value", "Poseph");
    cy.get('input[name="lastName"]').type("Dewbottom").should("have.value", "Dewbottom");
  });

  it("should allow entering a phone number", () => {
    cy.get(".react-tel-input input").type("+234034567890").should("have.value", "+234034567890");
  });

  it("should have Job Title and Email fields disabled", () => {
    cy.get('input[name="jobTitle"]').should("be.disabled");
    cy.get('input[name="email"]').should("be.disabled");
  });

  it("should display a tooltip for the email status icon", () => {
    cy.get('[data-cy="email-address"]').within(() => {
      cy.get('[data-cy="tooltip-trigger"]').trigger("mouseover");
      cy.get('[data-cy="tooltip-content"]')
        .should("be.visible")
        .and("contain.text", "Email is verified!"); // or check for pending email message
    });
  });

  it('should allow clicking the "Change email address" button', () => {
    cy.get("button").contains("Change email address").should("be.visible").and("be.enabled");
    // Add further checks if the click triggers any specific behavior
  });

  // it('should allow clicking the "Resend verification mail" button if pendingEmail is true', () => {
  //   cy.get("button").contains("Resend verification mail").should("be.visible").click();
  //   // Add further checks if the click triggers any specific behavior
  // });
  it('should disable the "Save" and "Cancel" button when the form is not dirty', () => {
    cy.get("button").contains("Save").should("be.visible").and("not.be.enabled");
    cy.get("button").contains("Cancel").should("be.visible").and("not.be.enabled");
  });

  it('should enable the "Save" and "Cancel" button when the form is dirty', () => {
    // Assuming isDirty becomes true when a form field is modified
    cy.get('input[name="firstName"]').type("Posepher");
    cy.get("button").contains("Save").should("not.be.disabled");
    cy.get("button").contains("Cancel").should("not.be.disabled");
  });
});
