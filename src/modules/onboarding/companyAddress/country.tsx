import { CompanyAddressFormData, CompanyAddressProps } from "types/onboarding";
import { Button, SelectInput } from "components";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { optionType } from "types";

//CountrySelect.tsx
const CountrySelect: React.FC<CompanyAddressProps> = ({
  submit,
  countries,
  initCountry,
  loading
}) => {
  const countrySchema = yup.object().shape({
    country: yup
      .object()
      .shape({
        label: yup.string().required("Required"),
        value: yup.string().required("Required")
      })
      .required("Required")
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CompanyAddressFormData>({
    resolver: yupResolver<any>(countrySchema),
    defaultValues: initCountry
  });

  const onSubmit = (data: CompanyAddressFormData) => {
    submit(data);
  };

  const newCountryArray: optionType[] =
    countries?.map((country) => ({
      label: country.label,
      value: country.value
    })) ?? [];

  return (
    <form>
      <SelectInput
        name="country"
        label="Select Country"
        placeholder="Select country"
        options={newCountryArray}
        onChange={(value) => value && setValue("country", value)}
        value={watch("country")}
        validatorMessage={
          errors.country?.message ??
          errors.country?.value?.message ??
          errors.country?.label?.message
        }
        data-cy="onboarding-input"
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
        loading={loading}
        className="w-full mt-6"
        size={"default"}
        variant="fill"
        data-cy="continue-btn">
        Continue
      </Button>
    </form>
  );
};

export { CountrySelect };
