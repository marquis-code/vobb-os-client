import { ModalProps } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { CustomInput } from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";

interface ChangeEmailData {
  email: string;
}

const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Required")
});

interface ChangeEmailModalProps extends ModalProps {
  submit: ({ email }) => void;
  loading: boolean;
}

const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({ show, close, submit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ChangeEmailData>({
    resolver: yupResolver(schema),
    defaultValues: { email: "" }
  });

  const onSubmit: SubmitHandler<ChangeEmailData> = (data) => {
    submit(data);
  };

  return (
    <>
      <Modal show={show} close={close} contentClassName="p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Change email address</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>

        <form className="p-4 border-b border-vobb-neutral-20 grid gap-x-4">
          <CustomInput
            label="New Email Address"
            type="email"
            name="email"
            register={register}
            validatorMessage={errors.email?.message}
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
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { ChangeEmailModal };
