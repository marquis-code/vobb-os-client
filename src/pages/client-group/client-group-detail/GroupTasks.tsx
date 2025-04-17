import { useState } from "react";
import { TasksContainer } from "components/tasks/tasks-container";
import { AddGroupTaskModal } from "components/modalVariants/addGroupTaskModal";
import { EditGroupTaskModal } from "components/modalVariants/editGroupTaskModal";
import { BaseTaskData } from "types/tasks";

export function GroupTasks() {
  const [tasks] = useState({
    incompletedTasks: {
      data: [
        {
          id: "1",
          status: "incomplete",
          title: "Complete project documentation",
          dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
          priority: "High",
          assignedTo: [{ _id: "1", name: "Jane Smith", avatar: "" }],
          creator: {
            id: "111",
            name: "marquis"
          }
        },
        {
          id: "2",
          status: "incomplete",
          title: "Review pull requests",
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          assignedTo: [{ _id: "1", name: "Jane Smith", avatar: "" }],
          priority: "Medium",
          creator: {
            id: "111",
            name: "marquis"
          }
        }
      ],
      metaData: { hasNextPage: false }
    },
    completedTasks: {
      data: [
        {
          id: "3",
          status: "complete",
          title: "Set up development environment",
          dueDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          assignedTo: [{ _id: "1", name: "John Doe", avatar: "" }],
          priority: "Low",
          creator: {
            id: "111",
            name: "marquis"
          }
        }
      ],
      metaData: { hasNextPage: false }
    },
    archivedTasks: {
      data: [
        {
          id: "4",
          status: "archived",
          title: "Initial project planning",
          dueDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
          assignedTo: [
            { _id: "1", name: "John Doe", avatar: "" },
            { _id: "1", name: "Jane Smith", avatar: "" }
          ],
          priority: "Medium",
          creator: {
            id: "111",
            name: "marquis"
          }
        }
      ],
      metaData: { hasNextPage: false }
    }
  });
  const [isShowingAddTaskModal, setIsShowingAddTaskModal] = useState(false);
  const [isShowingEditTaskModal, setIsShowingEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<BaseTaskData | null>({
    id: "task-123",
    title: "Schedule client meeting",
    description: "Need to coordinate with the client to finalize plans for next quarter.",
    assignedTo: [
      { name: "Alice Johnson", _id: "user-1" },
      { name: "Bob Smith", _id: "user-2" }
    ],
    priority: "High",
    status: "In Progress",
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    date: "Mar 15, 2025",
    creator: {
      id: "111",
      name: "Dana White",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  });

  const [loading] = useState({
    loadingIncomplete: false,
    loadingComplete: false,
    loadingArchived: false,
    loadingChangeStatus: false,
    loadingDeleteTask: false
  });

  // Mock handlers
  const handleChangeStatus = (id: string, status: string) => {
    console.log(`Changing task ${id} to ${status}`);
  };

  const handleDeleteTask = (id: string) => {
    console.log(`deleting task ${id}`);
  };

  const handleOpenEditTask = (id: string) => {
    console.log(`Opening edit modal for task ${id}`);
    // setSelectedTask(
    //   tasks.incompletedTasks.data.find((item) => item.id === id) ||
    //     (tasks.incompletedTasks.data[0] as BaseTaskData)
    // );
    setIsShowingEditTaskModal(true);
  };

  const handleOpenAddTask = () => {
    console.log("Opening add task modal");
    setIsShowingAddTaskModal(true);
  };

  const handleParams = () => {};

  // Custom columns configuration
  const columns = [
    { key: "dueDate", label: "Due date" },
    { key: "assignedTo", label: "Assigned to" },
    { key: "actions", label: "" }
  ];

  return (
    <>
      <TasksContainer
        allTasks={{ data: tasks, loading: loading }}
        handleParams={{
          handleIncompleteQuery: handleParams,
          handleCompletedQuery: handleParams,
          handleArchivedQuery: handleParams,
          handleUpdateAllQueries: handleParams
        }}
        handleOpenEditTask={handleOpenEditTask}
        taskActions={{
          handleChangeStatus,
          loadingChangeStatus: loading.loadingChangeStatus,
          handleDeleteTask,
          loadingDeleteTask: loading.loadingDeleteTask
        }}
        handleOpenAddTask={handleOpenAddTask}
        columns={columns}
      />
      <AddGroupTaskModal
        submit={console.log}
        loading={false}
        close={() => setIsShowingAddTaskModal(false)}
        show={isShowingAddTaskModal}
        allUsers={{
          users: [],
          usersearchQuery: "",
          loadingUsers: false,
          handleSearch: console.log
        }}
      />
      <EditGroupTaskModal
        show={isShowingEditTaskModal}
        allUsers={{
          users: [],
          usersearchQuery: "",
          loadingUsers: false,
          handleSearch: console.log
        }}
        close={() => setIsShowingEditTaskModal(false)}
        submit={console.log}
        loadingEdit={false}
        loadingTask={false}
        initData={selectedTask as BaseTaskData}
      />
    </>
  );
}
