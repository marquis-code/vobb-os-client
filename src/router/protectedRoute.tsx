import { useFetchOrganisation, useFetchUser, useLogout } from "hooks";
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
  const accessToken = localStorage.getItem("vobbOSAccess");

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
