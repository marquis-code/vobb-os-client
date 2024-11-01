import { IconCircleCheck, IconDotsVertical, IconPointFilled, IconUser } from "@tabler/icons-react";
import { Button } from "components";
import { cn, shortenText } from "lib";
import { MemberTasksProps } from "types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";

const IncompletedTasks = ({ tasks }: { tasks: MemberTasksProps }) => {
  console.log(tasks.data);
  return (
    <div className="max-h-[220px] overflow-scroll">
      {
        <div className="border-b px-4 py-2 flex items-center">
          <div className="flex items-center gap-2 w-[480px]">
            <span>
              {" "}
              <IconCircleCheck color="#fff" className="border rounded-full" size={14} />
            </span>
            <p>
              {shortenText(
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibusillo! Ut, nisiratione. Nesciunt placeat sapiente quibusdam commodi veritatis at?",
                63
              )}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 items-center">
            <p className="min-w-28">Due in 5 days</p>
            <Button
              variant={"outline"}
              className={cn(
                "min-w-28 justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
              )}>
              {" "}
              <IconPointFilled color="#ea4" size={20} /> Client
            </Button>
            <Button
              variant={"outline"}
              className={cn(
                "min-w-28 justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
              )}>
              <>
                <IconUser className="-mt-0.5 text-vobb-neutral-100" size={16} /> 2 Assignees
              </>
            </Button>
          </div>
          <div className="ml-auto">
            <Menu handleArchiveTask={console.log} handleDeleteTask={console.log} />
          </div>
        </div>
      }
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
        <Button variant="outline" className="px-2">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleArchiveTask}>Change role</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteTask}>Change branch</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
