import { ReactNode, useState } from "react";
import { Input } from "../ui";
import { cn } from "lib/utils";
import { UseFormRegister } from "react-hook-form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  icon?: ReactNode;
  validatorMessage?: string;
  hint?: string;
  parentClassName?: string;
  labelClassName?: string;
  className?: string;
  register?: UseFormRegister<any>;
  defaultValue?: string;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
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
    defaultValue,
    labelClassName
  } = props;

  return (
    <>
      <div className={cn("mb-4", parentClassName)}>
        {label && (
          <label
            className={cn(
              "block font-inter text-xs mb-1 text-vobb-neutral-80 leading-5",
              labelClassName
            )}>
            {label}
            {required ? <span className={"text-error-50"}>*</span> : ""}
          </label>
        )}
        <div>
          <div className="relative">
            {icon ? <span className="absolute left-2 top-[10px]">{icon}</span> : ""}
            {register && name ? (
              <Input
                {...props}
                {...register(name, {
                  required: required,
                  minLength: props.minLength,
                  onChange: props.onChange,
                  min: props.min,
                  max: props.max
                })}
                defaultValue={defaultValue}
                className={cn(
                  `${
                    validatorMessage ? "border-error-10 focus-visible:ring-error-0" : ""
                  } placeholder:text-vobb-neutral-60 text-xs font-medium leading-5`,
                  className,
                  icon ? "pl-8" : ""
                )}
              />
            ) : (
              <Input
                className={cn(
                  `${validatorMessage ? "border-error-10 focus-visible:ring-error-0" : ""}`,
                  className
                )}
                {...props}
              />
            )}
          </div>
          {validatorMessage && (
            <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
          )}
          {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
        </div>
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
    register
  } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={cn("mb-4 relative", parentClassName)}>
        {label && (
          <label className={"block font-inter text-xs mb-1"}>
            {label}
            {required ? <span className={"text-error-10"}>*</span> : ""}
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
              max: props.max
            })}
            className={cn(
              `${validatorMessage ? "border-error-10 focus-visible:ring-error-0" : ""}`,
              className
            )}
            type={show ? "text" : "password"}
          />
        ) : (
          <Input
            {...props}
            className={cn(
              `${validatorMessage ? "border-error-10 focus-visible:ring-error-0" : ""}`,
              className
            )}
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

export { CustomInput, PasswordInput };
