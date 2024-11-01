import { IconCircleCheck, IconPointFilled, IconUser } from "@tabler/icons-react";
import { Button } from "components";
import { cn, shortenText } from "lib";
import { MemberTasksProps } from "types";

const IncompletedTasks = ({ tasks }: { tasks: MemberTasksProps }) => {
  console.log(tasks.data);
  return (
    <div className="max-h-[220px] overflow-scroll">
      <div className="border-b px-4 py-2 flex items-center">
        <div className="flex items-center gap-2 w-[500px]">
          <span>
            {" "}
            <IconCircleCheck color="#fff" className="border rounded-full" size={14} />
          </span>
          <p>
            {shortenText(
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibusillo! Ut, nisiratione. Nesciunt placeat sapiente quibusdam commodi veritatis at?",
              35
            )}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <p className="min-w-28">Due in 5 days</p>
          <Button
            variant={"outline"}
            className={cn(
              "min-w-28 justify-start text-left items-center font-normal text-xs h-8 py-1 px-3 gap-1"
            )}>
            {" "}
            <IconPointFilled color="#ea4" size={18} /> Client
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
      </div>
    </div>
  );
};

export default IncompletedTasks;
