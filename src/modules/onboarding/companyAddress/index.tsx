import { Arrow, LocationIcon } from "assets";
import { useOnboardingContext } from "context";
import { CompanyAddressFormData, CompanyAddressProps } from "types/onboarding";
import { Button, CustomInput, SelectInput } from "components";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";

const CompanyAddress: React.FC<CompanyAddressProps> = ({ initData, submit, countries }) => {
  const { handleFormChange } = useOnboardingContext();
  const [activeCompanyAddress, setActiveCompanyAddress] = useState<string>("country");
  const handleFormDisplay = (newActiveCompanyAddress: string) => {
    setActiveCompanyAddress(newActiveCompanyAddress);
  };

  const handleFormSubmit = (data: CompanyAddressFormData) => {
    if (activeCompanyAddress === "city") {
      submit?.(data);
    }
  };
  const progressBtns = ["country", "zipcode", "province", "city"];

  return (
    <div className="max-w-[400px] h-[100dvh] m-auto ">
      <Arrow
        role="button"
        className="hidden absolute top-20 left-[40%] lg:block w-8 h-8 rotate-180 border border-neutral-400 rounded-full p-1 fill-neutral-400"
        onClick={() => handleFormChange("companyWeb", ["fullname", "companyInfo", "companyWeb"])}
      />
      <div className="hidden lg:grid">
        <LocationIcon className="mb-6 m-auto" />
        <div className="mb-8 text-center mx-auto">
          <h1 className="text-xl sm:text-3xl font-bold mb-4 text-vobb-neutral-100 text-center">
            Company Address
          </h1>
          <p>Neque porro quisquam est, qui dolorem ipsu.</p>
        </div>
      </div>
      {activeCompanyAddress === "country" && (
        <CountrySelect
          changeActiveState={handleFormDisplay}
          submit={handleFormSubmit}
          initData={initData}
          countries={countries}
        />
      )}
      {activeCompanyAddress === "zipcode" && (
        <Zipcode
          changeActiveState={handleFormDisplay}
          submit={handleFormSubmit}
          initData={initData}
          countries={countries}
        />
      )}

      {activeCompanyAddress === "province" && (
        <Province
          changeActiveState={handleFormDisplay}
          submit={handleFormSubmit}
          initData={initData}
          countries={countries}
        />
      )}
      {activeCompanyAddress === "city" && (
        <CityAddress
          submit={handleFormSubmit}
          changeActiveState={handleFormDisplay}
          initData={initData}
        />
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        {progressBtns.map((btn) => (
          <div
            key={btn}
            className={`w-3 h-3 rounded-full bg-vobb-neutral-10 cursor-pointer ${
              btn === activeCompanyAddress ? "bg-vobb-primary-70" : ""
            }`}
            onClick={() => setActiveCompanyAddress(btn)}></div>
        ))}
      </div>
    </div>
  );
};

export { CompanyAddress };

//CountrySelect.tsx
const CountrySelect: React.FC<CompanyAddressProps> = ({
  initData,
  submit,
  countries,
  changeActiveState
}) => {
  const schema = yup.object().shape({
    country: yup
      .object()
      .shape({
        label: yup.string().required("Required"),
        value: yup.string().required("Required")
      })
      .required("Required")
  });
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CompanyAddressFormData>({
    resolver: yupResolver<any>(schema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyAddressFormData) => {
    submit?.(data);
    changeActiveState?.("zipcode");
  };

  const newCountryArray = countries?.map((country) => ({
    label: country.name.common,
    value: country.name.common
  }));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectInput
        name="country"
        placeholder="Select Country"
        options={newCountryArray}
        onChange={(value) => setValue("country", value)}
        value={watch("country")}
        validatorMessage={
          errors.country?.message ??
          errors.country?.value?.message ??
          errors.country?.label?.message
        }
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};

//zipcode.tsx
const Zipcode: React.FC<CompanyAddressProps> = ({
  initData,
  submit,
  changeActiveState,
  countries
}) => {
  const validCode = countries
    ?.filter((country) => country.name.common === "Nigeria")
    ?.map((selected) => ({
      format: selected.postalCode.format,
      regex: selected.postalCode.regex
    }));
  const { format, regex } = validCode?.[0] ?? { format: "", regex: "" };

  const schema = yup.object().shape({
    zipcode: yup
      .string()
      .required("Required")
      .matches(new RegExp(regex), "Invalid ZIP code format. Required format is in placeholder.")
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyAddressFormData>({
    resolver: yupResolver<any>(schema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyAddressFormData) => {
    submit?.(data);
    changeActiveState?.("province");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        type="text"
        placeholder={format}
        name="zipcode"
        register={register}
        validatorMessage={errors.zipcode?.message}
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};
//province.tsx
const Province: React.FC<CompanyAddressProps> = ({ initData, submit, changeActiveState }) => {
  const schema = yup.object().shape({
    province: yup.string().required("Required")
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyAddressFormData>({
    resolver: yupResolver<any>(schema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyAddressFormData) => {
    submit?.(data);
    changeActiveState?.("city");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        type="text"
        placeholder={"State/Province"}
        name="province"
        register={register}
        validatorMessage={errors.province?.message}
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};
//CityAddress.tsx
const CityAddress: React.FC<CompanyAddressProps> = ({ initData, submit }) => {
  const schema = yup.object({
    address1: yup.string().required("Required"),
    address2: yup.string(),
    city: yup.string().required("Required")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyAddressFormData>({
    resolver: yupResolver<any>(schema),
    defaultValues: initData
  });

  const onSubmit: SubmitHandler<CompanyAddressFormData> = (data) => {
    submit?.(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        type="text"
        placeholder="Address line 1"
        name="address1"
        register={register}
        validatorMessage={errors.address1?.message}
      />
      <CustomInput
        type="text"
        placeholder="Address line 2"
        name="address2"
        register={register}
        validatorMessage={errors.address2?.message}
      />
      <CustomInput
        type="text"
        placeholder="City"
        name="city"
        register={register}
        validatorMessage={errors.city?.message}
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};
