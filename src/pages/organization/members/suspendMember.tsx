import { ConfirmationModal } from "components";
import { ModalProps } from "types";

interface SuspendMemberProps extends ModalProps {
  id: string;
  name: string;
}

const SuspendMember = ({ show, close, id, name }: SuspendMemberProps) => {
  const handleContinue = () => {
    console.log(id, name);
  };

  return (
    <>
      <ConfirmationModal
        text={<>Are you sure you want to suspend <b>{name}</b>?</>}
        handleContinue={handleContinue}
        close={close}
        show={show}
      />
    </>
  );
};

export { SuspendMember };
