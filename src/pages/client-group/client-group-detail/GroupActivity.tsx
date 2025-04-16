import { IconCloudDown, IconFlame } from "@tabler/icons-react";
import { fetchGroupActivitiesService } from "api/services/client-group";
import { DateFilter, LoadingSpinner, TableEmptyState, toast } from "components";
import { useApiRequest } from "hooks";
import { Button } from "components";
import GroupActivitiesUI from "modules/client-group/GroupActivitiesUI";
import SortActivities from "modules/client-group/sort-activities";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchGroupActivitiesQueryParams, GroupActivityItem } from "types/client-group";
import { DateRange } from "react-day-picker";

export const GroupActivity = ({ groupId, groupName }: { groupId: string; groupName: string }) => {
  const [groupActivities, setGroupActivities] = useState<GroupActivityItem[]>([]);
  const {
    run: runFetchGroupActivity,
    data: fetchClientGroupActivityResponse,
    error: fetchClientGroupActivityError,
    requestStatus: fetchClientGroupActivityStatus
  } = useApiRequest({});

  const [groupActivitiesParams, setGroupActivitiesParams] =
    useState<fetchGroupActivitiesQueryParams>({
      page: 1,
      limit: 10,
      sort: "desc",
      start: "",
      end: ""
    });
  const [dateFilter, setDateFilter] = useState<DateRange | undefined>(undefined);

  const handleUpdateQueryParams = (param: string, value: string | number) => {
    setGroupActivitiesParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleFetchGroupActivities = useCallback(
    () => runFetchGroupActivity(fetchGroupActivitiesService(groupId, groupActivitiesParams)),
    [runFetchGroupActivity, groupActivitiesParams]
  );

  useEffect(() => {
    handleFetchGroupActivities();
  }, [groupActivitiesParams]);

  useMemo(() => {
    if (fetchClientGroupActivityResponse?.status === 200) {
      console.log(fetchClientGroupActivityResponse?.data);
      setGroupActivities(fetchClientGroupActivityResponse?.data?.data?.activity);
    } else if (fetchClientGroupActivityError) {
      toast({
        description: fetchClientGroupActivityError?.response?.data.error,
        variant: "destructive"
      });
    }
  }, [fetchClientGroupActivityResponse, fetchClientGroupActivityError]);

  return (
    <div>
      <div className="py-4 pl-8 px-5 border-b-[0.5px] border-[#ebecf0] flex items-center justify-between">
        <p className="font-bold">Group Activity</p>
        <div className="flex items-center gap-3">
          <DateFilter
            value={dateFilter}
            showPreset
            handleChange={(val) => {
              setDateFilter(val);
              if (val) {
                handleUpdateQueryParams(
                  "start",
                  val.from ? val.from.toISOString().slice(0, 10) : ""
                );
                handleUpdateQueryParams("end", val.to ? val.to.toISOString().slice(0, 10) : "");
              }
            }}
          />
          <SortActivities handleParams={handleUpdateQueryParams} />
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal text-xs h-8 py-1 px-2 gap-2">
            <IconCloudDown size={12} color="#667085" />
            <p className="text-xs text-[#344054] font-medium">Export</p>
          </Button>
        </div>
      </div>
      {fetchClientGroupActivityStatus.isPending ? (
        <LoadingSpinner />
      ) : !groupActivities.length ? (
        <TableEmptyState
          pageIcon={<IconFlame size={25} color="#101323" />}
          title="No recent activities."
          description="Track important updates, tasks, or changes related to this member as they progress through your services."
        />
      ) : (
        <GroupActivitiesUI
          groupActivities={groupActivities}
          groupId={groupId}
          groupName={groupName}
        />
      )}
    </div>
  );
};
