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
  loading: boolean;
  name: string;
  memberBranches: {
    options: optionType[];
    loading: boolean;
    handleSetId: (id: string) => void;
  };
  memberTeams: {
    options: optionType[];
    loading: boolean;
    handleSetId: (id: string) => void;
  };
}

const ChangeBranchModal: React.FC<ChangeBranchModalProps> = ({
  submit,
  close,
  loading,
  show,
  name,
  memberBranches,
  memberTeams
}) => {
  const {
    loading: loadingBranches,
    options: branches,
    handleSetId: handleFetchBranchTeams
  } = memberBranches;
  const {
    loading: loadingTeams,
    options: teams,
    handleSetId: handleFetchBranchRoles
  } = memberTeams;

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    getValues
  } = useForm<ChangeBranchData>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<ChangeBranchData> = (data) => {
    submit(data);
    reset();
  };

  const branch: optionType = {
    label: watch("branch")?.label ?? "",
    value: watch("branch")?.value ?? ""
  };

  const team: optionType = {
    label: watch("team")?.label ?? "",
    value: watch("team")?.value ?? ""
  };

  const hasTeamInBranch = teams.some((team) => team.isDisabled);

  const currentTeams = teams
    .filter((team) => team.isDisabled)
    .map((team) => team.label)
    .join(", ");
  return (
    <>
      <Modal contentClassName="max-w-[500px]" show={show} close={close}>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-vobb-neutral-20">
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
            options={branches}
            value={watch("branch")?.value === "" ? null : branch}
            onChange={(val) => {
              val && setValue("branch", val);
              val && handleFetchBranchTeams(val.value);
            }}
            validatorMessage={getOptionTypeValidationMsg(errors.branch)}
            loading={loadingBranches}
          />
          {getValues().branch && (
            <SelectInput
              label={`Team ${hasTeamInBranch ? "(Optional)" : ""}`}
              options={teams}
              value={watch("team")?.value === "" ? null : team}
              onChange={(val) => {
                val && setValue("team", val);
                val && handleFetchBranchRoles(val.value);
              }}
              validatorMessage={getOptionTypeValidationMsg(errors.team)}
              hint={`The member will be able to access the following teams in the new branch: ${currentTeams}, ${
                watch("team")?.label ?? ""
              }`}
              loading={loadingTeams}
            />
          )}
        </form>
        <p className="text-xs text-vobb-neutral-70 mt-6">
          NB: This adds the member to a new branch and does not remove them from their current
          branch(es).
        </p>
        <div className="flex justify-end gap-2 items-center mt-12">
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
            disabled={!getValues().branch || (!hasTeamInBranch && !getValues().team)}
            loading={loading}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { ChangeBranchModal };
