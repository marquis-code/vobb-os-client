import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Dispatch, Fragment, ReactNode } from "react";
import { Button } from "components";
import { cn } from "lib";
import { optionType } from "types";
import { IconArrowsSort } from "@tabler/icons-react";
import { FC } from "react";

export type DropdownOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type DropdownSection = {
  title?: string;
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  selectedValue?: string;
  showSelectedIndicator?: boolean;
  customRender?: (option: DropdownOption, isSelected: boolean, index: number) => React.ReactNode;
};

interface CustomSortProps {
  sections: DropdownSection[];
  open: boolean;
  onOpenChange: Dispatch<boolean>;
  triggerIcon?: ReactNode;
  className?: string;
  align?: "start" | "end" | "center";
  side?: "top" | "right" | "bottom" | "left";
  width?: number;
  alignOffset?: number;
  sideOffset?: number;
  clearOption?: {
    label: string;
    onClear: () => void;
  };
}

export const CustomSort: FC<CustomSortProps> = ({
  sections,
  className,
  triggerIcon,
  align = "end",
  width = 56,
  alignOffset,
  side,
  sideOffset,
  clearOption,
  open,
  onOpenChange
}) => {
  // const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("flex items-center gap-1", className)}
          data-testid="custom-sort">
          {/* {triggerIcon ? <IconArrowsSort size={12} color="#667085" /> : triggerIcon} */}
          <IconArrowsSort size={12} color="#667085" />
          <p className="text-xs text-[#344054] font-medium">Sort</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(`w-[${width}px]`)}
        alignOffset={alignOffset}
        align={align}
        side={side}
        sideOffset={sideOffset}>
        {sections.map((section, sectionIndex) => (
          <Fragment key={sectionIndex}>
            {section.title && (
              <>
                <DropdownMenuLabel>{section.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuGroup>
              {section.options.map((option, optionIndex) => {
                const isSelected = option.value === section.selectedValue;

                return (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={(e) => {
                      e.preventDefault();
                      section.onSelect(option);
                    }}
                    className="flex justify-between">
                    {section.customRender ? (
                      section.customRender(option, isSelected, optionIndex)
                    ) : (
                      <>
                        <span className="flex items-center gap-2">
                          {option.icon}
                          {option.label}
                        </span>
                        {isSelected && section.showSelectedIndicator && (
                          <span className="ml-auto rounded-full bg-vobb-primary-70 p-1"></span>
                        )}
                      </>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            {sectionIndex < sections.length - 1 && <DropdownMenuSeparator />}
          </Fragment>
        ))}

        {clearOption && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={clearOption.onClear}
              className="text-destructive focus:text-destructive">
              {clearOption.label}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
