import { fetchTeamRolesService, fetchTeamsPerBranchService, inviteMemberService } from "api";
import { InviteMemberModal, toast } from "components";
import { useApiRequest, useFetchBranches } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { inviteMemberProperties, ModalProps } from "types";

interface InviteProps extends ModalProps {
  callback?: () => void;
}
const InviteMember: React.FC<InviteProps> = (props) => {
  const { close, callback } = props;
  const { fetchOrgBranches, loadingBranches, orgBranches } = useFetchBranches({});
  const [branchTeam, setBranchTeam] = useState({ id: "", teams: [] });
  const [teamRoles, setTeamRoles] = useState({ id: "", roles: [] });
  const [closeModal, setCloseModal] = useState(true);

  const {
    run: runInvite,
    data: inviteResponse,
    error: inviteError,
    requestStatus: inviteStatus
  } = useApiRequest({});

  const {
    run: runFetchTeams,
    data: teamsResponse,
    error: teamsError,
    requestStatus: teamsLoading
  } = useApiRequest({});
  const {
    run: runFetchRoles,
    data: rolesResponse,
    error: rolesError,
    requestStatus: rolesLoading
  } = useApiRequest({});

  const handleSetBranchId = (id: string) => {
    setBranchTeam((prev) => ({ ...prev, id }));
    setTeamRoles({ id: "", roles: [] });
  };
  const handleSetTeamId = (id: string) => setTeamRoles((prev) => ({ ...prev, id }));

  const fetchBranchTeams = () => {
    runFetchTeams(fetchTeamsPerBranchService(branchTeam.id));
  };

  const fetchTeamRoles = () => {
    runFetchRoles(fetchTeamRolesService(teamRoles.id));
  };

  const submit = (data) => {
    setCloseModal(!data.inviteNew);
    let requestBody: inviteMemberProperties = {
      email: data.email,
      title: data.jobTitle,
      role: data.role.value
    };

    if (data.role.label !== "Super Admin") {
      requestBody.branch = data.branch.value;
      requestBody.team = data.team.value;
    }
    runInvite(
      inviteMemberService({
        members: [requestBody]
      })
    );
  };

  useMemo(() => {
    if (teamsResponse?.status === 200) {
      const teamsArray = teamsResponse.data.data.teams.map((item) => ({
        label: item.name,
        value: item._id
      }));
      setBranchTeam((prev) => ({ ...prev, teams: teamsArray }));
    } else if (teamsError) {
      toast({
        variant: "destructive",
        description: teamsError?.response?.data?.error
      });
    }
  }, [teamsResponse, teamsError]);

  useMemo(() => {
    if (rolesResponse?.status === 200) {
      const rolesArray = rolesResponse.data.data.map((item) => ({
        label: item.name,
        value: item._id
      }));
      setTeamRoles((prev) => ({ ...prev, roles: rolesArray }));
    } else if (rolesError) {
      toast({
        variant: "destructive",
        description: rolesError?.response?.data?.error
      });
    }
  }, [rolesResponse, rolesError]);

  useMemo(() => {
    if (inviteResponse?.status === 201) {
      toast({
        description: inviteResponse?.data?.message
      });
      closeModal && close();
      callback?.();
    } else if (inviteError) {
      toast({
        variant: "destructive",
        description: inviteError?.response?.data?.error
      });
    }
  }, [inviteResponse, inviteError]);

  useEffect(() => {
    fetchOrgBranches({});
  }, []);

  useEffect(() => {
    if (branchTeam.id) fetchBranchTeams();
    if (teamRoles.id) fetchTeamRoles();
  }, [teamRoles.id, branchTeam.id]);

  return (
    <InviteMemberModal
      submit={submit}
      loading={inviteStatus.isPending}
      {...props}
      loadingBranches={loadingBranches}
      orgBranches={orgBranches}
      handleBranchTeams={{
        loading: teamsLoading.isPending,
        handleSetId: handleSetBranchId,
        options: branchTeam.teams
      }}
      handleTeamRoles={{
        loading: rolesLoading.isPending,
        handleSetId: handleSetTeamId,
        options: teamRoles.roles
      }}
    />
  );
};

export { InviteMember };
