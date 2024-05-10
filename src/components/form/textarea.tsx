import { ReactNode, useState } from "react";
import { Input } from "../ui";
import { cn } from "lib/utils";
import { UseFormRegister } from "react-hook-form";
import { Textarea } from "components/ui/textarea";

export interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: ReactNode;
  validatorMessage?: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  register?: UseFormRegister<any>;
}

const CustomTextarea: React.FC<CustomTextareaProps> = (props) => {
  const {
    label,
    icon,
    required,
    validatorMessage,
    parentClassName,
    className,
    hint,
    name,
    register
  } = props;

  return (
    <>
      <div className={cn("mb-4", parentClassName)}>
        {label && (
          <label className={"block font-inter text-xs mb-1"}>
            {label}
            {required ? <span className={"text-error-50"}>*</span> : ""}
          </label>
        )}
        {icon && icon}
        {register && name ? (
          <Textarea
            {...props}
            {...register(name, {
              required: required,
              minLength: props.minLength,
              onChange: props.onChange
            })}
            className={cn(
              `${validatorMessage ? "border-error-10 focus-visible:ring-error-0" : ""}`,
              className
            )}
          />
        ) : (
          <Textarea
            className={cn(
              `${validatorMessage ? "border-error-10 focus-visible:ring-error-0" : ""}`,
              className
            )}
            {...props}
          />
        )}
        {validatorMessage && (
          <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
        )}
        {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
      </div>
    </>
  );
};

export { CustomTextarea };
