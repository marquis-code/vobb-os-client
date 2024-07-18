import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, CheckboxWithText, CustomInput, Modal, SelectInput } from "components";
import { ModalProps, optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { getOptionTypeValidationMsg } from "lib";
import { roleOptions } from "lib/constants";

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
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ submit, close, show }) => {
  const [inviteNew, setInviteNew] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<InviteMemberData>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<InviteMemberData> = (data) => {
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
      <Modal contentClassName="max-w-[600px]" show={show} close={close}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Invite Member</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <form>
          <CustomInput
            label="Email address"
            type="email"
            name="email"
            register={register}
            validatorMessage={errors.email?.message}
          />
          <SelectInput
            label="Role"
            options={roleOptions}
            value={watch("role")?.value === "" ? null : watch("role")}
            onChange={(val) => val && setValue("role", val)}
            validatorMessage={getOptionTypeValidationMsg(errors.role)}
          />
          {watch("role")?.value !== "admin" ? (
            <>
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
            </>
          ) : (
            ""
          )}
          <CustomInput
            label="Job Title"
            type="text"
            name="jobTitle"
            register={register}
            validatorMessage={errors.jobTitle?.message}
          />
        </form>
        <div className="flex justify-end gap-2 items-center">
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
            variant={"outline"}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} size={"default"} variant={"fill"}>
            Send invitation
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { InviteMemberModal };
