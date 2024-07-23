import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";
import { TeamDataProps } from ".";
// import { createTeamRequestBody, createTeamService, editATeamService } from "api";
import { AddTeamData, AddTeamModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { createTeamRequestBody, createTeamService, editATeamService } from "api";

interface AddTeamProps extends ModalProps {
  callback: () => void;
  teamData: TeamDataProps | null;
  loadingTeam: boolean;
  handleSetTeamId: (id: string) => void;
  fetchAllTeams: () => void;
}

const AddTeam: React.FC<AddTeamProps> = (props) => {
  const { callback, handleSetTeamId, fetchAllTeams, teamData, close } = props;
  const {
    run: runAdd,
    data: addResponse,
    error: addError,
    requestStatus: addStatus
  } = useApiRequest({});
  const {
    run: runEdit,
    data: editResponse,
    error: editError,
    requestStatus: editStatus
  } = useApiRequest({});

  const handleSubmit = (data: AddTeamData) => {
    let requestBody: createTeamRequestBody = {};
    if (data.name !== "") {
      requestBody.name = data.name;
    }
    if (data.icon !== "") {
      requestBody.icon = data.icon;
    }
    if (data.description !== "") {
      requestBody.description = data.description;
    }
    if (data.isGeneral) {
      requestBody.general = data.isGeneral;
    }
    if (data.joinTeam) {
      requestBody.join_team = data.joinTeam;
    }

    teamData
      ? runEdit(editATeamService(teamData.id, requestBody))
      : runAdd(createTeamService(requestBody));
  };
  const navigate = useNavigate();
  //  const handleSubmit = (data) => {
  //    console.log(data);
  //    navigate(Routes.team("1234"));
  //  };
  useMemo(() => {
    if (addResponse?.status === 201) {
      toast({
        description: addResponse?.data?.message
      });
      fetchAllTeams();
      callback();
      handleSetTeamId(addResponse?.data?.data?.team);
    } else if (addError) {
      toast({
        variant: "destructive",
        description: addError?.response?.data?.error
      });
    }
  }, [addResponse, addError]);

  useMemo(() => {
    if (editResponse?.status === 200) {
      toast({
        description: editResponse?.data?.message
      });
      fetchAllTeams();
      close();
    } else if (editError) {
      toast({
        variant: "destructive",
        description: editError?.response?.data?.error
      });
    }
  }, [editResponse, editError]);
  return (
    <>
      <AddTeamModal
        submit={handleSubmit}
        loading={addStatus.isPending || editStatus.isPending}
        {...props}
        initData={teamData}
      />
    </>
  );
};

export { AddTeam };
