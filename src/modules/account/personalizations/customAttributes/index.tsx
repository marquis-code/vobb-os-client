import {
  Button,
  CustomCheckboxGroup,
  CustomInput,
  CustomPhoneInput,
  CustomRadioGroup,
  CustomTextarea,
  DatePicker,
  PasswordInput,
  SelectInput
} from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { optionType } from "types/interfaces";
import { initOptionType } from "lib";
import { useState } from "react";
import { FileUpload } from "components/form/file-upload";
import { useCountriesContext } from "context";

interface CustomAttributesProps {
  submit: () => void;
}
interface CustomAttributesData {
  language: optionType;
}
const initSysLang: CustomAttributesData = {
  language: initOptionType
};

const CustomAttributes: React.FC<CustomAttributesProps> = ({ submit }) => {
  const schema = yup.object().shape({
    language: yup.object({
      label: yup.string().required("Required"),
      value: yup.string().required("Required")
    })
  });

  const { handleSubmit, reset, watch, setValue } = useForm<CustomAttributesData>({
    resolver: yupResolver(schema),
    defaultValues: initSysLang
  });

  const onSubmit: SubmitHandler<CustomAttributesData> = (data) => {
    submit();
  };

  const { countries } = useCountriesContext();

  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <section className="grid grid-cols-[1fr,2fr] gap-8 border-b border-vobb-neutral-20 pb-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Organization Properties</h2>
          <p className="text-xs">
            These are the properties your organization administrator has defined for all members
          </p>
        </div>
        <form>
          {/* Short text */}
          <CustomInput label="Short text" type="text" />

          {/* Long text */}
          <CustomTextarea label="Long text" placeholder="" hint="0/100 words" />

          {/* Number */}
          <CustomInput label="Number" type="number" />

          {/* Email */}
          <CustomInput label="Email" type="email" />

          {/* Dropdown */}
          <SelectInput label="Dropdown" options={[]} value={null} onChange={console.log} />

          {/* Multiple choice */}
          <CustomRadioGroup
            label="Multiple choice"
            options={[
              {
                label: "Option One",
                value: "option-one"
              },
              {
                label: "Option Two",
                value: "option-two"
              },
              {
                label: "Option Three",
                value: "option-three"
              }
            ]}
            value={{
              label: "Option One",
              value: "option-one"
            }}
            onChange={console.log}
          />

          {/* Checkboxes */}
          <CustomCheckboxGroup
            label="Checkboxes"
            options={[
              {
                label: "Option One",
                value: "option-one"
              },
              {
                label: "Option Two",
                value: "option-two"
              },
              {
                label: "Option Three",
                value: "option-three"
              }
            ]}
            value={[
              {
                label: "Option Two",
                value: "option-two"
              }
            ]}
            onChange={console.log}
          />

          {/* Phone number */}
          <CustomPhoneInput
            label="Phone number"
            validatorMessage={undefined}
            handleChange={console.log}
          />

          {/* Country */}
          <SelectInput label="Country" options={countries} value={null} onChange={console.log} />

          {/* Date */}
          <DatePicker value={date} handleChange={setDate} label="Date" />

          {/* File upload */}
          <FileUpload label="File upload" file={file} multiple id={"file"} onFileChange={setFile} />

          <div className="flex gap-2 justify-end max-w-[800px] pt-4">
            <Button onClick={() => reset()} variant={"outline"}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant={"fill"}>
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export { CustomAttributes };
