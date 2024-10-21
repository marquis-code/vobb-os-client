import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Modal, SelectInput } from "components";
import { ModalProps, optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { getOptionTypeValidationMsg, optionTypeSchema, optionTypeSchemaReq } from "lib";

interface ChangeBranchData {
  branch: optionType;
  team: { label?: string | undefined; value?: string | undefined };
}

const schema = yup.object({
  branch: optionTypeSchemaReq,
  team: optionTypeSchema
});

interface ChangeBranchModalProps extends ModalProps {
  submit: (data) => void;
  name: string;
}

const ChangeBranchModal: React.FC<ChangeBranchModalProps> = ({ submit, close, show, name }) => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ChangeBranchData>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<ChangeBranchData> = (data) => {
    submit(data);
  };

  const branch: optionType = {
    label: watch("branch")?.label ?? "",
    value: watch("branch")?.value ?? ""
  };

  const team: optionType = {
    label: watch("team")?.label ?? "",
    value: watch("team")?.value ?? ""
  };

  return (
    <>
      <Modal contentClassName="max-w-[500px]" show={show} close={close}>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-vobb-neutral-15">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Update member branch</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <p className="text-vobb-neutral-70 mb-4">
          Add <strong>{name}</strong> to a new branch and select a new team if their current team(s)
          don't exist in the new branch.
        </p>
        <form>
          <SelectInput
            label="Branch"
            options={[
              { label: "Test", value: "test" },
              { label: "Two", value: "two" },
              { label: "Three", value: "three" }
            ]}
            value={watch("branch")?.value === "" ? null : branch}
            onChange={(val) => val && setValue("branch", val)}
            validatorMessage={getOptionTypeValidationMsg(errors.branch)}
          />
          <SelectInput
            label={`Team (Optional)`} //Show "(Optional)" only if the member already has teams in the selected branch.
            options={[
              { label: "Test", value: "test" },
              { label: "Two (Already a member)", value: "two", isDisabled: true },
              { label: "Three", value: "three" }
            ]}
            value={watch("team")?.value === "" ? null : team}
            onChange={(val) => val && setValue("team", val)}
            validatorMessage={getOptionTypeValidationMsg(errors.team)}
            hint={`The member will be able to access the following teams in the new branch: {current teams}, ${
              watch("team")?.label
            }`}
          />
        </form>
        <p className="text-xs text-vobb-neutral-70 mt-6">
          NB: This adds the member to a new branch and does not remove them their current
          branch(es).
        </p>
        <div className="flex justify-end gap-2 items-center mt-12">
          <Button
            onClick={() => close()}
            className="text-error-10"
            size={"default"}
            variant={"outline"}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} size={"default"} variant={"fill"}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { ChangeBranchModal };
