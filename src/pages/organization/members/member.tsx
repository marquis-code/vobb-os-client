import { Badge, toast } from "components";
import { MemberProfileBody } from "modules/organization/members/components/memberProfileBody";
import { MemberProfileHeader } from "modules/organization/members/components/memberProfileHeader";
import { MemberProfileTabs } from "modules/organization/members/components/memberProfileTabs";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router";
import { MemberProfileDetails } from "./memberDetails";
import { MemberProfileContext } from "context";
import { useContext, useEffect, useMemo, useState } from "react";
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
import { MemberBranches } from "./memberBranches";
import { MemberTeams } from "./memberTeams";
import { useApiRequest } from "hooks";
import { fetchMemberProfileService } from "api";
import { MemberProfileProps } from "types";
import { getInitials } from "lib";

const initProfile = {
  avatar: "",
  fullName: "",
  email: "",
  role: "",
  jobTitle: "",
  initials: "",
  status: ""
};
const Member = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    run: runFetchProfile,
    data: profileResponse,
    error: profileError,
    requestStatus: profileStatus
  } = useApiRequest({});

  const [changeRole, setChangeRole] = useState(false);
  const [changeBranch, setChangeBranch] = useState(false);
  const [changeTeam, setChangeTeam] = useState(false);
  const [suspension, setSuspension] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [showTeams, setShowTeams] = useState(false);

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
    handleCloseBranches();
  };

  const handleCloseChangeBranch = () => {
    setChangeBranch(false);
  };

  const handleChangeTeam = () => {
    setChangeTeam(true);
    handleCloseTeams();
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

  const handleBranches = () => {
    setShowBranches(true);
  };

  const handleCloseBranches = () => {
    setShowBranches(false);
  };

  const handleTeams = () => {
    setShowTeams(true);
  };

  const handleCloseTeams = () => {
    setShowTeams(false);
  };

  const handleFetchProfile = () => {
    if (params.id) runFetchProfile(fetchMemberProfileService(params.id));
  };

  useEffect(() => {
    handleFetchProfile();
  }, [params.id]);

  const memberProfile = useMemo<MemberProfileProps>(() => {
    if (profileResponse?.status === 200) {
      const data = profileResponse?.data?.data;
      const profile = {
        fullName: `${data.first_name} ${data.last_name}`,
        avatar: data.avatar,
        email: data.email,
        role: data.role,
        jobTitle: data.title ?? "Not passed",
        initials: getInitials(`${data.first_name} ${data.last_name}`),
        status: data.status
      };

      return profile;
    } else if (profileError) {
      toast({
        variant: "destructive",
        description: profileError?.response?.data?.error
      });
    }
    return initProfile;
  }, [profileResponse, profileError]);

  return (
    <>
      <ChangeRole
        id={params.id ?? ""}
        name={memberProfile?.fullName}
        currentRole={memberProfile?.role}
        show={changeRole}
        close={handleCloseChangeRole}
      />
      <ChangeBranch
        id={params.id ?? ""}
        name={memberProfile?.fullName}
        show={changeBranch}
        close={handleCloseChangeBranch}
      />
      <ChangeTeam
        id={params.id ?? ""}
        name={memberProfile?.fullName}
        show={changeTeam}
        close={handleCloseChangeTeam}
      />
      <SuspendMember
        id={params.id ?? ""}
        name={memberProfile?.fullName}
        show={suspension}
        close={handleCloseSuspension}
      />
      {/* <UndoSuspension
        id={params.id ?? ""}
        name="Jason Doe"
        show={suspension}
        close={handleCloseSuspension}
      /> */}
      <MemberBranches
        id={params.id ?? ""}
        handleAddBranch={handleChangeBranch}
        close={handleCloseBranches}
        name={memberProfile?.fullName}
        show={showBranches}
      />
      <MemberTeams
        id={params.id ?? ""}
        handleAddTeam={handleChangeTeam}
        close={handleCloseTeams}
        name={memberProfile?.fullName}
        show={showTeams}
      />
      <MemberProfileHeader
        memberProfile={memberProfile}
        loading={profileStatus.isPending}
        handleChangeRole={handleChangeRole}
        handleChangeBranch={handleBranches}
        handleChangeTeam={handleTeams}
        handleSuspension={handleSuspension}
        handleComposeEmail={function (): void {
          throw new Error("Function not implemented.");
        }}
        isSuspended
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
