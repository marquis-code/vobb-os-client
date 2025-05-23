"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "lib/utils";
import { Button } from "components/ui/button";
import { Calendar } from "components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";

export interface DatePickerProps {
  value: Date | undefined;
  handleChange: (val: Date | undefined) => void;
  label?: string | React.ReactNode;
  validatorMessage?: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  labelClassName?: string;
  hideFieldIcon?: boolean;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    value,
    handleChange,
    parentClassName,
    label,
    required,
    className,
    validatorMessage,
    hint,
    placeholder,
    labelClassName,
    hideFieldIcon,
    disabled
  } = props;

  return (
    <div className={cn("mb-4", parentClassName)}>
      {label && (
        <label className={cn("block font-inter text-xs mb-1", labelClassName)}>
          {label}
          {required ? <span className={"text-error-50"}>*</span> : ""}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal hover:border-vobb-neutral-100 focus:border-vobb-neutral-100 hover:bg-white",
              !value && "text-muted-foreground",
              className
            )}
            disabled={disabled}>
            {!hideFieldIcon ? <CalendarIcon className="mr-2 h-4 w-4" /> : ""}
            {value ? format(value, "PPP") : <span>{placeholder ?? "Pick a date"}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={value} onSelect={handleChange} initialFocus />
        </PopoverContent>
      </Popover>
      {validatorMessage && (
        <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
      )}
      {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
    </div>
  );
};

export { DatePicker };
