import { IconFlame } from "@tabler/icons-react";
import { fetchGroupActivitiesService } from "api/services/client-group";
import { LoadingSpinner, TableEmptyState, toast } from "components";
import { useApiRequest } from "hooks";
import GroupActivitiesUI from "modules/client-group/GroupActivitiesUI";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchGroupActivitiesQueryParams, GroupActivityItem } from "types/client-group";

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
