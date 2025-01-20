import { IconListCheck, IconPlus, IconPointFilled } from "@tabler/icons-react";
import { Button, DateFilter, TableEmptyState } from "components";
import { MemberFilters } from "./components/memberFilters";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { cn, ObjectOptionProps, objectOptions } from "lib";
import { fetchMemberTasksQueryParams, MemberTasksProps } from "types";
import { ArchivedTasks, CompletedTasks, IncompletedTasks } from "./taskComponents";

interface MemberProfileTasksProps {
  allTasks: {
    data: {
      completedTasks: MemberTasksProps;
      incompletedTasks: MemberTasksProps;
      archivedTasks: MemberTasksProps;
    };
    loading: {
      loadingIncomplete: boolean;
      loadingComplete: boolean;
      loadingArchived: boolean;
    };
    params: {
      incompleteQueryParams: fetchMemberTasksQueryParams;
      completedQueryParams: fetchMemberTasksQueryParams;
      archivedQueryParams: fetchMemberTasksQueryParams;
    };

    handleParams: {
      handleCompletedQuery: (param: string, value: Date | string | number) => void;
      handleIncompleteQuery: (param: string, value: Date | string | number) => void;
      handleArchivedQuery: (param: string, value: Date | string | number) => void;
      handleUpdateAllQueries: (param: string, value: Date | string | number) => void;
    };
  };

  handleOpenAddTask: () => void;
  handleOpenEditTask: (id: string) => void;

  taskActions: {
    handleChangeStatus: (id: string, status: string) => void;
    loadingChangeStatus: boolean;
    handleDeleteTask: (id: string) => void;
    loadingDeleteTask: boolean;
  };
}

const MemberProfileTasksUI: React.FC<MemberProfileTasksProps> = ({
  allTasks,
  handleOpenAddTask,
  handleOpenEditTask,
  taskActions
}) => {
  const { data, loading, handleParams } = allTasks;
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

  const handleSetOpenTabs = (tab) => {
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
    loading.loadingArchived || loading.loadingIncomplete || loading.loadingComplete;

  const taskStatusCategories = [
    {
      title: "incompleted",
      color: "#EDA12F",
      length: incompletedTasksArray.length,
      component: (
        <IncompletedTasks
          tasks={data.incompletedTasks}
          loadingTasks={loading.loadingIncomplete}
          taskActions={taskActions}
          handleOpenEditTask={handleOpenEditTask}
          handleParams={handleIncompleteQuery}
        />
      )
    },
    {
      title: "completed",
      color: "#069952",
      length: completedTasksArray.length,
      component: (
        <CompletedTasks
          tasks={data.completedTasks}
          loadingTasks={loading.loadingComplete}
          taskActions={taskActions}
          handleOpenEditTask={handleOpenEditTask}
          handleParams={handleCompletedQuery}
        />
      )
    },

    {
      title: "archived",
      color: "#EAECF0",
      length: archivedTasksArray.length,
      component: (
        <ArchivedTasks
          tasks={data.archivedTasks}
          loadingTasks={loading.loadingArchived}
          taskActions={taskActions}
          handleOpenEditTask={handleOpenEditTask}
          handleParams={handleArchivedQuery}
        />
      )
    }
  ];
  return (
    <>
      <MemberFilters title={"Tasks"}>
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
          <ActionColumn
            selectedObject={selectedObject}
            handleSetSelectedObject={handleSetSelectedObject}
          />
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
      </MemberFilters>
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
            <div className="grid grid-cols-[1fr,1.5fr] items-center text-vobb-neutral-60 text-xs px-3 py-4 border-b">
              <h2>Task</h2>
              <div className="grid grid-cols-3">
                <p>Due date</p>
                <p>Object</p>
                <p>Assigned to</p>
              </div>
            </div>
            {taskStatusCategories.map(({ title, color, length, component }) => (
              <div key={title}>
                <p
                  className="bg-vobb-neutral-10 py-2 px-4 flex justify-between items-center capitalize border-b"
                  onClick={() => handleSetOpenTabs(title)}
                  data-testId={`view-${title}`}>
                  <p className="flex items-center gap-2">
                    <IconPointFilled color={color} size={14} /> {title}
                    {length > 0 && (
                      <span className="bg-vobb-neutral-10 h-4 w-4 border text-[10px] text-center rounded-sm">
                        {length}
                      </span>
                    )}
                  </p>
                  {openTabs[title] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </p>
                {openTabs[title] ? component : ""}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export { MemberProfileTasksUI };

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
