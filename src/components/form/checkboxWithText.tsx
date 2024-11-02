import { Checkbox } from "../ui";
import { cn } from "lib/utils";

interface CheckboxWithTextProps {
  label: string;
  name?: string;
  instruction?: string;
  className?: string;
  labelClassName?: string;
  instructionClassName?: string;
  handleChecked: (checked: boolean) => void;
  checked: boolean;
  disabled?: boolean;
}

export const CheckboxWithText = (props: CheckboxWithTextProps) => {
  const {
    label,
    name,
    instruction,
    labelClassName,
    instructionClassName,
    className,
    handleChecked,
    checked,
    disabled
  } = props;
  return (
    <div className={cn("items-top flex space-x-2", className)}>
      <Checkbox
        id="terms1"
        checked={checked}
        name={name}
        onCheckedChange={handleChecked}
        disabled={disabled}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            labelClassName
          )}>
          {label}
        </label>
        {instruction && (
          <p
            className={cn(
              "text-sm text-muted-foreground text-vobb-neutral-60",
              instructionClassName
            )}>
            {instruction}
          </p>
        )}
      </div>
    </div>
  );
};
