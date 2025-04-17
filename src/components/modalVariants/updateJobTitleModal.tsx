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
        <div className="flex items-center justify-between p-4">
          <h2 className="text-sm font-semibold text-vobb-neutral-95">What's your job title?</h2>
        </div>
        <form className="px-4">
          <CustomInput
            name="jobTitle"
            register={register}
            validatorMessage={errors.jobTitle?.message}
            placeholder="Enter your job title"
          />
        </form>
        <div className="border-t flex justify-between gap-2 items-center py-2 px-4">
          <Button onClick={() => close()} size={"sm"} disabled={loading} variant={"outline"}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty}
            loading={loading}
            size={"sm"}
            variant={"fill"}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { UpdateJobTitleModal };
