import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, CheckboxWithText, CustomInput, Modal, SelectInput } from "components";
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
}

const ChangeTeamModal: React.FC<ChangeTeamModalProps> = ({ submit, close, show, name }) => {
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
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-15">
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
        <div className="p-4">
          <p className="text-vobb-neutral-70 mb-4">
            Add <strong>{name}</strong> to a new team
          </p>
          <form className=" border-b border-vobb-neutral-15 grid gap-x-4">
            <SelectInput
              label="Team"
              options={[]}
              value={watch("team")?.value === "" ? null : team}
              onChange={(val) => val && setValue("team", val)}
              validatorMessage={getOptionTypeValidationMsg(errors.team)}
            />
          </form>
          <p className="text-xs text-vobb-neutral-70 mt-4">
            NB: This adds the member to a new team within all their current branches
          </p>
        </div>
        <div className="flex justify-end gap-2 items-center p-4 bg-vobb-neutral-25">
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

export { ChangeTeamModal };
