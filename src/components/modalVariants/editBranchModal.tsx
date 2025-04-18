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
import { useEffect } from "react";
import { organisationBranchRequestBody } from "api";

interface EditBranchData {
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

interface EditBranchModalProps extends ModalProps {
  submit: (data) => void;
  initData: EditBranchData;
  loading: boolean;
}

const EditBranchModal: React.FC<EditBranchModalProps> = ({
  show,
  close,
  submit,
  initData,
  loading
}) => {
  const { countries } = useCountriesContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    watch,
    setValue,
    getValues,
    reset
  } = useForm<EditBranchData>({
    resolver: yupResolver(schema)
    // defaultValues: { email: "" }
  });

  useEffect(() => {
    reset(initData);
  }, [initData]);

  const { country, timeZone } = getValues();
  const { country: initCountry, timeZone: initTimezone } = initData;

  const countryChanged = country?.value !== initCountry?.value;
  const timezoneChanged = timeZone?.value !== initTimezone?.value;

  const onSubmit: SubmitHandler<EditBranchData> = (data) => {
    let requestBody: Partial<organisationBranchRequestBody> = {};
    const { name, postalCode, state, addressLine1, addressLine2, city } = dirtyFields;

    if (name) requestBody.name = data.name;
    if (postalCode) requestBody.zip_code = data.postalCode;
    if (state) requestBody.state = data.state;
    if (addressLine1) requestBody.address_line_1 = data.addressLine1;
    if (addressLine2) requestBody.address_line_2 = data.addressLine2;
    if (city) requestBody.city = data.city;
    if (countryChanged) requestBody.country = data.country.value;
    if (timezoneChanged) requestBody.timezone = data.timeZone.value;

    submit(requestBody);
  };

  const hasChangedFields = isDirty || countryChanged || timezoneChanged;

  return (
    <>
      <Modal
        contentClassName="max-w-[800px] p-0"
        show={show}
        close={close}
        testId="editBranch-modal">
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Edit Branch Information</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <form className="p-4 border-b border-vobb-neutral-20 grid grid-cols-2 gap-x-4">
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
        <div className="flex justify-end gap-2 items-center p-4 bg-vobb-neutral-10">
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
            disabled={!hasChangedFields}
            loading={loading}
            size={"default"}
            variant={"fill"}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { EditBranchModal };
