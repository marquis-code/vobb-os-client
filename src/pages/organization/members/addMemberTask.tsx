import { addTaskToMemberService } from "api";
import { AddMemberTaskModal, AddTaskData, toast } from "components";
import { format } from "date-fns";
import { useApiRequest, useDebounce, useFetchOrgMembers } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { ModalProps } from "types";

interface AddMemberTaskProps extends ModalProps {
  callback: () => void;
}

const AddMemberTask: React.FC<AddMemberTaskProps> = (props) => {
  const { close, callback } = props;
  const {
    run: runAddTask,
    data: addaskResponse,
    error: addTaskError,
    requestStatus: addTaskStatus
  } = useApiRequest({});

  const handleAddTask = (data: AddTaskData) => {
    runAddTask(
      addTaskToMemberService(data.object.title.toLowerCase(), {
        message: data.message,
        assigned_to: data.assignedTo.map((user) => user.value),
        priority: data.priority.title.toLowerCase(),
        due_date: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : "",
        status: data.status?.title.toLowerCase() || "default"
      })
    );
  };

  useMemo(() => {
    if (addaskResponse?.status === 201) {
      toast({
        description: addaskResponse?.data?.message
      });
      close();
      callback?.();
    } else if (addTaskError) {
      toast({
        variant: "destructive",
        description: addTaskError?.response?.data?.error
      });
    }
  }, [addaskResponse, addTaskError]);

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

  return (
    <AddMemberTaskModal
      submit={handleAddTask}
      {...props}
      loading={addTaskStatus.isPending}
      allUsers={{
        usersearchQuery: search,
        users: formattedMembers,
        loadingUsers,
        handleSearch: handleUpdateMembersQueryParams
      }}
    />
  );
};

export { AddMemberTask };
