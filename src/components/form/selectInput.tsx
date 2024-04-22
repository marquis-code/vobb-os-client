import { cn } from "lib";
import { ReactNode } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import { optionType } from "types/interfaces";

interface SelectInputProps {
  options: optionType[];
  value: optionType | null | undefined;
  onChange: (newValue: SingleValue<optionType>, actionMeta: ActionMeta<optionType>) => void;
  placeholder?: string;
  validatorMessage?: string;
  label?: string;
  name: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  icon?: ReactNode;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const { label, validatorMessage, parentClassName, hint, icon, required } = props;

  return (
    <div className={cn("mb-4", parentClassName)}>
      {label && (
        <label className={"block font-inter text-xs mb-1"}>
          {label}
          {required ? <span className={"text-error-50"}>*</span> : ""}
        </label>
      )}
      {icon && icon}
      <Select
        {...props}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: "1px solid #e62e2e",
            boxShadow: "0px 1px 2px 0px #1018280d",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
            fontSize: "14px",
            color: "var(--neutral-40)"
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: "#d0d5dd"
          }),
          indicatorSeparator: () => ({
            display: "none"
          })
        }}
      />
      {validatorMessage && (
        <small className="block text=-xs mt-1 text-error-10">{validatorMessage}</small>
      )}
      {hint && <small className="block text=-xs mt-1 text-vobb-neutral-60">{hint}</small>}
    </div>
  );
};

export { SelectInput };
