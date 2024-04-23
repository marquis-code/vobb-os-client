import { ReactNode, useState } from "react";
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  const sideBarWidth = collapse ? "60px" : "275px";
  return (
    <>
      <NavBar collapse={collapse} sideBarWidth={sideBarWidth} />
      <SideBar collapse={collapse} handleCollapse={setCollapse} sideBarWidth={sideBarWidth} />
      <main style={{ marginLeft: sideBarWidth }} className="mt-[55px]">
        {children}
      </main>
    </>
  );
};

export { DashboardLayout };
