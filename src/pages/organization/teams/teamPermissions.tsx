import { setTeamPermissionsService } from "api";
import { TeamPermissionsModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface TeamPermissionsProps extends ModalProps {
  teamId: string;
}

const TeamPermissions: React.FC<TeamPermissionsProps> = (props) => {
  const { teamId, close } = props;
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const submit = () => {
    //placeholder permissions to enable team creation to be completed
    const requestBody = {
      create: {
        manager: true,
        lead: true,
        member: true
      },
      view: {
        manager: true,
        lead: true,
        member: true
      },
      modify: {
        manager: true,
        lead: true,
        member: true
      },
      delete: {
        manager: true,
        lead: true,
        member: true
      }
    };
    run(setTeamPermissionsService(teamId, requestBody));
  };

  useMemo(() => {
    if (response?.status === 201) {
      toast({
        description: response?.data?.message
      });
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
      <TeamPermissionsModal submit={submit} loading={requestStatus.isPending} {...props} />
    </>
  );
};

export { TeamPermissions };
