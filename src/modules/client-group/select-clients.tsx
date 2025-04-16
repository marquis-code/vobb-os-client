import { Button } from "components";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { SelectionPanel } from "./selection-panel";
import { IconChevronDown, IconX } from "@tabler/icons-react";

export type ClientType = {
  _id: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

interface SelectClientProps {
  label: string;
  validatorMessage?: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  required?: boolean;
  options: ClientType[];
  selectedOptions: ClientType[];
  setSelectedOptions: Dispatch<SetStateAction<ClientType[]>>;
  //   onChange: (val: ClientType[]) => void;
}

const SelectClients: FC<SelectClientProps> = ({
  label,
  options,
  required,
  selectedOptions,
  setSelectedOptions
}) => {
  const [show, setShow] = useState(false);

  const handleSetSelectedOptions = (selectedIds: string[]) => {
    return options.reduce<ClientType[]>((acc, option) => {
      selectedIds.forEach((item) => {
        if (option._id === item) acc.push(option);
      });
      return acc;
    }, []);
  };

  return (
    <div className="mb-4 relative">
      {label && (
        <label className={"block font-inter text-xs mb-1"}>
          {label}
          {required ? <span className={"text-error-50"}>*</span> : ""}
        </label>
      )}

      <div>
        <div
          onClick={() => setShow((prev) => !prev)}
          className="flex gap-2 justify-between items-center min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <div className="flex-1 flex flex-wrap gap-2">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option, index) => (
                <div className="flex items-center gap-1 w-fit p-1 border rounded">
                  <span className="size-5 rounded-full text-[10px] text-white bg-vobb-primary-80 uppercase grid place-items-center">
                    {option.first_name.slice(0, 1)}
                    {option.last_name.slice(0, 1)}
                  </span>
                  <p className="capitalize">{option.first_name}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-vobb-neutral-50">Select Clients</p>
            )}
          </div>
          {selectedOptions.length > 0 ? (
            <Button
              className="!border-none"
              type="button"
              variant={"ghost"}
              size={"icon"}
              onClick={() => setSelectedOptions([])}>
              <IconX size={14} />
            </Button>
          ) : (
            <div className="text-[#667085]">
              <IconChevronDown size={16} />
            </div>
          )}
        </div>
        {show && (
          <div className=" absolute w-full mt-2 z-[1] mb-2">
            <SelectionPanel
              type="member"
              selectedOptions={selectedOptions.map((option) => option._id)}
              className="!max-w-full"
              items={options}
              onSubmit={(selectedIds) => {
                setSelectedOptions(handleSetSelectedOptions(selectedIds));
                setShow(false);
              }}
              buttonText="Select Clients"
              searchPlaceholder="Search Clients"
              close={() => setShow(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default SelectClients;
