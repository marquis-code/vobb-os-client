import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button, CustomInput, CustomPhoneInput, SettingsPageTitle } from "components";
import { CheckCircledIcon, QuestionMarkCircledIcon, UploadIcon } from "@radix-ui/react-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { cn, isEmptyObj, isFile } from "lib";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import React, { useEffect, useState } from "react";
import { useModalContext, useUserContext } from "context";

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  jobTitle: string;
  email: string;
  avatarFile: any | File | null;
}

const initData: ProfileFormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  jobTitle: "",
  email: "",
  avatarFile: null
};

interface AccountProfileProps {
  submit: (formData: FormData) => void;
  loading: boolean;
  handleChangeEmail: () => void;
  handleResendEmail: () => void;
}
const AccountProfileUI: React.FC<AccountProfileProps> = ({
  handleChangeEmail,
  handleResendEmail,
  submit,
  loading
}) => {
  const { userDetails: profile } = useUserContext();
  const { setUpdateJobTitle } = useModalContext();
  const [validateAvatar, setValidateAvatar] = useState(false);
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("avatarFile", e.target.files[0]);
      setValidateAvatar(true);
    }
  };

  const baseSchema = yup.object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    phoneNumber: yup
      .string()
      .required("Required")
      .min(10, "Phone number must be at least 10 characters long"),
    jobTitle: yup.string().required("Required"),
    email: yup.string().required("Required")
  });

  const avatarSchema = yup
    .mixed()
    .test(
      "fileSize",
      "Image is too large",
      (value) => !value || (isFile(value) && value.size <= 1048576 * 10)
    );

  const validationSchema = baseSchema.shape({
    avatarFile: validateAvatar ? avatarSchema.required("Profile picture is required") : yup.mixed()
  });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    setValue,
    getValues,
    reset
  } = useForm<ProfileFormData>({
    resolver: yupResolver<any>(validationSchema),
    defaultValues: initData
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        jobTitle: profile.jobTitle,
        email: profile.pendingEmail ?? profile.email,
        avatarFile: profile.avatar
      });
    }
  }, [profile, reset]);

  const { phoneNumber, avatarFile } = getValues();
  const avatarChanged = avatarFile !== profile?.avatar;
  const numberChanged = phoneNumber.replace(/\D/g, "") !== profile?.phoneNumber;

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    const formData = new FormData();
    if (dirtyFields.firstName) {
      formData.append("first_name", data.firstName);
    }
    if (dirtyFields.lastName) {
      formData.append("last_name", data.lastName);
    }
    if (numberChanged && phoneNumber.trim()) {
      formData.append("phone_number", data.phoneNumber.replace(/\D/g, ""));
    }
    if (avatarChanged) {
      formData.append("avatar", data.avatarFile);
    }
    submit(formData);
  };

  const isDirty = !isEmptyObj(dirtyFields) || avatarChanged || numberChanged;
  const handleUpdateJobTitle = () => {
    setUpdateJobTitle(true);
  };

  return (
    <>
      <SettingsPageTitle title="Profile" />
      <section className="border-b border-vobb-neutral-20 py-4 mb-4 max-w-[800px]">
        <div className="flex gap-4 mb-8" data-testid="avatar-section">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={
                watch("avatarFile") instanceof File
                  ? URL.createObjectURL(watch("avatarFile"))
                  : watch("avatarFile") || ""
              }
              alt="profile picture"
            />

            <AvatarFallback>
              {profile?.firstName.charAt(0)}
              {profile?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p
              className={cn(
                "font-semibold mb-2",
                errors.avatarFile?.message ? "text-error-10" : ""
              )}>
              Profile Picture
            </p>
            <label
              className="flex gap-2 justify-center items-center text-sm w-[140px] mb-2 bg-vobb-primary-70 text-white p-2 rounded-md cursor-pointer"
              htmlFor="avatar">
              <UploadIcon /> <span>Upload image</span>
              <input
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar"
                type="file"
                accept=".png, .jpg, .jpeg"
              />
            </label>
            {errors.avatarFile?.message && (
              <small className="block text-xs mt-1 text-error-10">
                {errors.avatarFile?.message.toString()}
              </small>
            )}
            <p className="text-[11px]">We support PNGs and JPEGs under 10MB</p>
          </div>
        </div>
        <form className="grid grid-cols-2 gap-4">
          <CustomInput
            label="First Name"
            type="text"
            name="firstName"
            register={register}
            validatorMessage={errors.firstName?.message}
            parentClassName="mb-2"
            data-testid="firstName"
          />
          <CustomInput
            label="Last Name"
            type="text"
            name="lastName"
            register={register}
            validatorMessage={errors.lastName?.message}
            parentClassName="mb-2"
            data-testid="lastName"
          />
          <CustomPhoneInput
            label="Phone Number"
            name="phoneNumber"
            value={watch("phoneNumber", profile?.phoneNumber)}
            validatorMessage={errors.phoneNumber?.message}
            handleChange={(val) => {
              setValue("phoneNumber", val);
            }}
            parentClassName="mb-2"
          />
          <div className="relative">
            <CustomInput
              label="Job Title"
              type="text"
              name="jobTitle"
              register={register}
              validatorMessage={errors.jobTitle?.message}
              disabled
              parentClassName="mb-0"
            />
            {profile?.role === "Super Admin" && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateJobTitle();
                }}
                className="p-0 underline"
                size={"sm"}
                variant={"link"}>
                Update job title
              </Button>
            )}
          </div>
          <div className="mb-2">
            <div className="relative">
              <CustomInput
                label="Primary Email Address"
                type="email"
                name="email"
                register={register}
                validatorMessage={errors.email?.message}
                disabled
                parentClassName="mb-0"
              />

              <div className="absolute -right-8 top-7" data-testid="email-tooltip">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      onClick={(e) => e.preventDefault()}
                      data-testid="tooltip-trigger">
                      {profile?.pendingEmail ? (
                        <QuestionMarkCircledIcon width={20} height={20} color="var(--warning-50)" />
                      ) : (
                        <CheckCircledIcon width={20} height={20} color="var(--success-50)" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p data-testid="tooltip-content">
                        {profile?.pendingEmail
                          ? "Email is unverified, please request a new verification email"
                          : "Email is verified!"}
                      </p>{" "}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="flex justify-between">
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
              {profile?.pendingEmail && (
                <Button
                  className="p-0 underline text-vobb-primary-50"
                  size={"sm"}
                  variant={"link"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleResendEmail();
                  }}>
                  Resend verification mail
                </Button>
              )}
            </div>
          </div>
        </form>
      </section>
      <div className="flex gap-2 justify-end max-w-[800px] mb-8 pt-2">
        <Button disabled={!isDirty || loading} onClick={() => reset()} variant={"outline"}>
          Cancel
        </Button>
        <Button
          disabled={!isDirty || loading}
          onClick={handleSubmit(onSubmit)}
          variant={"fill"}
          loading={loading}
          data-testid="save-btn">
          Save
        </Button>
      </div>
    </>
  );
};

export { AccountProfileUI };
