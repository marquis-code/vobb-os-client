import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconX } from "@tabler/icons-react";
import { CustomInput, CustomTextarea } from "components/form";
import { Modal } from "components/modal";
import { Button } from "components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalProps } from "types";

export interface CreatePipelineData {
  name: string;
  description?: string;
}

// const stagesTypeSchema = yup.object({
//   title: yup.string(),
//   color: yup.string()
// });

const schema = yup.object({
  name: yup.string().required("Required"),
  description: yup.string()
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
          <h2 className="text-lg font-medium font-inter text-vobb-neutral-95">Pipeline Creation</h2>
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
          <CustomTextarea
            label="Description (optional)"
            placeholder="Enter description (optional)"
            className="min-h-[128px]"
            name="description"
            register={register}
            validatorMessage={errors.description?.message}
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
            Create Pipeline
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { CreatePipelineModal };
export * from "./error";
export * from "./success";