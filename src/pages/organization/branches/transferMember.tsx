import { transferAllMembersToBranchService, transferMultipleMembersToBranchService } from "api";
import { toast, TransferMemberModal } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { BranchesDataProps, ModalProps, optionType } from "types";

interface Props extends ModalProps {
  id: string;
  transferIds: string[] | undefined;
  handleTransfer?: () => void;
  fetchOrgBranches?: ({ page, limit }) => void;
  fetchBranchMembers: () => void;
  type: "member" | "branch";
  orgBranches?: BranchesDataProps;
}

const TransferMember: React.FC<Props> = ({
  show,
  close,
  id,
  transferIds,
  fetchBranchMembers,
  fetchOrgBranches,
  handleTransfer,
  orgBranches
}) => {
  const {
    run: runTransferMultiple,
    data: multipleResponse,
    requestStatus: multipleStatus,
    error: multipleError
  } = useApiRequest({});

  const {
    run: runTransferAll,
    data: allResponse,
    requestStatus: allStatus,
    error: allError
  } = useApiRequest({});

  const handleTransferMultiple = (data: optionType) => {
    runTransferMultiple(
      transferMultipleMembersToBranchService({
        oldBranch: id,
        newBranch: data.value,
        members: transferIds
      })
    );
  };

  const handleTransferAll = (data: optionType) => {
    runTransferAll(
      transferAllMembersToBranchService({
        oldBranch: id,
        newBranch: data.value
      })
    );
  };

  useMemo(() => {
    if (multipleResponse?.status === 200) {
      toast({
        description: multipleResponse?.data?.message
      });
      fetchBranchMembers();
      fetchOrgBranches?.({ page: 1, limit: 20 });
      handleTransfer?.();
      close();
    } else if (multipleError) {
      toast({
        variant: "destructive",
        description: multipleError?.response?.data?.error
      });
    }
  }, [multipleResponse, multipleError]);

  useMemo(() => {
    if (allResponse?.status === 200) {
      toast({
        description: allResponse?.data?.message
      });
      fetchBranchMembers();
      fetchOrgBranches?.({ page: 1, limit: 20 });
      handleTransfer?.();
      close();
    } else if (allError) {
      toast({
        variant: "destructive",
        description: allError?.response?.data?.error
      });
    }
  }, [allResponse, allError]);
  return (
    <>
      <TransferMemberModal
        show={show}
        close={close}
        submit={transferIds?.length ? handleTransferMultiple : handleTransferAll}
        branchId={id}
        multiple={transferIds ? transferIds.length > 1 : false}
        loading={multipleStatus.isPending || allStatus.isPending}
        orgBranches={orgBranches}
      />
    </>
  );
};

export { TransferMember };
