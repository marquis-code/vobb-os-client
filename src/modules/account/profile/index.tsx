import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button, CustomInput, CustomPhoneInput } from "components";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  UploadIcon
} from "@radix-ui/react-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "lib";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { useState } from "react";

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  jobTitle: string;
  email: string;
  avatarFile?: any | File | null;
}

const isFile = (value: any): value is File => value instanceof File;
const baseSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  phoneNumber: yup.string().required("Required"),
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

interface AccountProfileProps {
  profile: any;
  updateProfile: (data: ProfileFormData) => void;
  loadingUpdate: Boolean;
  handleChangeEmail: () => void;
}

const AccountProfileUI = ({ handleChangeEmail, profile, updateProfile, loadingUpdate }) => {
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [numberChanged, setNumberChanged] = useState(false);
  const initData: ProfileFormData = {
    firstName: profile?.first_name ?? "",
    lastName: profile?.last_name ?? "",
    phoneNumber: profile?.phone_number ?? "",
    jobTitle: profile?.role ?? "",
    email: profile?.email ?? "",
    avatarFile: profile?.avatar ?? null
  };

  //THis is because avatar validation throws error when other values are being updated without it.
  const validationSchema = baseSchema.shape({
    avatarFile: avatarChanged ? avatarSchema.required("Profile picture is required") : yup.mixed()
  });
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    setValue,
    reset
  } = useForm<ProfileFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: initData
  });

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setValue("avatarFile", e.target.files[0]);
      setAvatarChanged(true);
    }
  };
  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    const formData = new FormData();
    if (dirtyFields.firstName && data.firstName.trim() !== "") {
      formData.append("first_name", data.firstName);
    }
    if (dirtyFields.lastName && data.lastName.trim() !== "") {
      formData.append("last_name", data.lastName);
    }
    if (numberChanged && data.phoneNumber.trim() !== "") {
      formData.append("phone_number", data.phoneNumber.replace(/\D/g, ""));
    }
    if (avatarChanged) {
      formData.append("avatar", data.avatarFile);
    }
    updateProfile(formData);
  };
  const isEmptyObj = (obj: {}) => Object.keys(obj).length === 0;
  const isDirty = !isEmptyObj(dirtyFields) || avatarChanged || numberChanged;
  return (
    <>
      <section className="border-b border-vobb-neutral-20 mb-4 max-w-[800px]">
        <h1 className="text-lg font-bold mb-4">Profile</h1>
      </section>
      <section className="border-b border-vobb-neutral-20 py-4 mb-4 max-w-[800px]">
        <div className="flex gap-4 mb-8">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={
                watch("avatarFile") instanceof File
                  ? URL.createObjectURL(watch("avatarFile"))
                  : watch("avatarFile") || ""
              }
              alt="@shadcn"
            />

            <AvatarFallback>CN</AvatarFallback>
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
                {...register("avatarFile")}
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
          />
          <CustomInput
            label="Last Name"
            type="text"
            name="lastName"
            register={register}
            validatorMessage={errors.lastName?.message}
            parentClassName="mb-2"
          />
          <CustomPhoneInput
            label="Phone Number"
            name="phoneNumber"
            defaultValue={profile?.phone_number}
            validatorMessage={errors.phoneNumber?.message}
            handleChange={(val) => {
              setValue("phoneNumber", val);
              setNumberChanged(true);
            }}
            parentClassName="mb-2"
          />
          <CustomInput
            label="Job Title"
            type="text"
            name="jobTitle"
            register={register}
            validatorMessage={errors.jobTitle?.message}
            disabled
            parentClassName="mb-2"
          />
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
              <div className="absolute -right-8 top-7">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
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
        <Button
          disabled={!isDirty || loadingUpdate}
          onClick={handleSubmit(onSubmit)}
          variant={"fill"}>
          Save
        </Button>
      </div>
    </>
  );
};

export { AccountProfileUI };
