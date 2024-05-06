import { useOnboardingContext } from "context";
import { CompanyWebsiteData, CountryType } from "types/onboarding";
import { useState } from "react";
import { CompanyWebsite } from "./companyWebsite";

interface OnboardingUIProps {
  handleSubmit: ({ data, callback }) => void;
  countries: CountryType[];
}
const OnboardingUI: React.FC<OnboardingUIProps> = ({ handleSubmit, countries }) => {
  const { activeForm, handleFormChange } = useOnboardingContext();

  const [companyUrlData, setCompanyUrlData] = useState<CompanyWebsiteData | undefined>(undefined);

  return (
    <>
      {/* {activeForm === "fullname" && (
        <FullnameUI
          initData={fullnameData}
          submit={(data) => {
            setFullnameData(data);
            handleFormChange("companyInfo", ["fullname"]);
          }}
        />
      )} */}

      {/* {activeForm === "companyInfo" && (
        <CompanyInfoUI
          initData={companyData}
          submit={(data) => {
            setCompanyData(data);
            handleFormChange("companyWeb", ["fullname", "companyInfo"]);
          }}
        />
      )} */}

      {activeForm === "companyWeb" && (
        <CompanyWebsite
          initData={companyUrlData}
          submit={(data) => {
            setCompanyUrlData(data);
            handleFormChange("address", ["fullname", "companyInfo", "companyWeb"]);
          }}
        />
      )}

      {/* {activeForm === "address" && (
        <CompanyAddress
          initData={companyAddressData}
          submit={(data) => {
            setCompanyAddressData(data);
            handleFormChange("address", ["fullname", "companyInfo", "companyWeb"]);
            handleSubmit({
              data: {
                ...fullnameData,
                ...companyData,
                ...companyUrlData,
                ...companyAddressData
              },
              callback: () =>
                navigate("/completed", {
                  state: {
                    sector: companyData?.sector?.value
                  }
                })
            });
          }}
          countries={countries}
        />
      )} */}
    </>
  );
};

//Fix in progress
export { OnboardingUI };

export * from "./fullname";
export * from "./companyInfo";
