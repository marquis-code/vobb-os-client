import { OrgBranchesUI } from "modules";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddBranch } from "./addBranch";
import { EditBranch } from "./editBranch";
import { ConfirmationModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useCountriesContext, useUserContext } from "context";
import { BranchesDataProps, OrganisationBranchesData } from "types";
import { fetchOrgBranchesService, markBranchAsPrimaryService } from "api";
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

const defaultBranchesData: BranchesDataProps = {
  branchesArray: [],
  branchesMetaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
  }
};
const OrgBranches = () => {
  const {
    run: runPrimary,
    data: primaryResponse,
    requestStatus: primaryStatus,
    error: primaryError
  } = useApiRequest({});
  const { orgBranches } = useUserContext();
  const { currentPage, totalCount } = orgBranches?.branchesMetaData || {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
  };
  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(totalCount);
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

  const {
    run: runFetchBranches,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError
  } = useApiRequest({});
  const { countries } = useCountriesContext();
  const { handleUpdateBranches } = useUserContext();

  const fetchOrgBranches = ({ page, limit }) =>
    runFetchBranches(fetchOrgBranchesService({ page, limit }));

  useMemo<BranchesDataProps>(() => {
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
        timeZone: item.timezone ?? ""
      }));
      const branchesArray = data.sort((a, b) => a.name.localeCompare(b.name));
      const branchesMetaData = {
        currentPage: fetchResponse?.data?.data?.page ?? 1,
        totalPages: fetchResponse?.data?.data?.total_pages,
        totalCount: fetchResponse?.data?.data?.total_count
      };
      handleUpdateBranches({ branchesArray, branchesMetaData });
      return { branchesArray, branchesMetaData };
    }

    return defaultBranchesData;
  }, [fetchResponse, fetchError]);

  useEffect(() => {
    fetchOrgBranches({ page, limit });
  }, [page, limit]);
  return (
    <>
      <ConfirmationModal
        text={"Are you sure you want to delete xxx branch?"}
        handleContinue={console.log}
        close={handleCloseConfirmation}
        show={confirm}
        isDestructive
      />
      <AddBranch
        show={addBranch}
        close={() => setAddBranch(false)}
        fetchOrgBranches={fetchOrgBranches}
      />
      <EditBranch
        {...editBranch}
        close={() => setEditBranch({ show: false, branchData: initBranchData })}
        fetchOrgBranches={fetchOrgBranches}
      />
      <OrgBranchesUI
        handleAddBranch={handleAddBranch}
        handleEditBranch={handleEditBranch}
        handleDeleteBranch={handleDeleteBranch}
        handlePrimaryBranch={handlePrimaryBranch}
        setPage={setPage}
        setLimit={setLimit}
      />
    </>
  );
};

export { OrgBranches };
