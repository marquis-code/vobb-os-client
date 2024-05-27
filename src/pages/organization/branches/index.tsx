import { OrgBranchesUI } from "modules";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddBranch } from "./addBranch";
import { EditBranch } from "./editBranch";
import { ConfirmationModal, toast } from "components";
import { useApiRequest, useFetchBranches } from "hooks";
import { useUserContext } from "context";
import { OrganisationBranchesData } from "types";
import { markBranchAsPrimaryService } from "api";
const initBranchData = {
  id: "",
  name: "",
  country: "",
  province: "",
  city: "",
  timeZone: "",
  zipCode: "",
  addressLine1: "",
  addressLine2: "",
  isPrimary: false
};
const OrgBranches = () => {
  const {
    run: runPrimary,
    data: primaryResponse,
    requestStatus: primaryStatus,
    error: primaryError
  } = useApiRequest({});
  const { fetchOrgBranches } = useFetchBranches();
  const { orgBranches } = useUserContext();
  const { currentPage, totalCount } = orgBranches?.branchesMetaData || {
    currentPage: 1,
    totalCount: 15,
    totalPages: 0
  };
  const [confirm, setConfirm] = useState(false);
  const [addBranch, setAddBranch] = useState(false);
  const [editBranch, setEditBranch] = useState({ show: false, branchData: initBranchData });

  const handleEditBranch = (branchData: OrganisationBranchesData) => {
    setEditBranch({ show: true, branchData });
  };

  const handleDeleteBranch = (id: string) => {
    setConfirm(true);
  };

  const handlePrimaryBranch = useCallback((id: string) => {
    runPrimary(markBranchAsPrimaryService(id));
  }, []);

  const handleAddBranch = () => {
    setAddBranch(true);
  };

  const handleCloseConfirmation = () => {
    setConfirm(false);
  };

  useMemo(() => {
    if (primaryResponse?.status === 200) {
      toast({
        description: primaryResponse?.data?.message
      });
      fetchOrgBranches({ page: currentPage, limit: totalCount });
    } else if (primaryError) {
      toast({
        variant: "destructive",
        description: primaryError?.response?.data?.error
      });
    }
  }, [primaryResponse, primaryError]);

  useEffect(() => {
    fetchOrgBranches({ page: currentPage, limit: totalCount });
  }, []);
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
      <EditBranch
        {...editBranch}
        close={() => setEditBranch({ show: false, branchData: initBranchData })}
      />
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
