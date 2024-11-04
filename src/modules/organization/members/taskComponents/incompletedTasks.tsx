import {
  IconCircleCheck,
  IconDotsVertical,
  IconInbox,
  IconPointFilled,
  IconTrash,
  IconUser
} from "@tabler/icons-react";
import { Button } from "components";
import { cn, shortenText } from "lib";
import { MemberTasksProps, MetaDataProps } from "types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { differenceInCalendarDays, format, isToday } from "date-fns";
import { useInfiniteScroll } from "hooks";

export interface TaskComponentProps {
  tasks: MemberTasksProps;
  loadingTasks: boolean;
  handleOpenEditTask: (id: string) => void;
  taskActions: {
    handleChangeStatus: (id: string, status: string) => void;
    loadingChangeStatus: boolean;
    handleDeleteTask: (id: string) => void;
    loadingDeleteTask: boolean;
  };
  handleParams: (param: string, value: Date | string | number) => void;
  metaData: MetaDataProps;
}

const IncompletedTasks = ({
  tasks,
  loadingTasks,
  handleOpenEditTask,
  taskActions,
  handleParams,
  metaData
}: TaskComponentProps) => {
  const incompletedTasks = tasks.data;
  const { handleChangeStatus, loadingChangeStatus, handleDeleteTask, loadingDeleteTask } =
    taskActions;
  const loading = loadingTasks || loadingChangeStatus || loadingDeleteTask;

  const { loadMoreRef } = useInfiniteScroll(metaData, handleParams);

  return (
    <div className="max-h-[220px] overflow-scroll">
      {incompletedTasks?.map(({ assignedTo, id, dueDate, title }) => {
        const { displayText, textStyle } = dueDate
          ? calculateDueDate(dueDate)
          : { displayText: "", textStyle: {} };

        return (
          <div
            className="border-b px-4 py-2 grid grid-cols-[1fr,1.5fr] items-center hover:bg-accent hover:text-accent-foreground cursor-pointer"
            key={id}
            onClick={() => handleOpenEditTask(id)}
            data-testid="incomplete-task">
            <div className="flex items-center gap-2">
              <span
                onClick={(e) => {
                  handleChangeStatus(id, "complete");
                  e.stopPropagation();
                }}
                className="border rounded-full cursor-pointer">
                {" "}
                <IconCircleCheck color="#fff" size={10} />
              </span>
              <p className="capitalize">{shortenText(title, 40)}</p>
            </div>
            <div className="grid grid-cols-3 items-center">
              <p style={textStyle}>{displayText}</p>
              <Button
                variant={"outline"}
                className={cn(
                  "w-fit justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
                )}>
                {" "}
                <IconPointFilled color="#ea4" size={20} /> General
              </Button>
              <div className="flex items-center justify-between">
                {assignedTo.length > 1 ? (
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-fit justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
                    )}>
                    <>
                      <IconUser
                        className="-mt-0.5 text-vobb-neutral-100"
                        size={16}
                        color="#667085"
                      />{" "}
                      {assignedTo.length} Assignees
                    </>
                  </Button>
                ) : (
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-fit justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
                    )}>
                    {" "}
                    <Avatar className="w-5 h-5">
                      <AvatarImage
                        src={
                          assignedTo[0]?.avatar instanceof File
                            ? URL.createObjectURL(assignedTo[0]?.avatar)
                            : assignedTo[0]?.avatar || ""
                        }
                        alt="profile picture"
                      />

                      <AvatarFallback className="text-[10px]">
                        {assignedTo[0]?.name.charAt(0)}
                        {assignedTo[0]?.name.charAt(1)}
                      </AvatarFallback>
                    </Avatar>
                    <p>{assignedTo[0]?.name}</p>
                  </Button>
                )}
                <div onClick={(e) => e.stopPropagation()}>
                  <Menu
                    handleArchiveTask={() => handleChangeStatus(id, "archived")}
                    handleDeleteTask={() => handleDeleteTask(id)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={loadMoreRef} className="h-4"></div>
      {loading && (
        <div>
          {Array(2)
            .fill(null)
            .map((_, index) => (
              <p key={index} className="border-b px-4 py-2 grid grid-cols-[1fr,1.5fr] items-center">
                <div className="flex items-center gap-2">
                  <span className="border rounded-full cursor-pointer">
                    <IconCircleCheck color="#fff" size={10} />
                  </span>
                  <p className="w-60 h-2 rounded-full bg-vobb-neutral-30"></p>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <p className="w-20 h-2 rounded-full bg-vobb-neutral-30"></p>
                  <p className="w-20 h-2 rounded-full bg-vobb-neutral-30"></p>
                  <p className="w-60 h-2 rounded-full bg-vobb-neutral-30"></p>
                </div>
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export { IncompletedTasks };

interface MenuProps {
  handleArchiveTask: () => void;
  handleDeleteTask: () => void;
}

const Menu = ({ handleArchiveTask, handleDeleteTask }: MenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-2" data-testid="menu-tasks">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[184px] p-2 rounded-xl">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleArchiveTask}
            className="flex gap-2 items-center py-2 "
            data-testid="archive-task">
            <span>
              <IconInbox size={16} color="#101323" />
            </span>
            Archive task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteTask}
            className="flex gap-2 items-center text-error-30 py-2"
            data-testid="delete-task">
            <span>
              <IconTrash size={16} />{" "}
            </span>
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function calculateDueDate(dueDate: string) {
  const today = new Date();

  // Validate dueDate
  if (!dueDate || isNaN(new Date(dueDate).getTime())) {
    return { displayText: "No Due date", textStyle: { color: "#1d2939" } };
  }

  const dueDateObj = new Date(dueDate);

  let displayText;
  let textStyle: { color?: string } = {};

  if (isToday(dueDateObj)) {
    displayText = "Due Today";
    textStyle = { color: "#EDA12F" };
  } else {
    const daysDifference = differenceInCalendarDays(dueDateObj, today);

    if (daysDifference > 0 && daysDifference <= 5) {
      displayText = `Due in ${daysDifference} day${daysDifference > 1 ? "s" : ""}`;
      textStyle = { color: "#EDA12F" };
    } else {
      displayText = `Due ${format(dueDateObj, "do MMM, yyyy")}`;
    }
  }

  return { displayText, textStyle };
}
