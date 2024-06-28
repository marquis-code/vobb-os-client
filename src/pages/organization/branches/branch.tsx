import { OrgBranchUI } from "modules";
import { useState } from "react";
import { TransferMember } from "./transferMember";

const OrgBranch = () => {
  const [transfer, setTransfer] = useState({ show: false, id: "" });

  const handleTransferMember = (id: string) => {
    setTransfer({ show: true, id });
  };

  return (
    <>
      <TransferMember
        {...transfer}
        type="member"
        handleTransfer={console.log}
        close={() => setTransfer({ show: false, id: "" })}
      />
      <OrgBranchUI handleViewMember={console.log} handleTransferMember={handleTransferMember} />
    </>
  );
};

export { OrgBranch };
