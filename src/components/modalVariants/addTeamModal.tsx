import { ModalProps } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { CheckboxWithText, CustomInput, CustomTextarea } from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";
import IconPicker from "react-icons-picker";

export interface AddTeamData {
  name: string;
  description?: string;
  icon: string;
  isGeneral?: boolean;
  joinTeam?: boolean;
}

const schema = yup.object({
  name: yup.string().required("Required"),
  description: yup.string(),
  icon: yup.string().required("Required"),
  isGeneral: yup.boolean(),
  joinTeam: yup.boolean()
});

interface AddTeamModalProps extends ModalProps {
  submit: (data) => void;
  loading: boolean;
}

const AddTeamModal: React.FC<AddTeamModalProps> = ({ show, close, submit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<AddTeamData>({
    resolver: yupResolver(schema)
    //defaultValues: { email: "" }
  });

  const onSubmit: SubmitHandler<AddTeamData> = (data) => {
    submit(data);
  };

  return (
    <>
      <Modal contentClassName="max-w-[944px] p-0" show={show} close={close} testId="addTeam-modal">
        <>
          <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-15">
            <h2 className="text-lg font-medium text-vobb-neutral-95">Create New Team</h2>
            <Button
              onClick={close}
              variant={"ghost"}
              size={"icon"}
              data-testid="close-btn"
              className="border p-2 shadow-sm">
              <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
            </Button>
          </div>
          <form className="p-4 border-b border-vobb-neutral-15">
            <div className="mb-4">
              <IconPicker
                defaultValue="fas fa-camera"
                value={watch("icon")}
                onChange={(v) => setValue("icon", v)}
                modalFadeStyle={{
                  position: "absolute",
                  zIndex: "1"
                }}
                modalWrapperStyle={{
                  borderRadius: "12px",
                  width: "100vw",
                  maxHeight: "400px",
                  minHeight: "300px",
                  minWidth: "250px",
                  background: "white",
                  boxShadow: "0px 0px 4px 1px rgb(0, 0, 0, 5%)",
                  fontFamily: "Inter",
                  maxWidth: "500px"
                }}
                searchBarStyle={{
                  padding: "1rem",
                  borderBottom: "1px solid hsl(var(--input))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: " rgba(0, 0, 0, 0.7)",
                  fontFamily: "Inter",
                  gap: "0.8rem"
                }}
                searchInputStyle={{
                  fontFamily: "Inter",
                  border: "1px solid",
                  borderColor: "hsl(var(--input))",
                  height: "32px",
                  paddingLeft: "8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  width: "100%"
                }}
                modalEmptyWrapperStyle={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontFamily: "Inter",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  color: "var(--neutral-40)",
                  padding: "20px 0"
                }}
                pickButtonStyle={{
                  display: "inline-block",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.3s ease 0s",
                  boxShadow: "unset",
                  padding: "8px",
                  borderColor: "hsl(var(--input))",
                  fontSize: "20px"
                }}
                modalIconNameStyle={{
                  display: "none"
                }}
                modalIconsWrapperStyle={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "15px",
                  gap: "10px",
                  overflowY: "scroll",
                  boxSizing: "border-box",
                  maxHeight: "100%",
                  background: "#fff"
                }}
                modalContentWrapperStyle={{
                  padding: "0px",
                  height: "235px"
                }}
                modalIconsStyle={{
                  border: "1px solid var(--input)",
                  background: "white",
                  transition: "all 0.3s ease 0s",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "20px"
                }}
              />
              {errors.icon && (
                <small className="block text-[11px] mt-1 text-error-10">
                  {errors.icon?.message}
                </small>
              )}
            </div>
            <CustomInput
              label="Team Name"
              type="text"
              name="name"
              register={register}
              validatorMessage={errors.name?.message}
            />
            <CustomTextarea
              label="Description (optional)"
              name="description"
              register={register}
              validatorMessage={errors.description?.message}
              placeholder="Describe your team"
            />

            <CheckboxWithText
              label={"Automatically add me to the team"}
              handleChecked={(val) => setValue("joinTeam", val)}
              checked={watch("joinTeam") ?? false}
              className="mb-4"
            />
            <CheckboxWithText
              label={"Automatically add the team to every branch"}
              handleChecked={(val) => setValue("isGeneral", val)}
              checked={watch("isGeneral") ?? false}
              className="mb-4"
            />
          </form>
          <div className="flex justify-end gap-2 items-center p-4 bg-vobb-neutral-25">
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
              Create
            </Button>
          </div>
        </>
      </Modal>
    </>
  );
};

export { AddTeamModal };
