import React, { useState, useEffect } from "react";
import { Button } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { MemberPropertiesData, optionType, OrganisationAttributesData } from "types";
import { calculateTotalWordCount, debounce, dynamicValidationSchema, renderFormFields } from "lib";
import { useCountriesContext } from "context";

export interface CustomAttributesProps {
  submit: (data: { name: string; value: string | optionType; orgId: string }) => void;
  orgProperties: OrganisationAttributesData[];
  memberProperties: MemberPropertiesData[];
}

const CustomAttributes: React.FC<CustomAttributesProps> = ({
  submit,
  orgProperties,
  memberProperties
}) => {
  const { countries } = useCountriesContext();
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<File | null>(null);
  const [selectedCheckboxValues, setSelectedCheckboxValues] = useState<optionType[]>([]);
  const [selectedRadioValue, setSelectedRadioValue] = useState<optionType>();

  const handleCheckboxChange = (newValues: optionType[], id: string) => {
    setSelectedCheckboxValues(newValues);
    const selectedValues = newValues.map((option) => option.value);
    setValue(`checkbox_${id}`, selectedValues);
  };

  const handleRadioChange = (newValue: optionType | undefined, id: string) => {
    setSelectedRadioValue(newValue);
    setValue(`multiple-choice_${id}`, newValue);
  };

  const schemaFields = orgProperties?.reduce((acc, field) => {
    acc[`${field.type}_${field.id}`] = dynamicValidationSchema(field);
    return acc;
  }, {} as any);

  const schema = yup.object().shape(schemaFields);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    setValue,
    control,
    watch,
    getValues
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {}
  });

  //set initial value
  useEffect(() => {
    if (memberProperties.length > 0) {
      const resetValues = {};

      memberProperties.forEach((memberProp) => {
        const fieldName = `${memberProp.type}_${memberProp.id}`;
        const resetValue = memberProp.values[0];

        resetValues[fieldName] = resetValue;
      });

      reset(resetValues);
    }
  }, [memberProperties, reset]);

  const longTextValues = useWatch({ control });

  const debouncedSubmit = debounce((name: string, orgId: string) => {
    const value = getValues()[name];
    if (value !== "" || value !== null) submit({ name, value, orgId });
  }, 1000);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!name) return;
      const createdAttrId = name.split("_")[1];

      //Get OrgId
      const orgId =
        memberProperties.filter((prop) => prop.id === createdAttrId)[0]?.attribute ?? undefined;
      if (getValues()[name]) {
        debouncedSubmit(name, orgId);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues, memberProperties]);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
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
          {orgProperties?.map((fieldData) => {
            // properties already set by member have a new id that will replace it's id from organisation(for the purpose of reset)
            const memberProp = memberProperties.find((prop) => prop.attribute === fieldData.id);
            const id = memberProp ? memberProp.id : fieldData.id;
            return renderFormFields({
              fieldData,
              id,
              register,
              errors,
              setValue,
              longTextCount: calculateTotalWordCount(longTextValues)[`long-text_${id}`] ?? 0,
              countries,
              radio: {
                value: selectedRadioValue,
                handleChange: handleRadioChange
              },
              checkbox: {
                value: selectedCheckboxValues,
                handleChange: handleCheckboxChange
              },
              date: {
                value: date,
                handleChange: setDate
              },
              file: {
                value: file,
                handleChange: setFile
              },
              watch
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
