import { Button, PasswordInput, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { optionType } from "types/interfaces";
import { timeZoneOptions, initOptionType } from "lib";
import { useUserContext } from "context";
import { useEffect } from "react";

export interface TimeZoneProps {
  submit: (formData: FormData) => void;
  loadingTimezone: boolean;
}
interface TimeZoneData {
  timeZone: optionType;
}

const TimeZone: React.FC<TimeZoneProps> = ({ submit, loadingTimezone }) => {
  const { userDetails } = useUserContext();

  const schema = yup.object().shape({
    timeZone: yup.object({
      label: yup.string().required("Required"),
      value: yup.string().required("Required")
    })
  });

  const { handleSubmit, reset, watch, setValue } = useForm<TimeZoneData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (userDetails) {
      const timeZone = userDetails?.timezone
        ? timeZoneOptions.find((item) => item.value === userDetails.timezone) || initOptionType
        : initOptionType;
      setValue("timeZone", timeZone);
    }
  }, [userDetails]);

  const onSubmit: SubmitHandler<TimeZoneData> = (data) => {
    const formData = new FormData();
    if (data.timeZone) {
      formData.append("timezone", data.timeZone.value);
    }
    submit(formData);
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  return (
    <>
      <section className="grid grid-cols-[1fr,2fr] gap-8 border-b border-vobb-neutral-20 pb-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Time Zone</h2>
          <p className="text-xs">Select your time zone</p>
        </div>
        <form>
          <SelectInput
            options={timeZoneOptions}
            value={watch("timeZone")?.value === "" ? null : watch("timeZone")}
            onChange={(val) => val && setValue("timeZone", val)}
            placeholder="Select a time zone"
          />
          <div className="flex gap-2 justify-end max-w-[800px] pt-4">
            <Button onClick={handleReset} variant={"outline"}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={"fill"}
              loading={loadingTimezone}
              disabled={loadingTimezone}
              data-testid="save-btn">
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export { TimeZone };
