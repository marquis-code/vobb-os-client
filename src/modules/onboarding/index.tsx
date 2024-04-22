import { useOnboardingContext } from "context";
import {
  CompanyAddressFormData,
  CompanyFormData,
  CompanyWebsiteData,
  FullnameFormData
} from "types/onboarding";
import { useState } from "react";
import { Fullname } from "./fullname";
import { CompanyInfo } from "./companyInfo";
import { CompanyWebsite } from "./companyWebsite";
import { CompanyAddress } from "./companyAddress";
import { useNavigate } from "react-router-dom";
interface OnboardingUIProps {
  handleSubmit: ({ data, callback }) => void;
}
const OnboardingUI: React.FC<OnboardingUIProps> = ({ handleSubmit }) => {
  const navigate = useNavigate();

  const { activeForm, handleFormChange } = useOnboardingContext();

  const [fullnameData, setFullnameData] = useState<FullnameFormData | undefined>(undefined);
  const [companyData, setCompanyData] = useState<CompanyFormData | undefined>(undefined);
  const [companyUrlData, setCompanyUrlData] = useState<CompanyWebsiteData | undefined>(undefined);
  const [companyAddressData, setCompanyAddressData] = useState<CompanyAddressFormData | undefined>(
    undefined
  );
  return (
    <>
      {activeForm === "fullname" && (
        <Fullname
          initData={fullnameData}
          submit={(data) => {
            setFullnameData(data);
            handleFormChange("companyInfo", ["fullname"]);
          }}
        />
      )}

      {activeForm === "companyInfo" && (
        <CompanyInfo
          initData={companyData}
          submit={(data) => {
            setCompanyData(data);
            handleFormChange("companyWeb", ["fullname", "companyInfo"]);
          }}
        />
      )}

      {activeForm === "companyWeb" && (
        <CompanyWebsite
          initData={companyUrlData}
          submit={(data) => {
            setCompanyUrlData(data);
            handleFormChange("address", ["fullname", "companyInfo", "companyWeb"]);
          }}
        />
      )}

      {activeForm === "address" && (
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
        />
      )}
    </>
  );
};

export { OnboardingUI };
