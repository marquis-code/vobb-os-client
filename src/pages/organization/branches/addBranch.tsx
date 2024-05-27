import { addNewOrgBranchService } from "api";
import { AddBranchModal, toast } from "components";
import { useUserContext } from "context";
import { useApiRequest, useFetchBranches } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

const AddBranch: React.FC<ModalProps> = ({ show, close }) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const { fetchOrgBranches } = useFetchBranches();
  const { orgBranches } = useUserContext();
  const { currentPage: page, totalCount: limit } = orgBranches?.branchesMetaData || {
    currentPage: 1,
    totalCount: 15,
    totalPages: 0
  };

  const submit = (data) => {
    run(addNewOrgBranchService(data));
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      fetchOrgBranches({ page, limit });
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <AddBranchModal
        show={show}
        close={close}
        submit={console.log}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { AddBranch };
