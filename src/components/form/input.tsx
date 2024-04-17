import { ReactNode, useState } from "react";
import { Input } from "../ui";
import { cn } from "lib/utils";
import { UseFormRegister } from "react-hook-form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  validatorMessage?: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  register?: UseFormRegister<any>;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const {
    type,
    label,
    icon,
    required,
    validatorMessage,
    parentClassName,
    className,
    hint,
    name,
    register,
  } = props;

  return (
    <>
      <div className={cn("mb-4", parentClassName)}>
        {label && (
          <label className={"block font-inter text-xs mb-1"}>
            {label}
            {required ? <span className={"text-error-60"}>*</span> : ""}
          </label>
        )}
        {icon && icon}
        {register && name ? (
          <Input
            {...props}
            {...register(name, {
              required: required,
              minLength: props.minLength,
              onChange: props.onChange,
              min: props.min,
              max: props.max,
            })}
            className={cn(
              `${validatorMessage ? "border-error-60 focus-visible:ring-error-60" : ""}`,
              className
            )}
          />
        ) : (
          <Input
            className={cn(
              `${validatorMessage ? "border-error-60 focus-visible:ring-error-60" : ""}`,
              className
            )}
            {...props}
          />
        )}
        {validatorMessage && (
          <small className="block text=-xs mt-1 text-error-60">
            {validatorMessage}
          </small>
        )}
        {hint && (
          <small className="block text=-xs mt-1 text-vobb-neutral-60">
            {hint}
          </small>
        )}
      </div>
    </>
  );
};

const PasswordInput: React.FC<CustomInputProps> = (props) => {
  const {
    label,
    icon,
    required,
    validatorMessage,
    parentClassName,
    className,
    hint,
    name,
    register,
  } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={cn("mb-4 relative", parentClassName)}>
        {label && (
          <label className={"block font-inter text-xs mb-1"}>
            {label}
            {required ? <span className={"text-error-60"}>*</span> : ""}
          </label>
        )}

        {show ? (
          <EyeOpenIcon
            className="absolute right-2 mt-3"
            role="button"
            onClick={() => setShow(false)}
            color="#475467"
          />
        ) : (
          <EyeClosedIcon
            className="absolute right-2 mt-3"
            role="button"
            onClick={() => setShow(true)}
            color="#475467"
          />
        )}
        {register && name ? (
          <Input
            {...props}
            {...register(name, {
              required: required,
              minLength: props.minLength,
              onChange: props.onChange,
              min: props.min,
              max: props.max,
            })}
            className={cn(
              `${validatorMessage ? "border-error-60 focus-visible:ring-error-60" : ""}`,
              className
            )}
            type={show ? "text" : "password"}
          />
        ) : (
          <Input
            {...props}
            className={cn(
              `${validatorMessage ? "border-error-60 focus-visible:ring-error-60" : ""}`,
              className
            )}
          />
        )}
        {validatorMessage && (
          <small className="block text=-xs mt-1 text-error-60">
            {validatorMessage}
          </small>
        )}
        {hint && (
          <small className="block text=-xs mt-1 text-vobb-neutral-60">
            {hint}
          </small>
        )}
      </div>
    </>
  );
};

export { CustomInput, PasswordInput };
