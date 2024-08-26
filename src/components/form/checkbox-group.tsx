import { cn } from "lib/utils";
import { optionType } from "types/interfaces";
import { CheckboxWithText } from "./checkboxWithText";
import { ReactNode, useRef, useState } from "react";
import { useClickOutside } from "hooks";

export interface CheckboxGroupProps {
  options: optionType[];
  value: optionType[];
  onChange: (newValue: optionType[]) => void;
  label?: string | ReactNode;
  hint?: string;
  parentClassName?: string;
  className?: string;
  required?: boolean;
  validatorMessage?: string;
  hideOptions?: boolean;
  labelClassName?: string;
  disabled?: boolean;
}

const CustomCheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const {
    required,
    label,
    options,
    value,
    onChange,
    parentClassName,
    hideOptions,
    validatorMessage,
    labelClassName,
    hint,
    disabled
  } = props;

  const handleChange = (item: optionType) => {
    if (value && value?.some((val) => item.value === val.value)) {
      const newList = value.filter((val) => item.value !== val.value);
      onChange(newList);
    } else {
      value ? onChange([...value, item]) : onChange([item]);
    }
  };

  const [show, setShow] = useState(false);

  const close = () => setShow(false);

  const ref = useRef(null);
  useClickOutside(ref, close);

  return (
    <>
      <div className={cn("mb-4", parentClassName)}>
        {label && (
          <p className={cn("block font-inter text-sm mb-2 font-medium", labelClassName)}>
            {label}
            {required ? <span className={"text-error-50"}>*</span> : ""}
          </p>
        )}
        <div className="relative">
          {hideOptions && (
            <button
              onClick={() => setShow(true)}
              className={cn(
                "text-left w-full bg-vobb-neutral-0 hover:bg-vobb-neutral-20 px-3 py-1 text-[13px] rounded-md focus:ring-1 focus:ring-ring",
                value ? "text-vobb-neutral-100" : "text-vobb-neutral-70"
              )}>
              {value?.length > 0 ? value.map((item) => item.label).join(", ") : "Select an option"}
            </button>
          )}
          {(show && hideOptions) || !hideOptions ? (
            <div
              ref={ref}
              className={cn(
                hideOptions ? "absolute bg-white p-3 shadow-sm rounded-md w-full bottom-[110%]" : ""
              )}>
              <div className="grid gap-2">
                {options.map((item) => (
                  <CheckboxWithText
                    label={item.label}
                    checked={value?.some((val) => item.value === val.value) ?? false}
                    handleChecked={() => handleChange(item)}
                    labelClassName="font-normal"
                    disabled={disabled}
                  />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {validatorMessage && (
          <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
        )}
        {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
      </div>
    </>
  );
};

export { CustomCheckboxGroup };
