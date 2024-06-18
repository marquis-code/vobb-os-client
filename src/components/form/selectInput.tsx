import { FileIcon, ImageIcon, UploadIcon } from "@radix-ui/react-icons";
import { cn } from "lib";
import { ReactNode } from "react";
import { optionType } from "types";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";

interface SelectInputProps {
  options: optionType[] | undefined;
  value?: optionType | null;
  onChange: (newValue) => void;
  placeholder?: string;
  validatorMessage?: string;
  label?: string;
  name?: string;
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
      <div className="relative">
        {icon ? <span className="absolute left-2 top-[10px] z-[1]">{icon}</span> : ""}
        <Select
          {...props}
          isSearchable
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: validatorMessage ? "1px solid #e62e2e" : "1px solid hsl(var(--input))",
              boxShadow: "0px 1px 2px 0px #1018280d",
              height: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 6,
              fontSize: "14px",
              color: "var(--neutral-40)",
              minHeight: "36px",
              borderColor: state.isFocused ? "var(--neutral-100)" : "hsl(var(--input))",
              "&:hover": {
                borderColor: state.isFocused ? "var(--neutral-100)" : "hsl(var(--input))"
              },
              paddingLeft: icon ? "24px" : "0px"
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "var(--neutral-50)"
            }),
            indicatorSeparator: () => ({
              display: "none"
            }),
            valueContainer: (base, props) => ({
              ...base,
              marginTop: "-2px"
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? "var(--vobb-primary-40)" : "#fff",
              "&:hover": {
                backgroundColor: state.isSelected
                  ? "var(--vobb-primary-40)"
                  : "var(--vobb-primary-20)"
              }
            })
          }}
          menuShouldScrollIntoView
        />
      </div>
      {validatorMessage && (
        <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
      )}
      {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
    </div>
  );
};

interface MultiSelectInputProps {
  options: optionType[] | undefined;
  value: optionType[] | null | undefined;
  onChange: (newValue: MultiValue<optionType>, actionMeta: ActionMeta<optionType>) => void;
  placeholder?: string;
  validatorMessage?: string;
  label?: string;
  name?: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  icon?: ReactNode;
  required?: boolean;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = (props) => {
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
        isSearchable
        isMulti
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: validatorMessage ? "1px solid #e62e2e" : "1px solid hsl(var(--input))",
            boxShadow: "0px 1px 2px 0px #1018280d",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
            fontSize: "14px",
            color: "var(--neutral-40)",
            minHeight: "36px",
            borderColor: state.isFocused ? "var(--neutral-100)" : "hsl(var(--input))",
            "&:hover": {
              borderColor: state.isFocused ? "var(--neutral-100)" : "hsl(var(--input))"
            }
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "var(--neutral-50)"
          }),
          indicatorSeparator: () => ({
            display: "none"
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "var(--vobb-primary-40)" : "#fff",
            "&:hover": {
              backgroundColor: state.isSelected
                ? "var(--vobb-primary-40)"
                : "var(--vobb-primary-20)"
            }
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "var(--neutral-30)",
            borderRadius: "2px"
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "var(--neutral-100)"
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: "var(--neutral-50)"
          })
        }}
        menuShouldScrollIntoView
      />
      {validatorMessage && (
        <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
      )}
      {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
    </div>
  );
};

export { SelectInput, MultiSelectInput };
