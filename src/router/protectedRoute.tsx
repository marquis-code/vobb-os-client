import React from "react";

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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const accessToken = localStorage.getItem("vobbOSAccess");

  // const checkUser = () => {
  //   if (!accessToken || accessToken === "undefined") {
  //     setIsLoggedIn(false);
  //     localStorage.clear();
  //     return navigate(Routes.login);
  //   }
  //   setIsLoggedIn(true);
  //   // Fetch user profile
  // };

  // useEffect(() => {
  //   checkUser();
  // }, [isLoggedIn]);

  // return <>{isLoggedIn ? children : null}</>;
  return <>{children}</>;
};

export { ProtectedRoute };
