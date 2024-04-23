import { CompanyAddressFormData, CompanyAddressProps } from "types/onboarding";
import { Button, CustomInput } from "components";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";

//CityAddress.tsx
const CityAddress: React.FC<CompanyAddressProps> = ({ initData, submit }) => {
  const schema = yup.object({
    address1: yup.string().required("Required"),
    address2: yup.string(),
    city: yup.string().required("Required")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyAddressFormData>({
    resolver: yupResolver<any>(schema),
    defaultValues: initData
  });

  const onSubmit: SubmitHandler<CompanyAddressFormData> = (data) => {
    submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        type="text"
        placeholder="Address line 1"
        name="address1"
        register={register}
        validatorMessage={errors.address1?.message}
      />
      <CustomInput
        type="text"
        placeholder="Address line 2"
        name="address2"
        register={register}
        validatorMessage={errors.address2?.message}
      />
      <CustomInput
        type="text"
        placeholder="City"
        name="city"
        register={register}
        validatorMessage={errors.city?.message}
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};

export { CityAddress };
