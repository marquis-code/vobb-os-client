import { fetchOrgBranchesService } from "api";
import { useCountriesContext } from "context";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo } from "react";
import { BranchesDataProps, PaginationProps } from "types";

const defaultBranchesData: BranchesDataProps = {
  branchesArray: [],
  branchesMetaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  }
};

export const useFetchBranches = ({ limit, search }: { limit?: number; search?: string }) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const { countries } = useCountriesContext();

  const fetchOrgBranches = ({ page, limit, search }: PaginationProps) =>
    run(fetchOrgBranchesService({ page, limit, search }));

  const orgBranches = useMemo<BranchesDataProps>(() => {
    if (response?.status === 200) {
      const data = response.data.data.branches.map((item) => ({
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
        currentPage: response?.data?.data?.page ?? 1,
        totalPages: response?.data?.data?.total_pages,
        totalCount: response?.data?.data?.total_count,
        pageLimit: limit
      };
      return { branchesArray, branchesMetaData };
    }

    return defaultBranchesData;
  }, [response, error]);

  return { orgBranches, fetchOrgBranches, loadingBranches: requestStatus.isPending };
};
