import { cn } from "lib";
import { ReactNode } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import { optionType } from "types/interfaces";
import { UseFormRegister } from "react-hook-form";

interface SelectInputProps {
  options: optionType[];
  selectedOption?: optionType | null | undefined;
  handleSelectChange?: (
    newValue: SingleValue<optionType>,
    actionMeta: ActionMeta<optionType>
  ) => void;
  placeholder?: string;
  validatorMessage?: string;
  label?: string;
  name: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  icon?: ReactNode;
  register?: UseFormRegister<any>;
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const {
    options,
    selectedOption,
    handleSelectChange,
    placeholder,
    label,
    name,
    validatorMessage,
    parentClassName,
    className,
    hint,
    icon,
    register
  } = props;

  return (
    <div className={cn("mb-4", parentClassName)}>
      {label && <label>{label}</label>} {icon && icon}
      {register && name ? (
        <Select
          defaultValue={selectedOption}
          onChange={(newValue, actionMeta) =>
            handleSelectChange && handleSelectChange(newValue, actionMeta)
          }
          options={options}
          value={selectedOption}
          placeholder={placeholder}
          className={className}
          isSearchable
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: "1px solid #d0d5dd",
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
            })
          }}
        />
      ) : (
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
            })
          }}
        />
      )}
      {validatorMessage && (
        <small className="block text=-xs mt-1 text-error-10">{validatorMessage}</small>
      )}
      {hint && <small className="block text=-xs mt-1 text-vobb-neutral-60">{hint}</small>}
    </div>
  );
};

export { SelectInput };
