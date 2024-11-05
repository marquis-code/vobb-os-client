import { fetchOrgActivitiesService } from "api";
import { useUserContext } from "context";
import { format, parseISO } from "date-fns";
import { useApiRequest } from "hooks";
import { OrgActivityData, OrgActivityUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { MetaDataProps, QueryParamProps } from "types";

interface OrgActivityResponse {
  activityArray: OrgActivityData[];
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

const OrgActivity = () => {
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

  const fetchOrgActivities = () => {
    run(
      fetchOrgActivitiesService({
        page,
        limit,
        sort: order ?? "desc",
        start_date: startDate,
        end_date: endDate
      })
    );
  };

  const orgActivities = useMemo<OrgActivityResponse>(() => {
    if (response?.status === 200) {
      const activityArray = response?.data?.data?.activities.map((item) => ({
        action: item.action.split("-").join("_"),
        date: format(parseISO(item.time), dateFormatted),
        time: format(parseISO(item.time), "h:mma"),
        initiator: item.meta?.user?._id
          ? { name: item.initiator.full_name, id: item.initiator._id }
          : "self",
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
    fetchOrgActivities();
  }, [queryParams]);
  return (
    <>
      <OrgActivityUI
        orgActivities={orgActivities?.activityArray}
        metaData={orgActivities?.metaData}
        handleFilter={handleUpdateQuery}
        queryParams={queryParams}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { OrgActivity };
