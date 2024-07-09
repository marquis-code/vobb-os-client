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
  handleDeleteBranch
}) => {
  const [transfer, setTransfer] = useState<{ show: boolean; memberIds?: string[] }>({
    show: false
  });

  const handleSetIds = (selectedIds: string[]) => {
    setTransfer((prev) => ({ ...prev, memberIds: selectedIds }));
  };

  const handleTransfer = () => {
    transfer.memberIds ? handleOpen() : handleDeleteBranch();
    setTransfer({ show: false });
  };
  const { run: runFetch, data: fetchResponse } = useApiRequest({});

  const fetchBranchMembers = () => {
    runFetch(fetchOrgBranchMembersService(id, { page: 1, limit: 10 }));
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
        close={close}
        handleContinue={(_, memberIds) => {
          setTransfer((prev) => ({ ...prev, show: true }));
          close();
        }}
        name={name}
        branchMembers={branchMembers}
        handleSetIds={handleSetIds}
      />
      <TransferMember
        id={id}
        transferIds={transfer.memberIds}
        handleTransfer={handleTransfer}
        fetchBranchMembers={fetchBranchMembers}
        close={() => {
          setTransfer((prev) => ({ ...prev, show: false }));
          handleOpen();
        }}
        show={transfer.show}
        type={transfer.memberIds ? "member" : "branch"}
      />
    </>
  );
};

export { PreventDeleteBranch };
