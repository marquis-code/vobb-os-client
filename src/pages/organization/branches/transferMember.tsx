import { transferMultipleMembersToBranchService } from "api";
import { toast, TransferMemberModal } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps, optionType } from "types";

interface Props extends ModalProps {
  id: string;
  transferIds: string[] | undefined;
  handleTransfer: () => void;
  fetchBranchMembers: () => void;
  type: "member" | "branch";
}

const TransferMember: React.FC<Props> = ({ show, close, id, transferIds, fetchBranchMembers }) => {
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
      fetchBranchMembers();
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
