import {
  CustomInputProps,
  CustomInput,
  CustomTextarea,
  CustomTextareaProps,
  CustomRadioGroup,
  RadioGroupProps,
  CheckboxGroupProps,
  CustomCheckboxGroup,
  DatePickerProps,
  DatePicker
} from "components";
import { CustomFileInputProps } from "components/form/file-upload";
import { cn } from "lib";
import { ReactNode } from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import Select, { CSSObjectWithLabel } from "react-select";
import { optionType } from "types";

const ProfileInput = (props: CustomInputProps) => {
  return (
    <CustomInput
      parentClassName="mb-2 grid grid-cols-[120px,1fr] gap-4 items-center"
      className="w-full border-none bg-vobb-neutral-0 hover:bg-vobb-neutral-20 shadow-none ring-none h-[unset] text-[13px]"
      labelClassName="mb-0"
      {...props}
      icon={undefined}
      label={
        <span className="text-xs text-vobb-neutral-60 flex gap-2 items-center">
          {props.icon} <span className="max-w-[100px] truncate">{props.label}</span>
        </span>
      }
    />
  );
};

const ProfileTextarea = (props: CustomTextareaProps) => {
  return (
    <>
      <CustomTextarea
        className="w-full border-none bg-vobb-neutral-0 hover:bg-vobb-neutral-20 shadow-none ring-none h-[unset] min-h-[28px] max-h-[60px] py-1 text-[13px]" //reset textarea height on focus (60px) and on blur (28px)
        parentClassName="mb-2 grid grid-cols-[120px,1fr] gap-4 items-center"
        labelClassName="mb-0"
        {...props}
        icon={undefined}
        label={
          <span className="text-xs text-vobb-neutral-60 flex gap-2 items-center">
            {props.icon} <span className="max-w-[100px] truncate">{props.label}</span>
          </span>
        }
      />
    </>
  );
};

interface ProfileRadioGroupProps extends RadioGroupProps {
  icon: ReactNode;
}
const ProfileRadioGroup = (props: ProfileRadioGroupProps) => {
  return (
    <>
      <CustomRadioGroup
        {...props}
        hideOptions
        parentClassName="mb-2 grid grid-cols-[120px,1fr] gap-4 items-center"
        labelClassName="mb-0"
        label={
          <span className="text-xs text-vobb-neutral-60 flex gap-2 items-center font-normal">
            {props.icon} <span className="max-w-[100px] truncate">{props.label}</span>
          </span>
        }
        className="text-[13px]"
      />
    </>
  );
};

interface ProfileCheckboxGroupProps extends CheckboxGroupProps {
  icon: ReactNode;
}
const ProfileCheckboxGroup = (props: ProfileCheckboxGroupProps) => {
  return (
    <>
      <CustomCheckboxGroup
        {...props}
        hideOptions
        parentClassName="mb-2 grid grid-cols-[120px,1fr] gap-4 items-center"
        labelClassName="mb-0"
        label={
          <span className="text-xs text-vobb-neutral-60 flex gap-2 items-center font-normal">
            {props.icon} <span className="max-w-[100px] truncate">{props.label}</span>
          </span>
        }
        className="text-[13px]"
      />
    </>
  );
};

interface ProfileDatePickerProps extends DatePickerProps {
  icon: ReactNode;
}

const ProfileDatePicker = (props: ProfileDatePickerProps) => {
  return (
    <>
      <DatePicker
        {...props}
        parentClassName="mb-2 grid grid-cols-[120px,1fr] gap-4 items-center"
        labelClassName="mb-0"
        label={
          <span className="text-xs text-vobb-neutral-60 flex gap-2 items-center font-normal">
            {props.icon} <span className="max-w-[100px] truncate">{props.label}</span>
          </span>
        }
        className="w-full border-none bg-vobb-neutral-0 hover:bg-vobb-neutral-20 shadow-none h-[28px] text-[13px] px-3 py-1 focus:ring-1 focus:ring-ring"
        hideFieldIcon
      />
    </>
  );
};

interface ProfilePhoneInputProps extends PhoneInputProps {
  name?: string;
  dataTestID?: string;
  className?: string;
  parentClassName?: string;
  required?: boolean;
  validatorMessage: string | undefined;
  label?: string;
  handleChange: (value: string) => void;
  hint?: string;
  icon?: ReactNode;
}

const ProfilePhoneInput = (props: ProfilePhoneInputProps) => {
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
    icon
  } = props;
  return (
    <>
      <div
        className={cn("mb-4 mb-2 grid grid-cols-[120px,1fr] gap-4 items-center", parentClassName)}>
        {label && (
          <label className="block font-inter text-xs text-vobb-neutral-60 flex gap-2 items-center font-normal">
            {props.icon} <span className="max-w-[100px] truncate">{props.label}</span>
          </label>
        )}
        <div className="relative">
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
              boxShadow: "0px 1px 2px 0px #1018280d",
              height: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 6,
              fontSize: "13px",
              color: "var(--neutral-100)",
              background: "transparent",
              padding: 0,
              paddingLeft: "54px"
            }}
            inputClass={cn(
              "flex w-full rounded-md !border !border-transparent focus:!border-vobb-neutral-100 px-3 py-1 transition-colors placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-1 !focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              `${validatorMessage ? "!border-error-10 !focus-visible:ring-error-0" : ""}`,
              "w-full border-none !bg-vobb-neutral-0 hover:!bg-vobb-neutral-20 !shadow-none ring-none h-[unset] text-[13px]",
              className
            )}
            dropdownStyle={{
              bottom: "100%",
              fontSize: "13px",
              maxWidth: "200px"
            }}
          />
          {validatorMessage && (
            <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
          )}
          {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
        </div>
      </div>
    </>
  );
};

interface ProfileSelectInputProps {
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
  styles?: CSSObjectWithLabel;
}

const ProfileSelectInput = (props: ProfileSelectInputProps) => {
  const { label, validatorMessage, parentClassName, hint, icon, required, styles } = props;

  return (
    <div className={cn("mb-4 mb-2 grid grid-cols-[120px,1fr] gap-4 items-center", parentClassName)}>
      {label && (
        <label className="block font-inter text-xs text-vobb-neutral-60 flex gap-2 items-center font-normal">
          {props.icon} <span className="max-w-[100px] truncate">{props.label}</span>
        </label>
      )}
      <div className="relative">
        <Select
          {...props}
          isSearchable
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: validatorMessage ? "1px solid #e62e2e" : "1px solid var(--neutral-0)",
              boxShadow: "none",
              height: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 6,
              fontSize: "13px",
              color: "var(--neutral-40)",
              minHeight: "28px",
              borderColor: state.isFocused ? "var(--neutral-100)" : "var(--neutral-0)",
              backgroundColor: "var(--neutral-0)",
              "&:hover": {
                backgroundColor: "var(--neutral-20)",
                borderColor: state.isFocused ? "var(--neutral-100)" : "var(--neutral-0)"
              },
              paddingLeft: "0px",
              ...styles
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "var(--neutral-50)",
              marginTop: "-4px"
            }),
            indicatorSeparator: () => ({
              display: "none"
            }),
            indicatorsContainer: () => ({
              padding: 0
            }),
            dropdownIndicator: () => ({
              padding: "4px 6px",
              marginTop: "-4px"
            }),
            valueContainer: (base, props) => ({
              ...base
            }),
            singleValue: (base, props) => ({ ...base, marginTop: "-4px" }),
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
          menuPlacement="auto"
        />
      </div>
      {validatorMessage && (
        <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
      )}
      {hint && <small className="block text-[11px] mt-1 text-vobb-neutral-60">{hint}</small>}
    </div>
  );
};

interface ProfileFileUpload extends CustomFileInputProps {
  icon?: ReactNode;
}
const ProfileFileUpload = (props: ProfileFileUpload) => {
  return (
    <div
      className={cn(
        "mb-4 mb-2 grid grid-cols-[120px,1fr] gap-4 items-center",
        props.parentClassName
      )}>
      <label className="block font-inter text-xs text-vobb-neutral-60 flex gap-2 items-center font-normal">
        {props.icon} <span className="max-w-[100px] truncate">{props.label}</span>
      </label>
      <label
        className="cursor-pointer grid grid-cols-[80px,1fr] gap-2 rounded-md w-full border-none bg-vobb-neutral-0 hover:bg-vobb-neutral-20 shadow-none ring-none h-[unset] min-h-[28px] max-h-[60px] px-3 py-1 text-[13px]"
        htmlFor="profile-file">
        <span className="font-semibold text-[13px]">Choose file</span>
        <input
          {...props}
          id="profile-file"
          type="file"
          className="hidden"
          onChange={(e) => props.onFileChange(e.target.files ? e.target.files[0] : null)}
        />
        <p className="truncate ">
          {props.file ? props?.file.name + props?.file.name : "No file chosen"}
        </p>
      </label>
    </div>
  );
};

export {
  ProfileInput,
  ProfileTextarea,
  ProfileRadioGroup,
  ProfileCheckboxGroup,
  ProfileDatePicker,
  ProfilePhoneInput,
  ProfileSelectInput,
  ProfileFileUpload
};
