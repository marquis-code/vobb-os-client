import { useFetchOrganisation, useFetchUser, useLogout } from "hooks";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

/**
 * PROTECTED ROUTE COMPONENT
 *
 * ===============================================
 *
 * This component houses all protected routes
 *
 *
 */

const ProtectedRoute: React.FC<{ children: any }> = ({ children }) => {
  const { fetchUserDetails } = useFetchUser();
  const { fetchOrgDetails } = useFetchOrganisation();
  const { logout } = useLogout();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = Cookies.get("vobbOSAccess");

  const checkUser = () => {
    if (!accessToken || accessToken === "undefined") {
      setIsLoggedIn(false);
      logout();
    }
    setIsLoggedIn(true);
    fetchUserDetails();
    fetchOrgDetails();
  };

  useEffect(() => {
    checkUser();
  }, [isLoggedIn]);

  return <>{isLoggedIn ? children : null}</>;
};

export { ProtectedRoute };
