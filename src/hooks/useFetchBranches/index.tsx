import { fetchOrgBranchesService } from "api";
import { useApiRequest } from "../useApiRequest";
import { useMemo } from "react";
import { useUserContext } from "context";
import { BranchesDataProps, MetaDataProps, OrganisationBranchesProps } from "types";

const defaultBranchesData: BranchesDataProps = {
  branchesArray: [],
  branchesMetaData: {
    currentPage: 1,
    totalCount: 15,
    totalPages: 0
  }
};
export const useFetchBranches = () => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const { handleUpdateBranches } = useUserContext();

  const fetchOrgBranches = ({ page, limit }) => run(fetchOrgBranchesService({ page, limit }));

  const branches = useMemo<BranchesDataProps>(() => {
    if (response?.status === 200) {
      const data = response.data.data.branches.map((item) => ({
        id: item._id,
        name: item.name,
        country: item.country,
        zipCode: item.zip_code,
        province: item.state,
        isPrimary: item.is_primary,
        addressLine1: item.address_line_1,
        addressLine2: item.address_line_2 ?? "",
        city: item.city
      }));
      const branchesArray = data.sort((a, b) => a.name.localeCompare(b.name));
      const branchesMetaData = {
        currentPage: response?.data?.data?.page ?? 1,
        totalPages: response?.data?.data?.total_pages,
        totalCount: response?.data?.data?.total_count
      };
      handleUpdateBranches({ branchesArray, branchesMetaData });
      return { branchesArray, branchesMetaData };
    }

    return defaultBranchesData;
  }, [response, error]);

  const { branchesArray } = branches;
  return { fetchOrgBranches, branchesArray, loadingOrg: requestStatus.isPending };
};
