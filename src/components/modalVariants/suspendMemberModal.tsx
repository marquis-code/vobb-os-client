import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Button,
  CheckboxWithText,
  CustomInput,
  CustomTextarea,
  DatePicker,
  Modal,
  SelectInput
} from "components";
import { ModalProps, optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { getOptionTypeValidationMsg } from "lib";
import { roleOptions } from "lib/constants";

interface SuspendMemberData {
  reason?: string | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  isIndefinite?: boolean;
}

const schema = yup.object({
  reason: yup.string(),
  startDate: yup.date().when("isIndefinite", {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("Start date is required for a temporary suspension")
  }),
  endDate: yup.date().when("isIndefinite", {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("End date is required for a temporary suspension")
  }),
  isIndefinite: yup.boolean().oneOf([true, false])
});

interface SuspendMemberModalProps extends ModalProps {
  submit: (data) => void;
}

const SuspendMemberModal: React.FC<SuspendMemberModalProps> = ({ submit, close, show }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<SuspendMemberData>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<SuspendMemberData> = (data) => {
    submit(data);
  };

  return (
    <>
      <Modal contentClassName="max-w-[600px]" show={show} close={close}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Suspend Amaka</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <p className="text-vobb-neutral-70 mb-4">
          You can select a start and end date to temporarily suspend an account, or choose
          indefinite suspension to deactivate an account.
        </p>
        <form>
          <CustomTextarea
            label="Reason (optional)"
            placeholder="Why do you want to suspend this account?"
            name="reason"
            register={register}
            validatorMessage={errors.reason?.message}
          />
          {watch("isIndefinite") ? (
            ""
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="From"
                value={watch("startDate")}
                handleChange={(val: Date | undefined) => setValue("startDate", val)}
                validatorMessage={errors.startDate?.message}
              />
              <DatePicker
                label="To"
                value={watch("startDate")}
                handleChange={(val: Date | undefined) => setValue("startDate", val)}
                validatorMessage={errors.endDate?.message}
              />
            </div>
          )}
          <CheckboxWithText
            label={"Indefinite suspension"}
            handleChecked={(val) => setValue("isIndefinite", val)}
            checked={watch("isIndefinite") ?? false}
            className="mr-auto mb-4"
            labelClassName="font-normal text-vobb-neutral-70"
          />
        </form>
        <p className="text-xs text-vobb-neutral-70 mt-6">
          {" "}
          NB: These actions are reversible so the accounts will still be visible on your dashboard
          if you need to restore them
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
            {watch("isIndefinite") ? "Deactivate account" : "Suspend account"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { SuspendMemberModal };
