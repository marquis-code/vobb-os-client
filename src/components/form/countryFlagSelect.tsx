import { cn } from "lib";
import { ReactNode } from "react";
import ReactFlagsSelect from "react-flags-select";
import { UseFormRegister } from "react-hook-form";

interface CountryFlagSelectProps {
  selectedOption: string | undefined;
  handleSelectChange: (country: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  validatorMessage?: string;
  hint?: string;
  label?: string;
  name?: string;
  className?: string;
  parentClassName?: string;
  register?: UseFormRegister<any>;
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
    register,
    name
  } = props;
  const selectedValue = selectedOption || "";
  return (
    <div className={cn("mb-4", parentClassName)}>
      {label && <label>{label}</label>}
      {icon && icon}
      {register && name ? (
        <ReactFlagsSelect
          selected={selectedValue}
          onSelect={handleSelectChange}
          placeholder={placeholder}
          optionsSize={14}
          selectedSize={14}
          className={cn(
            `${validatorMessage ? "border-error-10 focus-visible:ring-error-0" : "border-input"}`,
            "border rounded-md h-9 shadow-sm"
          )}
          selectButtonClassName={className}
        />
      ) : (
        <ReactFlagsSelect
          selected={selectedValue}
          onSelect={handleSelectChange}
          placeholder={placeholder}
          optionsSize={14}
          selectedSize={14}
          className={cn(
            `${validatorMessage ? "border-error-10 focus-visible:ring-error-0" : "border-input"}`,
            "border rounded-md h-9 shadow-sm"
          )}
          selectButtonClassName={className}
        />
      )}
      {validatorMessage && (
        <small className="block text=-xs mt-1 text-error-10">{validatorMessage}</small>
      )}
      {hint && <small className="block text=-xs mt-1 text-vobb-neutral-60">{hint}</small>}
    </div>
  );
};

export { CountryFlagSelect };
