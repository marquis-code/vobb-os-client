import { deleteOrgBranchService } from "api";
import { ConfirmationModal, toast } from "components";
import { useUserContext } from "context";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface Props extends ModalProps {
  id: string;
  name: string;
  fetchOrgBranches: ({ page, limit }) => void;
}

const DeleteBranch: React.FC<Props> = ({ show, close, id, name, fetchOrgBranches }) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const { orgBranches } = useUserContext();
  const { pageLimit } = orgBranches?.branchesMetaData || {
    pageLimit: 0
  };

  const submit = () => {
    run(deleteOrgBranchService({ id }));
  };

  useMemo(() => {
    if (response?.status === 202) {
      toast({
        description: response?.data?.message
      });
      fetchOrgBranches({ page: 1, limit: pageLimit });
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
