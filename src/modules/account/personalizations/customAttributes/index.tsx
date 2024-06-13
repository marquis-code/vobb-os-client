import React, { useState } from "react";
import { Button } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { optionType } from "types/interfaces";
import { MockDynamicData, dynamicValidationSchema, renderFormFields } from "lib";
import { CustomAttributesFormData } from "types";
import { useCountriesContext } from "context";

interface CustomAttributesProps {
  submit: () => void;
}

const CustomAttributes: React.FC<CustomAttributesProps> = ({ submit }) => {
  const { countries } = useCountriesContext();
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<File | null>(null);
  const [selectedCheckboxValues, setSelectedCheckboxValues] = useState<optionType[]>([]);
  const [selectedRadioValue, setSelectedRadioValue] = useState<optionType>();

  const handleCheckboxChange = (newValues: optionType[]) => {
    setSelectedCheckboxValues(newValues);
    const selectedValues = newValues.map((option) => option.value);
    setValue("checkbox", selectedValues);
  };

  const handleRadioChange = (newValue: optionType | undefined) => {
    setSelectedRadioValue(newValue);
    setValue("multipleChoice", selectedRadioValue);
  };

  const schemaFields = MockDynamicData.reduce((acc, field) => {
    const fieldName = Object.keys(field)[0];
    acc[fieldName] = dynamicValidationSchema(field);
    return acc;
  }, {} as any);

  const schema = yup.object().shape(schemaFields);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
    watch
  } = useForm<CustomAttributesFormData>({
    resolver: yupResolver(schema),
    defaultValues: {}
  });

  const longText = watch("longText") || "";
  const longTextCount = longText.length;

  const onSubmit: SubmitHandler<CustomAttributesFormData> = (data) => {
    console.log(data);
    submit();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {MockDynamicData.map((field, index) => {
            const fieldName = Object.keys(field)[0];
            const fieldData = field[fieldName];

            return renderFormFields({
              fieldData,
              index,
              register,
              errors,
              setValue,
              longTextCount,
              countries,
              selectedRadioValue,
              handleRadioChange,
              selectedCheckboxValues,
              handleCheckboxChange,
              date,
              setDate,
              file,
              setFile
            });
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
