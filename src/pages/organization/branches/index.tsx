import { OrgBranchesUI } from "modules";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddBranch } from "./addBranch";
import { EditBranch } from "./editBranch";
import { toast } from "components";
import { useApiRequest } from "hooks";
import { useCountriesContext } from "context";
import { BranchesDataProps, OrganisationBranchesData } from "types";
import { fetchOrgBranchesService, markBranchAsPrimaryService } from "api";
import { PreventDeleteBranch } from "./preventDeleteBranch";
import { DeleteBranch } from "./deleteBranch";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
export const initBranchData = {
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

const defaultBranchesData: BranchesDataProps = {
  branchesArray: [],
  branchesMetaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  }
};
const OrgBranches = () => {
  const navigate = useNavigate();
  const { run: runPrimary, data: primaryResponse, error: primaryError } = useApiRequest({});
  const {
    run: runFetchBranches,
    data: fetchResponse,
    requestStatus: fetchBranchStatus,
    error: fetchError
  } = useApiRequest({});
  const { countries } = useCountriesContext();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [confirm, setConfirm] = useState(false);
  const [preventDelete, setPreventDelete] = useState(false);
  const [addBranch, setAddBranch] = useState(false);
  const [editBranch, setEditBranch] = useState({ show: false, branchData: initBranchData });

  const [deleteBranch, setDeleteBranch] = useState({
    id: "",
    name: "",
    hasMembers: false
  });

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

  const fetchOrgBranches = ({ page, limit }) =>
    runFetchBranches(fetchOrgBranchesService({ page, limit }));

  const orgBranches = useMemo<BranchesDataProps>(() => {
    if (fetchResponse?.status === 200) {
      const data = fetchResponse.data.data.branches.map((item) => ({
        id: item._id,
        name: item.name,
        country: countries.find((country) => country.value === item.country)?.label,
        zipCode: item.zip_code,
        province: item.state,
        isPrimary: item.is_primary,
        addressLine1: item.address_line_1,
        addressLine2: item.address_line_2 ?? "",
        city: item.city,
        timeZone: item.timezone ?? "",
        hasMembers: item.member_exists
      }));
      const branchesArray = data.sort((a, b) => a.name.localeCompare(b.name));
      const branchesMetaData = {
        currentPage: fetchResponse?.data?.data?.page ?? 1,
        totalPages: fetchResponse?.data?.data?.total_pages,
        totalCount: fetchResponse?.data?.data?.total_count,
        pageLimit: limit
      };
      return { branchesArray, branchesMetaData };
    }

    return defaultBranchesData;
  }, [fetchResponse, fetchError]);

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
        handleAddBranch={handleAddBranch}
        handleEditBranch={handleEditBranch}
        handleDeleteBranch={handleInitiateDeleteBranch}
        handlePrimaryBranch={handlePrimaryBranch}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        loading={fetchBranchStatus.isPending}
        handleViewBranch={handleViewBranch}
        orgBranches={orgBranches}
      />
    </>
  );
};

export { OrgBranches };
export * from "./branch";
