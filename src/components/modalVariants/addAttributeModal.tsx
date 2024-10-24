import { ModalProps, OrganisationAttributesData, optionType } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { CheckboxWithText, CreateOptions, CustomInput, CustomTextarea, SelectInput } from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";
import { attributeTypeIcons, attributeTypeOptions, fileTypeOptions } from "lib/constants";
import { Switch } from "components/ui/switch";
import { getOptionTypeValidationMsg } from "lib";
import { useEffect } from "react";

export interface AddAttributesData {
  title: string;
  type: optionType;
  description?: string;
  required?: boolean;
  options?: string[];
  fileType?: any | optionType | null;
  wordLimit?: string;
  createNew: boolean;
}

const optionTypeSchema = yup.object({
  label: yup.string().required("Required"),
  value: yup.string().required("Required")
});

const schema = yup.object({
  title: yup.string().required("Required"),
  description: yup.string(),
  required: yup.boolean(),
  type: optionTypeSchema,
  fileType: yup
    .mixed()
    .nullable()
    .test("is-valid-fileType", "Invalid file type", function (value) {
      if (value === null) return true;
      if (typeof value === "object" && value !== null && "label" in value && "string" in value) {
        return yup
          .object()
          .shape({
            label: yup.mixed().required(),
            string: yup.mixed().required()
          })
          .isValidSync(value);
      }
      return true;
    })
    .when("type", {
      is: (val) => val.value === "file",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.notRequired()
    }),
  wordLimit: yup.string().when("type", {
    is: (val) => val.value === "long-text",
    then: (schema) => schema.required("Required").matches(/[0-9]/, "Enter a valid number"),
    otherwise: (schema) => schema.notRequired()
  }),
  options: yup
    .array()
    .of(yup.string().required("Required"))
    .when("type", {
      is: (val) =>
        val.value === "multiple-choice" || val.value === "checkbox" || val.value === "dropdown",
      then: (schema) =>
        schema
          .required("Required")
          .min(1, "Add at least one option")
          .test("unique", "Only unique values allowed.", (value) =>
            value ? value.length === new Set(value)?.size : true
          ),
      otherwise: (schema) => schema.notRequired()
    }),
  createNew: yup.boolean().required("Required")
});

interface AddAttributeModalProps extends ModalProps {
  submit: (data) => void;
  loading: boolean;
  initData?: OrganisationAttributesData;
}

const AddAttributeModal: React.FC<AddAttributeModalProps> = ({
  show,
  close,
  submit,
  loading,
  initData
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<AddAttributesData>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<AddAttributesData> = (data) => {
    submit(data);
  };

  const attrType = watch("type");
  const hasOptions =
    attrType?.value === "multiple-choice" ||
    attrType?.value === "checkbox" ||
    attrType?.value === "dropdown";

  useEffect(() => {
    if (initData) {
      reset({
        type: attributeTypeOptions.find((item) => item.value === initData?.type) ?? undefined,
        description: initData?.description ?? "",
        wordLimit: Array.isArray(initData?.metaData) ? "" : initData?.metaData,
        required: initData?.required,
        options: Array.isArray(initData?.metaData) ? initData?.metaData : [],
        createNew: false
      });
    }
  }, [initData, reset]);

  const createNew = watch("createNew");
  return (
    <>
      <Modal contentClassName="max-w-[944px] p-0" show={show} close={close} testId="addAttr-modal">
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Create Attribute</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <form className="p-4 border-b border-vobb-neutral-20 grid gap-x-4">
          <CustomInput
            label="Title"
            type="text"
            name="title"
            register={register}
            validatorMessage={errors.title?.message}
          />
          <SelectInput
            label="Attribute Type"
            options={attributeTypeOptions}
            value={watch("type")?.value === "" ? null : watch("type")}
            onChange={(val) => val && setValue("type", val)}
            validatorMessage={getOptionTypeValidationMsg(errors.type)}
            icon={attrType ? attributeTypeIcons[attrType.value].icon : undefined}
          />
          {attrType?.value === "long-text" ? (
            <CustomInput
              label="Word limit"
              type="number"
              name="wordLimit"
              register={register}
              validatorMessage={errors.wordLimit?.message}
            />
          ) : (
            ""
          )}
          {attrType?.value === "file" ? (
            <SelectInput
              label="File Type"
              options={fileTypeOptions}
              value={watch("fileType")?.value === "" ? null : watch("fileType")}
              onChange={(val) => val && setValue("fileType", val)}
              validatorMessage={getOptionTypeValidationMsg(errors.fileType)}
              hint="Maximum file size allowed is 5MB"
            />
          ) : (
            ""
          )}
          <CustomTextarea
            label="Description (optional)"
            name="description"
            register={register}
            validatorMessage={errors.description?.message}
            placeholder="Describe your attribute, use case, ..."
          />
          {hasOptions ? (
            <CreateOptions
              label="Options"
              validatorMessage={errors.options?.message}
              value={watch("options") ?? []}
              onChange={(val) => setValue("options", val)}
            />
          ) : (
            ""
          )}

          <div className="flex items-center gap-2 mb-4">
            <Switch
              checked={watch("required")}
              onCheckedChange={() => setValue("required", !watch("required"))}
            />
            <span>Required</span>
          </div>
        </form>
        <div className="flex justify-end gap-2 items-center p-4 bg-vobb-neutral-10">
          <CheckboxWithText
            label={"Create another attribute"}
            handleChecked={() => {
              setValue("createNew", !createNew);
            }}
            checked={createNew}
            className="mr-auto"
          />

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
            size={"default"}
            variant={"fill"}
            loading={loading}>
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { AddAttributeModal };
