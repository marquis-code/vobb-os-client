import { PreventDeleteBranchModal } from "components";
import { ModalProps } from "types";
import { TransferMember } from "./transferMember";
import { useEffect, useMemo, useState } from "react";
import { useApiRequest } from "hooks";
import { fetchOrgBranchMembersService } from "api";

interface Props extends ModalProps {
  id: string;
  name: string;
  handleDeleteBranch: () => void;
  handleOpen: () => void;
  fetchOrgBranches: ({ page, limit }) => void;
}

export interface BranchMemberData {
  name: string;
  id: string;
  teams: string[];
}

const PreventDeleteBranch: React.FC<Props> = ({
  show,
  close,
  id,
  name,
  handleOpen,
  handleDeleteBranch,
  fetchOrgBranches
}) => {
  const { run: runFetch, data: fetchResponse, requestStatus } = useApiRequest({});
  const [transfer, setTransfer] = useState<{ show: boolean; memberIds?: string[] }>({
    show: false
  });

  const handleTransfer = () => {
    if (!requestStatus.isPending) {
      handleDeleteBranch();
      setTransfer({ show: false });
    }
  };

  const fetchBranchMembers = () => {
    runFetch(fetchOrgBranchMembersService(id));
  };

  const branchMembers = useMemo<BranchMemberData[]>(() => {
    if (fetchResponse?.status === 200) {
      const propertiesArray = fetchResponse?.data?.data?.members.map((item) => ({
        name: item.name,
        id: item._id,
        teams: item.teams.map((team) => team.name)
      }));

      return propertiesArray;
    }

    return [];
  }, [fetchResponse]);

  useEffect(() => {
    if (id) fetchBranchMembers();
  }, [id]);

  return (
    <>
      <PreventDeleteBranchModal
        show={show}
        close={() => {
          close();
          setTransfer((prev) => ({ ...prev, memberIds: [] }));
        }}
        handleContinue={(_, memberIds) => {
          setTransfer({ show: true, memberIds });
          close();
        }}
        name={name}
        branchMembers={branchMembers}
        loading={requestStatus.isPending}
      />
      <TransferMember
        id={id}
        transferIds={transfer.memberIds}
        fetchOrgBranches={fetchOrgBranches}
        handleTransfer={handleTransfer}
        fetchBranchMembers={fetchBranchMembers}
        close={() => {
          setTransfer({ memberIds: [], show: false });
        }}
        show={transfer.show}
        type={transfer.memberIds ? "member" : "branch"}
      />
    </>
  );
};

export { PreventDeleteBranch };
