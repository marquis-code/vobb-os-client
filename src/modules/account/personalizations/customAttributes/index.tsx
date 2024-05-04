import { Button, CustomInput, CustomTextarea, PasswordInput, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { optionType } from "types/interfaces";
import { initOptionType, sysLangOptions } from "lib/constants";
import { Textarea } from "components/ui/textarea";

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
          <CustomInput type="text" />

          {/* Long text */}
          <CustomTextarea placeholder="" hint="0/100 words" />

          {/* Short text */}
          <CustomInput type="number" />

          {/* Short text */}
          <CustomInput type="email" />

          {/* Dropdown */}
          <SelectInput options={[]} value={null} onChange={console.log} />

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
