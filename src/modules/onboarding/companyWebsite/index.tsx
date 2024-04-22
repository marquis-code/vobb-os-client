import { useOnboardingContext } from "context";
import { Arrow, WeblinkIcon } from "assets";
import { Button, CustomInput } from "components";
import { CompanyUrlFormProps } from "types/onboarding";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const CompanyWebsite: React.FC<CompanyUrlFormProps> = ({ initData, submit }) => {
  const { handleFormChange } = useOnboardingContext();
  const schema = yup.object().shape({
    companyUrl: yup.string().required("Required").url("Enter a valid URL")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initData
  });

  const onSubmit = (data) => {
    submit(data);
  };

  return (
    <div className="max-w-[400px] m-auto">
      <Arrow
        role="button"
        className="hidden absolute top-20 left-[40%] lg:block w-8 h-8 rotate-180 border border-neutral-400 rounded-full p-1 fill-neutral-400"
        onClick={() => handleFormChange("companyInfo", ["fullname", "companyInfo"])}
      />
      <WeblinkIcon className="mb-6 m-auto" />
      <div className="mb-4 text-center mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Company Website
        </h2>
        <p>Neque porro quisquam est, qui dolorem ipsu.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          type="text"
          name="companyUrl"
          placeholder="travelspace.ng"
          register={register}
          validatorMessage={errors.companyUrl?.message}
        />

        <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
          Continue
        </Button>

        <Button type="submit" className="w-full mt-6 no-underline" size={"default"} variant="link">
          Skip
        </Button>
      </form>
    </div>
  );
};
export { CompanyWebsite };
