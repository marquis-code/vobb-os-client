import { optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { arraysHaveSameElements, cn, isEmptyObj, isFile } from "lib";
import { CheckCircledIcon, UploadIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  CustomInput,
  CustomPhoneInput,
  MultiSelectInput,
  SettingsPageTitle
} from "components";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { initOptionType, sectorOptions } from "lib/constants";
import { useUserContext } from "context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrgProfileFormData {
  name: string;
  sector: optionType[];
  website: string;
  primaryEmail: string;
  secondaryEmail: string;
  primaryNumber: string;
  secondaryNumber: string;
  logo: any;
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

interface OrgProfileProps {
  handleChangeEmail: () => void;
  updateProfile: { submit: (formData: FormData) => void; loading: boolean };
  updateNumbers: {
    submit: (data: { number: string; action: "primary" | "support" }) => void;
    loading: boolean;
  };
  updateEmails: { submit: (data: { action: "primary" | "support" }) => void; loading: boolean };
}

const OrgProfileUI: React.FC<OrgProfileProps> = ({
  handleChangeEmail,
  updateProfile,
  updateEmails,
  updateNumbers
}) => {
  const { submit: submitUpdate, loading: submitLoading } = updateProfile;
  const { submit: submitResendEmails } = updateEmails;
  const { submit: submitUpdateNumbers, loading: numbersLoading } = updateNumbers;
  const [validateLogo, setValidateLogo] = useState(false);

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);

  const handleSetParams = (action: "primary" | "support") => {
    searchParams.set("action", action);
    navigate(`${window.location.pathname}?${searchParams.toString()}`);
  };

  const { orgDetails: profile } = useUserContext();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("logo", e.target.files[0]);
      setValidateLogo(true);
    }
  };

  const baseSchema = yup.object({
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
    secondaryNumber: yup.string().required("Required")
  });

  const logoSchema = yup
    .mixed()
    .required("Logo is required")
    .test(
      "fileSize",
      "Image is too large",
      (value) => !value || (isFile(value) && value.size <= 1048576 * 10)
    );

  const validationSchema = baseSchema.shape({
    logo: validateLogo ? logoSchema.required("Logo is required") : yup.mixed()
  });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    setValue,
    getValues,
    reset
  } = useForm<OrgProfileFormData>({
    resolver: yupResolver<any>(validationSchema),
    defaultValues: initData
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.organisation,
        logo: profile.logo,
        website: profile.website,
        primaryEmail: profile.pendingPrimaryEmail ?? profile.primaryEmail,
        secondaryEmail: profile.pendingSecondaryEmail ?? profile.secondaryEmail,
        primaryNumber: profile.primaryPhoneNumber,
        secondaryNumber: profile.secondaryPhoneNumber,
        sector: profile.sector
          ? profile.sector.map(
              (sector) => sectorOptions.find((option) => option.value === sector) || initOptionType
            )
          : []
      });
    }
  }, [profile, reset]);

  const { logo, primaryNumber, secondaryNumber, sector } = getValues();

  //Tracking changes not caught by dirtyFields.
  const logoChanged = logo !== profile?.logo;
  const sectorChanged =
    profile &&
    !arraysHaveSameElements(
      sector.map((item) => item.value),
      profile.sector.map((item) => item)
    ) &&
    sector.length;
  const primaryNumChanged = primaryNumber?.replace(/\D/g, "") !== profile?.primaryPhoneNumber;
  const secondaryNumChanged = secondaryNumber?.replace(/\D/g, "") !== profile?.secondaryPhoneNumber;

  const onSubmit: SubmitHandler<OrgProfileFormData> = (data) => {
    const handleProfileUpdate = () => {
      const formData = new FormData();
      if (dirtyFields.name) {
        formData.append("name", data.name);
      }
      if (dirtyFields.website) {
        formData.append("website", data.website);
      }

      if (logoChanged) {
        formData.append("logo", data.logo);
      }

      if (data.sector.length && sectorChanged) {
        data.sector.forEach((sector, index) => {
          formData.append(`sector[${index}]`, sector.value);
        });
      }

      submitUpdate(formData);
    };

    const handleNumbersUpdate = () => {
      if (primaryNumChanged) {
        submitUpdateNumbers({ number: data.primaryNumber.replace(/\D/g, ""), action: "primary" });
      }
      if (secondaryNumChanged) {
        submitUpdateNumbers({ number: data.secondaryNumber.replace(/\D/g, ""), action: "support" });
      }
    };

    if (!isEmptyObj(dirtyFields) || logoChanged || sectorChanged) handleProfileUpdate();
    handleNumbersUpdate();
  };

  const isDirty =
    !isEmptyObj(dirtyFields) ||
    primaryNumChanged ||
    secondaryNumChanged ||
    logoChanged ||
    sectorChanged;

  return (
    <>
      <SettingsPageTitle title="Organization Profile" />
      <section className="border-b border-vobb-neutral-20 py-4 mb-4 max-w-[800px]">
        <div className="flex gap-4 mb-8">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={
                watch("logo") instanceof File
                  ? URL.createObjectURL(watch("logo"))
                  : watch("logo") || ""
              }
              alt="logo"
            />{" "}
            <AvatarFallback>
              {profile?.organisation.charAt(0)}
              {profile?.organisation.charAt(1)}
            </AvatarFallback>
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
                onChange={handleLogoChange}
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
            value={watch("primaryNumber", profile?.primaryPhoneNumber)}
            validatorMessage={errors.primaryNumber?.message}
            handleChange={(val) => setValue("primaryNumber", val)}
            parentClassName="mb-2"
          />
          <CustomPhoneInput
            label="Secondary Phone Number"
            name="secondaryNumber"
            value={watch("secondaryNumber", profile?.secondaryPhoneNumber)}
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
                      {profile?.pendingPrimaryEmail ? (
                        <QuestionMarkCircledIcon width={20} height={20} color="var(--warning-50)" />
                      ) : profile?.primaryEmail ? (
                        <CheckCircledIcon width={20} height={20} color="var(--success-50)" />
                      ) : (
                        ""
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {profile?.pendingPrimaryEmail
                          ? "Email is unverified, please request a new verification email"
                          : "Email is verified!"}
                      </p>{" "}
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
                  handleSetParams("primary");
                }}
                className="p-0 underline"
                size={"sm"}
                variant={"link"}>
                {profile?.primaryEmail || profile?.pendingPrimaryEmail
                  ? "Change email address"
                  : "Add email address"}
              </Button>
              {profile?.pendingPrimaryEmail && (
                <Button
                  className="p-0 underline text-vobb-primary-50"
                  size={"sm"}
                  variant={"link"}
                  onClick={() => {
                    submitResendEmails({ action: "primary" });
                    handleSetParams("primary");
                  }}>
                  Resend verification mail
                </Button>
              )}
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
                      {profile?.pendingSecondaryEmail ? (
                        <QuestionMarkCircledIcon width={20} height={20} color="var(--warning-50)" />
                      ) : profile?.secondaryEmail ? (
                        <CheckCircledIcon width={20} height={20} color="var(--success-50)" />
                      ) : (
                        ""
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {profile?.pendingSecondaryEmail
                          ? "Email is unverified, please request a new verification email"
                          : "Email is verified!"}
                      </p>{" "}
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
                  handleSetParams("support");
                }}
                className="p-0 underline"
                size={"sm"}
                variant={"link"}>
                {profile?.secondaryEmail || profile?.pendingSecondaryEmail
                  ? "Change email address"
                  : "Add email address"}
              </Button>

              {profile?.pendingSecondaryEmail && (
                <Button
                  className="p-0 underline text-vobb-primary-50"
                  size={"sm"}
                  variant={"link"}
                  onClick={() => {
                    submitResendEmails({ action: "support" });
                    searchParams.set("action", "support");
                    handleSetParams("support");
                  }}>
                  Resend verification mail
                </Button>
              )}
            </div>
          </div>
        </form>
      </section>
      <div className="flex gap-2 justify-end max-w-[800px] mb-8 pt-2">
        <Button disabled={!isDirty} onClick={() => reset()} variant={"outline"}>
          Cancel
        </Button>
        <Button
          disabled={!isDirty}
          loading={submitLoading || numbersLoading}
          onClick={handleSubmit(onSubmit)}
          variant={"fill"}>
          Save
        </Button>
      </div>
    </>
  );
};

export { OrgProfileUI };
