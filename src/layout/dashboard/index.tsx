import { ReactNode, useEffect, useState } from "react";
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { useMobile } from "hooks";
import { UnsupportedScreenSize, UpdateJobTitleModal } from "components";
import { AddBranch } from "pages/organization/branches/addBranch";
import { useModalContext, useUserContext } from "context";
import { AddTeam } from "pages/organization/teams/addTeam";
import { InviteMember } from "pages/organization/members/inviteMember";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { isMobile } = useMobile({ size: 1024 });
  const { userDetails } = useUserContext();
  console.log(userDetails?.jobTitle);
  const {
    addBranch,
    setAddBranch,
    addTeam,
    setAddTeam,
    inviteMember,
    setInviteMember,
    updateJobTitle,
    setUpdateJobTitle
  } = useModalContext();
  const [collapse, setCollapse] = useState(false);
  const sideBarWidth = collapse ? "60px" : "275px";

  const willSetJobTitle = userDetails?.role === "Super Admin" && !userDetails?.jobTitle;

  useEffect(() => {
    if (willSetJobTitle) setUpdateJobTitle(true);
  }, [willSetJobTitle]);
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
      <UpdateJobTitleModal
        loading={false}
        submit={() => {}}
        close={() => setUpdateJobTitle(false)}
        show={updateJobTitle}
      />
    </>
  );
};

export { DashboardLayout };
