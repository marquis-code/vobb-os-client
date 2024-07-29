import { ConfirmationModal } from "components";
import { ModalProps } from "types";

interface RemoveMemberBranchProps extends ModalProps {
  id: string;
  branch: string;
  name: string;
}

const RemoveMemberBranch = ({ show, close, id, branch, name }: RemoveMemberBranchProps) => {
  const handleContinue = () => {
    console.log(id, name, branch);
  };

  return (
    <>
      <ConfirmationModal
        text={
          <>
            Are you sure you want to remove <b>{name}</b> from <b>{branch}</b>?
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

export { RemoveMemberBranch };
