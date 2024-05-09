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
  onboarding_user_details: "/onboarding/user-details",
  onboarding_company_details: "/onboarding/company-details",
  onboarding_company_website: "/onboarding/company-website",
  onboarding_operating_address: "/onboarding/operating-address",
  completed_onboarding: "/onboarding/completed",
  email_verify: "/verify-email",
  completed_email_verify: "/verify-email/completed",
  recaptcha: "/recaptcha",

  // Dashboard
  overview: "/overview",
  profile: "/settings/profile"
};
