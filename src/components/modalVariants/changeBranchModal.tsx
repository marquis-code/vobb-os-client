import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, CheckboxWithText, CustomInput, Modal, SelectInput } from "components";
import { ModalProps, optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { getOptionTypeValidationMsg } from "lib";

interface ChangeBranchData {
  branch: { label?: string | undefined; value?: string | undefined };
  team: { label?: string | undefined; value?: string | undefined };
}

const optionTypeSchema = yup.object({
  label: yup.string(),
  value: yup.string()
});

const schema = yup.object({
  branch: optionTypeSchema,
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Update member branch</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <p className="text-vobb-neutral-70 mb-4">
          Add <strong>{name}</strong> to a new branch and select the appropriate team
        </p>
        <form>
          <SelectInput
            label="Branch"
            options={[]}
            value={watch("branch")?.value === "" ? null : branch}
            onChange={(val) => val && setValue("branch", val)}
            validatorMessage={getOptionTypeValidationMsg(errors.branch)}
          />
          <SelectInput
            label="Team"
            options={[]}
            value={watch("team")?.value === "" ? null : team}
            onChange={(val) => val && setValue("team", val)}
            validatorMessage={getOptionTypeValidationMsg(errors.team)}
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
