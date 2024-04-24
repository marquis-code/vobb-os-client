import { CompanyAddressFormData, CompanyAddressProps, CountryType } from "types/onboarding";
import { Button, CustomInput, SelectInput } from "components";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

//zipcode.tsx
interface ZipcodeProps extends CompanyAddressProps {
  postalCode: { format?: string; regex?: string } | undefined;
}
const Zipcode: React.FC<ZipcodeProps> = ({
  initData,
  submit,
  postalCode = { format: "", regex: "" }
}) => {
  const validCode = postalCode;
  const { format, regex } = validCode;

  const schema = yup.object().shape({
    zipcode: yup
      .string()
      .required("Required")
      .matches(new RegExp(regex ?? ""), `Enter a valid zip code with the format ${format}`)
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyAddressFormData>({
    resolver: yupResolver<any>(schema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyAddressFormData) => {
    submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        type="text"
        placeholder={"Zip code"}
        name="zipcode"
        register={register}
        validatorMessage={errors.zipcode?.message}
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};

export { Zipcode };
