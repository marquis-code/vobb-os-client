import React, { useState, useEffect } from "react";
import { Button } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { MemberPropertiesData, optionType, OrganisationAttributesData } from "types/interfaces";
import { dynamicValidationSchema, renderFormFields } from "lib";
import { useCountriesContext } from "context";

export interface CustomAttributesProps {
  submit: (data: { name: string; value: string }) => void;
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

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

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
    formState: { errors, dirtyFields },
    setValue,
    control,
    watch,
    getValues
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {}
  });

  const trackFields = {
    ...dirtyFields
  };

  const hasOptions = ["multiple-choice", "checkbox", "dropdown", "country"];

  useEffect(() => {
    if (memberProperties.length > 0) {
      const resetValues = {};

      memberProperties.forEach((memberProp) => {
        const fieldName = `${memberProp.type}_${memberProp.id}`;
        const resetValue = hasOptions.includes(memberProp.type)
          ? memberProp.values
          : memberProp.values[0];

        resetValues[fieldName] = resetValue;
      });

      reset(resetValues);
    }
  }, [memberProperties, reset]);

  const longTextValues = useWatch({ control });

  const calculateTotalWordCount = () => {
    let wordCountObj = {};

    Object.keys(longTextValues).forEach((fieldName) => {
      if (fieldName.startsWith("long-text")) {
        wordCountObj[fieldName] = longTextValues[fieldName].trim().split(/\s+/).length;
      }
    });

    return wordCountObj;
  };

  const debouncedSubmit = debounce((name, value) => {
    submit({ name, value });
  }, 1000);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (!name) return;
      if (type === "change" && trackFields[name]) {
        debouncedSubmit(name, value[name]);
      }
    });
    return () => subscription.unsubscribe();
  }, [trackFields, watch]);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };
  console.log(getValues());
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
            const memberProp = memberProperties.find((prop) => prop.attribute === fieldData.id);
            const id = memberProp ? memberProp.id : fieldData.id;
            return renderFormFields({
              fieldData,
              id,
              register,
              errors,
              setValue,
              longTextCount: calculateTotalWordCount()[`long-text_${fieldData.id}`] ?? 0,
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
