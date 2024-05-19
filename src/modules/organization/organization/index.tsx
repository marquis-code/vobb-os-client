import { optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { cn, isFile } from "lib";
import { CheckCircledIcon, UploadIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Button, CustomInput, CustomPhoneInput, MultiSelectInput, SettingsPageTitle } from "components";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { sectorOptions } from "lib/constants";

interface OrgProfileData {
  name: string;
  sector: optionType[];
  website: string;
  primaryEmail: { value: string; isVerified: boolean };
  secondaryEmail: { value: string; isVerified: boolean };
  primaryNumber: string;
  secondaryNumber: string;
  logo: string | undefined;
}

interface OrgProfileFormData {
  name: string;
  sector: optionType[];
  website: string;
  primaryEmail: string;
  secondaryEmail: string;
  primaryNumber: string;
  secondaryNumber: string;
  logo: any | File | null;
}

const initData: OrgProfileFormData = {
  name: "",
  sector: [],
  website: "",
  primaryEmail: "",
  secondaryEmail: "",
  primaryNumber: "",
  secondaryNumber: "",
  logo: null
};

const schema = yup.object({
  name: yup.string().required("Required"),
  sector: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required("Required"),
        value: yup.string().required("Required")
      })
    )
    .required("Required"),
  website: yup.string().required("Required").url("Enter a valid url"),
  primaryEmail: yup.string().required("Required").email("Enter a valid email"),
  secondaryEmail: yup.string().required("Required").email("Enter a valid email"),
  primaryNumber: yup.string().required("Required"),
  secondaryNumber: yup.string().required("Required"),
  logo: yup
    .mixed()
    .required("Logo is required")
    .test("fileSize", "Image is too large", (value) => isFile(value) && value.size <= 1048576 * 10)
});

interface OrgProfileProps {
  handleChangeEmail: () => void;
  // organization: OrgProfileData;
}

const OrgProfileUI: React.FC<OrgProfileProps> = ({ handleChangeEmail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset
  } = useForm<OrgProfileFormData>({
    resolver: yupResolver(schema),
    defaultValues: initData
  });

  const onSubmit: SubmitHandler<OrgProfileFormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <SettingsPageTitle title="Organization Profile" />
      <section className="border-b border-vobb-neutral-20 py-4 mb-4 max-w-[800px]">
        <div className="flex gap-4 mb-8">
          <Avatar className="w-16 h-16">
            <AvatarImage src={watch("logo") ? URL.createObjectURL(watch("logo")) : ""} alt="logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className={cn("font-semibold mb-2", errors.logo?.message ? "text-error-10" : "")}>
              Logo
            </p>
            <label
              className="flex gap-2 justify-center items-center text-sm w-[140px] mb-2 bg-vobb-primary-70 text-white p-2 rounded-md cursor-pointer"
              htmlFor="avatar">
              <UploadIcon /> <span>Upload image</span>
              <input
                onChange={(e) => e.target.files && setValue("logo", e.target.files[0])}
                className="hidden"
                id="avatar"
                type="file"
                accept=".png, .jpg, .jpeg"
              />
            </label>
            {errors.logo?.message && (
              <small className="block text-xs mt-1 text-error-10">
                {errors.logo?.message.toString()}
              </small>
            )}
            <p className="text-[11px]">We support PNGs and JPEGs under 10MB</p>
          </div>
        </div>
        <form className="grid grid-cols-2 gap-4">
          <CustomInput
            label="Company Name"
            type="text"
            name="name"
            register={register}
            validatorMessage={errors.name?.message}
            parentClassName="mb-2"
          />
          <CustomInput
            label="Company Website"
            type="url"
            name="website"
            register={register}
            validatorMessage={errors.website?.message}
            parentClassName="mb-2"
          />
          <MultiSelectInput
            label="Sectors"
            options={sectorOptions}
            value={watch("sector")}
            onChange={(val) => {
              const value = val as optionType[];
              setValue("sector", value);
            }}
            placeholder="Select sectors"
            parentClassName="col-span-2"
          />
          <CustomPhoneInput
            label="Primary Phone Number"
            name="primaryNumber"
            validatorMessage={errors.primaryNumber?.message}
            handleChange={(val) => setValue("primaryNumber", val)}
            parentClassName="mb-2"
          />
          <CustomPhoneInput
            label="Secondary Phone Number"
            name="secondaryNumber"
            validatorMessage={errors.secondaryNumber?.message}
            handleChange={(val) => setValue("secondaryNumber", val)}
            parentClassName="mb-2"
          />
          <div style={{ maxWidth: "calc(50% - 0.5rem)" }} className="mb-2 col-span-2">
            <div className="relative">
              <CustomInput
                label="Primary Email Address"
                type="email"
                name="primaryEmail"
                register={register}
                validatorMessage={errors.primaryEmail?.message}
                disabled
                parentClassName="mb-0"
              />
              <div className="absolute -right-8 top-7">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger onClick={(e) => e.preventDefault()}>
                      {/* <CheckCircledIcon width={20} height={20} color="var(--success-50)" /> */}{" "}
                      {/* Verified email icon */}
                      <QuestionMarkCircledIcon width={20} height={20} color="var(--warning-50)" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Email is unverified, please request a new verification email</p>{" "}
                      {/* If verified, change text to: Email is verified! */}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleChangeEmail();
                }}
                className="p-0 underline"
                size={"sm"}
                variant={"link"}>
                Change email address
              </Button>
              <Button className="p-0 underline text-vobb-primary-50" size={"sm"} variant={"link"}>
                Resend verification mail
              </Button>{" "}
              {/* Hide this button when email is verified */}
            </div>
          </div>
          <div style={{ maxWidth: "calc(50% - 0.5rem)" }} className="mb-2 col-span-2">
            <div className="relative">
              <CustomInput
                label="Secondary Email Address"
                type="email"
                name="secondaryEmail"
                register={register}
                validatorMessage={errors.secondaryEmail?.message}
                disabled
                parentClassName="mb-0"
              />
              <div className="absolute -right-8 top-7">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger onClick={(e) => e.preventDefault()}>
                      {/* <CheckCircledIcon width={20} height={20} color="var(--success-50)" /> */}{" "}
                      {/* Verified email icon */}
                      <QuestionMarkCircledIcon width={20} height={20} color="var(--warning-50)" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Email is unverified, please request a new verification email</p>{" "}
                      {/* If verified, change text to: Email is verified! */}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleChangeEmail();
                }}
                className="p-0 underline"
                size={"sm"}
                variant={"link"}>
                Change email address
              </Button>
              <Button className="p-0 underline text-vobb-primary-50" size={"sm"} variant={"link"}>
                Resend verification mail
              </Button>{" "}
              {/* Hide this button when email is verified */}
            </div>
          </div>
        </form>
      </section>
      <div className="flex gap-2 justify-end max-w-[800px] mb-8 pt-2">
        <Button disabled={!isDirty} onClick={() => reset()} variant={"outline"}>
          Cancel
        </Button>
        <Button disabled={!isDirty} onClick={handleSubmit(onSubmit)} variant={"fill"}>
          Save
        </Button>
      </div>
    </>
  );
};

export { OrgProfileUI };
