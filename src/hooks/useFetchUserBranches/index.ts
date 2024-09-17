import { fetchUserBranchesService } from "api";
import { useCountriesContext } from "context";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { PaginationProps, UserBranchesDataProps } from "types";

const defaultBranchesData: UserBranchesDataProps = {
  branchesArray: [],
  branchesMetaData: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    pageLimit: 0
  }
};

export const useFetchUserBranches = ({ limit, search }: { limit?: number; search?: string }) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const { countries } = useCountriesContext();

  const fetchUserBranches = ({ page, limit, search }: PaginationProps) => {
    run(fetchUserBranchesService({ page, limit, search }));
  };

  const userBranches = useMemo<UserBranchesDataProps>(() => {
    if (response?.status === 200) {
      const data = response.data.data.branches.map((item) => ({
        id: item._id,
        branch: item.branch,
        country: countries.find((country) => country.value === item.country)?.label,
        province: item.state,
        city: item.city,
        date: item.time,
        time: item.date_added
      }));
      const branchesArray = data;
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

  return { userBranches, fetchUserBranches, loading: requestStatus.isPending };
};
