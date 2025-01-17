import { toast } from "components";
import { useUserContext } from "context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

export const useLogout = () => {
  const navigate = useNavigate();
  const { handleUpdateUser } = useUserContext();

  const logout = () => {
    handleUpdateUser(null);
    Cookies.remove("vobbOSAccess");
    Cookies.remove("vobbOSRefresh");
    navigate(Routes.login);
    toast({ description: "You have been logged out." });
  };
  return { logout };
};
