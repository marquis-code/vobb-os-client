import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "components";
import { optionType } from "types";

export type SortOrderType = "asc" | "desc";

interface SortByProps {
  sort: {
    active: optionType | undefined;
    items: optionType[];
    handleChange: (val: optionType | undefined) => void;
  };
  order: {
    show: boolean;
    active: SortOrderType | undefined;
    handleChange: (val: SortOrderType | undefined) => void;
  };
  className?: string;
  isClearable?: boolean;
  testId?: string;
}

const SortBy = ({ order, sort, className, isClearable, testId }: SortByProps) => {
  const handleSortBy = (item: optionType) => {
    sort.handleChange(item);
  };
  const handleClear = () => {
    sort.handleChange(undefined);
    order.handleChange(undefined);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="py-1 h-9 px-2 gap-1 text-xs text-vobb-neutral-60 focus-visible:ring-0 focus-visible:ring-none"
          data-testid={testId}>
          {!order.active && <CaretSortIcon />}
          {sort.active ? (
            <>
              Sorted by:{" "}
              <span className="text-vobb-neutral-100 flex gap-1 items-center">
                {sort.active.label}{" "}
                {order.active === "asc" ? (
                  <ArrowUpIcon width={10} height={10} />
                ) : order.active === "desc" ? (
                  <ArrowDownIcon width={10} height={10} />
                ) : (
                  ""
                )}
              </span>
            </>
          ) : (
            "Sort"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mr-4">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {sort.items.map((item) => (
            <DropdownMenuItem
              //   disabled={sort.items.length === 1}
              onClick={() => handleSortBy(item)}
              key={item.value}>
              {item.label}{" "}
              {item.value === sort?.active?.value ? (
                <span className="ml-auto rounded-full bg-vobb-primary-70 p-1"></span>
              ) : (
                ""
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        {order.show ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => order.handleChange("asc")}
                className="justify-between">
                Ascending
                {order.active === "asc" ? (
                  <span className="ml-auto rounded-full bg-vobb-primary-70 p-1"></span>
                ) : (
                  <ArrowUpIcon />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => order.handleChange("desc")}
                className="justify-between">
                Descending{" "}
                {order.active === "desc" ? (
                  <span className="ml-auto rounded-full bg-vobb-primary-70 p-1"></span>
                ) : (
                  <ArrowDownIcon />
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : (
          ""
        )}
        {isClearable ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleClear} className="justify-between text-error-20">
                Clear
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : (
          ""
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { SortBy };
