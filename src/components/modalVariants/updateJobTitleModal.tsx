import { ModalProps } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { CustomInput } from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";

interface UpdateJobTitleData {
  jobTitle: string;
}

const schema = yup.object({
  jobTitle: yup.string().required("Required")
});

interface UpdateJobTitleModalProps extends ModalProps {
  submit: ({ jobTitle }) => void;
  loading: boolean;
}

const UpdateJobTitleModal: React.FC<UpdateJobTitleModalProps> = ({
  show,
  close,
  submit,
  loading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<UpdateJobTitleData>({
    resolver: yupResolver(schema),
    defaultValues: { jobTitle: "" }
  });

  const onSubmit: SubmitHandler<UpdateJobTitleData> = (data) => {
    submit(data);
  };

  return (
    <>
      <Modal show={show} close={close} testId="update-job-title-modal" contentClassName="p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">What's your job title?</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <form className="p-4 border-b border-vobb-neutral-20">
          <CustomInput
            label="Job title"
            name="jobTitle"
            register={register}
            validatorMessage={errors.jobTitle?.message}
          />
        </form>
        <div className="flex justify-end gap-2 items-center p-4 bg-vobb-neutral-10">
          <Button
            onClick={() => close()}
            className="text-error-10"
            size={"default"}
            disabled={loading}
            variant={"outline"}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty}
            loading={loading}
            size={"default"}
            variant={"fill"}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { UpdateJobTitleModal };
