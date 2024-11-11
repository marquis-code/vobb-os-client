import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Modal, SelectInput } from "components";
import { ModalProps, optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { getOptionTypeValidationMsg } from "lib";

interface ChangeTeamData {
  team: { label?: string | undefined; value?: string | undefined };
}

const optionTypeSchema = yup.object({
  label: yup.string(),
  value: yup.string()
});

const schema = yup.object({ team: optionTypeSchema });

interface ChangeTeamModalProps extends ModalProps {
  submit: (data) => void;
  name: string;
  handleSetTeam: (id: string) => void;
  loading: boolean;
  teams: {
    loading: boolean;
    options: optionType[];
  };
}

const ChangeTeamModal: React.FC<ChangeTeamModalProps> = ({
  submit,
  close,
  show,
  name,
  loading,
  teams,
  handleSetTeam
}) => {
  const { loading: loadingTeams, options: teamOptions } = teams;
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ChangeTeamData>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<ChangeTeamData> = (data) => {
    submit(data);
  };

  const team: optionType = {
    label: watch("team")?.label ?? "",
    value: watch("team")?.value ?? ""
  };

  return (
    <>
      <Modal contentClassName="max-w-[500px] p-0" show={show} close={close}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Update member team</h2>
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
          Add <strong>{name}</strong> to a new team
        </p>
        <form>
          <SelectInput
            label="Team"
            options={teamOptions}
            value={watch("team")?.value === "" ? null : team}
            onChange={(val) => {
              val && setValue("team", val);
              val && handleSetTeam(val.value);
            }}
            validatorMessage={getOptionTypeValidationMsg(errors.team)}
            loading={loadingTeams}
          />
        </form>
        <p className="text-xs text-vobb-neutral-70 mt-6">
          NB: This adds the member to a new team within all their current branches
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
            disabled={loading}
            loading={loading}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { ChangeTeamModal };
