import { Button, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { teamSizeOptions } from "lib/constants";
import { CompanyFormData, optionType } from "types";

// TeamSizeForm.tsx
interface TeamSizeFormProps {
  initData?: { size: optionType | null };
  submit: (data: CompanyFormData) => void;
}

const TeamSizeForm: React.FC<TeamSizeFormProps> = ({ initData, submit }) => {
  const teamSizeSchema = yup.object().shape({
    size: yup
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
  } = useForm<{ size: optionType | null }>({
    resolver: yupResolver<any>(teamSizeSchema),
    defaultValues: initData
  });

  const onSubmit = (data: { size: optionType | null }) => {
    submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectInput
        name="size"
        placeholder="What is the size of your team?"
        options={teamSizeOptions}
        onChange={(value) => setValue("size", value)}
        value={watch("size")}
        validatorMessage={
          errors.size?.message ?? errors.size?.value?.message ?? errors.size?.label?.message
        }
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};

export { TeamSizeForm };
