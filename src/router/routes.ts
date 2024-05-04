/**
 * ROUTES
 *
 * ===============================================
 *
 * This object depicts the component url structure.
 * It contains a key-value pair of components and their respective URLs
 *
 */

export const Routes = {
  // Authentication
  home: "/",
  login: "/login",
  forgot_password: "/forgot-password",
  forgot_password_verify: "/forgot-password/verify",
  new_password: "/new-password",
  new_password_completed: "/new-password/completed",
  onboarding: "/onboarding",
  completed_onboarding: "/onboarding/completed",
  email_verify: "/verify-email",
  completed_email_verify: "/verify-email/completed",
  recaptcha: "/recaptcha",

  // Dashboard
  overview: "/overview",
  profile: "/settings/profile",
  security: "/settings/security",
  personalizations: "/settings/personalizations",
};
