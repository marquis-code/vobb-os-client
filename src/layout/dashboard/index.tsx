import { ReactNode, useState } from "react";
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { useMobile } from "hooks";
import { UnsupportedScreenSize, toast } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { isMobile } = useMobile({ size: 1024 });
  const [collapse, setCollapse] = useState(false);
  const sideBarWidth = collapse ? "60px" : "275px";
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate(Routes.login);
    toast({ description: "Log out successful." });
  };
  return isMobile ? (
    <UnsupportedScreenSize />
  ) : (
    <>
      <NavBar title={title} collapse={collapse} sideBarWidth={sideBarWidth} logout={logout} />
      <SideBar collapse={collapse} handleCollapse={setCollapse} sideBarWidth={sideBarWidth} />
      <main style={{ marginLeft: sideBarWidth }} className="mt-[55px]">
        {children}
      </main>
    </>
  );
};

export { DashboardLayout };
