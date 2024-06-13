import { ModalProps, optionType } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { SelectInput } from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";

interface TransferTeamData {
  branch: optionType;
}

const schema = yup.object({
  branch: yup.object({
    label: yup.string().required("Required"),
    value: yup.string().required("Required")
  })
});

interface TransferTeamModalProps extends ModalProps {
  submit: (data) => void;
  multiple: boolean;
}

const TransferTeamModal: React.FC<TransferTeamModalProps> = ({ show, close, submit, multiple }) => {
  const {
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset
  } = useForm<TransferTeamData>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<TransferTeamData> = (data) => {
    submit(data);
  };

  return (
    <>
      <Modal show={show} close={close}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Transfer {multiple ? "Teams" : "Team"}</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <p className="text-sm text-vobb-neutral-70 mb-4">
          Select the branch you want to transfer the {multiple ? "teams" : "multiple"} to
        </p>

        <SelectInput
          label="Select branch"
          options={[{ label: "Test", value: "Test" }]}
          value={watch("branch")?.value === "" ? null : watch("branch")}
          onChange={(val) => val && setValue("branch", val)}
          placeholder="Select a branch"
          validatorMessage={
            errors.branch?.message ?? errors.branch?.value?.message ?? errors.branch?.label?.message
          }
        />

        <div className="flex justify-end gap-2">
          <Button
            onClick={() => close()}
            className="text-error-10"
            size={"default"}
            variant={"outline"}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} size={"default"} variant={"fill"}>
            Transfer
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { TransferTeamModal };
