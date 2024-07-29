import { cancelInviteToMemberService } from "api";
import { ConfirmationModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface CancelInvitationProps extends ModalProps {
  id: string;
  email: string;
  fetchMembers: () => void;
}

const CancelInvitation = ({ show, close, id, email, fetchMembers }: CancelInvitationProps) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const handleContinue = () => {
    run(cancelInviteToMemberService({ id }));
  };

  useMemo(() => {
    if (response?.status === 202) {
      toast({
        description: response?.data?.message
      });
      close();
      fetchMembers();
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
            Are you sure you want to cancel the invitation to <b>{email}</b>?
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

export { CancelInvitation };
