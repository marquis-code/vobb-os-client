import { ClientGroupUI } from "modules/client-group";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CreateClientGroup } from "./createClientGroup";
import { ClientGroupTableDataProps, fetchClientGroupQueryParams } from "types/client-group";
import { useApiRequest } from "hooks";
import { fetchClientGroupService } from "api/services/client-group";
import { toast } from "components";

export type ApiRequestStatus = {
  isResolved: boolean;
  isPending: boolean;
  isRejected: boolean;
  isIdle: boolean;
};

const mockClientGroup = {
  data: [
    {
      id: "111111",
      pipeline: {
        id: "22222",
        name: "testing pipeline"
      },
      name: "first group",
      clients: 3,
      date: "20/8/2025",
      time: ""
    }
  ],
  metaData: {
    currentPage: 1,
    totalCount: 1,
    totalPages: 1
  }
};
export const ClientGroup = () => {
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [clientGroupParams, setClientGroupParams] = useState<fetchClientGroupQueryParams>({
    page: 1,
    limit: 10,
    search: "",
    sort: "desc"
  });

  const {
    run: runFetchClientGroups,
    data: fetchClientGroupsResponse,
    error: fetchClientGroupsError,
    requestStatus: fetchClientGroupStatus
  } = useApiRequest({});

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
      if (!data.length) return mockClientGroup;
      return { data, metaData };
    } else if (fetchClientGroupsError) {
      toast({ description: fetchClientGroupsError?.response?.data.error });
    }

    return {
      data: [
        {
          id: "111111",
          pipeline: {
            id: "22222",
            name: "testing pipeline"
          },
          name: "first group",
          clients: 3,
          date: "20/8/2025",
          time: ""
        }
      ],
      metaData: {
        currentPage: 1,
        totalCount: 1,
        totalPages: 1
      }
    } as ClientGroupTableDataProps;
  }, [fetchClientGroupsResponse, fetchClientGroupsError]);

  useEffect(() => {
    handleFetchClientGroups();
  }, [clientGroupParams]);

  return (
    <>
      <ClientGroupUI
        allClientGroups={{
          clientGroupsdata: clientGroupData,
          loading: fetchClientGroupStatus.isPending,
          params: clientGroupParams
        }}
        handleParams={handleUpdateQueryParams}
        handleCreateClientGroup={handleOpenCreateClientGroup}
      />
      <CreateClientGroup show={createGroupModal} close={() => setCreateGroupModal(false)} />
    </>
  );
};
