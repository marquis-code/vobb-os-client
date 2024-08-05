import { transferAllMembersToBranchService, transferMultipleMembersToBranchService } from "api";
import { toast, TransferMemberModal } from "components";
import { useApiRequest, useFetchBranches } from "hooks";
import { useEffect, useMemo } from "react";
import { ModalProps, optionType } from "types";

interface Props extends ModalProps {
  id: string;
  transferIds: string[] | undefined;
  handleTransfer?: () => void;
  callback?: () => void;
  fetchBranchMembers: () => void;
  type: "member" | "branch";
}

const TransferMember: React.FC<Props> = ({
  show,
  close,
  id,
  transferIds,
  fetchBranchMembers,
  callback,
  handleTransfer
}) => {
  const { orgBranches, fetchOrgBranches, loadingBranches } = useFetchBranches({});
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
      callback?.();
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
      callback?.();
      handleTransfer?.();
      close();
    } else if (allError) {
      toast({
        variant: "destructive",
        description: allError?.response?.data?.error
      });
    }
  }, [allResponse, allError]);

  useEffect(() => {
    fetchOrgBranches({ page: 1 });
  }, []);
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
        loadingBranches={loadingBranches}
      />
    </>
  );
};

export { TransferMember };
