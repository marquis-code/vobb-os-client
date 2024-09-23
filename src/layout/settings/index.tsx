import { ReactNode, useEffect, useState } from "react";
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { useMobile } from "hooks";
import { UnsupportedScreenSize } from "components";

export interface SettingsLayoutProps {
  children: ReactNode;
  title: string;
  items: { title: string; path?: string }[];
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, title, items }) => {
  const { isMobile } = useMobile({ size: 1024 });
  const sideBarWidth = "275px";

  return isMobile ? (
    <UnsupportedScreenSize />
  ) : (
    <>
      <NavBar items={items} sideBarWidth={sideBarWidth} />
      <SideBar active={title.toLowerCase()} sideBarWidth={sideBarWidth} />
      <main style={{ marginLeft: sideBarWidth }} className="mt-[55px] p-4">
        {children}
      </main>
    </>
  );
};

export { SettingsLayout };
