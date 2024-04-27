import { ReactNode, useState } from "react";
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { useMobile } from "hooks";
import { UnsupportedScreenSize } from "components";

interface SettingsLayoutProps {
  children: ReactNode;
  title: string;
  active: "string";
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, title, active }) => {
  const { isMobile } = useMobile({ size: 1024 });
  const [collapse, setCollapse] = useState(false);
  const sideBarWidth = "275px";

  return isMobile ? (
    <UnsupportedScreenSize />
  ) : (
    <>
      <NavBar title={title} sideBarWidth={sideBarWidth} />
      <SideBar active={active} sideBarWidth={sideBarWidth} />
      <main style={{ marginLeft: sideBarWidth }} className="mt-[55px]">
        {children}
      </main>
    </>
  );
};

export { SettingsLayout };
