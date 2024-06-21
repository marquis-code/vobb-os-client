import { CompanyFormData, companySectorTypes } from "types/onboarding";
import { Button, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { sectorOptions } from "lib/constants";

// SectorForm.tsx
interface SectorFormProps {
  initData?: { sector: { label: string; value: companySectorTypes } | null };
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
  } = useForm<{ sector: { label: string; value: companySectorTypes } | null }>({
    resolver: yupResolver<any>(sectorSchema),
    defaultValues: initData
  });

  const onSubmit = (data: { sector: { label: string; value: companySectorTypes } | null }) => {
    submit(data);
  };

  return (
    <form>
      <SelectInput
        name="sector"
        placeholder="Select travel industry"
        options={sectorOptions}
        value={watch("sector")}
        onChange={(value) => setValue("sector", value)}
        validatorMessage={
          errors.sector?.message ?? errors.sector?.value?.message ?? errors.sector?.label?.message
        }
        data-cy="sector"
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        className="w-full mt-6"
        size={"default"}
        variant="fill"
        data-cy="continue-btn">
        Submit
      </Button>
    </form>
  );
};

export { SectorForm };
