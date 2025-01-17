//@ts-nocheck
describe("Account Profile", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.setCookie("vobbOSAccess", this.vobbOSAccess);
    cy.setCookie("vobbOSRefresh", this.vobbOSRefresh); 
    cy.visit("/settings/profile");
    cy.url().should("include", "/settings/profile");
  });

  it("should display all form fields with correct labels", () => {
    cy.get("label").contains("First Name").should("be.visible");
    cy.get("label").contains("Last Name").should("be.visible");
    cy.get("label").contains("Phone Number").should("be.visible");
    cy.get("label").contains("Job Title").should("be.visible");
    cy.get("label").contains("Primary Email Address").should("be.visible");
  });

  it("should allow typing in First Name and Last Name fields", () => {
    cy.get('input[name="firstName"]').type("Poseph");
    cy.get('input[name="lastName"]').type("Dewbottom");
  });

  it("should allow entering a phone number", () => {
    cy.get(".react-tel-input input").type("034 567 890 1");
  });

  it("should have Job Title and Email fields disabled", () => {
    cy.get('input[name="jobTitle"]').should("be.disabled");
    cy.get('input[name="email"]').should("be.disabled");
  });

  it('should disable the "Save" and "Cancel" button when the form is not dirty', () => {
    cy.get("button").contains("Save").should("be.visible").and("not.be.enabled");
    cy.get("button").contains("Cancel").should("be.visible").and("not.be.enabled");
  });

  it('should enable the "Save" and "Cancel" button when the form is dirty', () => {
    cy.get('input[name="firstName"]').clear().type("Posepher", { delay: 0 });
    cy.get("button").contains("Save").should("not.be.disabled");
    cy.get("button").contains("Cancel").should("not.be.disabled");
  });

  it("should validate firstname input when empty", () => {
    cy.checkRequiredFieldError("firstName", "save-btn");
  });

  it("should submit firstName successfully", () => {
    cy.get('input[name="firstName"]').type("Posephine");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("should validate lastname input when empty", () => {
    cy.checkRequiredFieldError("lastName", "save-btn");
  });
  it("should submit lastName successfully", () => {
    cy.get('input[name="lastName"]').type("Dewmeter");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Success");
  });

  it("successfully makes request to change email", () => {
    cy.get("button").contains("Change email address").click();
    cy.get("aside.fixed").find('input[name="email"]').type("test@example.com");
    cy.get("aside.fixed").find("button").contains("Continue").click();

    cy.get("aside.fixed").should("be.visible");

    cy.get("aside.fixed").find("h2").should("contain.text", "Verify Your Email");

    cy.get("aside.fixed")
      .find("p")
      .should(
        "contain.text",
        "We’ve sent a 6-character code to test@example.com The code expires shortly, so please enter it soon."
      );

    cy.get('div[data-input-otp-container="true"]')
      .should("exist")
      .as("otpContainer")
      .children("div")
      .should("have.length", 8);
    cy.get('[role="separator"]').should("exist");
    cy.get("svg").should("exist");

    cy.get("aside.fixed")
      .find("button")
      .contains("Continue")
      .should("be.visible")
      .and("be.disabled");

    cy.get('input[data-input-otp="true"]').should("be.enabled");
    cy.get('input[data-input-otp="true"]').type("123456");
    cy.contains("button", "Continue").should("be.visible").and("not.be.disabled");
  });

  it("should validate phone number input", () => {
    cy.get(".react-tel-input input").clear().type("234 634");
    cy.get("button").contains("Save").click();
    cy.contains("small", "Phone number must be at least 10 characters long").should("exist");
  });
  //submits valid number
  it("should submit valid phone number successfully", () => {
    cy.get(".react-tel-input input").clear().type("634 567 890 9");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Success");
  });

  //returns error on invalid number
  it("should throw an error if invalid phone number is submitted", () => {
    cy.get(".react-tel-input input").type("591 284 032 1");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification(`"phone_number" contains an invalid value`);
  });

  it("should update job title", () => {
    cy.get("[data-testid='job-title-btn']").click();
    cy.get("[data-testid='update-job-title-modal']").within(() => {
      cy.get('input[name="jobTitle"]').clear().type("Big Chairperson");
      cy.get("button").contains("Save").click();
    });
    cy.checkAndCloseToastNotification("Success");
  });
});
