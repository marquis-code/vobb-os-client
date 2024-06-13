import {
  CustomCheckboxGroup,
  CustomInput,
  CustomPhoneInput,
  CustomRadioGroup,
  CustomTextarea,
  DatePicker,
  FileUpload,
  SelectInput
} from "components";
import { endOfDay, format } from "date-fns";
import { isFile } from "lib";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CustomAttributesFormData, optionType } from "types";
import * as yup from "yup";

interface DynamicFormProps {
  fieldData: any;
  index: number;
  register: UseFormRegister<CustomAttributesFormData>;
  errors: FieldErrors<CustomAttributesFormData>;
  setValue: UseFormSetValue<CustomAttributesFormData>;
  longTextCount?: number;
  countries?: optionType[];
  selectedRadioValue?: optionType | undefined;
  handleRadioChange?: (newValue: optionType | undefined) => void;
  selectedCheckboxValues?: optionType[];
  handleCheckboxChange?: (newValue: optionType[]) => void;
  date?: Date | undefined;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
  file?: File | null;
  setFile?: React.Dispatch<React.SetStateAction<File | null>>;
}

export const dynamicValidationSchema = (field: any) => {
  const fieldName = Object.keys(field)[0];
  const fieldData = field[fieldName];

  if (fieldData.type === "short_text") {
    return yup.string().required("Required");
  }
  if (fieldData.type === "long_text") {
    return yup
      .string()
      .required("Required")
      .max(fieldData.word_limit, `Maximum ${fieldData.word_limit} words`);
  }
  if (fieldData.type === "number") {
    return yup.number().required("Required");
  }
  if (fieldData.type === "email") {
    return yup.string().email("Enter a valid email").required("Required");
  }
  if (fieldData.type === "phone_number") {
    return yup.string().required("Required");
  }
  if (fieldData.type === "country") {
    return yup.object().shape({
      label: yup.string().required("Required"),
      value: yup.string().required("Required")
    });
  }
  if (fieldData.type === "multiple_choice") {
    return yup.object().shape({
      label: yup.string().required("Required"),
      value: yup.string().required("Required")
    });
  }
  if (fieldData.type === "checkbox") {
    return yup
      .array()
      .of(yup.string().required("Required"))
      .min(1, "At least one option is required")
      .required("Required");
  }

  if (fieldData.type === "dropdown") {
    return yup.string().required("Required");
  }
  if (fieldData.type === "file") {
    return yup
      .mixed()
      .test(
        "fileSize",
        "Image is too large",
        (value) => !value || (isFile(value) && value.size <= field.maxSize)
      );
  }
  if (fieldData.type === "date") {
    return yup.date().required("Required");
  }
  return yup.mixed();
};

export const renderFormFields = ({
  fieldData,
  index,
  register,
  errors,
  setValue,
  longTextCount,
  countries,
  selectedRadioValue,
  handleRadioChange = () => {},
  selectedCheckboxValues,
  handleCheckboxChange = () => {},
  date,
  setDate = () => {},
  file,
  setFile = () => {}
}: DynamicFormProps) => {
  switch (fieldData.type) {
    case "short_text":
      return (
        <CustomInput
          key={index}
          label="Short text"
          name="shortText"
          type="text"
          defaultValue={fieldData.value}
          validatorMessage={errors.shortText?.message}
          register={register}
        />
      );
    case "long_text":
      return (
        <CustomTextarea
          key={index}
          label="Long text"
          name="longText"
          defaultValue={fieldData.value}
          hint={`${longTextCount}/${fieldData.word_limit} words`}
          validatorMessage={errors.longText?.message}
          register={register}
        />
      );
    case "number":
      return (
        <CustomInput
          key={index}
          label="Number"
          type="number"
          name="number"
          validatorMessage={errors.number?.message}
          register={register}
        />
      );
    case "email":
      return (
        <CustomInput
          key={index}
          label="Email"
          type="email"
          defaultValue={fieldData.value}
          name="email"
          validatorMessage={errors.email?.message}
          register={register}
        />
      );
    case "phone_number":
      return (
        <CustomPhoneInput
          key={index}
          label="Phone number"
          name="phoneNumber"
          validatorMessage={errors.phoneNumber?.message}
          handleChange={(val) => {
            setValue("phoneNumber", val);
          }}
        />
      );
    case "country":
      return (
        <SelectInput
          key={index}
          label="Country"
          options={countries}
          onChange={(val) => val && setValue("country", val)}
          validatorMessage={errors.country?.label?.message || errors.country?.value?.message}
        />
      );
    case "multiple_choice":
      return (
        <CustomRadioGroup
          key={index}
          label="Multiple choice"
          options={fieldData.options}
          value={selectedRadioValue}
          onChange={handleRadioChange}
          validatorMessage={
            errors.multipleChoice?.label?.message || errors.multipleChoice?.value?.message
          }
        />
      );
    case "checkbox":
      return (
        <CustomCheckboxGroup
          key={index}
          label="Checkboxes"
          options={fieldData.options}
          value={selectedCheckboxValues ?? [{ label: "", value: "" }]}
          onChange={handleCheckboxChange}
          validatorMessage={errors.checkbox?.message}
        />
      );
    case "dropdown":
      return (
        <SelectInput
          key={index}
          label="Dropdown"
          options={fieldData.options}
          onChange={(val) => val && setValue("dropdown", val.value)}
          validatorMessage={errors.dropdown?.message}
        />
      );
    case "date":
      return (
        <DatePicker
          key={index}
          value={date}
          handleChange={(value) => {
            if (value) {
              setDate?.(value);
              setValue("date", format(endOfDay(value), "yyyy-MM-dd'T'HH:mm:ssXX"));
            }
          }}
          label="Date"
          validatorMessage={errors.date?.message}
        />
      );
    case "file":
      return (
        <FileUpload
          key={index}
          label="File upload"
          file={file ?? null}
          multiple
          id={"file"}
          onFileChange={setFile}
          validatorMessage={errors.file?.message}
        />
      );

    default:
      return null;
  }
};
