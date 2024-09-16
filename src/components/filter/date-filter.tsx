"use client";

import * as React from "react";
import { CalendarIcon, Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "lib/utils";
import { Button } from "components/ui/button";
import { Calendar } from "components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "components/ui/select";

interface DateRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: DateRange | undefined;
  handleChange: (date: DateRange | undefined) => void;
  showPreset?: boolean;
  testId?: string;
}

export function DateFilter({
  className,
  value: date,
  handleChange: setDate,
  testId,
  showPreset
}: DateRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal text-xs h-7 py-1 px-2 gap-2",
              !date && "text-muted-foreground"
            )}
            data-testid={testId}>
            <CalendarIcon className="text-vobb-neutral-60 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  <Cross1Icon
                    role="button"
                    onClick={() => setDate(undefined)}
                    width={12}
                    height={12}
                    stroke="var(--error-20)"
                    strokeWidth={1}
                    className="ml-2"
                    color="var(--error-20)"
                  />
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <PlusIcon width={13} height={13} />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {showPreset ? (
            <Select
              onValueChange={(value) =>
                setDate({ from: addDays(new Date(), -parseInt(value)), to: new Date() })
              }>
              <SelectTrigger className="rounded-b-none w-full border-none mb-2">
                <SelectValue placeholder="Select a range" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Yesterday</SelectItem>
                <SelectItem value="3">3 days ago</SelectItem>
                <SelectItem value="7">A week ago</SelectItem>
                <SelectItem value="30">30 days ago</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            ""
          )}
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
