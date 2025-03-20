import { PathRouteProps } from "react-router-dom";
import { Routes } from "./routes";
import {
  Error404,
  Signup,
  Login,
  Recaptcha,
  CompletedOnboarding,
  Overview,
  Email,
  VerifyPassword,
  CompletedPasswordReset,
  NewPassword,
  VerifyEmail,
  CompletedEmailVerify,
  AccountProfile,
  Fullname,
  CompanyInfo,
  CompanyWebsite,
  CompanyAddress,
  AccountSecurity,
  AccountPersonalizations,
  OrgProfile,
  OrgBranches,
  OrgBranding,
  OrgCommunication,
  OrgBankAccounts,
  OrgAttributes,
  AccountActivity,
  OrgActivity,
  OrgBranch,
  Teams,
  Members,
  Team,
  Member,
  AcceptInvite,
  InvitationFailed,
  InvitationSuccessful,
  Notifications,
  MemberEmailVerify,
  Pipelines,
  Drive,
  Users,
  Clients,
  UserFiles,
  ClientFiles,
  Packages,
  PackageOfferings
} from "pages";
import { DashboardLayout, OnboardingLayout, SettingsLayout } from "layout";

// Route Builder Item Props
export interface RouteBuilderItem extends PathRouteProps {
  Layout?: React.FC<any>; // If you wish to add a layout to the page
  Element: React.FC;
  props?: any;
  isProtected?: boolean;
}

/**
 * ROUTE BUILDER
 *
 * ===============================================
 *
 * This is a list of all our application routes.
 *
 * A single item on this list contains the necessary Route props needed by React Router to do it's job.
 *
 * If you wish to add a new route to the application,
 * just fulfill all the necessary props needed by the RouteBuilder item. Ciao!
 *
 */
export const RouteBuilder: RouteBuilderItem[] = [
  {
    path: Routes.home,
    Element: Signup
  },
  {
    path: Routes.login,
    Element: Login
  },
  {
    path: Routes.recaptcha,
    Element: Recaptcha
  },
  {
    path: Routes.forgot_password,
    Element: Email
  },
  {
    path: Routes.forgot_password_verify,
    Element: VerifyPassword
  },
  {
    path: Routes.new_password,
    Element: NewPassword
  },
  {
    path: Routes.new_password_completed,
    Element: CompletedPasswordReset
  },
  {
    path: Routes.onboarding_user_details,
    Element: Fullname,
    Layout: OnboardingLayout
  },
  {
    path: Routes.onboarding_company_details,
    Element: CompanyInfo,
    Layout: OnboardingLayout
  },
  {
    path: Routes.onboarding_company_website,
    Element: CompanyWebsite,
    Layout: OnboardingLayout
  },
  {
    path: Routes.onboarding_operating_address,
    Element: CompanyAddress,
    Layout: OnboardingLayout
  },
  {
    path: Routes.completed_onboarding,
    Element: CompletedOnboarding
  },
  {
    path: Routes.email_verify,
    Element: VerifyEmail
  },
  {
    path: Routes.completed_email_verify,
    Element: CompletedEmailVerify
  },

  // Public
  {
    path: Routes.accept_invite,
    Element: AcceptInvite
  },
  {
    path: Routes.invitation_failed,
    Element: InvitationFailed
  },
  {
    path: Routes.invitation_success,
    Element: InvitationSuccessful
  },
  {
    path: Routes.verify_member_email,
    Element: MemberEmailVerify
  },

  // Dashboard Routes
  {
    path: Routes.overview,
    Element: Overview,
    isProtected: true,
    Layout: DashboardLayout,
    props: {
      title: "Overview"
    }
  },
  {
    path: Routes.pipelines,
    Element: Pipelines,
    isProtected: true,
    Layout: DashboardLayout,
    props: {
      title: "Pipelines"
    }
  },
  {
    path: Routes.drive,
    Element: Drive,
    isProtected: true,
    Layout: DashboardLayout,
    props: {
      title: "Vobb Drive"
    }
  },
  {
    path: Routes.users_directory,
    isProtected: true,
    Element: Users,
    Layout: DashboardLayout,
    props: {
      title: "Vobb Drive"
    }
  },
  {
    path: Routes.clients_directory,
    isProtected: true,
    Element: Clients,
    Layout: DashboardLayout,
    props: {
      title: "Vobb Drive"
    }
  },
  {
    path: Routes.packages_directory,
    isProtected: true,
    Element: Packages,
    Layout: DashboardLayout,
    props: {
      title: "Vobb Drive"
    }
  },
  {
    path: Routes.package_offerings_directory(":id"),
    isProtected: true,
    Element: PackageOfferings,
    Layout: DashboardLayout,
    props: {
      title: "Vobb Drive"
    }
  },
  {
    path: Routes.user_files_directory(":id"),
    isProtected: true,
    Element: UserFiles,
    Layout: DashboardLayout,
    props: {
      title: "Vobb Drive"
    }
  },
  {
    path: Routes.client_files_directory(":id"),
    isProtected: true,
    Element: ClientFiles,
    Layout: DashboardLayout,
    props: {
      title: "Vobb Drive"
    }
  },

  // Settings
  {
    path: Routes.profile,
    Element: AccountProfile,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Profile",
      items: [
        { title: "Account" },
        {
          title: "Profile"
        }
      ]
    }
  },
  {
    path: Routes.security,
    Element: AccountSecurity,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Security",
      items: [
        { title: "Account" },
        {
          title: "Security"
        }
      ]
    }
  },
  {
    path: Routes.personalizations,
    Element: AccountPersonalizations,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Personalizations",
      items: [
        { title: "Account" },
        {
          title: "Personalizations"
        }
      ]
    }
  },
  {
    path: Routes.notifications,
    Element: Notifications,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Notifications",
      items: [
        { title: "Account" },
        {
          title: "Notifications"
        }
      ]
    }
  },
  {
    path: Routes.organization,
    Element: OrgProfile,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Organization",
      items: [
        { title: "Workspace settings" },
        {
          title: "Organization"
        }
      ]
    }
  },
  {
    path: Routes.branches,
    Element: OrgBranches,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Branches",
      items: [
        { title: "Workspace settings" },
        {
          title: "Branches"
        }
      ]
    }
  },
  {
    path: Routes.branch(":id"),
    Element: OrgBranch,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Branches",
      items: [
        { title: "Workspace settings" },
        {
          title: "Branches",
          path: Routes.branches
        },
        {
          title: "Branch"
        }
      ]
    }
  },
  {
    path: Routes.branding,
    Element: OrgBranding,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Branding",
      items: [
        { title: "Workspace settings" },
        {
          title: "Branding"
        }
      ]
    }
  },
  {
    path: Routes.communication,
    Element: OrgCommunication,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Communication",
      items: [
        { title: "Workspace settings" },
        {
          title: "Communication"
        }
      ]
    }
  },
  {
    path: Routes.bank_accounts,
    Element: OrgBankAccounts,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Bank Accounts",
      items: [
        { title: "Workspace settings" },
        {
          title: "Bank Accounts"
        }
      ]
    }
  },
  {
    path: Routes.attributes,
    Element: OrgAttributes,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Attributes",
      items: [
        { title: "Workspace settings" },
        {
          title: "Attributes"
        }
      ]
    }
  },
  {
    path: Routes.account_activity,
    Element: AccountActivity,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Account Activity",
      items: [
        { title: "Account" },
        {
          title: "Activity"
        }
      ]
    }
  },
  {
    path: Routes.organization_activity,
    Element: OrgActivity,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Organization Activity",
      items: [
        { title: "Workspace settings" },
        {
          title: "Activity"
        }
      ]
    }
  },
  {
    path: Routes.teams,
    Element: Teams,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Teams",
      items: [
        { title: "Workspace settings" },
        {
          title: "Teams"
        }
      ]
    }
  },
  {
    path: Routes.team(":id"),
    Element: Team,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Teams",
      items: [
        { title: "Workspace settings" },
        {
          title: "Teams",
          path: Routes.teams
        },
        {
          title: "Team"
        }
      ]
    }
  },
  {
    path: Routes.members,
    Element: Members,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Members",
      items: [
        { title: "Workspace settings" },
        {
          title: "Members"
        }
      ]
    }
  },
  {
    path: Routes.member(":id", ":route"),
    Element: Member,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Members",
      items: [
        { title: "Workspace settings" },
        {
          title: "Members",
          path: Routes.members
        },
        {
          title: "Member"
        }
      ]
    }
  },

  // Add all routes above 404
  {
    path: "*",
    Element: Error404
  }
];
