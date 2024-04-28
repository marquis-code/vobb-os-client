import { ModalProps } from "types/interfaces";
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
  show: boolean;
  close: () => void;
  submit: (email: string) => void;
}

const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({ show, close, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ChangeEmailData>({
    resolver: yupResolver(schema),
    defaultValues: { email: "" }
  });

  const onSubmit: SubmitHandler<ChangeEmailData> = (data) => {
    submit(data.email);
  };

  return (
    <>
      <Modal show={show} close={close}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Change email address</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <form className="mb-16">
          <CustomInput
            label="New Email Address"
            type="email"
            name="email"
            register={register}
            validatorMessage={errors.email?.message}
          />
        </form>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => close()}
            className="text-error-10"
            size={"default"}
            variant={"outline"}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty}
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
