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
import { isFile, isValidFileType } from "lib";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CustomAttributesFormData, fieldDataTypes, formFieldData, optionType } from "types";
import * as yup from "yup";

interface DynamicFormProps {
  fieldData: fieldDataTypes;
  index: number;
  register: UseFormRegister<CustomAttributesFormData>;
  errors: FieldErrors<CustomAttributesFormData>;
  setValue: UseFormSetValue<CustomAttributesFormData>;
  longTextCount?: number;
  countries?: optionType[];
  radio?: {
    value: optionType | undefined;
    handleChange: (newValue: optionType | undefined) => void;
  };
  checkbox?: {
    value: optionType[];
    handleChange: (newValue: optionType[]) => void;
  };
  date?: {
    value: Date | undefined;
    handleChange: (date: Date) => void;
  };
  file?: {
    value: File | null;
    handleChange: (file: File) => void;
  };
}

export const dynamicValidationSchema = (field: formFieldData) => {
  const fieldName = Object.keys(field)[0];
  const fieldData = field[fieldName];

  const isRequired = fieldData.required ? yup.mixed().required("Required") : yup.mixed();

  switch (fieldData.type) {
    case "short_text":
      return isRequired.concat(yup.string());
    case "long_text":
      return isRequired.concat(
        yup.string().test("wordLimit", `Maximum ${fieldData.word_limit} words`, function (value) {
          const words = value ? value.trim().split(/\s+/) : [];
          return words.length <= fieldData.word_limit;
        })
      );
    case "number":
      return isRequired.concat(yup.number());
    case "email":
      return isRequired.concat(yup.string().email("Enter a valid email"));
    case "phone_number":
      return isRequired.concat(yup.string());
    case "multiple_choice":
      return yup.object().shape({
        label: isRequired.concat(yup.string()),
        value: isRequired.concat(yup.string())
      });
    case "checkbox":
      return yup.object().shape({
        checkboxField: yup
          .array()
          .of(yup.string())
          .when("$isRequired", {
            //@ts-ignore
            is: true,
            then: yup.array().min(1, "At least one option is required"),
            otherwise: yup.array()
          })
      });
    case "dropdown":
      return isRequired.concat(yup.string());
    case "file":
      return isRequired.concat(
        yup
          .mixed()
          .test(
            "fileSize",
            "File has exceeded the 5mb limit",
            (value) => !value || (isFile(value) && value.size <= fieldData.maxSize)
          )
          .test(
            "fileType",
            "Unsupported file format. Only images and pdfs are allowed.",
            (value) => !value || (isFile(value) && isValidFileType(value))
          )
      );
    case "date":
      return isRequired.concat(yup.date());
    default:
      return yup.mixed();
  }
};
export const renderFormFields = ({
  fieldData,
  index,
  register,
  errors,
  setValue,
  longTextCount,
  countries,
  radio,
  checkbox,
  date,
  file
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
          value={radio?.value}
          onChange={() => (radio?.handleChange ? radio.handleChange : () => {})}
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
          value={checkbox?.value ?? [{ label: "", value: "" }]}
          onChange={() => (checkbox?.handleChange ? checkbox.handleChange : () => {})}
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
          value={date?.value}
          handleChange={(value) => {
            if (value) {
              date?.handleChange?.(value);
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
          file={file?.value ?? null}
          multiple
          id={"file"}
          onFileChange={() => (file?.handleChange ? file.handleChange : () => {})}
          validatorMessage={errors.file?.message}
        />
      );

    default:
      return null;
  }
};
