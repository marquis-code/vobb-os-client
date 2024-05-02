import { CompanyFormData } from "types/onboarding";
import { Button, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { optionType } from "types";

const sectorOptions: optionType[] = [
  {
    label: "Education",
    value: "Education"
  },
  {
    label: "Medical and Health",
    value: "Medical and Health"
  },
  {
    label: "Tourism",
    value: "Tourism"
  }
];

// SectorForm.tsx
interface SectorFormProps {
  initData?: CompanyFormData;
  submit: (data: CompanyFormData) => void;
}

const SectorForm: React.FC<SectorFormProps> = ({ initData, submit }) => {
  const sectorSchema = yup.object().shape({
    sector: yup
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
    resolver: yupResolver<any>(sectorSchema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyFormData) => {
    submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectInput
        name="sector"
        placeholder="Select travel industry"
        options={sectorOptions}
        value={watch("sector")}
        onChange={(value) => setValue("sector", value)}
        validatorMessage={
          errors.sector?.message ?? errors.sector?.value?.message ?? errors.sector?.label?.message
        }
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Submit
      </Button>
    </form>
  );
};

export { SectorForm };
