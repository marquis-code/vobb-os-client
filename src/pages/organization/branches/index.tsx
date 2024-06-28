import { OrgBranchesUI } from "modules";
import { useCallback, useState } from "react";
import { AddBranch } from "./addBranch";
import { EditBranch } from "./editBranch";
import { ConfirmationModal } from "components";

const OrgBranches = () => {
  const [confirm, setConfirm] = useState(false);
  const [addBranch, setAddBranch] = useState(false);
  const [editBranch, setEditBranch] = useState({ show: false, id: "" });

  const handleEditBranch = (id: string) => {
    setEditBranch({ show: true, id });
  };

  const handleDeleteBranch = (id: string) => {
    setConfirm(true);
  };

  const handlePrimaryBranch = useCallback((id: string) => {
    console.log("primary", id);
    // ...
  }, []);

  const handleAddBranch = () => {
    setAddBranch(true);
  };

  const handleCloseConfirmation = () => {
    setConfirm(false);
  };

  return (
    <>
      <ConfirmationModal
        text={"Are you sure you want to delete xxx branch?"}
        handleContinue={console.log}
        close={handleCloseConfirmation}
        show={confirm}
        isDestructive
      />
      <AddBranch show={addBranch} close={() => setAddBranch(false)} />
      <EditBranch {...editBranch} close={() => setEditBranch({ show: false, id: "" })} />
      <OrgBranchesUI
        handleAddBranch={handleAddBranch}
        handleEditBranch={handleEditBranch}
        handleDeleteBranch={handleDeleteBranch}
        handlePrimaryBranch={handlePrimaryBranch}
      />
    </>
  );
};

export { OrgBranches };
