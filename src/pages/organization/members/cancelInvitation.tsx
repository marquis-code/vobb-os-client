import { ConfirmationModal } from "components";
import { ModalProps } from "types";

interface CancelInvitationProps extends ModalProps {
  id: string;
  email: string;
}

const CancelInvitation = ({ show, close, id, email }: CancelInvitationProps) => {
  const handleContinue = () => {
    console.log(id, email);
  };

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
        loading={false}
      />
    </>
  );
};

export { CancelInvitation };
