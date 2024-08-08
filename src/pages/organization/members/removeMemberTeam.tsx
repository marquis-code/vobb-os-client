import { removeTeamFromMemberService } from "api";
import { ConfirmationModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ModalProps } from "types";

interface RemoveMemberTeamProps extends ModalProps {
  id: string;
  team: string;
  name: string;
  fetchMemberTeams: () => void;
}

const RemoveMemberTeam = ({
  show,
  close,
  id,
  team,
  name,
  fetchMemberTeams
}: RemoveMemberTeamProps) => {
  const params = useParams();
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const handleContinue = () => {
    if (params.id) run(removeTeamFromMemberService({ member: params.id, team: id }));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      close();
      fetchMemberTeams();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <ConfirmationModal
        text={
          <>
            <p>
              Are you sure you want to remove <b>{name}</b> from the <b>{team}</b> team?
            </p>
            <br />
            <p className="text-xs">
              NB: Branch access is tied to team membership, so removing a user from their only team
              in a branch will remove their access to that branch.
            </p>
          </>
        }
        handleContinue={handleContinue}
        close={close}
        show={show}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { RemoveMemberTeam };
