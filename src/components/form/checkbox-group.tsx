import { Label } from "components/ui/label";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { cn } from "lib/utils";
import { optionType } from "types/interfaces";
import { CheckboxWithText } from "./checkboxWithText";

interface RadioGroupProps {
  options: optionType[];
  value: optionType[];
  onChange: (newValue: optionType[]) => void;
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

  const handleChange = (item: optionType) => {
    if (value && value?.some((val) => item.value === val.value)) {
      console.log("here?");
      const newList = value.filter((val) => item.value !== val.value);
      onChange(newList);
    } else {
      value ? onChange([...value, item]) : onChange([item]);
    }
  };

  return (
    <>
      <div className={cn("mb-4", parentClassName)}>
        {label && (
          <p className={"block font-inter text-sm mb-2 font-medium"}>
            {label}
            {required ? <span className={"text-error-50"}>*</span> : ""}
          </p>
        )}

        <div className="grid gap-2">
          {options.map((item) => (
            <CheckboxWithText
              label={item.label}
              checked={value?.some((val) => item.value === val.value) ?? false}
              handleChecked={() => handleChange(item)}
              labelClassName="font-normal"
            />
          ))}
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
