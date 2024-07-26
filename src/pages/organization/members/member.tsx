import { Badge } from "components";
import { MemberProfileBody } from "modules/organization/members/components/memberProfileBody";
import { MemberProfileHeader } from "modules/organization/members/components/memberProfileHeader";
import { MemberProfileTabs } from "modules/organization/members/components/memberProfileTabs";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router";
import { MemberProfileDetails } from "./memberDetails";
import { MemberProfileContext } from "context";
import { useContext, useState } from "react";
import { MemberProfileComments } from "./memberComments";
import { MemberProfileActivity } from "./memberActivity";
import { MemberProfileEmails } from "./memberEmails";
import { MemberProfileFiles } from "./memberFiles";
import { MemberProfileNotes } from "./memberNotes";
import { MemberProfileTasks } from "./memberTasks";
import { MemberProfileClients } from "./memberClients";
import { ChangeRole } from "./changeRole";
import { ChangeBranch } from "./changeBranch";
import { ChangeTeam } from "./changeTeam";
import { SuspendMember } from "./suspendMember";
import { UndoSuspension } from "./undoSuspension";

const Member = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [changeRole, setChangeRole] = useState(false);
  const [changeBranch, setChangeBranch] = useState(false);
  const [changeTeam, setChangeTeam] = useState(false);
  const [suspension, setSuspension] = useState(false);

  const handleMainTabChange = (route) => {
    navigate(Routes.member(params.id, route));
  };

  const { subTab } = useContext(MemberProfileContext);

  const handleChangeRole = () => {
    setChangeRole(true);
  };

  const handleCloseChangeRole = () => {
    setChangeRole(false);
  };

  const handleChangeBranch = () => {
    setChangeBranch(true);
  };

  const handleCloseChangeBranch = () => {
    setChangeBranch(false);
  };

  const handleChangeTeam = () => {
    setChangeTeam(true);
  };

  const handleCloseChangeTeam = () => {
    setChangeTeam(false);
  };

  const handleSuspension = () => {
    setSuspension(true);
  };

  const handleCloseSuspension = () => {
    setSuspension(false);
  };

  return (
    <>
      <ChangeRole
        id={params.id ?? ""}
        name="Jason Doe"
        currentRole="member"
        show={changeRole}
        close={handleCloseChangeRole}
      />
      <ChangeBranch
        id={params.id ?? ""}
        name="Jason Doe"
        show={changeBranch}
        close={handleCloseChangeBranch}
      />
      <ChangeTeam
        id={params.id ?? ""}
        name="Jason Doe"
        show={changeTeam}
        close={handleCloseChangeTeam}
      />
      <SuspendMember
        id={params.id ?? ""}
        name="Jason Doe"
        show={suspension}
        close={handleCloseSuspension}
      />
      {/* <UndoSuspension
        id={params.id ?? ""}
        name="Jason Doe"
        show={suspension}
        close={handleCloseSuspension}
      /> */}
      <MemberProfileHeader
        handleChangeRole={handleChangeRole}
        handleChangeBranch={handleChangeBranch}
        handleChangeTeam={handleChangeTeam}
        handleSuspension={handleSuspension}
        handleComposeEmail={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <MemberProfileTabs
        handleMainTabChange={handleMainTabChange}
        mainTab={params.route ?? "activity"}
      />
      <MemberProfileBody
        subSection={subTab === "comments" ? <MemberProfileComments /> : <MemberProfileDetails />}>
        {params.route === "activity" ? (
          <MemberProfileActivity />
        ) : params.route === "emails" ? (
          <MemberProfileEmails />
        ) : params.route === "file" ? (
          <MemberProfileFiles />
        ) : params.route === "tasks" ? (
          <MemberProfileTasks />
        ) : params.route === "notes" ? (
          <MemberProfileNotes />
        ) : params.route === "clients" ? (
          <MemberProfileClients />
        ) : (
          ""
        )}
      </MemberProfileBody>
    </>
  );
};

export { Member };
