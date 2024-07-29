import { AddTeamData, EditTeamModal, toast } from "components";
import { ModalProps, SingleTeamResponseProps } from "types";
import { editATeamService, fetchATeamService } from "api";
import { useApiRequest, useFetchTeams } from "hooks";
import { useEffect, useMemo } from "react";

interface EditTeamProps extends ModalProps {
  show: boolean;
  id: string;
}

const EditTeam = (props: EditTeamProps) => {
  const { id, close } = props;
  const { fetchAllTeams } = useFetchTeams({ limit: 20 });
  const { run: runFetchATeam, data: teamResponse, requestStatus: teamStatus } = useApiRequest({});
  const {
    run: runEditTeam,
    data: editResponse,
    error: editError,
    requestStatus: editStatus
  } = useApiRequest({});

  const fetchATeam = () => {
    runFetchATeam(fetchATeamService(id));
  };

  const handleSubmit = (data: AddTeamData) => {
    runEditTeam(editATeamService(id, data));
  };

  const teamData = useMemo<SingleTeamResponseProps>(() => {
    if (teamResponse?.status === 200) {
      const item = teamResponse?.data?.data;
      const propertyArray = {
        id: item._id,
        icon: item.icon,
        name: item.name,
        description: item.description,
        isGeneral: item.general
      };

      return propertyArray;
    }
    return {
      id: "",
      icon: "",
      name: "",
      description: "",
      isGeneral: true
    };
  }, [teamResponse]);

  useMemo(() => {
    if (editResponse?.status === 200) {
      toast({
        description: editResponse?.data?.message
      });
      fetchAllTeams({});
      close();
    } else if (editError) {
      toast({
        variant: "destructive",
        description: editError?.response?.data?.error
      });
    }
  }, [editResponse, editError]);

  useEffect(() => {
    if (id) fetchATeam();
  }, [id]);
  return (
    <>
      <EditTeamModal
        initData={{
          name: teamData.name,
          description: teamData.description,
          icon: teamData.icon,
          isGeneral: teamData.isGeneral
        }}
        submit={handleSubmit}
        {...props}
        loading={teamStatus.isPending}
        loadingEdit={editStatus.isPending}
      />
    </>
  );
};

export { EditTeam };
