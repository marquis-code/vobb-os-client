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
  CompanyAddress
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
    path: Routes.profile,
    Element: AccountProfile,
    isProtected: true,
    Layout: SettingsLayout,
    props: {
      title: "Profile",
      parent: "Account Settings"
    }
  },

  // Add all routes above 404
  {
    path: "*",
    Element: Error404
  }
];
