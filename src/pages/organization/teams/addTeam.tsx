import { ModalProps } from "types";
import { AddTeamData, AddTeamModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { createTeamRequestBody, createTeamService } from "api";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

interface AddTeamProps extends ModalProps {
  callback?: (id: string) => void;
}

const AddTeam: React.FC<AddTeamProps> = (props) => {
  const { close } = props;
  const navigate = useNavigate();
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const handleSubmit = (data: AddTeamData) => {
    const { name, icon, description, isGeneral, joinTeam } = data;
    const requestBody: createTeamRequestBody = {
      name,
      icon,
      ...(description && description !== "" && { description }),
      ...(isGeneral && { general: isGeneral }),
      ...(joinTeam && { join_team: joinTeam })
    };

    run(createTeamService(requestBody));
  };

  useMemo(() => {
    if (response?.status === 201) {
      toast({
        description: response?.data?.message
      });
      const newTeamId = response?.data?.data?.team;
      navigate(`${Routes.team(newTeamId)}?new=true`);
      close();
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
