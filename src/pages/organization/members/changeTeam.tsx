import { addMemberToTeamService, fetchMemberAllAccessibleTeamsService } from "api";
import { ChangeTeamModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { ModalProps, optionType } from "types";

interface ChangeTeamProps extends ModalProps {
  name: string;
  id: string;

  callback: () => void;
  teamsOptions: {
    loading: boolean;
    options: optionType[];
  };
}
const ChangeTeam = (props: ChangeTeamProps) => {
  const { callback, id, close, teamsOptions } = props;

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

  return (
    <ChangeTeamModal
      submit={handleAddToTeam}
      handleSetTeam={handleSetTeam}
      loading={addStatus.isPending}
      {...props}
      teams={teamsOptions}
    />
  );
};

export { ChangeTeam };
