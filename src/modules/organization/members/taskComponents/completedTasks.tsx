import {
  IconCircleCheck,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconInbox,
  IconPointFilled,
  IconTrash,
  IconUser
} from "@tabler/icons-react";
import { Button } from "components";
import { cn, shortenText } from "lib";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { calculateDueDate, TaskComponentProps } from "./incompletedTasks";

const CompletedTasks = ({
  tasks,
  loadingTasks,
  taskActions,
  handleOpenEditTask
}: TaskComponentProps) => {
  const completedTasks = tasks.data;
  const { handleChangeStatus, loadingChangeStatus, handleDeleteTask, loadingDeleteTask } =
    taskActions;
  const loading = loadingTasks || loadingChangeStatus || loadingDeleteTask;
  return (
    <div className="max-h-[220px] overflow-scroll">
      {loading ? (
        <div>
          <p className="border-b px-4 py-2 grid grid-cols-[1fr,1.5fr] items-center">
            <div className="flex items-center gap-2">
              <span className="border rounded-full cursor-pointer">
                {" "}
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
        </div>
      ) : (
        completedTasks.map(({ assignedTo, id, dueDate, title }) => {
          const { displayText, textStyle } = calculateDueDate(dueDate);

          return (
            <div
              className="border-b px-4 py-2 grid grid-cols-[1fr,1.5fr] items-center hover:bg-accent hover:text-accent-foreground cursor-pointer"
              key={id}
              onClick={() => handleOpenEditTask(id)}>
              {" "}
              <div className="flex items-center gap-2">
                <span
                  onClick={() => handleChangeStatus(id, "incomplete")}
                  className="rounded-full cursor-pointer">
                  {" "}
                  <IconCircleCheckFilled color="#4A22EB" size={14} />
                </span>
                <p className="opacity-50 line-through capitalize">{shortenText(title, 40)}</p>
              </div>
              <div className="grid grid-cols-3 items-center opacity-50">
                <p
                  style={{
                    ...textStyle,
                    textDecorationColor: textStyle.color || "inherit"
                  }}
                  className="line-through">
                  {displayText}
                </p>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-fit justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
                  )}>
                  {" "}
                  <IconPointFilled color="#eda12f" size={20} /> General
                </Button>
                <div className="flex items-center justify-between">
                  {assignedTo.length > 1 ? (
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-fit justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
                      )}>
                      <>
                        <IconUser className="-mt-0.5 text-vobb-neutral-100" size={16} />{" "}
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

                  <Menu
                    handleArchiveTask={() => handleChangeStatus(id, "archived")}
                    handleDeleteTask={() => handleDeleteTask(id)}
                  />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export { CompletedTasks };

interface MenuProps {
  handleArchiveTask: () => void;
  handleDeleteTask: () => void;
}

const Menu = ({ handleArchiveTask, handleDeleteTask }: MenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-2">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[184px] p-2 rounded-xl">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleArchiveTask} className="flex gap-2 items-center py-2 ">
            <span>
              <IconInbox size={16} color="#101323" />
            </span>
            Archive task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteTask}
            className="flex gap-2 items-center text-error-30 py-2">
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
