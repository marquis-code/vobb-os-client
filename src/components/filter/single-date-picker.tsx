import * as React from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "lib/utils";
import { Button } from "components/ui/button";
import { Calendar } from "components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { IconCalendarDue } from "@tabler/icons-react";

interface SingleDateProps extends React.HTMLAttributes<HTMLDivElement> {
  value: Date | undefined;
  handleChange: (date: Date | undefined) => void;
  testId?: string;
}

export function SingleDatePicker({
  className,
  value: date,
  handleChange: setDate,
  testId
}: SingleDateProps) {
  // Function to disable past dates
  //   const disabledDays = (day: Date) => {
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);
  //     return day < today;
  //   };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal text-xs h-9 py-1 px-2 gap-2",
              !date && "text-muted-foreground"
            )}
            data-testid={testId}>
            <IconCalendarDue className="text-vobb-neutral-60 h-4 w-4" />
            {date ? (
              <>
                {format(date, "LLL dd, y")}
                <Cross1Icon
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDate(undefined);
                  }}
                  width={12}
                  height={12}
                  stroke="var(--error-20)"
                  strokeWidth={1}
                  className="ml-2"
                  color="var(--error-20)"
                />
              </>
            ) : (
              "Due Date"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            selected={date}
            onSelect={setDate}
            // disabled={disabledDays}
            defaultMonth={date || new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
