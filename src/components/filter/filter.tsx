import {
  DotsHorizontalIcon,
  DotsVerticalIcon,
  LayersIcon,
  MixerHorizontalIcon,
  PlusIcon,
  TrashIcon
} from "@radix-ui/react-icons";
import { Button, Input } from "components/ui";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { optionType } from "types";
import { CustomInput, SelectInput } from "components/form";

export interface attributeType extends optionType {
  type: fieldType;
}
type fieldType = "select" | "text";
interface conditionType extends optionType {
  type: fieldType[];
  noValue?: boolean;
}

const conditions: conditionType[] = [
  {
    label: "contains",
    value: "contains",
    type: ["text"]
  },
  {
    label: "not contains",
    value: "not contains",
    type: ["text"]
  },
  {
    label: "starts with",
    value: "starts with",
    type: ["text"]
  },
  {
    label: "ends with",
    value: "ends with",
    type: ["text"]
  },
  {
    label: "is",
    value: "is",
    type: ["text", "select"]
  },
  {
    label: "is not",
    value: "is not",
    type: ["text", "select"]
  },
  {
    label: "empty",
    value: "empty",
    type: ["text", "select"],
    noValue: true
  },
  {
    label: "not empty",
    value: "not empty",
    type: ["text", "select"],
    noValue: true
  }
];

interface FilterSelectionProps {
  options: attributeType[];
  value: attributeType | undefined;
  setValue: (value: attributeType) => void;
  className?: string;
  variant?: any;
  showIcon?: boolean;
}
const FilterSelection = ({
  options,
  value,
  setValue,
  className,
  variant,
  showIcon
}: FilterSelectionProps) => {
  const [open, setOpen] = React.useState(false);
  const noValue = !value || value.value === "";
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant ?? "outline"}
          role="combobox"
          aria-expanded={open}
          className={cn("gap-2 items-center px-2 bg-vobb-neutral-0 h-7", className)}
          size={"sm"}>
          {!noValue ? (
            value.label
          ) : showIcon ? (
            <PlusIcon color="var(--neutral-70)" />
          ) : (
            <>
              <MixerHorizontalIcon />
              Filter
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search attributes..." className="h-9" />
          <CommandList>
            <CommandEmpty>No attribute found.</CommandEmpty>
            <CommandGroup>
              {options.map((attribute) => (
                <CommandItem
                  key={attribute.value}
                  value={attribute.value}
                  onSelect={() => {
                    setValue(attribute);
                    setOpen(false);
                  }}>
                  {attribute.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value?.value === attribute.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface FilterConditionProps {
  options: conditionType[];
  value: conditionType | undefined;
  setValue: (value: conditionType) => void;
  className?: string;
  variant?: any;
}
const FilterCondition = ({
  options,
  value,
  setValue,
  className,
  variant
}: FilterConditionProps) => {
  const [open, setOpen] = React.useState(false);

  const noValue = !value || value.value === "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant ?? "outline"}
          aria-expanded={open}
          className={cn(
            "gap-2 items-center shadow-none px-2 py-1 h-auto bg-transparent rounded-none",
            className,
            noValue ? "text-vobb-neutral-50 font-normal" : ""
          )}
          size={"sm"}>
          {!noValue ? value.label : "Select condition"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-0 flex flex-col p-1">
        {options.map((option) => (
          <button
            onClick={() => setValue(option)}
            className="px-2 py-1 text-left hover:bg-vobb-neutral-20 rounded">
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

interface FilterValueProps {
  value: string | optionType | undefined;
  setValue: (value: string | optionType) => void;
  className?: string;
  variant?: any;
  type: fieldType;
  options?: optionType[];
}
const FilterValue = ({ value, setValue, className, variant, type, options }: FilterValueProps) => {
  const [open, setOpen] = React.useState(false);

  const noValue = !value;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setOpen(false);
    }
  };

  const isText = type === "text" && (typeof value === "string" || typeof value === "undefined");
  const isSelect = type === "select" && typeof value !== "string";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant ?? "outline"}
          aria-expanded={open}
          className={cn(
            "gap-2 items-center shadow-none px-2 py-1 h-auto bg-transparent rounded-none",
            className,
            noValue ? "text-vobb-neutral-50 font-normal" : ""
          )}
          size={"sm"}>
          {isText
            ? !noValue
              ? value
              : "enter text..."
            : isSelect
            ? !noValue
              ? value.label
              : "select option..."
            : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] flex flex-col p-1">
        {isText ? (
          <CustomInput
            autoFocus
            className="h-8 px-2 text-xs"
            parentClassName="mb-0"
            placeholder="enter text..."
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : isSelect ? (
          <SelectInput
            options={options}
            onChange={setValue}
            placeholder="select option..."
            parentClassName="mb-0"
            className="h-8 text-xs"
            styles={{
              fontSize: "12px",
              height: "32px",
              minHeight: "32px"
            }}
          />
        ) : (
          ""
        )}
      </PopoverContent>
    </Popover>
  );
};

interface FilterMenuProps {
  handleDelete: () => void;
  handleAdvanced: () => void;
  className?: string;
  isComplete: boolean;
  isAdvanced: boolean;
}
const FilterMenu = ({
  handleDelete,
  handleAdvanced,
  className,
  isComplete,
  isAdvanced
}: FilterMenuProps) => {
  const [open, setOpen] = React.useState(false);

  const onAdvanced = () => {
    setOpen(false);
    handleAdvanced();
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={cn("p-1 border-l", className)}>
          <DotsVerticalIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit flex flex-col p-1 gap-1">
        {isComplete && !isAdvanced ? (
          <Button
            onClick={onAdvanced}
            variant={"ghost"}
            className={cn(
              "gap-2 justify-start items-left shadow-none p-1 h-auto bg-transparent rounded-md"
            )}
            size={"sm"}>
            <LayersIcon />
            Convert to advanced filter
          </Button>
        ) : (
          ""
        )}
        <Button
          onClick={handleDelete}
          variant={"ghost"}
          className={cn(
            "gap-1 justify-start items-center shadow-none p-1 h-auto bg-transparent rounded-md text-error-20 hover:text-error-20 hover:bg-error-0"
          )}
          size={"sm"}>
          <TrashIcon />
          Delete {isComplete ? "filter" : "condition"}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export interface FilterData {
  property?: attributeType;
  condition?: conditionType;
  value?: string | optionType;
  isAdvanced?: boolean;
}

interface FilterProps {
  filters: FilterData[];
  setFilter: (val: FilterData[]) => void;
  attributes: attributeType[];
  className?: string;
}
const Filter = ({ filters, setFilter, attributes, className }: FilterProps) => {
  const handleProperty = (val: attributeType, index: number) => {
    setFilter(
      filters.map((filter, filterIndex) =>
        index === filterIndex ? { ...filter, property: val } : filter
      )
    );
  };

  const handleCondition = (val: conditionType, index: number) => {
    setFilter(
      filters.map((filter, filterIndex) =>
        index === filterIndex ? { ...filter, condition: val } : filter
      )
    );
  };

  const handleValue = (val: string | optionType, index: number) => {
    setFilter(
      filters.map((filter, filterIndex) =>
        index === filterIndex ? { ...filter, value: val } : filter
      )
    );
  };

  const handleAddNewProperty = (val: attributeType) => {
    setFilter([...filters, { property: val }]);
  };

  const handleDeleteFilter = (index: number) => {
    setFilter(filters.filter((_, filterIndex) => index !== filterIndex));
  };

  const handleAdvanced = (index: number) => {
    setFilter(
      filters.map((filter, filterIndex) =>
        index === filterIndex ? { ...filter, isAdvanced: true } : filter
      )
    );
  };

  return (
    <>
      <section className={cn("flex items-stretch gap-2 overflow-auto mb-4", className)}>
        {filters.map((item, index) => {
          const isComplete =
            item.condition &&
            item.property &&
            ((item.condition.noValue && !item.value) || (!item.condition.noValue && item.value))
              ? true
              : false;
          const isAdvanced = item.isAdvanced ?? false;
          return (
            <div className="flex items-stretch text-xs border rounded-md w-fit bg-vobb-neutral-0 h-auto relative">
              <FilterSelection
                variant={"ghost"}
                className="shadow-none px-2 py-1 h-auto bg-transparent rounded-none"
                options={attributes}
                value={attributes.find((attr) => attr.value === item.property?.value)}
                setValue={(val) => handleProperty(val, index)}
              />
              {item.property && (
                <FilterCondition
                  variant={"ghost"}
                  className="border-l"
                  options={conditions.filter((condition) =>
                    condition.type.find((arr) => arr === item.property?.type)
                  )}
                  value={item.condition}
                  setValue={(val) => handleCondition(val, index)}
                />
              )}
              {item.condition && item.property && !item.condition.noValue && (
                <FilterValue
                  variant={"ghost"}
                  className="border-l"
                  value={item.value}
                  setValue={(val) => handleValue(val, index)}
                  type={item.property.type}
                  options={conditions} //has to be particular to type
                />
              )}
              <FilterMenu
                isComplete={isComplete}
                isAdvanced={isAdvanced}
                handleAdvanced={() => handleAdvanced(index)}
                handleDelete={() => handleDeleteFilter(index)}
              />
            </div>
          );
        })}
        <div className="flex items-stretch text-xs border rounded-md w-fit bg-vobb-neutral-0 h-auto relative">
          <FilterSelection
            variant={"ghost"}
            className="shadow-none px-2 py-1 h-auto bg-transparent rounded-none"
            options={attributes}
            value={filters[filters.length]?.property}
            setValue={handleAddNewProperty}
            showIcon={filters.length !== 0}
          />
        </div>
      </section>
    </>
  );
};

export { Filter };
