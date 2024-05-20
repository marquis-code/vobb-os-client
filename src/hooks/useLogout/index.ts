import { toast } from "components";
import { useUserContext } from "context";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

export const useLogout = () => {
  const navigate = useNavigate();
  const { handleUpdateUser } = useUserContext();

  const logout = () => {
    handleUpdateUser(null);
    localStorage.clear();
    navigate(Routes.login);
    toast({ description: "You have been logged out." });
  };
  return { logout };
};
