import { cn } from "lib";
import { ReactNode } from "react";
import ReactFlagsSelect from "react-flags-select";

interface CountryFlagSelectProps {
  selectedOption: string | undefined;
  handleSelectChange: (country: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  validatorMessage?: string;
  hint?: string;
  label?: string;
  className?: string;
  parentClassName?: string;
  required?: boolean;
}
const CountryFlagSelect: React.FC<CountryFlagSelectProps> = (props) => {
  const {
    selectedOption,
    handleSelectChange,
    placeholder,
    validatorMessage,
    label,
    icon,
    hint,
    className,
    parentClassName,
    required
  } = props;
  const selectedValue = selectedOption || "";
  return (
    <div className={cn("mb-4", parentClassName)}>
      {label && (
        <label className={"block font-inter text-xs mb-1"}>
          {label}
          {required ? <span className={"text-error-50"}>*</span> : ""}
        </label>
      )}
      {icon && icon}
      <ReactFlagsSelect
        selected={selectedValue}
        onSelect={handleSelectChange}
        placeholder={placeholder}
        optionsSize={14}
        selectedSize={14}
        className={cn(
          `${validatorMessage ? "border-error-10 focus-visible:ring-error-0" : "border-input"}`,
          "border rounded-md h-10 shadow-sm"
        )}
        selectButtonClassName={className}
        searchable
      />
      {validatorMessage && (
        <small className="block text=-xs mt-1 text-error-10">{validatorMessage}</small>
      )}
      {hint && <small className="block text=-xs mt-1 text-vobb-neutral-60">{hint}</small>}
    </div>
  );
};

export { CountryFlagSelect };
