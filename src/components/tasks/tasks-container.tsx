import { ObjectOptionProps, cn, objectOptions } from "lib";
import { IconListCheck, IconPlus, IconPointFilled } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Button, DateFilter, TableEmptyState } from "components";
import { BaseTaskData } from "types/tasks";
import { TaskList } from "./task-list";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { DateRange } from "react-day-picker";

export type TaskColumnConfig = {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, task: any) => React.ReactNode;
};

interface TasksContainerProps {
  allTasks: {
    data: {
      incompletedTasks: {
        data: BaseTaskData[];
        metaData: any;
      };
      completedTasks: {
        data: BaseTaskData[];
        metaData: any;
      };
      archivedTasks: {
        data: BaseTaskData[];
        metaData: any;
      };
    };
    loading?: {
      loadingIncomplete: boolean;
      loadingComplete: boolean;
      loadingArchived: boolean;
    };
  };
  handleParams: {
    handleCompletedQuery: (param: string, value: Date | string | number) => void;
    handleIncompleteQuery: (param: string, value: Date | string | number) => void;
    handleArchivedQuery: (param: string, value: Date | string | number) => void;
    handleUpdateAllQueries: (param: string, value: Date | string | number) => void;
  };
  handleOpenEditTask?: (id: string) => void;
  taskActions?: {
    handleChangeStatus: (id: string, status: string) => void;
    loadingChangeStatus: boolean;
    handleDeleteTask: (id: string) => void;
    loadingDeleteTask: boolean;
  };
  handleOpenAddTask?: () => void;
  columns?: TaskColumnConfig[];
}

export const TasksContainer: FC<TasksContainerProps> = ({
  handleOpenAddTask,
  handleOpenEditTask,
  taskActions,
  allTasks,
  handleParams,
  columns
}) => {
  const { data, loading } = allTasks;
  const { data: incompletedTasksArray } = data.incompletedTasks;
  const { data: completedTasksArray } = data.completedTasks;
  const { data: archivedTasksArray } = data.archivedTasks;
  const {
    handleArchivedQuery,
    handleCompletedQuery,
    handleIncompleteQuery,
    handleUpdateAllQueries
  } = handleParams;
  const [selectedObject, setSelectedObject] = useState<ObjectOptionProps | null>(null);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [openTabs, setOpenTabs] = useState({
    incompleted: true,
    completed: true,
    archived: true
  });

  const handleSetSelectedObject = (obj: ObjectOptionProps) => {
    setSelectedObject(obj);
    handleUpdateAllQueries("object", obj.title.toLowerCase());
  };

  const handleSetOpenTabs = (tab: keyof typeof openTabs) => {
    setOpenTabs((prevTabs) => ({
      ...prevTabs,
      [tab]: !prevTabs[tab]
    }));
  };

  const allMemberTasks = incompletedTasksArray
    .concat(completedTasksArray)
    .concat(archivedTasksArray);
  const noTasks = !allMemberTasks.length;

  const handleStartDatePagination = (dateValue) => {
    if (dateValue.from && dateValue.to)
      handleUpdateAllQueries("start", dateValue.from.toISOString().slice(0, 10));
  };

  const handleEndDatePagination = (dateValue) => {
    if (dateValue.from && dateValue.to)
      handleUpdateAllQueries("end", dateValue.to.toISOString().slice(0, 10));
  };

  const clearFilters = () => {
    handleUpdateAllQueries("start", "");
    handleUpdateAllQueries("end", "");
  };
  const loadingAllTasks =
    loading?.loadingArchived || loading?.loadingIncomplete || loading?.loadingComplete;

  const taskStatusCategories = [
    {
      title: "incomplete",
      color: "#EDA12F",
      length: incompletedTasksArray.length,
      component: (
        <TaskList
          tasks={data.incompletedTasks}
          loadingTasks={loading?.loadingIncomplete}
          taskActions={taskActions}
          handleOpenEditTask={handleOpenEditTask}
          handleParams={handleIncompleteQuery}
          status="incomplete"
          columns={columns}
        />
      )
    },
    {
      title: "complete",
      color: "#069952",
      length: completedTasksArray.length,
      component: (
        <TaskList
          tasks={data.completedTasks}
          loadingTasks={loading?.loadingComplete}
          taskActions={taskActions}
          handleOpenEditTask={handleOpenEditTask}
          handleParams={handleCompletedQuery}
          status="complete"
          columns={columns}
        />
      )
    },
    {
      title: "archived",
      color: "#EAECF0",
      length: archivedTasksArray.length,
      component: (
        <TaskList
          tasks={data.archivedTasks}
          loadingTasks={loading?.loadingArchived}
          taskActions={taskActions}
          handleOpenEditTask={handleOpenEditTask}
          handleParams={handleArchivedQuery}
          status="archived"
          columns={columns}
        />
      )
    }
  ];

  return (
    <>
      <div className="flex justify-between items-center border-b py-[10px] px-4 pl-8">
        <h2 className="font-bold">Tasks</h2>
        <div className="flex items-center gap-2">
          <DateFilter
            showPreset
            value={date}
            handleChange={(val) => {
              setDate(val);
              if (val) {
                handleStartDatePagination(val);
                handleEndDatePagination(val);
              }
            }}
            clearFilters={clearFilters}
          />
          {columns?.some((column) => column.key === "object") && (
            <ActionColumn
              selectedObject={selectedObject}
              handleSetSelectedObject={handleSetSelectedObject}
            />
          )}
          <Button
            onClick={handleOpenAddTask}
            variant={"outline"}
            data-testid="add-task-button"
            className={
              "w-full justify-start text-left items-center font-normal text-xs h-8 py-1 px-2 gap-1"
            }>
            <IconPlus size={16} color="#667085" /> Add Task
          </Button>
        </div>
      </div>
      <div>
        {noTasks && !loadingAllTasks ? (
          <TableEmptyState
            pageIcon={<IconListCheck size={25} color="#101323" />}
            title="No tasks have been assigned yet."
            description="Assign tasks to ensure clear responsibilities and follow-up actions for this member."
            ctaFunction={handleOpenAddTask}
            btnText="Add Task"
          />
        ) : (
          <>
            <div className="grid grid-cols-[1fr,1.5fr] items-center text-neutral-600 text-xs px-3 pl-7 py-4 border-b">
              <h2>Task</h2>
              <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(${columns?.length}, 1fr)` }}>
                {columns?.map((column) => (
                  <p key={column.key}>{column.label}</p>
                ))}
              </div>
            </div>
            {taskStatusCategories.map(({ title, color, length, component }) => (
              <div key={title}>
                <div
                  className="bg-neutral-100 py-2 px-4 flex justify-between items-center capitalize border-b cursor-pointer"
                  onClick={() => handleSetOpenTabs(title as keyof typeof openTabs)}
                  data-testid={`view-${title}`}>
                  <div className="flex items-center gap-2">
                    <IconPointFilled color={color} size={14} /> {title}
                    {length > 0 && (
                      <span className="bg-neutral-100 h-4 w-4 border text-[10px] text-center rounded-sm">
                        {length}
                      </span>
                    )}
                  </div>
                  {openTabs[title as keyof typeof openTabs] ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )}
                </div>
                {openTabs[title as keyof typeof openTabs] ? component : null}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

const ActionColumn = ({ handleSetSelectedObject, selectedObject }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left items-center font-normal text-xs h-8 py-1 px-3 gap-1"
          )}>
          {!selectedObject ? (
            <>
              By object <ChevronDownIcon className="-mt-0.5 text-vobb-neutral-60" />
            </>
          ) : (
            <>
              <IconPointFilled color={selectedObject.color} size={14} /> {selectedObject.title}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-lg px-1 space-y-1.5 w-[184px]">
        {objectOptions.map((obj) => (
          <DropdownMenuItem
            onClick={() => handleSetSelectedObject(obj)}
            key={obj.title}
            className="gap-2 cursor-pointer text-vobb-neutral-70 text-xs"
            testId="invite-member">
            <IconPointFilled color={obj.color} size={14} /> {obj.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
