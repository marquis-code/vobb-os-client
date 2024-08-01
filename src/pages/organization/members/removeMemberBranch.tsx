import { removeMemberFromBranchService } from "api";
import { ConfirmationModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ModalProps } from "types";

interface RemoveMemberBranchProps extends ModalProps {
  id: string;
  branch: string;
  name: string;
}

const RemoveMemberBranch = ({ show, close, id, branch, name }: RemoveMemberBranchProps) => {
  const params = useParams();
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const handleContinue = () => {
    if (params.id) run(removeMemberFromBranchService({ member: params.id, branch: id }));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
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
            Are you sure you want to remove <b>{name}</b> from <b>{branch}</b>?
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

export { RemoveMemberBranch };
