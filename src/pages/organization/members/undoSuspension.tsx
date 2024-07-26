import { ConfirmationModal } from "components";
import { ModalProps } from "types";

interface UndoSuspensionProps extends ModalProps {
  id: string;
  name: string;
}

const UndoSuspension = ({ show, close, id, name }: UndoSuspensionProps) => {
  const handleContinue = () => {
    console.log(id, name);
  };

  return (
    <>
      <ConfirmationModal
        text={
          <>
            Are you sure you want to undo the suspension for <b>{name}</b>?
          </>
        }
        handleContinue={handleContinue}
        close={close}
        show={show}
      />
    </>
  );
};

export { UndoSuspension };
