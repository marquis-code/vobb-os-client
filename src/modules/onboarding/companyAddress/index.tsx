import { LocationIcon } from "assets";
import { useOnboardingContext } from "context";
import { CompanyAddressProps } from "types/onboarding";
import { CityAddress } from "./address";
import { CountrySelect } from "./country";
import { Province } from "./province";
import { Zipcode } from "./zipcode";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const CompanyAddressUI: React.FC<CompanyAddressProps> = ({
  initCountry,
  initZipcode,
  initState,
  initCityAddresses,
  activeCompanyAddress,
  handleCompanyChange,
  submit,
  countries,
  loading,
  selectedCountry
}) => {
  const { handleFormChange } = useOnboardingContext();
  const navigate = useNavigate();

  return (
    <div className="relative max-w-[400px] m-auto ">
      <ArrowLeftIcon
        stroke="#344054"
        color="#344054"
        role="button"
        className="hidden absolute top-4 left-[0] lg:block w-6 h-6 rounded-full fill-vobb-neutral-60"
        onClick={() => {
          switch (activeCompanyAddress) {
            case "country":
              navigate(Routes.onboarding_company_website);
              handleFormChange("companyWeb", ["fullname", "companyInfo", "companyWeb"]);
              break;
            case "zipcode":
              handleCompanyChange?.("country");
              break;
            case "province":
              handleCompanyChange?.("zipcode");
              break;
            case "cityAddress":
              handleCompanyChange?.("province");
              break;
            default:
              break;
          }
        }}
        data-cy="arrow-icon"
      />
      <div className="hidden lg:grid">
        <LocationIcon className="mb-6 m-auto" data-cy="logo" />
        <div className="mb-8 text-center mx-auto">
          <h1 className="text-xl sm:text-3xl font-bold mb-4 text-vobb-neutral-100 text-center">
            Company Address
          </h1>
          <p data-cy="subtitle">Neque porro quisquam est, qui dolorem ipsu.</p>
        </div>
      </div>
      {activeCompanyAddress === "country" ? (
        <CountrySelect
          submit={submit}
          initCountry={initCountry}
          countries={countries}
          loading={loading}
        />
      ) : activeCompanyAddress === "zipcode" ? (
        <Zipcode
          submit={submit}
          initZipcode={initZipcode}
          postalCode={
            countries?.find((item) => item.value === selectedCountry?.value)?.postalCode ??
            undefined
          }
          loading={loading}
        />
      ) : activeCompanyAddress === "province" ? (
        <Province submit={submit} initState={initState} loading={loading} countries={countries} />
      ) : activeCompanyAddress === "cityAddress" ? (
        <CityAddress submit={submit} initCityAddresses={initCityAddresses} loading={loading} />
      ) : (
        ""
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        <div
          className={`w-3 h-3 rounded-full bg-vobb-neutral-10 cursor-pointer ${
            "country" === activeCompanyAddress ? "bg-vobb-primary-70" : ""
          }`}
          onClick={() => handleCompanyChange?.("country")}
          data-cy="country-state"></div>
        <div
          className={`w-3 h-3 rounded-full bg-vobb-neutral-10 cursor-pointer ${
            "zipcode" === activeCompanyAddress ? "bg-vobb-primary-70" : ""
          }`}
          onClick={() => handleCompanyChange?.("zipcode")}
          data-cy="zipcode-state"></div>
        <div
          className={`w-3 h-3 rounded-full bg-vobb-neutral-10 cursor-pointer ${
            "province" === activeCompanyAddress ? "bg-vobb-primary-70" : ""
          }`}
          onClick={() => handleCompanyChange?.("province")}
          data-cy="province-state"></div>
        <div
          className={`w-3 h-3 rounded-full bg-vobb-neutral-10 cursor-pointer ${
            "city" === activeCompanyAddress ? "bg-vobb-primary-70" : ""
          }`}
          onClick={() => handleCompanyChange?.("city")}
          data-cy="city-state"></div>
      </div>
    </div>
  );
};

export { CompanyAddressUI };
