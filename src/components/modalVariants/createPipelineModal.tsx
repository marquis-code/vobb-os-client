import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconX } from "@tabler/icons-react";
import { CustomInput, SelectInput } from "components/form";
import { Modal } from "components/modal";
import { Button } from "components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalProps, optionType, stagesType } from "types";
import { sectorOptions } from "lib";

export interface CreatePipelineData {
  name: string;
  description?: string;
  sector: optionType;
  stages?: stagesType[];
}

const optionTypeSchemaReq = yup
  .object({
    label: yup.string().required("Required"),
    value: yup.string().required("Required")
  })
  .required("Required");

const stagesTypeSchema = yup.object({
  title: yup.string(),
  color: yup.string()
});

const schema = yup.object({
  name: yup.string().required("Required"),
  description: yup.string(),
  sector: optionTypeSchemaReq,
  stages: yup.array().of(stagesTypeSchema)
});

interface CreatePipelineModalProps extends ModalProps {
  submit: (data: CreatePipelineData) => void;
  loading: boolean;
}

const CreatePipelineModal: React.FC<CreatePipelineModalProps> = ({
  show,
  close,
  submit,
  loading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue
  } = useForm<CreatePipelineData>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<CreatePipelineData> = (data) => {
    submit(data);
  };

  return (
    <>
      <Modal
        contentClassName="max-w-[944px] p-0"
        show={show}
        close={close}
        testId="createPipeline-modal">
        <div className="flex items-center justify-between p-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Pipeline Creation</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <IconX size={18} />
          </Button>
        </div>

        <form className="p-4 border-b border-vobb-neutral-20">
          <CustomInput
            label="Name"
            placeholder="Enter pipeline name"
            name="name"
            register={register}
            validatorMessage={errors.name?.message}
          />
          <CustomInput
            label="Description (optional)"
            placeholder="Enter description (optional)"
            name="description"
            register={register}
            validatorMessage={errors.description?.message}
          />

          <SelectInput
            label="Sector"
            options={sectorOptions}
            value={watch("sector")?.value === "" ? null : watch("sector")}
            onChange={(val) => val && setValue("sector", val)}
            placeholder="Select Sector"
            validatorMessage={
              errors.sector?.message ??
              errors.sector?.value?.message ??
              errors.sector?.label?.message
            }
          />
        </form>
        <div className="flex justify-between py-2 px-4 bg-vobb-neutral-10">
          <Button
            onClick={() => close()}
            className="text-xs rounded-sm"
            size={"default"}
            variant={"outline"}
            disabled={!isDirty || loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty}
            loading={loading}
            size={"default"}
            variant={"fill"}
            className="text-xs rounded-sm">
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { CreatePipelineModal };
