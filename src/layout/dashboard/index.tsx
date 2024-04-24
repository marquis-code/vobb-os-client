import { ReactNode, useState } from "react";
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { useMobile } from "hooks";
import { UnsupportedScreenSize } from "components";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { isMobile } = useMobile({ size: 1024 });
  const [collapse, setCollapse] = useState(false);
  const sideBarWidth = collapse ? "60px" : "275px";

  return isMobile ? (
    <UnsupportedScreenSize />
  ) : (
    <>
      <NavBar title={title} collapse={collapse} sideBarWidth={sideBarWidth} />
      <SideBar collapse={collapse} handleCollapse={setCollapse} sideBarWidth={sideBarWidth} />
      <main style={{ marginLeft: sideBarWidth }} className="mt-[55px]">
        {children}
      </main>
    </>
  );
};

export { DashboardLayout };
