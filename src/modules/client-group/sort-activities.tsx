import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Button } from "components";
import { IconArrowDown, IconArrowsSort, IconArrowUp, IconCircleFilled } from "@tabler/icons-react";
import { useState } from "react";

const SortActivities = ({
  handleParams
}: {
  handleParams: (param: string, value: string | number) => void;
}) => {
  const [isShowingSortModal, setIsShowingSortModal] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);

  const handleSortDirectionSelect = (direction: "asc" | "desc") => {
    setSortDirection(direction);
    handleParams("sort", direction);
    setIsShowingSortModal(false);
  };

  return (
    <DropdownMenu open={isShowingSortModal} onOpenChange={setIsShowingSortModal}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal text-xs h-8 py-1 px-2 gap-2">
          <IconArrowsSort size={12} color="#667085" />
          <p className="text-xs text-[#344054] font-medium">Sort</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuItem
          onClick={() => handleSortDirectionSelect("asc")}
          className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2">
            {sortDirection === "asc" && <IconCircleFilled color="#4A22EB" size={10} />}
            Ascending
          </div>
          <IconArrowUp color="#667085" size={12} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSortDirectionSelect("desc")}
          className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2">
            {sortDirection === "desc" && <IconCircleFilled color="#4A22EB" size={10} />}
            Descending
          </div>
          <IconArrowDown color="#667085" size={12} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SortActivities;
