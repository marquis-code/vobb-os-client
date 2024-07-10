import { transferMultipleMembersToBranchService } from "api";
import { toast, TransferMemberModal } from "components";
import { useUserContext } from "context";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps, optionType } from "types";

interface Props extends ModalProps {
  id: string;
  transferIds: string[] | undefined;
  fetchOrgBranches?: ({ page, limit }) => void;

  fetchBranchMembers: () => void;
  type: "member" | "branch";
}

const TransferMember: React.FC<Props> = ({
  show,
  close,
  id,
  transferIds,
  fetchBranchMembers,
  fetchOrgBranches
}) => {
  const { orgBranches } = useUserContext();
  const { pageLimit } = orgBranches?.branchesMetaData || {
    pageLimit: 0
  };

  const { run, data: response, requestStatus, error } = useApiRequest({});

  const submit = (data: optionType) => {
    run(
      transferMultipleMembersToBranchService({
        oldBranch: id,
        newBranch: data.value,
        members: transferIds
      })
    );
  };

  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      fetchOrgBranches?.({ page: 1, limit: pageLimit });
      fetchBranchMembers();
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
      <TransferMemberModal
        show={show}
        close={close}
        submit={submit}
        branchId={id}
        multiple={transferIds ? transferIds.length > 1 : false}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { TransferMember };
