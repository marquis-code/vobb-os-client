import { OrgBranchesUI } from "modules";
import { useState } from "react";
import { AddBranch } from "./addBranch";
import { EditBranch } from "./editBranch";

const OrgBranches = () => {
  const [addBranch, setAddBranch] = useState(false);
  const [editBranch, setEditBranch] = useState({ show: false, id: "" });

  return (
    <>
      <AddBranch show={addBranch} close={() => setAddBranch(false)} />
      <EditBranch {...editBranch} close={() => setEditBranch({ show: false, id: "" })} />
      <OrgBranchesUI />
    </>
  );
};

export { OrgBranches };
