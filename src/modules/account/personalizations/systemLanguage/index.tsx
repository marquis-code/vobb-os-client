import { Button, PasswordInput, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { optionType } from "types/interfaces";
import { initOptionType, languagesOptions, sysLangOptions } from "lib";
import { useUserContext } from "context";

export interface SystemLanguageProps {
  submit: (formData: FormData) => void;
  loadingSytemLang: boolean;
}
interface SystemLanguageData {
  language: optionType | undefined;
}

const SystemLanguage: React.FC<SystemLanguageProps> = ({ submit, loadingSytemLang }) => {
  const { userDetails } = useUserContext();
  const schema = yup.object().shape({
    language: yup.object({
      label: yup.string().required("Required"),
      value: yup.string().required("Required")
    })
  });
  const initSysLang: SystemLanguageData = {
    language: userDetails?.language
      ? sysLangOptions.find((item) => item.value === userDetails.language)
      : initOptionType
  };

  const { handleSubmit, reset, watch, setValue } = useForm<SystemLanguageData>({
    resolver: yupResolver<SystemLanguageData | any>(schema),
    defaultValues: initSysLang
  });

  const onSubmit: SubmitHandler<SystemLanguageData> = (data) => {
    const formData = new FormData();
    if (data.language) {
      formData.append("language", data.language.value);
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
          <h2 className="text-[16px] font-semibold mb-2">System Language</h2>
          <p className="text-xs">Translate the app into your preferred language</p>
        </div>
        <form>
          <SelectInput
            options={languagesOptions}
            value={watch("language")?.value === "" ? null : watch("language")}
            onChange={(val) => val && setValue("language", val)}
            placeholder="Select a language"
          />
          <div className="flex gap-2 justify-end max-w-[800px] pt-4">
            <Button onClick={handleReset} variant={"outline"} disabled={loadingSytemLang}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={"fill"}
              disabled={loadingSytemLang}
              loading={loadingSytemLang}>
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export { SystemLanguage };
