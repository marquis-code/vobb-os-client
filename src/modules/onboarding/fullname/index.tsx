import { FullnameFormData, FullnameFormProps } from "types/onboarding";
import { PersonalIcon } from "assets";
import { Button, CustomInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
const FullnameUI: React.FC<FullnameFormProps> = ({ initData, submit, loading }) => {
  const schema = yup.object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required")
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FullnameFormData>({
    resolver: yupResolver(schema),
    defaultValues: initData
  });
  const onSubmit: SubmitHandler<FullnameFormData> = (data) => {
    submit(data);
  };

  return (
    <div className="max-w-[400px] m-auto">
      <div className="hidden lg:grid">
        <PersonalIcon className="mb-6 m-auto" data-testid="logo" />
        <div className="mb-8 text-center mx-auto">
          <h1 className="text-xl sm:text-3xl font-bold mb-4 text-vobb-neutral-100 text-center">
            Enter your name
          </h1>
          <p data-testid="subtitle">As shown on a government issued ID</p>
        </div>
      </div>
      <form>
        <CustomInput
          type="text"
          name="firstName"
          placeholder="First name"
          register={register}
          validatorMessage={errors.firstName?.message}
          data-testid="firstname"
        />

        <CustomInput
          type="text"
          name="lastName"
          placeholder="Last name"
          register={register}
          validatorMessage={errors.lastName?.message}
          data-testid="lastname"
        />

        <Button
          className="w-full mt-6"
          size={"default"}
          variant="fill"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          loading={loading}
          data-testid="continue-btn">
          Continue
        </Button>
      </form>
    </div>
  );
};
export { FullnameUI };
