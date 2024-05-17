import { Button, PasswordInput, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { optionType } from "types/interfaces";
import { dateFormatOptions, initOptionType, sysLangOptions } from "lib/constants";
import { useUserContext } from "context";

export interface DateFormatProps {
  submit: (formData: FormData) => void;
  loadingDateFormat: boolean;
}
interface DateFormatData {
  dateFormat: optionType | undefined;
}

const DateFormat: React.FC<DateFormatProps> = ({ submit, loadingDateFormat }) => {
  const { userDetails } = useUserContext();

  const initSysLang: DateFormatData = {
    dateFormat: userDetails?.dateFormat
      ? dateFormatOptions.find((item) => item.value === userDetails.dateFormat)
      : initOptionType
  };

  const schema = yup.object().shape({
    dateFormat: yup.object({
      label: yup.string().required("Required"),
      value: yup.string().required("Required")
    })
  });

  const { handleSubmit, reset, watch, setValue } = useForm<DateFormatData>({
    resolver: yupResolver<DateFormatData | any>(schema),
    defaultValues: initSysLang
  });

  const onSubmit: SubmitHandler<DateFormatData> = (data) => {
    const formData = new FormData();
    if (data.dateFormat) {
      formData.append("date_format", data.dateFormat.value);
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
          <h2 className="text-[16px] font-semibold mb-2">Preffered Date Format</h2>
          <p className="text-xs">
            Choose the format in which you want dates to be presented to you
          </p>
        </div>
        <form>
          <SelectInput
            options={dateFormatOptions}
            value={watch("dateFormat")?.value === "" ? null : watch("dateFormat")}
            onChange={(val) => val && setValue("dateFormat", val)}
            placeholder="Select a date format"
          />
          <div className="flex gap-2 justify-end max-w-[800px] pt-4">
            <Button onClick={handleReset} variant={"outline"}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={"fill"}
              loading={loadingDateFormat}
              disabled={loadingDateFormat}>
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export { DateFormat };
