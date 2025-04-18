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
  onboarding_user_details: "/onboarding/user_details",
  onboarding_company_details: "/onboarding/company_details",
  onboarding_company_website: "/onboarding/company_website",
  onboarding_operating_address: "/onboarding/operating_address",
  completed_onboarding: "/onboarding/completed",
  email_verify: "/verify-email",
  completed_email_verify: "/verify-email/completed",
  recaptcha: "/recaptcha",

  // Public
  accept_invite: "/invitation",
  invitation_success: "/invitation/success",
  invitation_failed: "/invitation/failed",
  verify_member_email: "/verify-member-email",

  // Dashboard
  overview: "/overview",
  profile: "/settings/profile",
  security: "/settings/security",
  personalizations: "/settings/personalizations",
  notifications: "/settings/notifications",
  account_activity: "/settings/account-activity",
  organization: "/settings/organisation",
  branches: "/settings/branches",
  branch: (id = ":id") => `/settings/branch/${id}`,
  bank_accounts: "/settings/bank-accounts",
  branding: "/settings/branding",
  communication: "/settings/communication",
  billing: "/settings/billing",
  attributes: "/settings/attributes",
  integrations: "/settings/integrations",
  migration: "/settings/migration",
  reports: "/settings/reports",
  workflows: "/settings/workflows",
  organization_activity: "/settings/organization-activity",

  // Team
  teams: "/settings/teams",
  team: (id = ":id") => `/teams/${id}`,
  members: "/settings/members",
  member: (id = ":id", tab = ":route") => `/members/${id}/${tab}`,

  // Pipelines
  pipelines: "/pipelines",

  // Drive
  drive: "/drive",
  users_directory: "/drive/user",
  user_files_directory: (id = ":id") => `/drive/user/${id}`,
  clients_directory: "/drive/client",
  client_files_directory: (id = ":id") => `/drive/client/${id}`,
  packages_directory: "/drive/package",
  package_offerings_directory: (id = ":id") => `/drive/package/offering/${id}`,
  offering_files_directory: (id = ":id") => `/drive/offering/${id}`,
  general_directory: "/drive/general",

  // Clients
  client_groups: "/client-group",
  client_group: (id = ":id", tab = ":route") => `/client-group/${id}/${tab}`
};
