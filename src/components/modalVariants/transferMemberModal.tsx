import { BranchesDataProps, ModalProps, optionType } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { SelectInput } from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";

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
  orgBranches?: BranchesDataProps;
  loadingBranches: boolean;
}

const TransferMemberModal: React.FC<TransferMemberModalProps> = ({
  show,
  close,
  submit,
  multiple,
  branchId,
  loading,
  orgBranches,
  loadingBranches
}) => {
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
    reset();
  };

  return (
    <>
      <Modal show={show} close={close} contentClassName="p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-15">
          <h2 className="text-lg font-medium text-vobb-neutral-95">
            Transfer {multiple ? "Members" : "Member"}
          </h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <div className="p-4">
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
              errors.branch?.message ??
              errors.branch?.value?.message ??
              errors.branch?.label?.message
            }
            loading={loadingBranches}
          />
        </div>

        <div className="flex justify-end gap-2 items-center p-4 bg-vobb-neutral-25 border-t border-vobb-neutral-15">
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
