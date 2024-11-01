import { fetchMembersTasksService } from "api";
import { format } from "date-fns";
import { useApiRequest } from "hooks";
import { MemberProfileTasksUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { AddMemberTask } from "./addMemberTask";

const initData = {
  data: [],
  metaData: {
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    pageLimit: 0
  }
};

const MemberProfileTasks = () => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const handleOpenAddTask = () => setAddTaskModal(true);
  const handleCloseAddTask = () => setAddTaskModal(false);

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

  // Query states for each task type
  const [completedQueryParams, setCompletedQueryParams] = useState({
    page: 1,
    limit: 20,
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
    limit: 20,
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
    limit: 20,
    object: "",
    id: "",
    priority: "",
    sort: "desc",
    start: "",
    end: "",
    status: "archived"
  });

  // Fetch task functions
  const handleFetchTasks = (status) => {
    if (status === "complete") runFetchComplete(fetchMembersTasksService(completedQueryParams));
    if (status === "incomplete")
      runFetchIncomplete(fetchMembersTasksService(incompleteQueryParams));
    if (status === "archived") runFetchArchived(fetchMembersTasksService(archivedQueryParams));
  };

  // Update query params function
  const handleUpdateQuery = (param, value) => {
    setCompletedQueryParams((prev) => ({ ...prev, [param]: value }));
    setIncompleteQueryParams((prev) => ({ ...prev, [param]: value }));
    setArchivedQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  // Memoized data processing
  const processTasks = (response) => {
    return (
      response?.data?.data?.tasks.map((task) => ({
        id: task._id,
        message: task.message,
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
        dueDate: task.due_date,
        date: task.time ? format(new Date(task.time), "do MMM, yyyy") : "N/A"
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

  useEffect(() => {
    handleFetchTasks("complete");
    handleFetchTasks("incomplete");
    handleFetchTasks("archived");
  }, [completedQueryParams, incompleteQueryParams, archivedQueryParams]);

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
          handleParams: handleUpdateQuery
        }}
        handleOpenAddTask={handleOpenAddTask}
      />

      <AddMemberTask
        show={addTaskModal}
        close={handleCloseAddTask}
        callback={() => {
          handleFetchTasks("complete");
          handleFetchTasks("incomplete");
          handleFetchTasks("archived");
        }}
      />
    </>
  );
};

export { MemberProfileTasks };
