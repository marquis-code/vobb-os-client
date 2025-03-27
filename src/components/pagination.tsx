import { cn } from "lib";
import { Button } from "./ui";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { SelectInput } from "./form";
import { useMemo } from "react";

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
    { label: "15", value: "15" },
    { label: "50", value: "50" },
    { label: "100", value: "100" }
  ];

  const paginationRange = useMemo(() => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = []; 
  
    // Calculate the range
    if (totalPages <= 7) {
      // If total pages is 7 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Always include first page
      range.push(1);
  
      // Calculate middle range
      const startPage = Math.max(2, currentPage - delta);
      const endPage = Math.min(totalPages - 1, currentPage + delta);
  
      for (let i = startPage; i <= endPage; i++) {
        range.push(i);
      }
  
      // Always include last page
      range.push(totalPages);
    }
  
    // Add ellipsis where needed
    let prev: number | null = null;
    for (const i of range) {
      if (prev) {
        if (i - prev > 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      prev = i;
    }
  
    return rangeWithDots;
  }, [currentPage, totalPages]);

  return (
    <>
      <section 
        className={cn("flex items-center justify-between gap-4 w-full border-y py-2 px-4", className)} 
        data-testid={testId}
      >
        <p className="text-xs font-medium text-neutral-60">
          Showing {start}-{end} of {totalCount}
        </p>

        <div className="flex items-center gap-2">
          <Button
            disabled={currentPage === 1 || totalPages === 1}
            variant="outline"
            onClick={handleDecrease}
            data-testid="move-left"
            className="h-8 w-8 p-0 lg:h-9 lg:w-24 lg:px-3"
          >
           <IconArrowNarrowLeft size={16} color="#101323" className="ml-2 min-h-4 min-w-4" />
            <span className="hidden lg:inline">Previous</span>
          </Button>

          <div className="flex gap-1 text-xs font-medium">
            {paginationRange.map((pageNumber, idx) => {
              if (pageNumber === '...') {
                return (
                  <p 
                    key={`ellipsis-${idx}`}
                  >
                    ⋯
                  </p>
                );
              }

              return (
                <Button
                  key={`page-${pageNumber}`}
                  onClick={() => handleChange(pageNumber as number)}
                  variant={currentPage === pageNumber ? "outline" : "ghost"}
                  className={cn("h-8 w-8", {
                    "text-vobb-primary-70 border-vobb-primary-40 shadow-sm": currentPage === pageNumber
                  })}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            disabled={currentPage >= totalPages}
            variant="outline"
            onClick={handleIncrease}
            data-testid="move-right"
            className="h-8 w-8 p-0 lg:h-9 lg:w-24 lg:px-3"
          >
            <span className="hidden lg:inline">Next</span>
            <IconArrowNarrowRight size={16} color="#101323" className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {!hidePageLimit && (
          <div className="flex items-center gap-2 text-xs font-medium">
            <p className="text-neutral-60">Show per page</p>
            <div>
              <SelectInput
                options={limitOptions}
                value={{ label: `${pageLimit}`, value: `${pageLimit}` }}
                onChange={(val) => val && handlePageLimit(parseInt(val?.value))}
                name={""}
                parentClassName="mb-0 !text-xs"
                className="!text-xs"
                testId="select-limit"
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export { Pagination };