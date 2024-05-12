import { CompanyAddressFormData, CompanyAddressProps } from "types/onboarding";
import { Button, CustomInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

//zipcode.tsx
interface ZipcodeProps extends CompanyAddressProps {
  postalCode: { format?: string; regex?: string } | undefined;
}
const Zipcode: React.FC<ZipcodeProps> = ({
  initZipcode,
  submit,
  loading,
  postalCode = { format: "", regex: "" }
}) => {
  const validCode = postalCode;
  const { format, regex } = validCode;

  const schema = yup.object().shape({
    zipCode: yup
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
    defaultValues: initZipcode
  });

  const onSubmit = (data: CompanyAddressFormData) => {
    submit(data);
  };

  return (
    <form>
      <CustomInput
        type="text"
        placeholder={"Zip code"}
        name="zipCode"
        register={register}
        validatorMessage={errors.zipCode?.message}
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

export { Zipcode };
