import { Button, MultiSelectInput, PasswordInput, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { optionType } from "types/interfaces";
import { initOptionType, sysLangOptions } from "lib/constants";

export interface YourLanguagesProps {
  submit: (formData: FormData) => void;
  loadingPreferredLang: boolean;
}
interface YourLanguagesData {
  languages: optionType[];
}
const initSysLang: YourLanguagesData = {
  languages: []
};

const YourLanguages: React.FC<YourLanguagesProps> = ({ submit, loadingPreferredLang }) => {
  const schema = yup.object().shape({
    languages: yup
      .array()
      .of(
        yup.object({
          label: yup.string().required("Required"),
          value: yup.string().required("Required")
        })
      )
      .required("Select at least one language")
  });

  const { handleSubmit, reset, watch, setValue } = useForm<YourLanguagesData>({
    resolver: yupResolver(schema),
    defaultValues: initSysLang
  });

  const onSubmit: SubmitHandler<YourLanguagesData> = (data) => {
    const formData = new FormData();
    console.log(formData);
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  return (
    <>
      <section className="grid grid-cols-[1fr,2fr] gap-8 border-b border-vobb-neutral-20 pb-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Your Languages</h2>
          <p className="text-xs">Indicate the languages you're fluent in</p>
        </div>
        <form>
          <MultiSelectInput
            options={sysLangOptions}
            value={watch("languages")}
            onChange={(val) => {
              const value = val as optionType[];
              setValue("languages", value);
            }}
            placeholder="Select languages"
          />
          <div className="flex gap-2 justify-end max-w-[800px] pt-4">
            <Button onClick={handleReset} variant={"outline"}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={"fill"}
              loading={loadingPreferredLang}
              disabled={loadingPreferredLang}>
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export { YourLanguages };
