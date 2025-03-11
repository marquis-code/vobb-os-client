import { useLocation } from "react-router-dom";
import { Routes } from "router";

type UseValidRouteReturn = {
  isValidRoute: boolean;
  isAuthRoute: boolean;
  isUnauthRoute: boolean;
};

type UseValidRouteOverload = {
  (value?: string | string[]): UseValidRouteReturn;
};

export const useValidRoute: UseValidRouteOverload = (value?: string | string[]): UseValidRouteReturn => {
  const { pathname } = useLocation();
  
  const AUTH_ROUTES: string[] = [
	Routes.home,
    Routes.login,
    Routes.forgot_password,
    Routes.forgot_password_verify,
    Routes.new_password,
    Routes.new_password_completed,
    Routes.onboarding_company_details,
    Routes.onboarding_user_details,
    Routes.onboarding_company_website,
    Routes.onboarding_operating_address,
    Routes.completed_onboarding,
    Routes.email_verify,
    Routes.completed_email_verify,
    Routes.recaptcha,
  ];

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isUnauthRoute = !isAuthRoute;

  let isValidRoute = true;
  
  if (value) {
    const validRoutes = typeof value === "string" ? [value] : value;
    isValidRoute = validRoutes.some(route => route === pathname);
  }

  return { isValidRoute, isAuthRoute, isUnauthRoute };
};