import { CompanyAddressFormData, CompanyAddressProps } from "types/onboarding";
import { Button, CustomInput } from "components";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const Province: React.FC<CompanyAddressProps> = ({ initData, submit }) => {
  const schema = yup.object().shape({
    province: yup.string().required("Required")
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
        placeholder={"State/Province"}
        name="province"
        register={register}
        validatorMessage={errors.province?.message}
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};

export { Province };
