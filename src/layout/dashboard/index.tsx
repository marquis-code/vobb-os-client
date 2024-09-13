import { ReactNode, useEffect, useState } from "react";
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { useMobile } from "hooks";
import { AddBranchModal, UnsupportedScreenSize } from "components";
import { AddBranch } from "pages/organization/branches/addBranch";
import { useModalContext } from "context";
import { AddTeam } from "pages/organization/teams/addTeam";
import { InviteMember } from "pages/organization/members/inviteMember";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { isMobile } = useMobile({ size: 1024 });
  const { addBranch, setAddBranch, addTeam, setAddTeam, inviteMember, setInviteMember } =
    useModalContext();
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
      <AddBranch close={() => setAddBranch(false)} show={addBranch} />
      <AddTeam close={() => setAddTeam(false)} show={addTeam} />
      <InviteMember close={() => setInviteMember(false)} show={inviteMember} />
    </>
  );
};

export { DashboardLayout };
