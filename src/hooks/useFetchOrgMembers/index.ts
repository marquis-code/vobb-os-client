import { fetchOrgMembersService } from "api";
import { useApiRequest } from "../useApiRequest";
import { useMemo } from "react";
import { MemberDataProps } from "types";
import { toast } from "components";
import { getInitials } from "lib";

const initMembersData: MemberDataProps = {
  membersArray: [],
  metaData: {
    currentPage: 1,
    pageLimit: 0,
    totalCount: 0,
    totalPages: 0
  }
};
export const useFetchOrgMembers = ({ limit = 20 }: { limit?: number }) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const fetchOrgMembers = (membersQueryParams) => {
    run(fetchOrgMembersService({ ...membersQueryParams, limit }));
  };
  const orgMembersData = useMemo<MemberDataProps>(() => {
    if (response?.status === 200) {
      const membersArray = response?.data?.data?.members.map((item) => ({
        id: item._id,
        avatar: item.avatar,
        name: item.status === "pending" || item.status === "expired" ? "--" : item.full_name,
        branch:
          Array.isArray(item?.branches) && item.branches.length > 0
            ? item.branches.map((branch) => branch.name)
            : ["Admin"],
        teams:
          Array.isArray(item?.teams) && item.teams.length > 0
            ? item.teams.map((team) => team.name)
            : ["Admin"],
        role: item.role.name,
        email: item.email,
        date: item.date_added ?? "--",
        lastActive: item.last_active ?? "--",
        initial:
          item.status === "pending" || item.status === "expired"
            ? getInitials(item.email)
            : getInitials(item.full_name),
        status: item.status === "pending" ? "invited" : item.status
      }));
      const metaData = {
        currentPage: response?.data?.data?.page ?? 1,
        totalPages: response?.data?.data?.total_pages,
        totalCount: response?.data?.data?.total_count,
        pageLimit: limit
      };
      return { membersArray, metaData };
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
    return initMembersData;
  }, [response, limit, error]);

  return { fetchOrgMembers, orgMembersData, loading: requestStatus.isPending };
};
