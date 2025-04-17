import { CompanyInfoIcon } from "assets";
import { useOnboardingContext } from "context";
import { CompanyFormData, CompanyFormProps } from "types/onboarding";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { OrganisationForm } from "./companyName";
import { SectorForm } from "./sector";
import { TeamSizeForm } from "./teamSize";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const CompanyInfoUI: React.FC<CompanyFormProps> = ({
  initName,
  initSize,
  initSector,
  activeCompanyInfo,
  handleCompanyChange,
  submit
}) => {
  const { handleFormChange } = useOnboardingContext();
  const navigate = useNavigate();

  const handleFormSubmit = (data: CompanyFormData) => {
    submit(data);
  };

  return (
    <div className="max-w-[400px] m-auto relative">
      <ArrowLeftIcon
        stroke="#344054"
        color="#344054"
        role="button"
        className="hidden absolute top-4 left-[0] lg:block w-6 h-6 rounded-full fill-vobb-neutral-60"
        onClick={() => {
          switch (activeCompanyInfo) {
            case "organisation":
              navigate(Routes.onboarding_user_details);
              handleFormChange("fullname", ["fullname"]);
              break;
            case "teamSize":
              handleCompanyChange("organisation");
              break;
            case "sector":
              handleCompanyChange("teamSize");
              break;
            default:
              break;
          }
        }}
        data-testid="arrow-icon"
      />
      <div className="hidden lg:grid">
        <CompanyInfoIcon className="mb-6 m-auto" data-testid="logo" />
        <div className="mb-8 text-center mx-auto">
          <h1 className="text-xl sm:text-3xl font-bold mb-4 text-vobb-neutral-100 text-center">
            Company information
          </h1>
          <p data-testid="subtitle">Enter your company details.</p>
        </div>
      </div>
      <div>
        {activeCompanyInfo === "organisation" ? (
          <OrganisationForm initData={initName} submit={handleFormSubmit} />
        ) : activeCompanyInfo === "teamSize" ? (
          <TeamSizeForm initData={initSize} submit={handleFormSubmit} />
        ) : activeCompanyInfo === "sector" ? (
          <SectorForm initData={initSector} submit={handleFormSubmit} />
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        <div
          className={`w-3 h-3 rounded-full bg-vobb-neutral-30 cursor-pointer ${
            "organisation" === activeCompanyInfo ? "bg-vobb-primary-70" : ""
          }`}
          onClick={() => handleCompanyChange("organisation")}
          data-testid="organisation-name-state"></div>
        <div
          className={`w-3 h-3 rounded-full bg-vobb-neutral-30 cursor-pointer ${
            "teamSize" === activeCompanyInfo ? "bg-vobb-primary-70" : ""
          }`}
          onClick={() => handleCompanyChange("teamSize")}
          data-testid="teamsize-state"></div>
        <div
          className={`w-3 h-3 rounded-full bg-vobb-neutral-30 cursor-pointer ${
            "sector" === activeCompanyInfo ? "bg-vobb-primary-70" : ""
          }`}
          onClick={() => handleCompanyChange("sector")}
          data-testid="sector-state"></div>
      </div>
    </div>
  );
};

export { CompanyInfoUI };
