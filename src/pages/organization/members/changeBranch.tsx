import { ChangeBranchModal, toast } from "components";
import { useApiRequest, useFetchBranches } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { ModalProps } from "types";
import { MemberBranchesData } from "./member";
import { addMemberToBranchService, fetchTeamsPerBranchService } from "api";

interface ChangeBranchProps extends ModalProps {
  name: string;
  id: string;
  memberBranches: {
    branchData: MemberBranchesData[];
    teamsData: { id: string; name: string; dateAdded: string }[];
    callback: () => void;
  };
}

const ChangeBranch = (props: ChangeBranchProps) => {
  const { memberBranches, id, close } = props;
  const { branchData, teamsData, callback } = memberBranches;

  const [branchTeams, setBranchTeams] = useState({ id: "", teams: [] });
  const [teamId, setTeamId] = useState("");

  const { fetchOrgBranches, loadingBranches, orgBranches } = useFetchBranches({});
  const {
    run: runFetchTeams,
    data: teamsResponse,
    error: teamsError,
    requestStatus: teamsLoading
  } = useApiRequest({});

  const {
    run: runAddToBranch,
    data: addResponse,
    error: addError,
    requestStatus: addStatus
  } = useApiRequest({});

  const handleSetBranchId = (id: string) => {
    setBranchTeams((prev) => ({ ...prev, id }));
    setTeamId("");
  };

  const handleSetTeamId = (id: string) => {
    setTeamId(id);
  };

  const fetchBranchTeams = () => {
    runFetchTeams(fetchTeamsPerBranchService(branchTeams.id));
  };

  const handleAddToTeam = () => {
    teamId
      ? runAddToBranch(addMemberToBranchService(branchTeams.id, { team: teamId, members: [id] }))
      : runAddToBranch(addMemberToBranchService(branchTeams.id, { members: [id] }));
  };

  const branchesOptions = orgBranches?.branchesArray.map((item) => {
    const isDisabled = branchData.some(
      (memberBranch) => memberBranch.name === item.name && memberBranch.id === item.id
    );
    return {
      label: `${item.name} ${isDisabled ? "(Already in this branch)" : ""}`,
      value: item.id,
      isDisabled
    };
  });

  useMemo(() => {
    if (teamsResponse?.status === 200) {
      const teamsArray = teamsResponse.data.data.teams.map((item) => {
        const isDisabled = teamsData.some(
          (memberTeam) => memberTeam.name === item.name && memberTeam.id === item._id
        );

        return {
          label: item.name,
          value: item._id,
          isDisabled
        };
      });

      setBranchTeams((prev) => ({ ...prev, teams: teamsArray }));
    } else if (teamsError) {
      toast({
        variant: "destructive",
        description: teamsError?.response?.data?.error
      });
    }
  }, [teamsResponse, teamsError]);

  useMemo(() => {
    if (addResponse?.status === 200) {
      toast({ description: addResponse?.data?.message });
      callback();
      handleSetTeamId("");
      close();
    } else if (addError) {
      toast({
        variant: "destructive",
        description: addError?.response?.data?.error
      });
    }
    return [];
  }, [addResponse, addError]);

  useEffect(() => {
    fetchOrgBranches({ page: 1 });
    if (branchTeams.id) fetchBranchTeams();
  }, [branchTeams.id]);

  return (
    <ChangeBranchModal
      submit={handleAddToTeam}
      loading={addStatus.isPending}
      {...props}
      handleViewBranches={{
        options: branchesOptions,
        loading: loadingBranches,
        handleSetId: handleSetBranchId
      }}
      handleViewTeams={{
        options: branchTeams.teams,
        loading: teamsLoading.isPending,
        handleSetId: handleSetTeamId
      }}
    />
  );
};

export { ChangeBranch };
