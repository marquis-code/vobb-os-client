import { CompanyInfoIcon } from "assets";
import { useOnboardingContext } from "context";
import { CompanyFormData, CompanyFormProps } from "types/onboarding";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { OrganisationForm } from "./companyName";
import { SectorForm } from "./sector";
import { TeamSizeForm } from "./teamSize";

const CompanyInfoUI: React.FC<CompanyFormProps> = ({
  initName,
  initSize,
  initSector,
  activeCompanyInfo,
  handleCompanyChange,
  submit
}) => {
  const { handleFormChange } = useOnboardingContext();

  const handleFormSubmit = (data: CompanyFormData) => {
    submit(data);
  };

  const progressBtns = ["organisation", "teamSize", "sector"];

  return (
    <div className="max-w-[400px] m-auto relative">
      <ArrowLeftIcon
        stroke="#344054"
        color="#344054"
        role="button"
        className="hidden absolute top-4 left-[0] lg:block w-6 h-6 rounded-full fill-vobb-neutral-60"
        onClick={() => handleFormChange("fullname", ["fullname"])}
      />
      <div className="hidden lg:grid">
        <CompanyInfoIcon className="mb-6 m-auto" />
        <div className="mb-8 text-center mx-auto">
          <h1 className="text-xl sm:text-3xl font-bold mb-4 text-vobb-neutral-100 text-center">
            Company information
          </h1>
          <p>Neque porro quisquam est, qui dolorem ipsu.</p>
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
        {progressBtns.map((btn) => (
          <div
            key={btn}
            className={`w-3 h-3 rounded-full bg-vobb-neutral-10 cursor-pointer ${
              btn === activeCompanyInfo ? "bg-vobb-primary-70" : ""
            }`}
            onClick={() => handleCompanyChange(btn)}></div>
        ))}
      </div>
    </div>
  );
};

export { CompanyInfoUI };
