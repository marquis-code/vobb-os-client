import { fetchTeamRolesService, fetchTeamsPerBranchService, inviteMemberService } from "api";
import { InviteMemberToBranchModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { inviteMemberProperties, ModalProps, optionType } from "types";

interface InviteProps extends ModalProps {
  callback?: () => void;
  currentBranch: optionType;
}
const InviteMemberToBranch: React.FC<InviteProps> = (props) => {
  const { callback, close, currentBranch } = props;
  const { value: id } = currentBranch;
  const [branchTeams, setBranchTeams] = useState([]);
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

  const handleSetTeamId = (id: string) => setTeamRoles((prev) => ({ ...prev, id }));

  const fetchBranchTeams = () => {
    if (id) runFetchTeams(fetchTeamsPerBranchService(id));
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
      setBranchTeams(teamsArray);
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
    fetchBranchTeams();
    if (teamRoles.id) fetchTeamRoles();
  }, [teamRoles.id, id]);

  return (
    <InviteMemberToBranchModal
      submit={submit}
      loading={inviteStatus.isPending}
      {...props}
      currentBranch={currentBranch}
      handleBranchTeams={{
        loading: teamsLoading.isPending,
        options: branchTeams
      }}
      handleTeamRoles={{
        loading: rolesLoading.isPending,
        handleSetId: handleSetTeamId,
        options: teamRoles.roles
      }}
    />
  );
};

export { InviteMemberToBranch };
