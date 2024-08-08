import { addMemberToTeamService, fetchMemberAllAccessibleTeamsService } from "api";
import { ChangeTeamModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { ModalProps, optionType } from "types";

interface ChangeTeamProps extends ModalProps {
  name: string;
  id: string;
  memberTeams: {
    data: { id: string; name: string; dateAdded: string }[];
    callback: () => void;
  };
}

const ChangeTeam = (props: ChangeTeamProps) => {
  const { memberTeams, id, close } = props;
  const { data: teamArray, callback } = memberTeams;
  const {
    run: runFetchTeams,
    data: teamsResponse,
    error: teamsError,
    requestStatus: teamsLoading
  } = useApiRequest({});

  const {
    run: runAddToTeam,
    data: addResponse,
    error: addError,
    requestStatus: addStatus
  } = useApiRequest({});

  const [teamId, setTeamId] = useState("");
  const handleSetTeam = (id: string) => setTeamId(id);

  const handleAddToTeam = () => {
    if (teamId) runAddToTeam(addMemberToTeamService({ teamId, memberId: id }));
  };
  const teamsOptions = useMemo<optionType[]>(() => {
    if (teamsResponse?.status === 200) {
      const data = teamsResponse?.data?.data?.teams?.map((item) => {
        const isDisabled = teamArray.some(
          (memberTeam) => memberTeam.name === item.name && memberTeam.id === item._id
        );

        return {
          label: `${item.name} ${isDisabled ? "(Already a member)" : ""}`,
          value: item._id,
          isDisabled
        };
      });
      return data;
    } else if (teamsError) {
      toast({
        variant: "destructive",
        description: teamsError?.response?.data?.error
      });
    }
    return [];
  }, [teamsResponse, teamsError]);

  useMemo(() => {
    if (addResponse?.status === 200) {
      toast({ description: addResponse?.data?.message });
      callback();
      handleSetTeam("");
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
    runFetchTeams(fetchMemberAllAccessibleTeamsService(props.id));
  }, []);

  return (
    <ChangeTeamModal
      submit={handleAddToTeam}
      handleSetTeam={handleSetTeam}
      loading={addStatus.isPending}
      {...props}
      teams={{
        loading: teamsLoading.isPending,
        options: teamsOptions
      }}
    />
  );
};

export { ChangeTeam };
