import { ConfirmationModal } from "components";
import { ModalProps } from "types";

interface ResendInvitationProps extends ModalProps {
  id: string;
  email: string;
}

const ResendInvitation = ({ show, close, id, email }: ResendInvitationProps) => {
  const handleContinue = () => {
    console.log(id, email);
  };

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
        loading={false}
      />
    </>
  );
};

export { ResendInvitation };
