import { Label } from "components/ui/label";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { cn } from "lib/utils";
import { optionType } from "types/interfaces";
import { CheckboxWithText } from "./checkboxWithText";

interface RadioGroupProps {
  options: optionType[];
  value: optionType | null | undefined;
  onChange: (newValue: optionType | undefined) => void;
  label?: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  required?: boolean;
  validatorMessage?: string;
}

const CustomCheckboxGroup: React.FC<RadioGroupProps> = (props) => {
  const { required, label, options, value, onChange, parentClassName, validatorMessage, hint } =
    props;
  return (
    <>
      <div className={cn("mb-4", parentClassName)}>
        {label && (
          <p className={"block font-inter text-sm mb-2 font-medium"}>
            {label}
            {required ? <span className={"text-error-50"}>*</span> : ""}
          </p>
        )}

        <RadioGroup
          onValueChange={(val) => onChange(options.find((item) => val === item.value))}
          //   defaultValue={value?.value}
          value={value?.value}>
          {options.map(({ label, value }) => (
            <CheckboxWithText label={label} />
          ))}
        </RadioGroup>
        {validatorMessage && (
          <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
        )}
        {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
      </div>
    </>
  );
};

export { CustomCheckboxGroup };
