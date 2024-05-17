import { toast } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate(Routes.login);
    toast({ description: "You have been logged out." });
  };
  return { logout };
};
