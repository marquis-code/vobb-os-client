import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, CheckboxWithText, CustomInput, Modal, SelectInput } from "components";
import { BranchesDataProps, ModalProps, optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { getOptionTypeValidationMsg } from "lib";

interface InviteMemberData {
  email: string;
  branch: { label?: string | undefined; value?: string | undefined };
  team: { label?: string | undefined; value?: string | undefined };
  role: optionType;
  jobTitle: string;
}

const optionTypeSchemaReq = yup
  .object({
    label: yup.string().required("Required"),
    value: yup.string().required("Required")
  })
  .required("Required");

const optionTypeSchema = yup.object({
  label: yup.string(),
  value: yup.string()
});

const schema = yup.object({
  email: yup.string().required("Required").email("Enter a valid email"),
  branch: optionTypeSchema,
  team: optionTypeSchema,
  role: optionTypeSchemaReq,
  jobTitle: yup.string().required("Required")
});

interface InviteMemberModalProps extends ModalProps {
  submit: (data) => void;
  loading: boolean;
  loadingBranches: boolean;
  orgBranches: BranchesDataProps;
  handleBranchTeams: {
    loading: boolean;
    handleSetId: (id: string) => void;
    options: optionType[] | [];
  };
  handleTeamRoles: {
    loading: boolean;
    handleSetId: (id: string) => void;
    options: optionType[] | [];
  };
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  submit,
  close,
  show,
  loading,
  loadingBranches,
  orgBranches,
  handleBranchTeams,
  handleTeamRoles
}) => {
  const {
    loading: loadingTeams,
    options: teamsOptions,
    handleSetId: handleSetBranchId
  } = handleBranchTeams;
  const {
    loading: loadingRoles,
    options: teamRolesOptions,
    handleSetId: handleSetTeamId
  } = handleTeamRoles;

  const [inviteNew, setInviteNew] = useState(false);
  const branchesOptions = orgBranches?.branchesArray.map((branch) => ({
    label: branch.name,
    value: branch.id
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<InviteMemberData>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<InviteMemberData> = (data) => {
    submit({ ...data, inviteNew });
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

  return (
    <>
      <Modal contentClassName="max-w-[944px] p-0" show={show} close={close} testId="invite-modal">
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Invite Member</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <form className="p-4 border-b border-vobb-neutral-20">
          <CustomInput
            label="Email address"
            type="email"
            name="email"
            placeholder="Enter email Address"
            register={register}
            validatorMessage={errors.email?.message}
          />

          {watch("role")?.label !== "Organization Admin" ? (
            <>
              <SelectInput
                label="Branch"
                options={branchesOptions}
                placeholder="Select branch"
                value={watch("branch")?.value === "" ? null : branch}
                onChange={(val) => {
                  if (val) {
                    setValue("branch", val);
                    handleSetBranchId(val.value);
                    setValue("team", { label: "", value: "" });
                    setValue("role", { label: "", value: "" });
                  }
                }}
                validatorMessage={getOptionTypeValidationMsg(errors.branch)}
                loading={loadingBranches}
              />
              <SelectInput
                label="Team"
                options={teamsOptions}
                placeholder="Select team"
                value={watch("team")?.value === "" ? null : team}
                onChange={(val) => {
                  if (val) {
                    setValue("team", val);
                    handleSetTeamId(val.value);
                    setValue("role", { label: "", value: "" });
                  }
                }}
                validatorMessage={getOptionTypeValidationMsg(errors.team)}
                loading={loadingTeams}
              />
            </>
          ) : (
            ""
          )}
          <SelectInput
            label="Role"
            options={teamRolesOptions}
            placeholder="Select role"
            value={watch("role")?.value === "" ? null : watch("role")}
            onChange={(val) => val && setValue("role", val)}
            validatorMessage={getOptionTypeValidationMsg(errors.role)}
            loading={loadingRoles}
          />
          <CustomInput
            label="Job Title"
            type="text"
            name="jobTitle"
            placeholder="Enter job title"
            register={register}
            validatorMessage={errors.jobTitle?.message}
          />
        </form>
        <div className="flex justify-end gap-2 items-center p-4 bg-vobb-neutral-10">
          <CheckboxWithText
            label={"Invite another member"}
            handleChecked={setInviteNew}
            checked={inviteNew}
            className="mr-auto"
          />
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
            loading={loading}>
            Send invitation
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { InviteMemberModal };
