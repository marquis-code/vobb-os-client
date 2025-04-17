import { cn } from "lib";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

interface InputProps extends PhoneInputProps {
  name?: string;
  dataTestID?: string;
  className?: string;
  parentClassName?: string;
  required?: boolean;
  validatorMessage: string | undefined;
  label?: string;
  handleChange: (value: string) => void;
  hint?: string;
  labelClassName?: string;
}

const CustomPhoneInput: React.FC<InputProps> = (props) => {
  const {
    dataTestID,
    className,
    parentClassName,
    required,
    validatorMessage,
    label,
    onChange,
    handleChange,
    name,
    hint,
    labelClassName
  } = props;
  return (
    <>
      <div className={cn("mb-4", parentClassName)}>
        {label && (
          <label className={cn("block font-inter font-medium text-xs mb-1", labelClassName)}>
            {label}
            {required ? <span className={"text-error-50"}>*</span> : ""}
          </label>
        )}
        <PhoneInput
          data-testid={dataTestID}
          country="ng"
          placeholder="Your phone number"
          {...props}
          inputProps={{
            name,
            required: true
          }}
          onChange={(_, __, ___, formattedValue) => {
            handleChange(formattedValue);
          }}
          inputStyle={{
            width: "100%",
            // border: validatorMessage ? "1px solid #e62e2e" : "1px solid #d0d5dd",
            boxShadow: "0px 1px 2px 0px #1018280d",
            height: "36px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
            fontSize: "14px",
            color: "var(--neutral-100)",
            background: "transparent"
          }}
          inputClass={cn(
            "flex h-9 w-full rounded-md !border !border-input focus:!border-vobb-neutral-100 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            `${validatorMessage ? "!border-error-10 !focus-visible:ring-error-0" : ""}`,
            className
          )}
        />
        {validatorMessage && (
          <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
        )}
        {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
      </div>
    </>
  );
};
export { CustomPhoneInput };
