import { IconListCheck, IconPlus, IconPointFilled } from "@tabler/icons-react";
import { Button, DateFilter, LoadingSpinner, TableEmptyState } from "components";
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

    handleParams: (param: string, value: Date | string | number) => void;
  };

  handleOpenAddTask: () => void;
}

const MemberProfileTasksUI: React.FC<MemberProfileTasksProps> = ({
  allTasks,
  handleOpenAddTask
}) => {
  const { data, loading, params, handleParams } = allTasks;
  const { data: incompletedTasksArray } = data.incompletedTasks;
  const { data: completedTasksArray } = data.completedTasks;
  const { data: archivedTasksArray } = data.archivedTasks;

  const [selectedObject, setSelectedObject] = useState<ObjectOptionProps | null>(null);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [openTabs, setOpenTabs] = useState({
    incompleted: true,
    completed: true,
    archived: true
  });

  const handleSetSelectedObject = (obj: ObjectOptionProps) => {
    setSelectedObject(obj);
    handleParams("object", obj.title.toLowerCase());
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
  const loadingTasks =
    loading.loadingIncomplete || loading.loadingComplete || loading.loadingArchived;
  const taskStatusCategories = [
    {
      title: "completed",
      color: "#069952",
      length: completedTasksArray.length,
      component: <CompletedTasks tasks={data.completedTasks} />
    },
    {
      title: "incompleted",
      color: "#EDA12F",
      length: incompletedTasksArray.length,
      component: <IncompletedTasks tasks={data.incompletedTasks} />
    },
    {
      title: "archived",
      color: "#EAECF0",
      length: archivedTasksArray.length,
      component: <ArchivedTasks tasks={data.archivedTasks} />
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
                handleParams(
                  "start",
                  val.from
                    ? val.from.toISOString().slice(0, 10)
                    : (params.incompleteQueryParams.start as string)
                );
                handleParams(
                  "end",
                  val.to
                    ? val.to.toISOString().slice(0, 10)
                    : (params.incompleteQueryParams.end as string)
                );
              }
            }}
          />
          <ActionColumn
            selectedObject={selectedObject}
            handleSetSelectedObject={handleSetSelectedObject}
          />
          <Button
            onClick={handleOpenAddTask}
            variant={"outline"}
            className={
              "w-full justify-start text-left items-center font-normal text-xs h-8 py-1 px-2 gap-1"
            }>
            <IconPlus size={16} color="#667085" /> Add Task
          </Button>
        </div>
      </MemberFilters>
      <div>
        {loadingTasks ? (
          <LoadingSpinner />
        ) : noTasks ? (
          <TableEmptyState
            pageIcon={<IconListCheck size={25} color="#101323" />}
            title="No tasks have been assigned yet."
            description="Assign tasks to ensure clear responsibilities and follow-up actions for this member."
            ctaFunction={console.log}
            btnText="Add Task"
          />
        ) : (
          <>
            <div className="flex items-center text-vobb-neutral-60 text-xs px-3 py-4 border-b">
              <h2 className="w-[500px]">Task</h2>
              <div className="grid grid-cols-3 gap-4">
                <p className="min-w-28">Due date</p>
                <p className="min-w-28">Object</p>
                <p className="min-w-28">Assigned to</p>
              </div>
            </div>

            {taskStatusCategories.map(({ title, color, length, component }) => (
              <div key={title}>
                <p
                  className="bg-vobb-neutral-10 py-2 px-4 flex justify-between items-center capitalize border-b"
                  onClick={() => handleSetOpenTabs(title)}>
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
      <DropdownMenuContent align="end" className="py-4 px-2 space-y-2 w-[184px]">
        {objectOptions.map((obj) => (
          <DropdownMenuItem
            onClick={() => handleSetSelectedObject(obj)}
            key={obj.title}
            className="gap-2 cursor-pointer text-vobb-neutral-70"
            testId="invite-member">
            <IconPointFilled color={obj.color} size={14} /> {obj.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
