import { ConfirmationModal } from "components";
import { ModalProps } from "types";

interface Props extends ModalProps {
  id: string;
  name: string;
}

const DeleteBranch: React.FC<Props> = ({ show, close, id, name }) => {
  return (
    <>
      <ConfirmationModal
        text={
          <>
            The branch is empty and can be deleted. Are you sure you want to delete{" "}
            <b className="text-vobb-neutral-100">{name}</b> branch?
          </>
        }
        handleContinue={console.log}
        close={close}
        show={show}
        isDestructive
        loading={false}
      />
    </>
  );
};

export { DeleteBranch };
