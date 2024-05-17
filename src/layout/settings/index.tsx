import { ReactNode, useEffect, useState } from "react";
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { useFetchUser, useMobile } from "hooks";
import { UnsupportedScreenSize } from "components";

interface SettingsLayoutProps {
  children: ReactNode;
  title: string;
  parent: string;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, title, parent }) => {
  const { isMobile } = useMobile({ size: 1024 });
  const sideBarWidth = "275px";

  return isMobile ? (
    <UnsupportedScreenSize />
  ) : (
    <>
      <NavBar parent={parent} title={title} sideBarWidth={sideBarWidth} />
      <SideBar active={title.toLowerCase()} sideBarWidth={sideBarWidth} />
      <main style={{ marginLeft: sideBarWidth }} className="mt-[55px] p-4">
        {children}
      </main>
    </>
  );
};

export { SettingsLayout };
