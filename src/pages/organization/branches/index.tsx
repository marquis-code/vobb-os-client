import { OrgBranchesUI } from "modules";
import { useCallback, useState } from "react";
import { AddBranch } from "./addBranch";
import { EditBranch } from "./editBranch";
import { PreventDeleteBranch } from "./preventDeleteBranch";
import { DeleteBranch } from "./deleteBranch";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const OrgBranches = () => {
  const navigate = useNavigate();
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

  const handleViewBranch = (id: string) => {
    navigate(Routes.branch(id));
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
        handleViewBranch={handleViewBranch}
      />
    </>
  );
};

export { OrgBranches };
export * from "./branch";
