import { deleteOrgBranchService } from "api";
import { ConfirmationModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { BranchesDataProps, ModalProps } from "types";

interface Props extends ModalProps {
  id: string;
  name: string;
  callback: () => void;
}

const DeleteBranch: React.FC<Props> = ({ show, close, id, name, callback }) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const submit = () => {
    run(deleteOrgBranchService({ id }));
  };

  useMemo(() => {
    if (response?.status === 202) {
      toast({
        description: response?.data?.message
      });
      callback();
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
      <ConfirmationModal
        text={
          <>
            The branch is empty and can be deleted. Are you sure you want to delete{" "}
            <b className="text-vobb-neutral-100">{name}</b> branch?
          </>
        }
        handleContinue={submit}
        close={close}
        show={show}
        isDestructive
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { DeleteBranch };
