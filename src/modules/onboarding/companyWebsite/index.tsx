import { useOnboardingContext } from "context";
import { WeblinkIcon } from "assets";
import { Button, CustomInput } from "components";
import { CompanyUrlFormProps, CompanyWebsiteData } from "types/onboarding";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const CompanyWebsiteUI: React.FC<CompanyUrlFormProps> = ({ initData, submit, loading }) => {
  const navigate = useNavigate();
  const { handleFormChange } = useOnboardingContext();
  const schema = yup.object().shape({
    website: yup.string().required("Required").url("Enter a valid URL")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyWebsiteData>({
    resolver: yupResolver(schema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyWebsiteData) => {
    submit(data);
  };

  return (
    <div className="relative max-w-[400px] m-auto">
      <ArrowLeftIcon
        stroke="#344054"
        color="#344054"
        role="button"
        className="hidden absolute top-4 left-[0] lg:block w-6 h-6 rounded-full fill-vobb-neutral-60"
        onClick={() => handleFormChange("companyWeb", ["fullname", "companyInfo", "companyWeb"])}
      />
      <div className="hidden lg:grid">
        <WeblinkIcon className="mb-6 m-auto" />
        <div className="mb-8 text-center mx-auto">
          <h1 className="text-xl sm:text-3xl font-bold mb-4 text-vobb-neutral-100 text-center">
            Company Website
          </h1>
          <p>Neque porro quisquam est, qui dolorem ipsu.</p>
        </div>
      </div>
      <form>
        <CustomInput
          type="text"
          name="website"
          placeholder="travelspace.ng"
          register={register}
          validatorMessage={errors.website?.message}
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
      <Button
        onClick={() => navigate(Routes.onboarding_operating_address)}
        disabled={loading}
        className="w-full mt-6 no-underline"
        size={"default"}
        variant="ghost">
        Skip
      </Button>
    </div>
  );
};
export { CompanyWebsiteUI };
