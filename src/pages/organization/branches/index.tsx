import { OrgBranchesUI } from "modules";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddBranch } from "./addBranch";
import { EditBranch } from "./editBranch";
import { toast } from "components";
import { useApiRequest } from "hooks";
import { useModalContext } from "context";
import { OrganisationBranchesData } from "types";
import { markBranchAsPrimaryService } from "api";
import { PreventDeleteBranch } from "./preventDeleteBranch";
import { DeleteBranch } from "./deleteBranch";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { useFetchBranches } from "hooks/useFetchBranches";
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
  isPrimary: false,
  hasMembers: false
};

const OrgBranches = () => {
  const navigate = useNavigate();
  const [branchesQueryParams, setBranchesQueryParams] = useState({ page: 1, limit: 20 });
  const { page, limit } = branchesQueryParams;
  const { fetchOrgBranches, loadingBranches, orgBranches } = useFetchBranches({ limit });
  const { run: runPrimary, data: primaryResponse, error: primaryError } = useApiRequest({});
  const { addBranch, setAddBranch } = useModalContext();
  const [confirm, setConfirm] = useState(false);
  const [preventDelete, setPreventDelete] = useState(false);
  const [editBranch, setEditBranch] = useState({ show: false, branchData: initBranchData });

  const [deleteBranch, setDeleteBranch] = useState({
    id: "",
    name: "",
    hasMembers: false
  });

  const handleBranchPagination = (param: string, value: number) => {
    setBranchesQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleEditBranch = (branchData: OrganisationBranchesData) => {
    setEditBranch({ show: true, branchData });
  };

  const handleDeleteBranch = () => {
    setConfirm(true);
  };

  const handlePreventDelete = () => {
    setPreventDelete(true);
  };

  const handleInitiateDeleteBranch = (id: string, name: string, hasMembers: boolean) => {
    setDeleteBranch({ id, name, hasMembers });
    hasMembers ? handlePreventDelete() : handleDeleteBranch();
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
      fetchOrgBranches({ page: 1, limit });
    } else if (primaryError) {
      toast({
        variant: "destructive",
        description: primaryError?.response?.data?.error
      });
    }
  }, [primaryResponse, primaryError]);

  useEffect(() => {
    fetchOrgBranches({ page, limit });
  }, [page, limit]);

  const handleViewBranch = (id: string) => {
    navigate(Routes.branch(id));
  };

  return (
    <>
      <PreventDeleteBranch
        {...deleteBranch}
        handleDeleteBranch={handleDeleteBranch}
        show={preventDelete}
        close={() => setPreventDelete(false)}
        handleOpen={() => setPreventDelete(true)}
        callback={() => fetchOrgBranches({ page: 1, limit })}
      />
      <AddBranch
        show={addBranch}
        close={() => setAddBranch(false)}
        callback={() => fetchOrgBranches({ page: 1, limit })}
      />
      <EditBranch
        {...editBranch}
        close={() => setEditBranch({ show: false, branchData: initBranchData })}
        callback={() => fetchOrgBranches({ page: 1, limit })}
      />
      <DeleteBranch
        {...deleteBranch}
        close={handleCloseConfirmation}
        show={confirm}
        callback={() => fetchOrgBranches({ page: 1, limit })}
      />
      <OrgBranchesUI
        orgBranches={orgBranches}
        loading={loadingBranches}
        handleAddBranch={handleAddBranch}
        handleEditBranch={handleEditBranch}
        handleDeleteBranch={handleInitiateDeleteBranch}
        handlePrimaryBranch={handlePrimaryBranch}
        handlePagination={handleBranchPagination}
        handleViewBranch={handleViewBranch}
      />
    </>
  );
};

export { OrgBranches };
export * from "./branch";
export * from "./addBranch";
