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
      <Modal show={show} close={close} testId="update-job-title-modal">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Update Job Title</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <form className="mb-16">
          <CustomInput
            label="Set Job title"
            name="jobTitle"
            register={register}
            validatorMessage={errors.jobTitle?.message}
          />
        </form>
        <div className="flex justify-end gap-2">
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
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { UpdateJobTitleModal };
