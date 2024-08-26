import { Button, LoadingSpinner, MultiSelectInput, PasswordInput, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { optionType } from "types/interfaces";
import { initOptionType, languagesOptions } from "lib";
import { useUserContext } from "context";
import { useEffect } from "react";

export interface YourLanguagesProps {
  submit: (formData: FormData) => void;
  loadingPreferredLang: boolean;
}
interface YourLanguagesData {
  languages: optionType[];
}

const YourLanguages: React.FC<YourLanguagesProps> = ({ submit, loadingPreferredLang }) => {
  const { userDetails } = useUserContext();

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
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (userDetails) {
      const languages = userDetails.fluentLanguages
        ? userDetails.fluentLanguages.map(
            (lang) => languagesOptions.find((option) => option.value === lang) || initOptionType
          )
        : [];
      setValue("languages", languages);
    }
  }, [userDetails]);

  const onSubmit: SubmitHandler<YourLanguagesData> = (data) => {
    const formData = new FormData();
    const { languages } = data;
    if (languages.length) {
      languages.forEach((language, index) => {
        formData.append(`fluent_languages[${index}]`, language.value);
      });
      submit(formData);
    }
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
            options={languagesOptions}
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
              disabled={loadingPreferredLang}
              data-cy="save-btn">
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export { YourLanguages };
