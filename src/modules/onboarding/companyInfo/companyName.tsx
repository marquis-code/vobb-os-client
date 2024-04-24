import { CompanyFormData } from "types/onboarding";
import { Button, CustomInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

// OrganisationForm.tsx
interface OrganisationFormProps {
  initData?: CompanyFormData;
  submit: (data: CompanyFormData) => void;
}

const OrganisationForm: React.FC<OrganisationFormProps> = ({ initData, submit }) => {
  const organisationSchema = yup.object().shape({
    organisation: yup.string().required("Required")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyFormData>({
    resolver: yupResolver(organisationSchema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyFormData) => {
    submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        type="text"
        placeholder="Name of organisation"
        name="organisation"
        register={register}
        validatorMessage={errors.organisation?.message}
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};

export { OrganisationForm };
