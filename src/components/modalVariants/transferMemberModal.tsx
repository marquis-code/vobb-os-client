import { ModalProps, optionType } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { SelectInput } from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useUserContext } from "context";
import { Label } from "@radix-ui/react-dropdown-menu";

interface TransferMemberData {
  branch: optionType;
}

const schema = yup.object({
  branch: yup.object({
    label: yup.string().required("Required"),
    value: yup.string().required("Required")
  })
});

interface TransferMemberModalProps extends ModalProps {
  submit: (data) => void;
  multiple: boolean;
  branchId: string;
  loading: boolean;
}

const TransferMemberModal: React.FC<TransferMemberModalProps> = ({
  show,
  close,
  submit,
  multiple,
  branchId,
  loading
}) => {
  const { orgBranches } = useUserContext();
  const branchesArray = orgBranches?.branchesArray;
  const branchesOptions =
    branchesArray
      ?.filter((branch) => branch.id !== branchId)
      .map((branch) => ({ label: branch.name, value: branch.id })) || [];

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<TransferMemberData>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<TransferMemberData> = (data) => {
    submit(data.branch);
  };

  return (
    <>
      <Modal show={show} close={close}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Transfer {multiple ? "Members" : "Member"}</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <p className="text-sm text-vobb-neutral-70 mb-4">
          Select the branch you want to transfer the {multiple ? "members" : "member"} to
        </p>

        <SelectInput
          label="Select branch"
          options={branchesOptions}
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
          <Button
            onClick={handleSubmit(onSubmit)}
            size={"default"}
            variant={"fill"}
            loading={loading}>
            Transfer
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { TransferMemberModal };
