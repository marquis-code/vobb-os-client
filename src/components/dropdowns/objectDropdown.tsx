import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Button } from "components/ui";
import { cn, objectOptions } from "lib";
import { IconArrowNarrowRight, IconPointFilled } from "@tabler/icons-react";

const ObjectDropdown = ({ handleSetObject, selectedObject }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (obj) => {
    handleSetObject(obj);
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
          {!selectedObject ? (
            <>
              <IconArrowNarrowRight
                className="-mt-0.5 text-vobb-neutral-100 transform -rotate-45"
                size={16}
              />{" "}
              Object
            </>
          ) : (
            <>
              <IconPointFilled color={selectedObject.color} size={14} /> {selectedObject.title}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[184px] p-0" align="end" style={{ zIndex: 9999 }}>
        <div className="py-4 px-2 space-y-2">
          {objectOptions.map((obj) => (
            <button
              key={obj.title}
              onClick={() => handleSelect(obj)}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md hover:bg-vobb-neutral-10 text-vobb-neutral-70 cursor-pointer"
              data-testid="invite-member">
              <IconPointFilled color={obj.color} size={14} /> {obj.title}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export { ObjectDropdown };
