//@ts-nocheck
describe("Account Security Settings", () => {
  before(() => {
    cy.visit("/login");
    cy.loginUserWithEmail("alt.d2-3o7w9412@yopmail.com", "@Vobb123");
  });

  beforeEach(function () {
    cy.setCookie("vobbOSAccess", this.vobbOSAccess);
    cy.setCookie("vobbOSRefresh", this.vobbOSRefresh); 
    cy.visit("/settings/security");
    cy.url().should("include", "/settings/security");
  });

  it("check for visibility toggle in change password form", () => {
    cy.get("h2").eq(0).should("contain", "Password");
    cy.contains("p", "Update your password").should("be.visible");
    cy.get("form")
      .should("exist")
      .within(() => {
        cy.contains("label", "Current Password").should("exist");
        cy.get('input[type="password"][name="currentPassword"]')
          .should("exist")
          .should("be.enabled");
        cy.togglePasswordVisibility("currentPassword", 0);

        cy.contains("label", "New Password").should("exist");
        cy.get('input[type="password"][name="password"]').should("exist").should("be.enabled");
        cy.togglePasswordVisibility("password", 1);

        cy.contains("label", "Confirm Password").should("exist");
        cy.get('input[type="password"][name="confirmPassword"]')
          .should("exist")
          .should("be.enabled");
        cy.togglePasswordVisibility("confirmPassword", 2);
      });
  });

  it("should check that the cancel and save buttons are disabled when there's no form input", () => {
    cy.get("form")
      .should("exist")
      .within(() => {
        cy.get('input[type="password"][name="currentPassword"]').clear();
        cy.get('input[type="password"][name="password"]').clear();
        cy.get('input[type="password"][name="confirmPassword"]').clear();

        cy.get("button").contains("Cancel").should("be.visible").and("not.be.enabled");
        cy.get("button").contains("Save").should("be.visible").and("not.be.enabled");
      });
  });

  it("should check that the cancel and save buttons forms are enabled when there's atleast one input", () => {
    cy.get("form")
      .should("exist")
      .within(() => {
        cy.get('input[type="password"][name="currentPassword"]').type("currentPassword");

        cy.get("button").contains("Cancel").should("be.visible").and("be.enabled");
        cy.get("button").contains("Save").should("be.visible").and("be.enabled");
      });
  });

  it("should check that current password is required", () => {
    cy.get('input[type="password"][name="password"]').type("newPass");
    cy.get('input[type="password"][name="confirmPassword"]').type("confirmPass");
    cy.checkRequiredFieldError("currentPassword", "save-btn");
  });
  it("should check that new password is required", () => {
    cy.get('input[type="password"][name="currentPassword"]').type("currentPass");
    cy.get('input[type="password"][name="confirmPassword"]').type("confirmPass");
    cy.checkRequiredFieldError("newPassword", "save-btn");
  });

  it("should check that confirm password is required", () => {
    cy.get('input[type="password"][name="password"]').type("newPass");
    cy.get('input[type="password"][name="currentPassword"]').type("currentPass");
    cy.checkRequiredFieldError("confirmPassword", "save-btn");
  });

  it("should show specific errors for invalid password criteria", () => {
    cy.checkValidPasswordCriteria("newPassword", "weak", "save-btn");
    cy.checkValidPasswordCriteria("newPassword", "noUpperCase1", "save-btn");
    cy.checkValidPasswordCriteria("newPassword", "NoLowercase1", "save-btn");
    cy.checkValidPasswordCriteria("newPassword", "NoNumber_", "save-btn");
    cy.checkValidPasswordCriteria("newPassword", "NoSpecialCharacter8", "save-btn");
  });

  it("should check that confirm Password matches new password", () => {
    cy.get('input[type="password"][name="password"]').type("@Vobb123");
    cy.get('input[type="password"][name="confirmPassword"]').type("confirmPass");
    cy.get("button").contains("Save").click();
    cy.contains("small", "Passwords must match").should("exist");
  });

  it("should display error when updating with wrong current password", () => {
    cy.get('input[type="password"][name="currentPassword"]').type("currentPass");
    cy.get('input[type="password"][name="password"]').type("@Vobb123");
    cy.get('input[type="password"][name="confirmPassword"]').type("@Vobb123");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Current Password is Incorrect");
  });

  it("should display error when updating new password with old password", () => {
    cy.get('input[type="password"][name="currentPassword"]').type("@Vobb123");
    cy.get('input[type="password"][name="password"]').type("@Vobb123");
    cy.get('input[type="password"][name="confirmPassword"]').type("@Vobb123");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("New password must differ from the old one.");
  });

  it("should update password successfully when details are correct", () => {
    cy.get('input[type="password"][name="currentPassword"]').type("@Vobb123");
    cy.get('input[type="password"][name="password"]').type("@Vobb12345");
    cy.get('input[type="password"][name="confirmPassword"]').type("@Vobb12345");
    cy.get("button").contains("Save").click();
    cy.checkAndCloseToastNotification("Password changed successfully");
  });

  it("should display the two-factor auth section", () => {
    cy.get("h2").eq(1).should("contain", "Two-Factor Authentication");
    cy.contains("p", "Secure your account by adding an extra layer of protection").should(
      "be.visible"
    );
    cy.contains("p", "Enable Two-Factor Authentication").should("be.visible");
    cy.get('span[data-testid="2fa-switch"]').within(() => {
      cy.get("button").contains("Learn more").should("be.visible").and("be.enabled");
      cy.get('button[role="switch"]').should("be.visible").and("be.enabled");
    });
  });

  it("two-factor 'learn more' button should display info modal", () => {
    cy.get('span[data-testid="2fa-switch"]').within(() => {
      cy.get("button").contains("Learn more").click();
    });
    cy.get("aside.fixed").find("h2").should("contain.text", "About 2FA");
    cy.get("aside.fixed").find("button").should("be.visible").and("be.enabled");

    cy.get("aside.fixed")
      .find("p")
      .should(
        "contain.text",
        `Two-Factor Authentication (2FA) is an advanced security measure that fortifies your account against unauthorized access. 
  When you log in, 2FA demands two distinct forms of identification: your password and a unique verification code sent to your registered email. 
  This additional security step adds a critical barrier, making it exceedingly difficult for malicious actors to breach your account.`
      );

    cy.get("aside.fixed")
      .find("p")
      .should(
        "contain.text",
        `To setup 2FA, you will be required to enter a verification code sent to your email. 
  This helps us to know that you're able to receive the necessary verification code when you need to login`
      );
  });

  it("two-factor switch button should display otp modal", () => {
    cy.get('span[data-testid="2fa-switch"]').within(() => {
      cy.get('button[role="switch"]').click();
    });

    cy.get("aside.fixed").find("h2").should("contain.text", "Two-Factor Authentication");

    cy.get("aside.fixed")
      .find("p")
      .should(
        "contain.text",
        "We’ve sent a 6-character code to alt.d2-3o7w9412@yopmail.com. The code expires shortly, so please enter it soon."
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

  it("should display the connected accounts section", () => {
    cy.get("h2").eq(2).should("contain", "Connected Accounts");
    cy.contains("p", "Seamlessly integrate your preferred platforms to login with ease").should(
      "be.visible"
    );
    cy.contains("p", "Enable Two-Factor Authentication").should("be.visible");

    cy.get('[data-testid="google-connection"]').within(() => {
      cy.get("svg").should("be.visible");
      cy.contains("p", "Enable Google Authentication").should("be.visible");
    });

    cy.get('span[data-testid="connect-switch"]').within(() => {
      cy.get("button").contains("Learn more").should("be.visible").and("be.enabled");
      cy.get('button[role="switch"]').should("be.visible").and("be.enabled");
    });
  });

  it("connected account 'learn more' button should display info modal", () => {
    cy.get('span[data-testid="connect-switch"]').within(() => {
      cy.get("button").contains("Learn more").click();
    });
    cy.get("aside.fixed").find("h2").should("contain.text", "About Google Authentication");
    cy.get("aside.fixed").find("button").should("be.visible").and("be.enabled");

    cy.get("aside.fixed")
      .find("p")
      .should(
        "contain.text",
        `By connecting your Google account, you'll enjoy a secure and hassle-free login process. No need to remember yet another username and password.`
      );

    cy.get("aside.fixed")
      .find("p")
      .should(
        "contain.text",
        `With Google's robust security measures, you can trust that your sensitive business data will be protected.`
      );
  });

  it("should display login history section", () => {
    cy.get("h2").eq(3).should("contain", "Who logged in?");
    cy.get("[data-testid='history-section']").within(() => {
      cy.contains("We’ll alert you via").should("be.visible");
      cy.get("b").should("contain.text", "alt.d2-3o7w9412@yopmail.com");
      cy.contains("if there is any unusual activity on your account").should("be.visible");
    });
    cy.get("[data-testid='history-data']").should("exist");
  });

  it("triggers API call on page change change", () => {
    cy.intercept(
      "GET",
      "https://os-stg-api.vobb.io/api/v1/settings/acc/login-history?page=1&limit=8",
      (req) => {
        req.continue((res) => {});
      }
    ).as("fetchData");

    cy.get('[data-testid="page-info"]').should("contain.text", "1 - 8 of 10 items");

    cy.get('[data-testid="next-page"]').click();
    cy.wait("@fetchData").its("response.statusCode").should("eq", 200);
    cy.get('[data-testid="page-info"]').should("contain.text", "9 - 10 of 10 items");

    cy.get('[data-testid="next-page"]').click();
    cy.wait("@fetchData").its("response.statusCode").should("eq", 200);

    cy.get('[data-testid="page-info"]').should("contain.text", "1 - 8 of 10 items");
  });
});
