import { ModalProps, optionType } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { CustomInput, SelectInput } from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useCountriesContext } from "context";
import { timeZoneOptions } from "lib/constants";

interface AddBranchData {
  name: string;
  country: optionType;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  timeZone: optionType;
}

const schema = yup.object({
  name: yup.string().required("Required"),
  state: yup.string().required("Required"),
  city: yup.string().required("Required"),
  addressLine1: yup.string().required("Required"),
  addressLine2: yup.string(),
  postalCode: yup.string().required("Required"),
  timeZone: yup.object({
    label: yup.string().required("Required"),
    value: yup.string().required("Required")
  }),
  country: yup.object({
    label: yup.string().required("Required"),
    value: yup.string().required("Required")
  })
});

interface AddBranchModalProps extends ModalProps {
  submit: (data) => void;
}

const AddBranchModal: React.FC<AddBranchModalProps> = ({ show, close, submit }) => {
  const { countries } = useCountriesContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue
  } = useForm<AddBranchData>({
    resolver: yupResolver(schema)
    // defaultValues: { email: "" }
  });

  const onSubmit: SubmitHandler<AddBranchData> = (data) => {
    submit(data);
  };

  return (
    <>
      <Modal contentClassName="max-w-[800px]" show={show} close={close}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Create New Branch</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <form className="mb-8 grid grid-cols-2 gap-x-4">
          <CustomInput
            label="Branch Name"
            type="text"
            name="name"
            register={register}
            validatorMessage={errors.name?.message}
          />
          <SelectInput
            label="Country of Operation"
            options={countries}
            value={watch("country")?.value === "" ? null : watch("country")}
            onChange={(val) => val && setValue("country", val)}
            validatorMessage={
              errors.country?.message ??
              errors.country?.value?.message ??
              errors.country?.label?.message
            }
          />
          <CustomInput
            label="State"
            type="text"
            name="state"
            register={register}
            validatorMessage={errors.state?.message}
          />
          <CustomInput
            label="City"
            type="text"
            name="city"
            register={register}
            validatorMessage={errors.city?.message}
          />
          <CustomInput
            label="Address Line 1"
            type="text"
            name="addressLine1"
            register={register}
            validatorMessage={errors.addressLine1?.message}
          />
          <CustomInput
            label="Address Line 2 (Optional)"
            type="text"
            name="addressLine2"
            register={register}
            validatorMessage={errors.addressLine2?.message}
          />
          <CustomInput
            label="Postal Code"
            type="text"
            name="postalCode"
            register={register}
            validatorMessage={errors.postalCode?.message}
          />
          <SelectInput
            label="Timezone"
            options={timeZoneOptions}
            value={watch("timeZone")?.value === "" ? null : watch("timeZone")}
            onChange={(val) => val && setValue("timeZone", val)}
            placeholder="Select a time zone"
            validatorMessage={
              errors.timeZone?.message ??
              errors.timeZone?.value?.message ??
              errors.timeZone?.label?.message
            }
          />
        </form>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => close()}
            className="text-error-10"
            size={"default"}
            variant={"outline"}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty}
            size={"default"}
            variant={"fill"}>
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { AddBranchModal };
