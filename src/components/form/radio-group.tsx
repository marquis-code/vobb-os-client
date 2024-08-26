import { Label } from "components/ui/label";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { useClickOutside } from "hooks";
import { cn } from "lib/utils";
import { ReactNode, useRef, useState } from "react";
import { optionType } from "types/interfaces";

export interface RadioGroupProps {
  options: optionType[];
  value: optionType | null | undefined;
  onChange: (newValue: optionType | undefined) => void;
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

const CustomRadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    required,
    label,
    options,
    value,
    onChange,
    parentClassName,
    hideOptions,
    validatorMessage,
    hint,
    className,
    labelClassName,
    disabled
  } = props;

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
              {value?.label ?? "Select an option"}
            </button>
          )}
          {(show && hideOptions) || !hideOptions ? (
            <div
              ref={ref}
              className={cn(
                hideOptions ? "absolute bg-white p-3 shadow-sm rounded-md w-full bottom-[110%]" : ""
              )}>
              <RadioGroup
                className={className}
                onValueChange={(val) => onChange(options.find((item) => val === item.value))}
                //   defaultValue={value?.value}
                value={value?.value}
                disabled={disabled}>
                {options.map(({ label, value }) => (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem onClick={close} value={value} id={value} />
                    <label className="font-normal leading-none" htmlFor={value}>
                      {label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
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

export { CustomRadioGroup };
