import { ModalProps, optionType } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { CustomInput, CustomPhoneInput, SelectInput } from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Row } from "layout";
import { useApiRequest, useFetchUserBranches } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { useCountriesContext, useModalContext } from "context";
import { languages } from "lib/languages";
import { fetchPipelinesService } from "api";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { isFile } from "lib";
import { IconPencil } from "@tabler/icons-react";

export interface AddPipelineClientData {
  branch: optionType;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar?: any;
  nationality: optionType;
  country: optionType;
  province: string;
  street: string;
  primary_language: optionType;
  gender: optionType;
}
const initData = {
  avatar: undefined,
  branch: undefined,
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  nationality: undefined,
  country: undefined,
  province: "",
  street: "",
  primary_language: undefined,
  gender: undefined
};

const optionTypeSchema = yup
  .object({
    label: yup.string().required("Required"),
    value: yup.string().required("Required")
  })
  .required("Required");

const avatarSchema = yup
  .mixed()
  .test(
    "fileSize",
    "Image is too large",
    (value) => !value || (isFile(value) && value.size <= 1048576 * 10)
  );

const schema = yup.object({
  branch: optionTypeSchema,
  email: yup.string().email().required("Required"),
  first_name: yup.string().required("Required"),
  last_name: yup.string().required("Required"),
  phone_number: yup.string().required("Required"),
  avatar: avatarSchema,
  nationality: optionTypeSchema,
  country: optionTypeSchema,
  province: yup.string().required("Required"),
  street: yup.string().required("Required"),
  primary_language: optionTypeSchema,
  gender: optionTypeSchema
});

interface CreateClientModalProps extends ModalProps {
  submit: (data: AddPipelineClientData, id?: string) => void;
  loading: boolean;
  isSuccess: boolean;
}

const CreateClientModal: React.FC<CreateClientModalProps> = ({
  show,
  close,
  submit,
  loading,
  isSuccess
}) => {
  const { addClient } = useModalContext();
  const { countries } = useCountriesContext();
  const { run, data } = useApiRequest({});

  const [pipelinesQueryParams] = useState({
    page: 1,
    limit: 20,
    search: "",
    sector: "",
    sortOrder: "",
    sortProperty: ""
  });

  const {
    fetchUserBranches,
    userBranches,
    loading: loadingUserBranches
  } = useFetchUserBranches({});
  const { page, limit, search, sector, sortOrder, sortProperty } = pipelinesQueryParams;
  const [selectedPipeline, setSelectedPipeline] = useState<optionType | null>(null);

  const handleFetchPipelines = useCallback(() => {
    run(
      fetchPipelinesService({
        page,
        limit,
        search,
        sector,
        sort_order: sortOrder,
        sort_property: sortProperty
      })
    );
  }, [limit, page, run, search, sector, sortOrder, sortProperty]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<AddPipelineClientData>({
    resolver: yupResolver(schema),
    defaultValues: initData
  });

  useEffect(() => {
    if (isSuccess) {
      reset(initData);
      close();
    }
  }, [isSuccess, close, reset]);

  useEffect(() => {
    fetchUserBranches({});
    if (!addClient.pipeline) {
      handleFetchPipelines();
    }
  }, [addClient.pipeline]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("avatar", e.target.files[0]);
    }
  };

  const getFullName = (watch: any): string => {
    const firstName = watch("first_name");
    const lastName = watch("last_name");
    return firstName && lastName ? `${firstName} ${lastName}` : "Client Name";
  };

  const getInitials = (): string => {
    const fullName = getFullName(watch);
    const initials = fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase();

    return initials || "CN";
  };

  const onSubmit: SubmitHandler<AddPipelineClientData> = (data) => {
    const payload: AddPipelineClientData = {
      ...data,
      phone_number: data.phone_number.replace(/\D/g, "")
    };
    submit(payload, selectedPipeline?.value);
  };

  return (
    <>
      <Modal contentClassName="max-w-[944px] p-0" show={show} close={close} testId="add-client-modal">
        <>
          <Row className="items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
            <h2 className="text-xs font-inter font-medium text-vobb-neutral-95">Create a Client</h2>
            <Button
              onClick={close}
              variant={"ghost"}
              size={"icon"}
              data-testid="close-btn"
              className="border border-[#DDDFE5] max-w-[26px] max-h-[26px]">
              <Cross1Icon stroke="#000000" strokeWidth={0.5} className="rounded-[4px]" width={12} />
            </Button>
          </Row>

          <div className="px-4 py-2 border-b">
            <Row className="items-center gap-2">
              <div className="relative">
                <label htmlFor="avatar-upload" className="cursor-pointer group">
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage
                      src={
                        watch("avatar") instanceof File
                          ? URL.createObjectURL(watch("avatar"))
                          : watch("avatar") || ""
                      }
                      alt="avatar"
                      className="object-cover object-center"
                    />
                    <AvatarFallback className="bg-[#F5F5F5]">
                      <p className="text-sm font-bold text-black">{getInitials()}</p>
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden group-hover:flex absolute bottom-0 -right-1 gap-2 items-center text-sm text-white">
                    <IconPencil size={16} className="text-vobb-neutral-80" />
                    <input
                      onChange={handleAvatarChange}
                      className="hidden"
                      id="avatar-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                    />
                  </div>
                </label>
              </div>
              <p className="text-[20px] font-semibold">{getFullName(watch)}</p>
            </Row>
            {errors.avatar?.message && (
              <small className="block text-[11px] mt-1 text-error-10">
                {errors.avatar?.message.toString()}
              </small>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4 border-b border-vobb-neutral-20 max-h-[500px] overflow-y-auto">
              <CustomInput
                label="First Name"
                type="text"
                name="first_name"
                register={register}
                placeholder="Enter first name"
                validatorMessage={errors.first_name?.message}
                labelClassName="font-medium text-vobb-neutral-80"
              />
              <CustomInput
                label="Last Name"
                type="text"
                name="last_name"
                register={register}
                placeholder="Enter last name"
                validatorMessage={errors.last_name?.message}
                labelClassName="font-medium text-vobb-neutral-80"
              />
              <CustomInput
                label="Email"
                name="email"
                placeholder="Enter email address"
                register={register}
                validatorMessage={errors.email?.message}
                data-testid="email"
                labelClassName="font-medium text-vobb-neutral-80"
              />
              <CustomPhoneInput
                label="Phone Number"
                name="phone_number"
                validatorMessage={errors.phone_number?.message}
                value={watch("phone_number") === "" ? null : watch("phone_number")}
                handleChange={(val) => {
                  setValue("phone_number", val);
                }}
                parentClassName="mb-2"
                placeholder="Enter phone number"
                labelClassName="font-medium text-vobb-neutral-80"
              />
              <SelectInput
                label="Branch"
                placeholder="Select branch"
                options={userBranches.branchesArray.map((item) => ({
                  label: item.branch,
                  value: item.id
                }))}
                value={watch("branch")?.value === "" ? null : watch("branch")}
                onChange={(val) => val && setValue("branch", val)}
                validatorMessage={errors.branch?.message}
                loading={loadingUserBranches}
              />
              <SelectInput
                label="Nationality"
                placeholder="Select nationality"
                options={countries.map((item) => ({
                  label: item.nationality,
                  value: item.value
                }))}
                value={watch("nationality")?.value === "" ? null : watch("nationality")}
                onChange={(val) => val && setValue("nationality", val)}
                validatorMessage={errors.nationality?.message}
              />
               <SelectInput
                label="Country of residence"
                placeholder="Select country"
                options={countries}
                value={watch("country")?.value === "" ? null : watch("country")}
                onChange={(val) => val && setValue("country", val)}
                validatorMessage={errors.country?.message}
              />
              <CustomInput
                label="Province/State"
                type="text"
                placeholder={"Province/State"}
                name="province"
                register={register}
                validatorMessage={errors.province?.message}
                data-testid="province-input"
                labelClassName="font-medium text-vobb-neutral-80"
              />
              <CustomInput
                label="Street"
                type="text"
                placeholder={"Street"}
                name="street"
                register={register}
                validatorMessage={errors.street?.message}
                data-testid="province-input"
                labelClassName="font-medium text-vobb-neutral-80"
              />
             
              {!addClient.pipeline ? (
                <SelectInput
                  label="Pipeline"
                  placeholder="Select pipeline"
                  options={
                    data?.data?.data?.pipelines?.map((item) => {
                      return {
                        label: item.name,
                        value: item._id
                      };
                    }) || []
                  }
                  value={selectedPipeline}
                  onChange={(val) => setSelectedPipeline(val)}
                  validatorMessage={""}
                  loading={false}
                />
              ) : null}
              <SelectInput
                label="Primary language"
                placeholder="Select language"
                options={languages.map((item) => ({
                  label: item.name,
                  value: item.name
                }))}
                value={watch("primary_language")?.value === "" ? null : watch("primary_language")}
                onChange={(val) => val && setValue("primary_language", val)}
                validatorMessage={""}
                loading={false}
              />
              <SelectInput
                label="Gender"
                placeholder="Select gender"
                options={[
                  {
                    label: "Male",
                    value: "male"
                  },
                  {
                    label: "Female",
                    value: "female"
                  },
                  {
                    label: "Other",
                    value: "other"
                  }
                ]}
                value={watch("gender")?.value === "" ? null : watch("gender")}
                onChange={(val) => val && setValue("gender", val)}
                validatorMessage={""}
                loading={false}
              />
            </div>
            <Row className="justify-between items-center p-4 bg-vobb-neutral-10">
              <Button
                onClick={() => close()}
                type="button"
                size={"sm"}
                variant={"outline"}
                disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" size={"sm"} variant={"fill"} loading={loading}>
                Create
              </Button>
            </Row>
          </form>
        </>
      </Modal>
    </>
  );
};

export { CreateClientModal };
