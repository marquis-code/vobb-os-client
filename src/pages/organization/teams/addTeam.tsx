import { createTeamRequestBody, createTeamService } from "api";
import { AddTeamData, AddTeamModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface AddTeamProps extends ModalProps {
  callback: () => void;
  handleSetTeamId: (id: string) => void;
  fetchAllTeams: () => void;
}

const AddTeam: React.FC<AddTeamProps> = (props) => {
  const { callback, handleSetTeamId, fetchAllTeams } = props;
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const handleSubmit = (data: AddTeamData) => {
    let requestBody: createTeamRequestBody = {
      name: data.name
      // icon: data.icon
    };
    if (data.description !== "") {
      requestBody.description = data.description;
    }
    if (data.isGeneral) {
      requestBody.general = data.isGeneral;
    }
    if (data.joinTeam) {
      requestBody.join_team = data.joinTeam;
    }
    run(createTeamService(requestBody));
  };

  useMemo(() => {
    if (response?.status === 201) {
      toast({
        description: response?.data?.message
      });
      fetchAllTeams();
      callback();
      handleSetTeamId(response?.data?.data?.team);
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);
  return (
    <>
      <AddTeamModal submit={handleSubmit} loading={requestStatus.isPending} {...props} />
    </>
  );
};

export { AddTeam };
