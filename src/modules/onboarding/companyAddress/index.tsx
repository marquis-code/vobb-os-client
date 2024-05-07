import { LocationIcon } from "assets";
import { useOnboardingContext } from "context";
import { CompanyAddressFormData, CompanyAddressProps } from "types/onboarding";
import React, { useState } from "react";
import { CityAddress } from "./address";
import { CountrySelect } from "./country";
import { Province } from "./province";
import { Zipcode } from "./zipcode";
import { optionType } from "types";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const CompanyAddressUI: React.FC<CompanyAddressProps> = ({
  initCountry,
  initZipcode,
  initState,
  initCityAddresses,
  activeCompanyAddress,
  handleCompanyChange,
  submit,
  countries,
  loading
}) => {
  const { handleFormChange } = useOnboardingContext();
  const [selectedCountry, setSelectedCountry] = useState<optionType>();

  const handleFormSubmit = (data: CompanyAddressFormData) => {
    activeCompanyAddress === "country" && setSelectedCountry(data.country ?? undefined);
    submit(data);
  };

  const progressBtns = ["country", "zipcode", "province", "city"];

  return (
    <div className="relative max-w-[400px] m-auto ">
      <ArrowLeftIcon
        stroke="#344054"
        color="#344054"
        role="button"
        className="hidden absolute top-4 left-[0] lg:block w-6 h-6 rounded-full fill-vobb-neutral-60"
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
      {activeCompanyAddress === "country" ? (
        <CountrySelect
          submit={handleFormSubmit}
          initCountry={initCountry}
          countries={countries}
          loading={loading}
        />
      ) : activeCompanyAddress === "zipcode" ? (
        <Zipcode
          submit={handleFormSubmit}
          initZipcode={initZipcode}
          postalCode={
            countries?.find((item) => item.value === selectedCountry?.value)?.postalCode ??
            undefined
          }
          loading={loading}
        />
      ) : activeCompanyAddress === "province" ? (
        <Province
          submit={handleFormSubmit}
          initState={initState}
          loading={loading}
          countries={countries}
        />
      ) : activeCompanyAddress === "cityAddress" ? (
        <CityAddress
          submit={handleFormSubmit}
          initCityAddresses={initCityAddresses}
          loading={loading}
        />
      ) : (
        ""
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        {progressBtns.map((btn) => (
          <div
            key={btn}
            className={`w-3 h-3 rounded-full bg-vobb-neutral-10 cursor-pointer ${
              btn === activeCompanyAddress ? "bg-vobb-primary-70" : ""
            }`}
            onClick={() => handleCompanyChange?.(btn)}></div>
        ))}
      </div>
    </div>
  );
};

export { CompanyAddressUI };
