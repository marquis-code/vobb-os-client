import { resendInviteToMemberService } from "api";
import { ConfirmationModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface ResendInvitationProps extends ModalProps {
  id: string;
  email: string;
  callback: () => void;
}

const ResendInvitation = ({ show, close, id, email, callback }: ResendInvitationProps) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const handleContinue = () => {
    run(resendInviteToMemberService({ id }));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      callback();
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
            The invitation to <b>{email}</b> will be resent
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

export { ResendInvitation };
