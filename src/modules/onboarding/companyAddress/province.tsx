import { CompanyAddressFormData, CompanyAddressProps } from "types/onboarding";
import { Button, CustomInput } from "components";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const Province: React.FC<CompanyAddressProps> = ({ initState, submit, loading }) => {
  const schema = yup.object().shape({
    state: yup.string().required("Required")
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyAddressFormData>({
    resolver: yupResolver<any>(schema),
    defaultValues: initState
  });

  const onSubmit = (data: CompanyAddressFormData) => {
    submit(data);
  };
  return (
    <form>
      <CustomInput
        type="text"
        placeholder={"State/Province"}
        name="state"
        register={register}
        validatorMessage={errors.state?.message}
        data-testid="province-input"
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
        loading={loading}
        className="w-full mt-6"
        size={"default"}
        variant="fill"
        data-testid="continue-btn">
        Continue
      </Button>
    </form>
  );
};

export { Province };
