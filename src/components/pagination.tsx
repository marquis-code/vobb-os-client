import { cn } from "lib";
import { Button } from "./ui";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { SelectInput } from "./form";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

export interface PaginationProps {
  className?: string;
  handleChange: (page: number) => void;
  handlePageLimit: (page: number) => void;
  totalCount: number;
  pageLimit: number;
  totalPages: number;
  currentPage: number;
  hidePageLimit?: boolean;
  testId?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  className,
  handleChange,
  handlePageLimit,
  pageLimit = 15,
  totalCount = 1,
  currentPage = 1,
  totalPages = 1,
  hidePageLimit,
  testId
}) => {
  const handleIncrease = () => {
    if (currentPage < totalPages) handleChange(currentPage + 1);
  };

  const handleDecrease = () => {
    if (currentPage > 1) handleChange(currentPage - 1);
  };

  const start = currentPage * pageLimit - pageLimit + 1;
  const end = currentPage * pageLimit > totalCount ? totalCount : currentPage * pageLimit;

  const limitOptions = [
    {
      label: "15",
      value: "15"
    },
    {
      label: "50",
      value: "50"
    },
    {
      label: "100",
      value: "100"
    }
  ];
  return (
    <>
      <section
        className={cn("flex items-center justify-between gap-4 text-vobb-neutral-90", className)}
        data-testid={testId}>
        {hidePageLimit ? (
          ""
        ) : (
          <div className="flex items-center gap-2 mr-auto ">
            <p>Items per page:</p>
            <div>
              <SelectInput
                options={limitOptions}
                value={{ label: `${pageLimit}`, value: `${pageLimit}` }}
                onChange={(val) => val && handlePageLimit(parseInt(val?.value))}
                name={""}
                parentClassName="w-[5rem] mb-0 !text-xs"
                className="!text-xs"
                testId="select-limit"
              />
            </div>
          </div>
        )}
        <p>
          {start} - {end} of {totalCount} items
        </p>
        <div className="flex gap-2">
          <Button
            disabled={currentPage === 1 || totalPages === 1}
            variant={"outline"}
            size={"icon"}
            onClick={handleDecrease}
            data-testid="move-left">
            <IconArrowNarrowLeft size={16} color="#101323" />
          </Button>
          <Button
            size={"icon"}
            disabled={currentPage >= totalPages}
            variant={"outline"}
            onClick={handleIncrease}
            data-testid="move-right">
            <IconArrowNarrowRight size={16} color="#101323" />
          </Button>
        </div>
      </section>
    </>
  );
};

export { Pagination };
