import { setTeamPermissionsService } from "api";
import { TeamPermissionsModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface TeamPermissionsProps extends ModalProps {
  teamId: string;
}

const TeamPermissions: React.FC<TeamPermissionsProps> = (props) => {
  const { teamId } = props;
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const submit = (data) => {
    console.log(data);
    // run(setTeamPermissionsService(teamId, {

    // }))
  };

  useMemo(() => {
    if (response?.status === 201) {
      toast({
        description: response?.data?.message
      });
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <TeamPermissionsModal submit={submit} loading={requestStatus.isPending} {...props} />
    </>
  );
};

export { TeamPermissions };
