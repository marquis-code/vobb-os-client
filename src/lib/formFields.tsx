import { CalendarIcon, EnvelopeClosedIcon, ImageIcon, PersonIcon } from "@radix-ui/react-icons";
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
import {
  ProfileCheckboxGroup,
  ProfileDatePicker,
  ProfileFileUpload,
  ProfileInput,
  ProfilePhoneInput,
  ProfileRadioGroup,
  ProfileSelectInput,
  ProfileTextarea
} from "components/form/profile-fields";
import { endOfDay, format } from "date-fns";
import { isFile, isValidFileType } from "lib";
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { OrganisationAttributesData, optionType } from "types";
import * as yup from "yup";

interface DynamicFormProps {
  fieldData: OrganisationAttributesData;
  id: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  longTextCount?: number;
  countries?: optionType[];
  radio?: {
    value: optionType | undefined;
    handleChange: (newValue: optionType | undefined, id: string) => void;
  };
  checkbox?: {
    value: optionType[];
    handleChange: (newValue: optionType[], id: string) => void;
  };
  date?: {
    value: Date | undefined;
    handleChange: (date: Date) => void;
  };
  file?: {
    value: File | null;
    handleChange: (file: File) => void;
  };
  loading?: boolean;
}

export const dynamicValidationSchema = (fieldData: OrganisationAttributesData) => {
  const isRequired = fieldData.required ? yup.mixed().required("Required") : yup.mixed();

  switch (fieldData.type) {
    case "short-text":
      return isRequired.concat(yup.string());
    case "long-text":
      return isRequired.concat(
        yup
          .string()
          .test("wordLimit", `Maximum ${fieldData.metaData ?? 250} words`, function (value) {
            const words = value ? value.trim().split(/\s+/) : [];
            return words.length <= fieldData.metaData ?? 250;
          })
      );
    case "number":
      return isRequired.concat(yup.number());
    case "email":
      return isRequired.concat(yup.string().email("Enter a valid email"));
    case "phone-number":
      return isRequired.concat(yup.string());
    case "multiple-choice":
      return yup.object().shape({
        label: isRequired.concat(yup.string()),
        value: isRequired.concat(yup.string())
      });
    case "checkbox":
      const baseSchema = yup.object().shape({
        checkboxField: yup.array().of(yup.string())
      });

      const checkboxSchema = fieldData.required
        ? baseSchema.concat(
            yup.object().shape({
              checkboxField: yup.array().min(1, "At least one option is required")
            })
          )
        : baseSchema;

      return checkboxSchema;
    case "dropdown":
      return isRequired.concat(yup.string());
    case "file":
      return isRequired.concat(
        yup
          .mixed()
          .test(
            "fileSize",
            "File has exceeded the 5mb limit",
            (value) => !value || (isFile(value) && value.size <= 5242880)
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

const getErrorMessage = (
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
): string | undefined => {
  if (error && typeof error === "object" && "message" in error) {
    // @ts-ignore
    return error.message;
  }
  return undefined;
};

export const renderFormFields = ({
  fieldData,
  id,
  register,
  errors,
  setValue,
  longTextCount,
  countries,
  radio,
  checkbox,
  date,
  file,
  watch
}: DynamicFormProps) => {
  const fieldName = `${fieldData.type}_${id}`;
  const fieldValue = watch(fieldName);

  const getCountryValue = (value) => {
    if (!value) return null;
    if (Array.isArray(value)) {
      return value.map((option) => ({
        label: countries?.find((country) => country.value === option)?.label || option,
        value: option
      }));
    }
    if (typeof value === "string") {
      return {
        label: countries?.find((country) => country.value === value)?.label || value,
        value: value
      };
    }
    return value;
  };
  switch (fieldData.type) {
    case "short-text":
      return (
        <CustomInput
          key={id}
          label={fieldData.title}
          name={fieldName}
          type="text"
          placeholder={fieldData.description}
          validatorMessage={getErrorMessage(errors[fieldName])}
          register={register}
        />
      );
    case "long-text":
      return (
        <CustomTextarea
          key={id}
          label={fieldData.title}
          name={fieldName}
          placeholder={fieldData.description}
          hint={`${longTextCount}/${fieldData.metaData ?? 250} words`}
          validatorMessage={getErrorMessage(errors[fieldName])}
          register={register}
        />
      );
    case "number":
      return (
        <CustomInput
          key={id}
          label={fieldData.title}
          type="number"
          name={fieldName}
          placeholder={fieldData.description}
          validatorMessage={getErrorMessage(errors[fieldName])}
          register={register}
        />
      );
    case "email":
      return (
        <CustomInput
          key={id}
          label={fieldData.title}
          type="email"
          placeholder={fieldData.description}
          name={fieldName}
          validatorMessage={getErrorMessage(errors[fieldName])}
          register={register}
        />
      );
    case "phone-number":
      return (
        <CustomPhoneInput
          key={id}
          label={fieldData.title}
          name={fieldName}
          value={watch(fieldName)}
          validatorMessage={getErrorMessage(errors[fieldName])}
          handleChange={(val) => {
            setValue(fieldName, val);
          }}
        />
      );
    case "country":
      return (
        <SelectInput
          key={id}
          label={fieldData.title}
          value={getCountryValue(fieldValue)}
          options={countries?.map((country) => ({
            label: country.label,
            value: country.value
          }))}
          onChange={(val) => val && setValue(fieldName, val)}
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    case "multiple-choice":
      return (
        <CustomRadioGroup
          key={id}
          label={fieldData.title}
          value={fieldValue ? { label: fieldValue, value: fieldValue } : null}
          options={fieldData?.metaData?.map((option) => ({ label: option, value: option })) || []}
          onChange={(newValue) =>
            radio?.handleChange ? radio.handleChange(newValue, id) : () => {}
          }
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    case "checkbox":
      return (
        <CustomCheckboxGroup
          key={id}
          label={fieldData.title}
          value={fieldValue?.map((option) => ({ label: option, value: option })) || []}
          options={fieldData.metaData.map((option) => ({ label: option, value: option }))}
          onChange={(newValue) =>
            checkbox?.handleChange ? checkbox.handleChange(newValue, id) : () => {}
          }
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    case "dropdown":
      return (
        <SelectInput
          key={id}
          label={fieldData.title}
          value={fieldValue ? { label: fieldValue, value: fieldValue } : null}
          options={fieldData?.metaData?.map((option) => ({ label: option, value: option })) || []}
          onChange={(val) => val && setValue(fieldName, val.value)}
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    case "date":
      return (
        <DatePicker
          key={id}
          value={date?.value}
          handleChange={(value) => {
            if (value) {
              date?.handleChange?.(value);
              setValue(fieldName, format(endOfDay(value), "yyyy-MM-dd'T'HH:mm:ssXX"));
            }
          }}
          label={fieldData.title}
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    case "file":
      return (
        <FileUpload
          key={id}
          label={fieldData.title}
          file={file?.value ?? null}
          multiple
          id={fieldName}
          onFileChange={() => (file?.handleChange ? file.handleChange : () => {})}
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    default:
      return null;
  }
};

export const renderProfileFormFields = ({
  fieldData,
  id,
  register,
  errors,
  setValue,
  longTextCount,
  countries,
  radio,
  checkbox,
  date,
  file,
  watch,
  loading
}: DynamicFormProps) => {
  const fieldName = `${fieldData.type}_${id}`;
  const fieldValue = watch(fieldName);

  const getCountryValue = (value) => {
    if (!value) return null;
    if (Array.isArray(value)) {
      return value.map((option) => ({
        label: countries?.find((country) => country.value === option)?.label || option,
        value: option
      }));
    }
    if (typeof value === "string") {
      return {
        label: countries?.find((country) => country.value === value)?.label || value,
        value: value
      };
    }
    return value;
  };
  switch (fieldData.type) {
    case "short-text":
      return (
        <ProfileInput
          key={id}
          label={fieldData.title}
          icon={<PersonIcon />}
          type="text"
          name={fieldName}
          placeholder={fieldData.description}
          validatorMessage={getErrorMessage(errors[fieldName])}
          register={register}
        />
      );
    case "long-text":
      return (
        <ProfileTextarea
          key={id}
          icon={<PersonIcon />}
          label={fieldData.title}
          name={fieldName}
          placeholder={fieldData.description}
          hint={`${longTextCount}/${fieldData.metaData ?? 250} words`}
          validatorMessage={getErrorMessage(errors[fieldName])}
          register={register}
        />
      );
    case "number":
      return (
        <ProfileInput
          key={id}
          icon={<PersonIcon />}
          label={fieldData.title}
          type="number"
          name={fieldName}
          placeholder={fieldData.description}
          validatorMessage={getErrorMessage(errors[fieldName])}
          register={register}
        />
      );
    case "email":
      return (
        <ProfileInput
          key={id}
          icon={<EnvelopeClosedIcon />}
          label={fieldData.title}
          type="email"
          placeholder={fieldData.description}
          name={fieldName}
          validatorMessage={getErrorMessage(errors[fieldName])}
          register={register}
        />
      );
    case "phone-number":
      return (
        <ProfilePhoneInput
          key={id}
          icon={<PersonIcon />}
          label={fieldData.title}
          name={fieldName}
          value={watch(fieldName)}
          validatorMessage={getErrorMessage(errors[fieldName])}
          handleChange={(val) => {
            setValue(fieldName, val);
          }}
        />
      );
    case "country":
      return (
        <ProfileSelectInput
          key={id}
          icon={<PersonIcon />}
          label={fieldData.title}
          value={getCountryValue(fieldValue)}
          options={countries?.map((country) => ({
            label: country.label,
            value: country.value
          }))}
          onChange={(val) => val && setValue(fieldName, val)}
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    case "multiple-choice":
      return (
        <ProfileRadioGroup
          key={id}
          icon={<PersonIcon />}
          label={fieldData.title}
          value={fieldValue ? { label: fieldValue, value: fieldValue } : null}
          options={fieldData?.metaData?.map((option) => ({ label: option, value: option })) || []}
          onChange={(newValue) =>
            radio?.handleChange ? radio.handleChange(newValue, id) : () => {}
          }
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    case "checkbox":
      return (
        <ProfileCheckboxGroup
          key={id}
          icon={<PersonIcon />}
          label={fieldData.title}
          value={fieldValue?.map((option) => ({ label: option, value: option })) || []}
          options={fieldData?.metaData?.map((option) => ({ label: option, value: option })) || []}
          onChange={(newValue) =>
            checkbox?.handleChange ? checkbox.handleChange(newValue, id) : () => {}
          }
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    case "dropdown":
      return (
        <ProfileSelectInput
          key={id}
          icon={<PersonIcon />}
          label={fieldData.title}
          value={fieldValue ? { label: fieldValue, value: fieldValue } : null}
          options={fieldData?.metaData?.map((option) => ({ label: option, value: option }))}
          onChange={(val) => val && setValue(fieldName, val.value)}
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    case "date":
      return (
        <ProfileDatePicker
          key={id}
          icon={<CalendarIcon />}
          value={date?.value}
          handleChange={(value) => {
            if (value) {
              date?.handleChange?.(value);
              setValue(fieldName, format(endOfDay(value), "yyyy-MM-dd'T'HH:mm:ssXX"));
            }
          }}
          label={fieldData.title}
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    case "file":
      return (
        <ProfileFileUpload
          key={id}
          icon={<ImageIcon />}
          label={fieldData.title}
          file={file?.value ?? null}
          multiple
          id={fieldName}
          onFileChange={() => (file?.handleChange ? file.handleChange : () => {})}
          validatorMessage={getErrorMessage(errors[fieldName])}
        />
      );
    default:
      return null;
  }
};
