"use client";

import {
  IconArrowDown,
  IconArrowsSort,
  IconArrowUp,
  IconChevronRight,
  IconCircle,
  IconCircleFilled
} from "@tabler/icons-react";
// import { Button } from "@/components/ui/button";
import { Button } from "components";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";

const SortGroup = ({
  handleParams
}: {
  handleParams: (param: string, value: string | number) => void;
}) => {
  const [isShowingSortModal, setIsShowingSortModal] = useState(false);
  const [isShowingDateCreatedModal, setIsShowingDateIsCreatedModal] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);

  // Handle sort direction selection
  const handleSortDirectionSelect = (direction: "asc" | "desc") => {
    setSortDirection(direction);
    handleParams("sort", direction);
    setIsShowingDateIsCreatedModal(false);
    setIsShowingSortModal(false);
  };

  return (
    <DropdownMenu open={isShowingSortModal} onOpenChange={setIsShowingSortModal}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-1 bg-white border-[0.5px] border-[#dddfe5] py-1.5 px-2">
          <IconArrowsSort size={12} color="#667085" />
          <p className="text-xs text-[#344054] font-medium">Sort</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={-140} className="w-[200px]">
        <DropdownMenuItem
          className="cursor-pointer flex w-full justify-between items-center"
          data-testid="group-name"
          onSelect={(e) => {
            e.preventDefault();
          }}>
          Group name
          <IconChevronRight size={12} />
        </DropdownMenuItem>

        <Popover
          open={isShowingDateCreatedModal}
          onOpenChange={(open) => {
            setIsShowingDateIsCreatedModal(open);
            if (open) setIsShowingSortModal(true);
          }}>
          <PopoverTrigger asChild>
            <div
              onClick={() => setIsShowingDateIsCreatedModal(true)}
              className="px-2 py-1.5 text-sm cursor-pointer flex w-full justify-between items-center hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground rounded-sm"
              data-testid="date-created">
              Date created
              <IconChevronRight size={12} />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-[150px] p-0 bg-white border z-50"
            sideOffset={20}
            side="right"
            align="start">
            <div className="py-1">
              <div
                className="px-2 py-1.5 text-sm cursor-pointer flex w-full justify-between items-center hover:bg-accent hover:text-accent-foreground rounded-sm"
                data-testid="asc"
                onClick={() => handleSortDirectionSelect("asc")}>
                <div className="flex items-center gap-2">
                  {sortDirection === "asc" && <IconCircleFilled color="#4A22EB" size={10} />}
                  Ascending
                </div>
                <IconArrowUp color="#667085" size={12} />
              </div>
              <div
                className="px-2 py-1.5 text-sm cursor-pointer flex w-full justify-between items-center hover:bg-accent hover:text-accent-foreground rounded-sm"
                data-testid="desc"
                onClick={() => handleSortDirectionSelect("desc")}>
                <div className="flex items-center gap-2">
                  {sortDirection === "desc" && <IconCircleFilled color="#4A22EB" size={10} />}
                  Descending
                </div>
                <IconArrowDown color="#667085" size={12} />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortGroup;
