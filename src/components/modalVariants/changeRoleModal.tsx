import { ModalProps, optionType } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { SelectInput } from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";
import { roleOptions } from "lib/constants";
import { useEffect } from "react";

interface ChangeRoleData {
  role: optionType;
}

const schema = yup.object({
  role: yup.object({
    label: yup.string().required("Required"),
    value: yup.string().required("Required")
  })
});

interface ChangeRoleModalProps extends ModalProps {
  submit: (data) => void;
  initData: ChangeRoleData;
  name: string;
  loading: boolean;
}

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({
  show,
  close,
  submit,
  initData,
  name,
  loading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<ChangeRoleData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    reset(initData);
  }, [initData]);

  const onSubmit: SubmitHandler<ChangeRoleData> = (data) => {
    submit(data);
  };

  return (
    <>
      <Modal
        contentClassName="max-w-[400px] p-0"
        show={show}
        close={close}
        testId="changeRole-modal">
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Change {name}'s Role</h2>
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
          <SelectInput
            label="Select role"
            options={roleOptions}
            value={watch("role")?.value === "" ? null : watch("role")}
            onChange={(val) => val && setValue("role", val)}
            validatorMessage={
              errors.role?.message ?? errors.role?.value?.message ?? errors.role?.label?.message
            }
          />
        </form>
        <div className="flex justify-end gap-2 items-center p-4 bg-vobb-neutral-10">
          <Button
            onClick={() => close()}
            className="text-error-10"
            size={"default"}
            variant={"outline"}
            disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            size={"default"}
            variant={"fill"}
            disabled={loading}
            loading={loading}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { ChangeRoleModal };
