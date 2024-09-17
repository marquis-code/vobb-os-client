import { ReactNode, useEffect, useState } from "react";
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { useFetchUser, useMobile } from "hooks";
import { UnsupportedScreenSize } from "components";
import { AddBranch, AddTeam, InviteMember, UpdateJobTitle } from "pages";
import { useModalContext, useUserContext } from "context";
interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { isMobile } = useMobile({ size: 1024 });
  const { userDetails } = useUserContext();
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
  const { fetchUserDetails } = useFetchUser();

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
      <UpdateJobTitle
        close={() => setUpdateJobTitle(false)}
        show={updateJobTitle}
        callback={() => {
          fetchUserDetails();
          setUpdateJobTitle(false);
        }}
      />
    </>
  );
};

export { DashboardLayout };
