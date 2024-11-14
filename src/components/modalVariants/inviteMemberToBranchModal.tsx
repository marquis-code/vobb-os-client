import { Button, CheckboxWithText, CustomInput, Modal, SelectInput } from "components";
import { ModalProps, optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { getOptionTypeValidationMsg } from "lib";
import { IconX } from "@tabler/icons-react";

interface InviteMemberToBranchData {
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

interface InviteMemberToBranchModalProps extends ModalProps {
  submit: (data) => void;
  loading: boolean;
  currentBranch: optionType;
  handleBranchTeams: {
    loading: boolean;
    options: optionType[] | [];
  };
  handleTeamRoles: {
    loading: boolean;
    handleSetId: (id: string) => void;
    options: optionType[] | [];
  };
}

const InviteMemberToBranchModal: React.FC<InviteMemberToBranchModalProps> = ({
  submit,
  close,
  show,
  loading,
  handleBranchTeams,
  handleTeamRoles,
  currentBranch
}) => {
  const { loading: loadingTeams, options: teamsOptions } = handleBranchTeams;
  const {
    loading: loadingRoles,
    options: teamRolesOptions,
    handleSetId: handleSetTeamId
  } = handleTeamRoles;

  const [inviteNew, setInviteNew] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<InviteMemberToBranchData>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<InviteMemberToBranchData> = (data) => {
    submit({ ...data, inviteNew });
    reset();
    setValue("role", { label: "", value: "" });
  };

  useEffect(() => {
    if (currentBranch) setValue("branch", currentBranch);
  }, [currentBranch, setValue]);

  return (
    <>
      <Modal contentClassName="max-w-[944px] p-0" show={show} close={close} testId="invite-modal">
        <div className="flex items-center justify-between px-4 py-[11px] border-b border-vobb-neutral-20">
          <h2 className="text-base font-medium text-vobb-neutral-95">Invite Member To Branch</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border w-[26px] h-[26px] shadow-sm">
            <IconX size={16} />
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

          {watch("role")?.label !== "Super Admin" ? (
            <>
              <SelectInput
                label="Team"
                placeholder="Select team"
                options={teamsOptions}
                value={watch("team")?.value === "" ? null : undefined}
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
            placeholder="Select role"
            options={teamRolesOptions}
            value={watch("role")?.value === "" ? null : watch("role")}
            onChange={(val) => val && setValue("role", val)}
            validatorMessage={getOptionTypeValidationMsg(errors.role)}
            loading={loadingRoles}
          />
          <CustomInput
            label="Job Title"
            placeholder="Enter job title"
            type="text"
            name="jobTitle"
            register={register}
            validatorMessage={errors.jobTitle?.message}
          />
        </form>

        <div className="flex justify-end gap-2 items-center px-4 py-2 bg-vobb-neutral-0">
          <Button
            onClick={() => close()}
            className="h-9 w-[68px] rounded-sm mr-auto text-xs text-vobb-neutral-80"
            size={"default"}
            variant={"outline"}
            disabled={loading}>
            Cancel
          </Button>
          <CheckboxWithText
            label={"Invite another member"}
            handleChecked={setInviteNew}
            checked={inviteNew}
            className="mr-4 text-xs text-vobb-neutral-80"
          />

          <Button
            onClick={handleSubmit(onSubmit)}
            size={"default"}
            variant={"fill"}
            className="h-9 w-[68px] rounded-sm text-xs"
            loading={loading}>
            Invite
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { InviteMemberToBranchModal };
