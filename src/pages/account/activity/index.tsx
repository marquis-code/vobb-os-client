import { fetchUserActivitiesService } from "api";
import { useUserContext } from "context";
import { format, parseISO } from "date-fns";
import { useApiRequest } from "hooks";
import { AccountActivityData, AccountActivityUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { MetaDataProps, QueryParamProps } from "types";

interface AccountActivityResponse {
  activityArray: AccountActivityData[];
  metaData: MetaDataProps;
}

const initData = {
  activityArray: [],
  metaData: {
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    pageLimit: 0
  }
};

const AccountActivity = () => {
  const { userDetails } = useUserContext();
  const userDateFormat = userDetails?.dateFormat;
  const dateFormatted =
    userDateFormat === "Month D, Yr"
      ? "MMMM dd, yyyy"
      : userDateFormat === "DD/MM/YYYY"
      ? "dd-MM-yyyy"
      : "MM-dd-yyyy";

  const { run, data: response, requestStatus } = useApiRequest({});
  const [queryParams, setQueryParams] = useState<QueryParamProps>({
    page: 1,
    limit: 20,
    order: "desc",
    startDate: "",
    endDate: ""
  });
  const { page, limit, order, startDate, endDate } = queryParams;

  const handleUpdateQuery = (param: string, value: Date | string | number) => {
    setQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const fetchUserActivities = () => {
    run(
      fetchUserActivitiesService({
        page,
        limit,
        sort: order,
        start: startDate,
        end: endDate
      })
    );
  };

  const userActivities = useMemo<AccountActivityResponse>(() => {
    if (response?.status === 200) {
      const activityArray = response?.data?.data?.activity.map((item) => ({
        action: item.action.split("-").join("_"),
        date: format(parseISO(item.time), dateFormatted),
        time: format(parseISO(item.time), "h:mma"),
        initiator:
          item.initiator._id === item.meta?.user?._id
            ? "self"
            : { name: item.initiator.full_name, id: item.initiator._id },
        metadata: { ...item.meta }
      }));

      const metaData = {
        currentPage: response?.data?.data?.page ?? 1,
        totalPages: response?.data?.data?.total_pages,
        totalCount: response?.data?.data?.total_count,
        pageLimit: queryParams.limit
      };

      return { activityArray, metaData };
    }

    return initData;
  }, [response, queryParams.limit]);

  useEffect(() => {
    fetchUserActivities();
  }, [queryParams]);

  return (
    <>
      <AccountActivityUI
        userActivities={userActivities?.activityArray}
        metaData={userActivities?.metaData}
        handleFilter={handleUpdateQuery}
        queryParams={queryParams}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { AccountActivity };
