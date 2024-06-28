import { useFetchUser, useLogout } from "hooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
  };

  useEffect(() => {
    checkUser();
  }, [isLoggedIn]);

  return <>{isLoggedIn ? children : null}</>;
};

export { ProtectedRoute };
