import { CompanyFormData } from "types/onboarding";
import { Button, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { teamSizeOptions } from "lib/constants";

// TeamSizeForm.tsx
interface TeamSizeFormProps {
  initData?: CompanyFormData;
  submit: (data: CompanyFormData) => void;
}

const TeamSizeForm: React.FC<TeamSizeFormProps> = ({ initData, submit }) => {
  const teamSizeSchema = yup.object().shape({
    teamSize: yup
      .object()
      .shape({
        label: yup.string().required("Required"),
        value: yup.string().required("Required")
      })
      .required("Required")
  });
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CompanyFormData>({
    resolver: yupResolver<any>(teamSizeSchema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyFormData) => {
    submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectInput
        name="teamSize"
        placeholder="What is the size of your team?"
        options={teamSizeOptions}
        onChange={(value) => setValue("teamSize", value)}
        value={watch("teamSize")}
        validatorMessage={
          errors.teamSize?.message ??
          errors.teamSize?.value?.message ??
          errors.teamSize?.label?.message
        }
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};

export { TeamSizeForm };
