import { Badge, toast } from "components";
import { MemberProfileBody } from "modules/organization/members/components/memberProfileBody";
import { MemberProfileHeader } from "modules/organization/members/components/memberProfileHeader";
import { MemberProfileTabs } from "modules/organization/members/components/memberProfileTabs";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router";
import { MemberProfileDetails } from "./memberDetails";
import { MemberProfileContext, useCountriesContext } from "context";
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
import {
  fetchMemberBranchesService,
  fetchMemberProfileService,
  fetchMemberTeamsService
} from "api";
import { MemberProfileProps, MetaDataProps } from "types";
import { getInitials } from "lib";

export interface MemberTeamsDataProps {
  teams: { id: string; name: string; dateAdded: string }[];
  metaData: MetaDataProps;
}

const initProfile = {
  avatar: "",
  fullName: "",
  email: "",
  role: "",
  jobTitle: "",
  initials: "",
  status: "",
  pendingEmail: "",
  timeZone: "",
  phoneNumber: "",
  dateFormat: "",
  syslanguage: "",
  fluentLanguages: [],
  userAttributes: []
};

const initMemberTeams: MemberTeamsDataProps = {
  teams: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
  }
};
export interface MemberBranchesData {
  id: string;
  name: string;
  city: string;
  country: string;
  province: string;
  dateAdded: string;
}

export interface MemberBranchesDataProps {
  branches: MemberBranchesData[];
  metaData: MetaDataProps;
}

const initMemberBranches: MemberBranchesDataProps = {
  branches: [],
  metaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
  }
};

const Member = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { countries } = useCountriesContext();

  const {
    run: runFetchProfile,
    data: profileResponse,
    error: profileError,
    requestStatus: profileStatus
  } = useApiRequest({});

  const {
    run: runFetchMemberTeams,
    data: memberTeamsResponse,
    error: memberTeamsError,
    requestStatus: memberTeamsStatus
  } = useApiRequest({});

  const {
    run: runFetchMemberBranches,
    data: memberBranchesResponse,
    error: memberBranchesError,
    requestStatus: memberBranchesStatus
  } = useApiRequest({});

  const [changeRole, setChangeRole] = useState(false);
  const [changeBranch, setChangeBranch] = useState(false);
  const [changeTeam, setChangeTeam] = useState(false);
  const [suspension, setSuspension] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [showTeams, setShowTeams] = useState(false);

  const [teamPage, setTeamPage] = useState(1);
  const handleTeamPagination = (page: number) => {
    setTeamPage(page);
  };

  const [branchesPage, setBRanchesPage] = useState(1);
  const handleBranchesPagination = (page: number) => {
    setBRanchesPage(page);
  };

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

  const handleFetchMemberTeams = (page: number) => {
    if (params.id) runFetchMemberTeams(fetchMemberTeamsService(params.id, { page }));
  };

  const fetchMemberBranches = (page: number) => {
    if (params.id) runFetchMemberBranches(fetchMemberBranchesService(params.id, { page }));
  };
  const memberProfile = useMemo<MemberProfileProps>(() => {
    if (profileResponse?.status === 200) {
      const data = profileResponse?.data?.data;
      const profile = {
        fullName: `${data.first_name} ${data.last_name}`,
        avatar: data.avatar,
        email: data.email,
        pendingEmail: data.pending_email,
        role: data.role,
        jobTitle: data.title ?? "Not passed",
        initials: getInitials(`${data.first_name} ${data.last_name}`),
        status: data.status,
        timeZone: data.timezone,
        phoneNumber: data.phone_number,
        userAttributes: data.user_attributes,
        dateFormat: data.date_format,
        syslanguage: data.language,
        fluentLanguages: data.fluent_languages
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

  const memberTeams = useMemo<MemberTeamsDataProps>(() => {
    if (memberTeamsResponse?.status === 200) {
      const teams = memberTeamsResponse.data.data.teams.map((item) => ({
        id: item._id,
        name: item.team,
        dateAdded: item.date_added.slice(0, -8)
      }));
      const metaData = {
        currentPage: memberTeamsResponse?.data?.data?.page ?? 1,
        totalPages: memberTeamsResponse?.data?.data?.total_pages,
        totalCount: memberTeamsResponse?.data?.data?.total_count
      };
      return { teams, metaData };
    } else if (memberTeamsError) {
      toast({ description: memberTeamsError?.response?.data.error });
    }

    return initMemberTeams;
  }, [memberTeamsResponse, memberTeamsError]);

  const memberBranches = useMemo<MemberBranchesDataProps>(() => {
    if (memberBranchesResponse?.status === 200) {
      const branches = memberBranchesResponse.data.data.branches.map((item) => ({
        id: item._id,
        name: item.branch,
        country: countries.find((country) => country.value === item.country)?.label,
        province: item.state,
        city: item.city,
        dateAdded: item.time.slice(0, -8)
      }));
      const metaData = {
        currentPage: memberBranchesResponse?.data?.data?.page ?? 1,
        totalPages: memberBranchesResponse?.data?.data?.total_pages,
        totalCount: memberBranchesResponse?.data?.data?.total_count
      };
      return { branches, metaData };
    } else if (memberBranchesError) {
      toast({ description: memberBranchesError?.response?.data.error });
    }

    return initMemberBranches;
  }, [memberBranchesResponse, memberBranchesError]);

  useEffect(() => {
    handleFetchProfile();
    handleFetchMemberTeams(teamPage);
    fetchMemberBranches(branchesPage);
  }, [params.id]);

  return (
    <>
      <ChangeRole
        id={params.id ?? ""}
        name={memberProfile?.fullName}
        currentRole={memberProfile?.role}
        show={changeRole}
        close={handleCloseChangeRole}
        handleFetch={handleFetchProfile}
      />
      <ChangeBranch
        id={params.id ?? ""}
        name={memberProfile?.fullName}
        show={changeBranch}
        close={handleCloseChangeBranch}
        memberBranches={{
          branchData: memberBranches.branches,
          teamsData: memberTeams.teams,
          callback: () => fetchMemberBranches(1)
        }}
      />
      <ChangeTeam
        id={params.id ?? ""}
        name={memberProfile?.fullName}
        show={changeTeam}
        close={handleCloseChangeTeam}
        memberTeams={{ data: memberTeams.teams, callback: () => handleFetchMemberTeams(1) }}
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
        memberBranches={{
          data: memberBranches,
          loading: memberBranchesStatus.isPending,
          callback: () => fetchMemberBranches(1),
          handlePagination: handleBranchesPagination
        }}
      />
      <MemberTeams
        handleAddTeam={handleChangeTeam}
        close={handleCloseTeams}
        name={memberProfile?.fullName}
        show={showTeams}
        memberTeams={{
          data: memberTeams,
          loading: memberTeamsStatus.isPending,
          callback: () => handleFetchMemberTeams(1),
          handlePagination: handleTeamPagination
        }}
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
        subSection={
          subTab === "comments" ? (
            <MemberProfileComments />
          ) : (
            <MemberProfileDetails profile={memberProfile} callback={() => handleFetchProfile()} />
          )
        }>
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
