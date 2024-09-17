import { Button, CustomInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CompanyFormData } from "types";

// OrganisationForm.tsx
interface OrganisationFormProps {
  initData: { organisation: string };
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
  } = useForm<{ organisation: string }>({
    resolver: yupResolver(organisationSchema),
    defaultValues: initData
  });

  const onSubmit = (data: { organisation: string }) => {
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
        data-testid="organisation-name"
      />
      <Button
        type="submit"
        className="w-full mt-6"
        size={"default"}
        variant="fill"
        data-testid="continue-btn">
        Continue
      </Button>
    </form>
  );
};

export { OrganisationForm };
