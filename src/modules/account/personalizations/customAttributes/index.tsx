import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { MemberPropertiesData, optionType, OrganisationAttributesData } from "types";
import { dynamicValidationSchema, renderFormFields } from "lib";
import { useCountriesContext } from "context";
import { LoadingSpinner } from "components";

export interface CustomAttributesProps {
  submit: (data: { name: string; value: string | optionType; orgRefId: string }) => void;
  orgProperties: OrganisationAttributesData[];
  memberProperties: MemberPropertiesData[];
  loading: boolean;
}

const CustomAttributes: React.FC<CustomAttributesProps> = ({
  submit,
  orgProperties,
  memberProperties,
  loading
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
        const resetValue = memberProp.values;

        resetValues[fieldName] = resetValue;
      });

      reset(resetValues);
    }
  }, [memberProperties, reset]);

  //long text word length
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

  const debouncedSubmit = debounce((name: string, orgRefId: string) => {
    const values = getValues();
    submit({ name, value: values[name], orgRefId });
  }, 1000);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!name) return;
      const createdAttrId = name.split("_")[1];
      const orgRefId =
        memberProperties.filter((prop) => prop.id === createdAttrId)[0]?.attribute ?? undefined;
      if (getValues()[name]) {
        debouncedSubmit(name, orgRefId);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues, memberProperties]);

  return (
    <>
      <section className="grid grid-cols-[1fr,2fr] gap-8 border-b border-vobb-neutral-20 pb-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Organization Properties</h2>
          <p className="text-xs">
            These are the properties your organization administrator has defined for all members
          </p>
        </div>
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <LoadingSpinner />
            </div>
          )}
          {!loading && orgProperties.length === 0 ? (
            <p>No properties set by organisation for now.</p>
          ) : (
            <form className="relative z-0">
              {orgProperties?.map((fieldData) => {
                const memberProp = memberProperties.find((prop) => prop.attribute === fieldData.id);
                const id = memberProp ? memberProp.id : fieldData.id;
                return renderFormFields({
                  fieldData,
                  id,
                  register,
                  errors,
                  setValue,
                  longTextCount: calculateTotalWordCount()[`long-text_${id}`] ?? 0,
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
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export { CustomAttributes };
