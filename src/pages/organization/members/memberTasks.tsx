import { changeStatusOfTaskService, deleteTaskService, fetchMembersTasksService } from "api";
import { format } from "date-fns";
import { useApiRequest, useDebounce, useFetchOrgMembers } from "hooks";
import { MemberProfileTasksUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { AddMemberTask } from "./addMemberTask";
import { toast } from "components";
import { EditMemberTask } from "./editMemberTask";

const isValidDateRange = (params) => {
  switch (params) {
    case !params.start && !params.end:
      return true;
    case params.start && !params.end:
      return false;
    case !params.start && params.end:
      return true;
    case params.start && params.end:
      return false;
    default:
      return true;
  }
};

const MemberProfileTasks = () => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState({ id: "", show: false });

  const handleOpenAddTask = () => setAddTaskModal(true);
  const handleCloseAddTask = () => setAddTaskModal(false);

  const handleOpenEditTask = (id: string) => setEditTaskModal({ id, show: true });
  const handleCloseEditTask = () => setEditTaskModal({ id: "", show: false });

  const [allMembersQueryParams, setAllMembersQueryParams] = useState({
    limit: 5,
    search: ""
  });
  const handleUpdateMembersQueryParams = (filter: string, value: string | number) => {
    setAllMembersQueryParams((prev) => ({ ...prev, [filter]: value }));
  };
  const { search } = allMembersQueryParams;
  const debouncedSearchTerm = useDebounce(search, 1000);

  const { fetchOrgMembers, orgMembersData, loading: loadingUsers } = useFetchOrgMembers({});
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      fetchOrgMembers({ search: debouncedSearchTerm });
    } else {
      fetchOrgMembers({});
    }
  }, [debouncedSearchTerm]);

  const formattedMembers = orgMembersData.membersArray
    .filter((member) => member.status === "active")
    .map((member) => ({
      avatar: member.avatar,
      label: member.name,
      value: member.id
    }));

  const {
    run: runFetchComplete,
    data: fetchCompleteResponse,
    requestStatus: fetchCompleteStatus
  } = useApiRequest({});

  const {
    run: runFetchIncomplete,
    data: fetchIncompleteResponse,
    requestStatus: fetchIncompleteStatus
  } = useApiRequest({});

  const {
    run: runFetchArchived,
    data: fetchArchivedResponse,
    requestStatus: fetchArchivedStatus
  } = useApiRequest({});

  const {
    run: runDeleteTask,
    data: deleteTaskResponse,
    error: deleteTaskError,
    requestStatus: deleteTaskStatus
  } = useApiRequest({});

  const {
    run: runChangeStatus,
    data: changeStatusResponse,
    error: changeStatusError,
    requestStatus: changeStatusStatus
  } = useApiRequest({});

  // Query states for each task type
  const [completedQueryParams, setCompletedQueryParams] = useState({
    page: 1,
    limit: 4,
    object: "",
    id: "",
    priority: "",
    sort: "desc",
    start: "",
    end: "",
    status: "complete"
  });

  const [incompleteQueryParams, setIncompleteQueryParams] = useState({
    page: 1,
    limit: 4,
    object: "",
    id: "",
    priority: "",
    sort: "desc",
    start: "",
    end: "",
    status: "incomplete"
  });

  const [archivedQueryParams, setArchivedQueryParams] = useState({
    page: 1,
    limit: 4,
    object: "",
    id: "",
    priority: "",
    sort: "desc",
    start: "",
    end: "",
    status: "archived"
  });

  // Fetch task functions
  const handleFetchTasks = (status: string) => {
    if (status === "complete" && isValidDateRange(completedQueryParams))
      runFetchComplete(fetchMembersTasksService(completedQueryParams));
    if (status === "incomplete" && isValidDateRange(incompleteQueryParams))
      runFetchIncomplete(fetchMembersTasksService(incompleteQueryParams));
    if (status === "archived" && isValidDateRange(archivedQueryParams))
      runFetchArchived(fetchMembersTasksService(archivedQueryParams));
  };

  const runAllFetch = () => {
    handleFetchTasks("complete");
    handleFetchTasks("incomplete");
    handleFetchTasks("archived");
  };

  const handleChangeStatus = (id: string, status: string) => {
    runChangeStatus(changeStatusOfTaskService(id, { status }));
  };

  const handleDeleteTask = (id: string) => {
    runDeleteTask(deleteTaskService(id));
  };

  // Update fetch tasks query params function
  const handleCompletedQuery = (param, value) => {
    setCompletedQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleIncompleteQuery = (param, value) => {
    setIncompleteQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleArchivedQuery = (param, value) => {
    setArchivedQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  // Helper function to update all queries at once when needed
  const handleUpdateAllQueries = (param, value) => {
    handleCompletedQuery(param, value);
    handleIncompleteQuery(param, value);
    handleArchivedQuery(param, value);
  };

  // Fetch tasks data processing
  const processTasks = (response) => {
    return (
      response?.data?.data?.tasks.map((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        creator: task.creator
          ? {
              id: task.creator._id,
              avatar: task.creator.avatar,
              name: task.creator.name
            }
          : null,
        status: task.status,
        priority: task.priority,
        assignedTo: task.assigned_to,
        dueDate: task.due_date ?? "N/A",
        date: format(new Date(task.time), "do MMM, yyyy")
      })) ?? []
    );
  };

  const processMetaData = (response, limit) => ({
    currentPage: response?.data?.data?.page ?? 1,
    totalPages: response?.data?.data?.total_pages,
    totalCount: response?.data?.data?.total_count,
    pageLimit: limit
  });

  const completedTasks = useMemo(
    () => ({
      data: processTasks(fetchCompleteResponse),
      metaData: processMetaData(fetchCompleteResponse, completedQueryParams.limit)
    }),
    [fetchCompleteResponse, completedQueryParams.limit]
  );

  const incompletedTasks = useMemo(
    () => ({
      data: processTasks(fetchIncompleteResponse),
      metaData: processMetaData(fetchIncompleteResponse, incompleteQueryParams.limit)
    }),
    [fetchIncompleteResponse, incompleteQueryParams.limit]
  );

  const archivedTasks = useMemo(
    () => ({
      data: processTasks(fetchArchivedResponse),
      metaData: processMetaData(fetchArchivedResponse, archivedQueryParams.limit)
    }),
    [fetchArchivedResponse, archivedQueryParams.limit]
  );

  useMemo(() => {
    if (changeStatusResponse?.status === 200) {
      toast({
        description: changeStatusResponse?.data?.message
      });
      runAllFetch();
    } else if (changeStatusError) {
      toast({
        variant: "destructive",
        description: changeStatusError?.response?.data?.error
      });
    }
  }, [changeStatusResponse, changeStatusError]);

  useMemo(() => {
    if (deleteTaskResponse?.status === 201) {
      toast({
        description: deleteTaskResponse?.data?.message
      });
      runAllFetch();
    } else if (deleteTaskError) {
      toast({
        variant: "destructive",
        description: deleteTaskError?.response?.data?.error
      });
    }
  }, [deleteTaskResponse, deleteTaskError]);

  useEffect(() => {
    handleFetchTasks("complete");
  }, [completedQueryParams]);

  useEffect(() => {
    handleFetchTasks("incomplete");
  }, [incompleteQueryParams]);

  useEffect(() => {
    handleFetchTasks("archived");
  }, [archivedQueryParams]);

  return (
    <>
      <MemberProfileTasksUI
        allTasks={{
          data: { completedTasks, incompletedTasks, archivedTasks },
          loading: {
            loadingIncomplete: fetchIncompleteStatus.isPending,
            loadingComplete: fetchCompleteStatus.isPending,
            loadingArchived: fetchArchivedStatus.isPending
          },
          params: { incompleteQueryParams, completedQueryParams, archivedQueryParams },
          handleParams: {
            handleCompletedQuery,
            handleIncompleteQuery,
            handleArchivedQuery,
            handleUpdateAllQueries
          }
        }}
        handleOpenAddTask={handleOpenAddTask}
        handleOpenEditTask={handleOpenEditTask}
        taskActions={{
          handleChangeStatus,
          loadingChangeStatus: changeStatusStatus.isPending,
          handleDeleteTask,
          loadingDeleteTask: deleteTaskStatus.isPending
        }}
      />

      <AddMemberTask
        show={addTaskModal}
        close={handleCloseAddTask}
        callback={runAllFetch}
        allUsers={{
          usersearchQuery: search,
          users: formattedMembers,
          loadingUsers,
          handleSearch: handleUpdateMembersQueryParams
        }}
      />

      <EditMemberTask
        id={editTaskModal.id}
        show={editTaskModal.show}
        close={handleCloseEditTask}
        callback={runAllFetch}
        allUsers={{
          usersearchQuery: search,
          users: formattedMembers,
          loadingUsers,
          handleSearch: handleUpdateMembersQueryParams
        }}
      />
    </>
  );
};

export { MemberProfileTasks };
