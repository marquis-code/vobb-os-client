import { editTaskService, fetchATaskService } from "api";
import { EditMemberTaskModal, EditTaskData, toast } from "components";
import { format } from "date-fns";
import { useApiRequest } from "hooks";
import { useEffect, useMemo } from "react";
import { ExistingUserTypes, MemberTasksData, ModalProps } from "types";

interface editMemberTaskProps extends ModalProps {
  id: string;
  callback: () => void;
  allUsers: {
    usersearchQuery: string;
    users: ExistingUserTypes[];
    loadingUsers: boolean;
    handleSearch: (filter: string, value: string | number) => void;
  };
}

const initData = {
  id: "",
  title: "",
  description: "",
  creator: { id: "", avatar: "", name: "" },
  status: "",
  priority: "",
  assignedTo: [],
  dueDate: "",
  date: ""
};

const EditMemberTask: React.FC<editMemberTaskProps> = (props) => {
  const { id, close, callback, allUsers } = props;
  console.log(id);
  const {
    run: runFetchTask,
    data: fetchTaskResponse,
    requestStatus: fetchTaskStatus
  } = useApiRequest({});
  const {
    run: runEditTask,
    data: editTaskResponse,
    error: editTaskError,
    requestStatus: editTaskStatus
  } = useApiRequest({});

  const handleFetchTask = (id) => {
    runFetchTask(fetchATaskService(id));
  };

  const handleEditTask = (data: EditTaskData) => {
    runEditTask(
      editTaskService(data.id, {
        title: data.title,
        description: data.description,
        assigned_to: data.assignedTo.map((user) => user.value),
        priority: data.priority.title.toLowerCase(),
        due_date: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : ""
      })
    );
  };

  const taskData = useMemo<MemberTasksData>(() => {
    if (fetchTaskResponse?.status === 200) {
      const task = fetchTaskResponse?.data?.data?.task;
      const data = {
        id: task._id,
        title: task.title,
        description: task.description,
        object: task.object ?? "general",
        creator: {
          id: task.creator._id,
          avatar: task.creator.avatar,
          name: task.creator.name
        },
        status: task.status,
        priority: task.priority,
        assignedTo: task.assigned_to,
        dueDate: task.due_date ?? "N/A",
        date: format(new Date(task.time), "do MMM, yyyy")
      };

      return data;
    }
    return initData;
  }, [fetchTaskResponse]);

  useMemo(() => {
    if (editTaskResponse?.status === 201) {
      toast({
        description: editTaskResponse?.data?.message
      });
      close();
      callback?.();
    } else if (editTaskError) {
      toast({
        variant: "destructive",
        description: editTaskError?.response?.data?.error
      });
    }
  }, [editTaskResponse, editTaskError]);

  useEffect(() => {
    if (id) handleFetchTask(id);
  }, [id]);
  return (
    <EditMemberTaskModal
      submit={handleEditTask}
      {...props}
      loadingTask={fetchTaskStatus.isPending}
      loadingEdit={editTaskStatus.isPending}
      allUsers={allUsers}
      initData={taskData}
    />
  );
};

export { EditMemberTask };
