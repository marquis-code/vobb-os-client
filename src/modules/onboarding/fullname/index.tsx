import { FullnameFormData, FullnameFormProps } from "types/onboarding";
import { PersonalIcon } from "assets";
import { Button, CustomInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
const Fullname: React.FC<FullnameFormProps> = ({ initData, submit }) => {
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
      <PersonalIcon className="mb-6 m-auto" />
      <div className="mb-4 text-center mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Fullname information
        </h1>
        <p>Help us get to know you better</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          type="text"
          name="firstName"
          placeholder="First name"
          register={register}
          validatorMessage={errors.firstName?.message}
        />

        <CustomInput
          type="text"
          name="lastName"
          placeholder="Last name"
          register={register}
          validatorMessage={errors.lastName?.message}
        />

        <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
          Continue
        </Button>
      </form>
    </div>
  );
};
export { Fullname };
