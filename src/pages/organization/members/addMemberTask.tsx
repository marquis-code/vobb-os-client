import { addTaskToMemberService } from "api";
import { AddMemberTaskModal, AddTaskData, toast } from "components";
import { format } from "date-fns";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ExistingUserTypes, ModalProps } from "types";

interface AddMemberTaskProps extends ModalProps {
  callback: () => void;
  allUsers: {
    usersearchQuery: string;
    users: ExistingUserTypes[];
    loadingUsers: boolean;
    handleSearch: (filter: string, value: string | number) => void;
  };
}

const AddMemberTask: React.FC<AddMemberTaskProps> = (props) => {
  const { close, callback, allUsers } = props;
  const {
    run: runAddTask,
    data: addTaskResponse,
    error: addTaskError,
    requestStatus: addTaskStatus
  } = useApiRequest({});

  const handleAddTask = (data: AddTaskData) => {
    runAddTask(
      addTaskToMemberService(data.object.title.toLowerCase(), {
        title: data.title,
        description: data.description,
        assigned_to: data.assignedTo.map((user) => user.value),
        priority: data.priority.title.toLowerCase(),
        due_date: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : "",
        status: data.status?.title.toLowerCase() || "default"
      })
    );
  };

  useMemo(() => {
    if (addTaskResponse?.status === 201) {
      toast({
        description: addTaskResponse?.data?.message
      });
      close();
      callback?.();
    } else if (addTaskError) {
      toast({
        variant: "destructive",
        description: addTaskError?.response?.data?.error
      });
    }
  }, [addTaskResponse, addTaskError]);

  return (
    <AddMemberTaskModal
      submit={handleAddTask}
      {...props}
      loading={addTaskStatus.isPending}
      allUsers={allUsers}
    />
  );
};

export { AddMemberTask };
