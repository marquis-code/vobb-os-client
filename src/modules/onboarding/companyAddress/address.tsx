import { CompanyAddressFormData, CompanyAddressProps } from "types/onboarding";
import { Button, CustomInput } from "components";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";

//CityAddress.tsx
const CityAddress: React.FC<CompanyAddressProps> = ({ initCityAddresses, submit, loading }) => {
  const schema = yup.object({
    address_line_1: yup.string().required("Required"),
    address_line_2: yup.string(),
    city: yup.string().required("Required")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyAddressFormData>({
    resolver: yupResolver<any>(schema),
    defaultValues: initCityAddresses
  });

  const onSubmit: SubmitHandler<CompanyAddressFormData> = (data) => {
    submit(data);
  };

  return (
    <form>
      <CustomInput
        type="text"
        placeholder="Address line 1"
        name="address_line_1"
        register={register}
        validatorMessage={errors.address_line_1?.message}
      />
      <CustomInput
        type="text"
        placeholder="Address line 2"
        name="address_line_2"
        register={register}
        validatorMessage={errors.address_line_2?.message}
      />
      <CustomInput
        type="text"
        placeholder="City"
        name="city"
        register={register}
        validatorMessage={errors.city?.message}
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
        loading={loading}
        className="w-full mt-6"
        size={"default"}
        variant="fill">
        Continue
      </Button>
    </form>
  );
};

export { CityAddress };
