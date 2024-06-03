import {
  Button,
  CustomCheckboxGroup,
  CustomInput,
  CustomPhoneInput,
  CustomRadioGroup,
  CustomTextarea,
  DatePicker,
  SelectInput
} from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller, FieldValues } from "react-hook-form";
import { MockDynamicData } from "lib";
import { useState } from "react";
import { generateValidationSchema } from "./validations";
import { FormFieldConfig } from "types/formField";
import { endOfDay, format } from "date-fns";
import { FileUpload } from "components/form/file-upload";

interface CustomAttributesProps {
  submit: () => void;
}

type FormData = {
  [key: string]: string | number | boolean | Date | File | null;
};

const CustomAttributes: React.FC<CustomAttributesProps> = ({ submit }) => {
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<File | null>(null);

  const validationSchema = generateValidationSchema(MockDynamicData);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data, file);
  };

  const renderField = (field: FormFieldConfig) => {
    const getErrorMessage = (fieldName: string): string | undefined => {
      const error = errors[fieldName];
      if (error) {
        return error.message as string;
      }
      return undefined;
    };
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <Controller
            key={field.key}
            name={field.name}
            control={control}
            defaultValue={field.defaultValue}
            render={({ field: controllerField }) => (
              <CustomInput
                {...controllerField}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                validatorMessage={getErrorMessage(field.name)}
              />
            )}
          />
        );
      case "textarea":
        return (
          <Controller
            key={field.key}
            name={field.name}
            control={control}
            defaultValue={field.defaultValue}
            render={({ field: controllerField }) => (
              <CustomTextarea
                {...controllerField}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                validatorMessage={getErrorMessage(field.name)}
                hint={`${field.minimum}/${field.maximum} words`}
              />
            )}
          />
        );
      case "select":
        return (
          <Controller
            key={field.key}
            name={field.name}
            control={control}
            defaultValue={field.defaultValue}
            render={({ field: controllerField }) => (
              <SelectInput
                {...controllerField}
                label={field.label}
                options={field.options}
                required={field.required}
                validatorMessage={getErrorMessage(field.name)}
              />
            )}
          />
        );
      case "radio":
        return (
          <Controller
            key={field.key}
            name={field.name}
            control={control}
            defaultValue={field.defaultValue}
            render={({ field: controllerField }) => (
              <CustomRadioGroup
                {...controllerField}
                label={field.label}
                options={field.options}
                required={field.required}
                validatorMessage={getErrorMessage(field.name)}
              />
            )}
          />
        );
      case "checkbox":
        return (
          <Controller
            key={field.key}
            name={field.name}
            control={control}
            defaultValue={field.defaultValue}
            render={({ field: controllerField }) => (
              <CustomCheckboxGroup
                {...controllerField}
                label={field.label}
                options={field.options}
                required={field.required}
                validatorMessage={getErrorMessage(field.name)}
              />
            )}
          />
        );
      case "phone":
        return (
          <Controller
            key={field.key}
            name={field.name}
            control={control}
            defaultValue={field.defaultValue}
            render={({ field: controllerField }) => (
              <CustomPhoneInput
                {...controllerField}
                label={field.label}
                required={field.required}
                handleChange={(value) => setValue(field.name, value)}
                validatorMessage={getErrorMessage(field.name)}
              />
            )}
          />
        );
      case "date":
        return (
          <Controller
            key={field.key}
            name={field.name}
            control={control}
            defaultValue={field.defaultValue}
            render={({ field: controllerField }) => (
              <DatePicker
                {...controllerField}
                value={date}
                handleChange={(value) => {
                  if (value) {
                    setDate(value);
                    setValue(field.name, format(endOfDay(value), "yyyy-MM-dd'T'HH:mm:ssXX"));
                  }
                }}
                label={field.label}
                required={field.required}
                validatorMessage={getErrorMessage(field.name)}
              />
            )}
          />
        );
      case "file":
        return (
          <FileUpload
            key={field.key}
            label={field.label}
            required={field.required}
            file={file}
            multiple
            id={"file"}
            onFileChange={(value) => {
              setFile(value);
            }}
            validatorMessage={getErrorMessage(field.name)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <section className="grid grid-cols-[1fr,2fr] gap-8 border-b border-vobb-neutral-20 pb-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Organization Properties</h2>
          <p className="text-xs">
            These are the properties your organization administrator has defined for all members
          </p>
        </div>
        <form>
          {MockDynamicData.map((field) => renderField(field))}

          <div className="flex gap-2 justify-end max-w-[800px] pt-4">
            <Button onClick={() => reset()} variant={"outline"}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant={"fill"}>
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export { CustomAttributes };
