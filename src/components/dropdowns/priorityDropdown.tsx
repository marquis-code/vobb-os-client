import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Button } from "components/ui";
import { cn, priorityOptions } from "lib";
import { IconFlag } from "@tabler/icons-react";

const PriorityDropdown = ({ handleSetPriority, selectedPriority }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (obj) => {
    handleSetPriority(obj);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
          )}>
          {!selectedPriority ? (
            <>
              <IconFlag className="-mt-0.5 text-vobb-neutral-100" size={16} /> Priority
            </>
          ) : (
            <>
              <IconFlag color={selectedPriority.color} size={14} /> {selectedPriority.title}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[184px] p-0" align="end" style={{ zIndex: 9999 }}>
        <div className="py-4 px-2 space-y-2">
          {priorityOptions.map((obj) => (
            <button
              key={obj.title}
              onClick={() => handleSelect(obj)}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md hover:bg-vobb-neutral-10 text-vobb-neutral-70 cursor-pointer"
              data-testid="invite-member">
              <IconFlag color={obj.color} size={14} /> {obj.title}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export { PriorityDropdown };
