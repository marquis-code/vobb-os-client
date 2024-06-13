import { OrgBranchesUI } from "modules";
import { useCallback, useState } from "react";
import { AddBranch } from "./addBranch";
import { EditBranch } from "./editBranch";
import { ConfirmationModal } from "components";
import { PreventDeleteBranch } from "./preventDeleteBranch";
import { DeleteBranch } from "./deleteBranch";
import { previousDay } from "date-fns";

const OrgBranches = () => {
  const [confirm, setConfirm] = useState(false);
  const [addBranch, setAddBranch] = useState(false);
  const [editBranch, setEditBranch] = useState({ show: false, id: "" });
  const [deleteBranch, setDeleteBranch] = useState({ show: false, id: "", name: "" });

  const handleEditBranch = (id: string) => {
    setEditBranch({ show: true, id });
  };

  const handleDeleteBranch = () => {
    setConfirm(true);
  };

  const handleInitiateDeleteBranch = (id: string, name: string) => {
    setDeleteBranch({ id, name, show: true });
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
      <PreventDeleteBranch
        {...deleteBranch}
        handleDeleteBranch={handleDeleteBranch}
        close={() => setDeleteBranch((prev) => ({ ...prev, show: false }))}
        handleOpen={() => setDeleteBranch((prev) => ({ ...prev, show: true }))}
      />
      <DeleteBranch {...deleteBranch} close={handleCloseConfirmation} show={confirm} />
      <AddBranch show={addBranch} close={() => setAddBranch(false)} />
      <EditBranch {...editBranch} close={() => setEditBranch({ show: false, id: "" })} />
      <OrgBranchesUI
        handleAddBranch={handleAddBranch}
        handleEditBranch={handleEditBranch}
        handleDeleteBranch={handleInitiateDeleteBranch}
        handlePrimaryBranch={handlePrimaryBranch}
      />
    </>
  );
};

export { OrgBranches };
