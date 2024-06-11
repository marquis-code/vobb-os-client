import React, { useState } from "react";
import {
  Button,
  CustomCheckboxGroup,
  CustomInput,
  CustomPhoneInput,
  CustomRadioGroup,
  CustomTextarea,
  DatePicker,
  PasswordInput,
  SelectInput
} from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { optionType } from "types/interfaces";
import { MockDynamicData, initOptionType, isFile } from "lib";
import { FileUpload } from "components/form/file-upload";
import { useCountriesContext } from "context";
import { formFieldData, phone_number_type } from "types";
import { endOfDay, format } from "date-fns";

interface CustomAttributesProps {
  submit: () => void;
}

const CustomAttributes: React.FC<CustomAttributesProps> = ({ submit }) => {
  const { countries } = useCountriesContext();

  // Helper function to create validation schema dynamically
  const createValidationSchema = (field: any) => {
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
      return yup.array().min(1, "At least one option is required").required("Required");
    }
    if (fieldData.type === "checkbox") {
      return yup.array().min(1, "At least one option is required").required("Required");
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

  // Generate validation schema dynamically based on mockData
  const schemaFields = MockDynamicData.reduce((acc, field) => {
    const fieldName = Object.keys(field)[0]; // Get the key name (e.g., short_text, long_text)
    acc[fieldName] = createValidationSchema(field);
    return acc;
  }, {} as any);

  const schema = yup.object().shape(schemaFields);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<formFieldData>({
    resolver: yupResolver(schema),
    defaultValues: {}
  });

  const onSubmit: SubmitHandler<formFieldData> = (data) => {
    console.log(data);
  };

  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<File | null>(null);
  const { ...all } = getValues();
  console.log(all);
  return (
    <>
      <section className="grid grid-cols-[1fr,2fr] gap-8 border-b border-vobb-neutral-20 pb-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Organization Properties</h2>
          <p className="text-xs">
            These are the properties your organization administrator has defined for all members
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {MockDynamicData.map((field, index) => {
            const fieldName = Object.keys(field)[0];
            const fieldData = field[fieldName];
            switch (fieldData.type) {
              case "short_text":
                return (
                  <CustomInput
                    key={index}
                    label="Short text"
                    name="short_text"
                    type="text"
                    validatorMessage={errors.short_text?.message}
                    register={register}
                  />
                );
              case "long_text":
                return (
                  <CustomTextarea
                    key={index}
                    label="Long text"
                    name="long_text"
                    hint={`0/${fieldData.word_limit} words`}
                    validatorMessage={errors.long_text?.message}
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
                    name="phone_number"
                    validatorMessage={errors.phone_number?.message}
                    handleChange={(val) => {
                      setValue("phone_number", val);
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
                    validatorMessage={errors.country?.message}
                  />
                );
              case "multiple_choice":
                return (
                  <CustomRadioGroup
                    key={index}
                    label="Multiple choice"
                    options={fieldData.options}
                    value={fieldData.value}
                    onChange={(val) => val && setValue("multiple_choice", val)}
                    validatorMessage={errors.multiple_choice?.message}
                  />
                );
              case "checkbox":
                return (
                  <CustomCheckboxGroup
                    key={index}
                    label="Checkboxes"
                    options={fieldData.options}
                    value={fieldData.value}
                    onChange={(val) => val && setValue("checkbox", val)}
                    validatorMessage={errors.checkbox?.message}
                  />
                );
              case "dropdown":
                return (
                  <SelectInput
                    key={index}
                    label="Dropdown"
                    options={fieldData.options}
                    value={fieldData.value}
                    onChange={(val) => val && setValue("dropdown", val)}
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
                        setDate(value);
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
                    file={file}
                    multiple
                    id={"file"}
                    onFileChange={setFile}
                    validatorMessage={errors.file?.message}
                  />
                );

              default:
                return null;
            }
          })}
          <div className="flex gap-2 justify-end max-w-[800px] pt-4">
            <Button onClick={() => reset()} variant={"outline"}>
              Cancel
            </Button>
            <Button type="submit" variant={"fill"}>
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export { CustomAttributes };
