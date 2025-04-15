import { ClientGroupUI } from "modules/client-group";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CreateClientGroup } from "./createClientGroup";
import { ClientGroupTableDataProps, fetchClientGroupQueryParams } from "types/client-group";
import { useApiRequest } from "hooks";
import { fetchClientGroupService } from "api/services/client-group";
import { toast } from "components";
import { fetchAllPipelinesService } from "api";

export type ApiRequestStatus = {
  isResolved: boolean;
  isPending: boolean;
  isRejected: boolean;
  isIdle: boolean;
};

export const ClientGroup = () => {
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [clientGroupParams, setClientGroupParams] = useState<fetchClientGroupQueryParams>({
    page: 1,
    limit: 10,
    search: "",
    sort: "desc",
    pipeline: "",
    assigned_members: ""
  });

  const {
    run: runFetchClientGroups,
    data: fetchClientGroupsResponse,
    error: fetchClientGroupsError,
    requestStatus: fetchClientGroupStatus
  } = useApiRequest({});

  const {
    run: runFetchAllPipelines,
    data: fetchAllPipelinesResponse,
    requestStatus: fetchAllPipelinesStatus
  } = useApiRequest({});

  const handleFetchAllPipelines = useCallback(() => {
    runFetchAllPipelines(fetchAllPipelinesService());
  }, [runFetchAllPipelines]);

  useEffect(() => {
    handleFetchAllPipelines();
  }, [handleFetchAllPipelines]);

  const handleFetchClientGroups = useCallback(() => {
    runFetchClientGroups(
      fetchClientGroupService({
        ...clientGroupParams
      })
    );
  }, [clientGroupParams, runFetchClientGroups]);

  const handleUpdateQueryParams = (param: string, value: string | number) => {
    setClientGroupParams((prev) => ({ ...prev, [param]: value }));
  };
  const handleOpenCreateClientGroup = () => setCreateGroupModal(true);

  const clientGroupData = useMemo<ClientGroupTableDataProps>(() => {
    if (fetchClientGroupsResponse?.status === 200) {
      const data = fetchClientGroupsResponse.data.data.groups.map((item) => ({
        id: item._id,
        pipeline: {
          id: item.pipeline._id,
          name: item.pipeline.name
        },
        assignedTo: item.assigned_to
          ? {
              id: item.assigned_to._id,
              avatar: item.assigned_to.avatar,
              name: item.assigned_to.name
            }
          : undefined,
        name: item.name,
        clients: item.clients,
        date: item.date,
        time: item.time
      }));
      const metaData = {
        currentPage: fetchClientGroupsResponse.data.data.page,
        totalCount: fetchClientGroupsResponse.data.data.total_count,
        totalPages: fetchClientGroupsResponse.data.data.total_count
      };
      return { data, metaData };
    } else if (fetchClientGroupsError) {
      toast({ description: fetchClientGroupsError?.response?.data.error });
    }

    return {} as ClientGroupTableDataProps;
  }, [fetchClientGroupsResponse, fetchClientGroupsError]);

  useEffect(() => {
    handleFetchClientGroups();
  }, [clientGroupParams]);

  return (
    <>
      <ClientGroupUI
        pipelinesData={fetchAllPipelinesResponse ? fetchAllPipelinesResponse.data.data : []}
        handleRefreshClientGroups={handleFetchClientGroups}
        allClientGroups={{
          clientGroupsdata: clientGroupData,
          loading: fetchClientGroupStatus.isPending,
          params: clientGroupParams
        }}
        handleParams={handleUpdateQueryParams}
        handleCreateClientGroup={handleOpenCreateClientGroup}
      />
      <CreateClientGroup
        pipelinesData={fetchAllPipelinesResponse ? fetchAllPipelinesResponse.data.data : []}
        isFetchingPipelineData={fetchAllPipelinesStatus.isPending}
        handleRefreshTable={handleFetchClientGroups}
        show={createGroupModal}
        close={() => setCreateGroupModal(false)}
      />
    </>
  );
};
