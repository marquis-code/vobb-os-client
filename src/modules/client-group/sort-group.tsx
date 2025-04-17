"use client";

import {
  IconArrowDown,
  IconArrowUp,
  IconChevronRight,
  IconCircleFilled
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { CustomSort, type DropdownOption } from "components/filter/custom-sort";
import { useClickOutside } from "hooks";

export default function SortGroup({
  handleParams
}: {
  handleParams: (param: string, value: string | number) => void;
}) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [show, setShow] = useState(false);
  const [showNestedDropdown, setShowNestedDropdown] = useState(false);
  // const [nestedPosition, setNestedPosition] = useState({ top: 0 });

  const nestedDropDownRef = useRef(null);
  useClickOutside(nestedDropDownRef, () => setShowNestedDropdown(false));

  const sortFieldOptions: DropdownOption[] = [
    { label: "Group name", value: "group_name" },
    { label: "Date created", value: "date_created" }
  ];

  const sortDirectionOptions: DropdownOption[] = [
    {
      label: "Ascending",
      value: "asc",
      icon: <IconArrowUp color="#667085" size={12} />
    },
    {
      label: "Descending",
      value: "desc",
      icon: <IconArrowDown color="#667085" size={12} />
    }
  ];

  const handleSortFieldSelect = (option: DropdownOption) => {
    setSortField(option.value);
    if (option.value === "date_created") {
      setShowNestedDropdown(true);
      // // Calculate position based on index (32px per item)
      // setNestedPosition({ top: index * 32 });
    }
    // return false;
  };

  const handleSortDirectionSelect = (option: DropdownOption) => {
    setSortDirection(option.value as "asc" | "desc");
    handleParams("sort", option.value);
    setShowNestedDropdown(false);
  };

  const renderSortFieldOption = (option: DropdownOption, isSelected: boolean, index: number) => {
    return (
      <>
        <span>{option.label}</span>
        <IconChevronRight size={12} />
      </>
    );
  };

  const renderSortDirectionOption = (option: DropdownOption) => {
    const isSelected = option.value === sortDirection;

    return (
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {isSelected && <IconCircleFilled color="#4A22EB" size={10} />}
          <span>{option.label}</span>
        </div>
        {option.icon}
      </div>
    );
  };

  return (
    <div className="relative">
      <CustomSort
        open={show}
        onOpenChange={setShow}
        sections={[
          {
            options: sortFieldOptions,
            onSelect: (option) => handleSortFieldSelect(option),
            customRender: renderSortFieldOption
          }
        ]}
        className="bg-white border-[0.5px] border-[#dddfe5] py-1.5 px-2"
        width={200}
        align="end"
        alignOffset={-140}
      />

      {showNestedDropdown && (
        <div
          ref={nestedDropDownRef}
          className="absolute left-[200px] top-[60px] ml-1 w-[150px] p-0 bg-white border rounded-md shadow-md z-50"
          // style={{ top: `${nestedPosition.top}px` }}
        >
          <div className="py-1">
            {sortDirectionOptions.map((option) => (
              <div
                key={option.value}
                className="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm"
                onClick={() => handleSortDirectionSelect(option)}>
                {renderSortDirectionOption(option)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
