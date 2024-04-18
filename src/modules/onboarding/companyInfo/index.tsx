import { Arrow, CompanyInfoIcon } from "assets";
import { useOnboardingContext } from "context";
import { CompanyFormData, CompanyFormErrors, CompanyFormProps } from "@/types/interfaces";
import { Button, CustomInput, OptionType, SelectInput } from "components";
import { useEffect, useState } from "react";

const initCompanyData: CompanyFormData = {
  organisation: "",
  sector: null,
  teamSize: null
};

const CompanyInfo: React.FC<CompanyFormProps> = ({ initData, submit }) => {
  const { handleFormChange } = useOnboardingContext();
  const [activeCompanyInfo, setActiveCompanyInfo] = useState<string>("organisation");

  const [state, setState] = useState<CompanyFormData>(initCompanyData);
  const { organisation, sector, teamSize } = state;
  const [error, setError] = useState<CompanyFormErrors>();
  useEffect(() => {
    initData && setState(initData);
  }, [initData]);

  const handleSubmitFormInfo = (stage: string) => {
    const errors: CompanyFormErrors = {};

    if (stage === "teamSize") {
      if (organisation.trim().length === 0) errors.organisation = "Required";
    } else if (stage === "sector") {
      if (!teamSize) errors.teamSize = "Required";
    } else {
      if (!sector) errors.sector = "Required";
    }
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      stage !== "done" ? setActiveCompanyInfo(stage) : submit(state);
    }
  };

  const sectorOptions: OptionType[] = [
    {
      label: "Medical and Health Tourism",
      value: "Medical and Health Tourism"
    },
    {
      label: "Educational and Academic Travel",
      value: "Educational and Academic Travel"
    },
    {
      label: "Event and Conference Travel",
      value: "Event and Conference Travel"
    },
    {
      label: "Religious and Pilgrimage Tourism",
      value: "Religious and Pilgrimage Tourism"
    },
    {
      label: "Luxury and High-End Tourism",
      value: "Luxury and High-End Tourism"
    },
    {
      label: "Others",
      value: "Others"
    }
  ];

  const teamSizeOptions: OptionType[] = [
    {
      label: "0-5 Team members",
      value: "0-5"
    },
    {
      label: "6-10 Team members",
      value: "6-10"
    },
    {
      label: "10-20 Team members",
      value: "10-20"
    },
    {
      label: "20-50 Team members",
      value: "20-50"
    }
  ];
  const progressBtns = ["organisation", "teamSize", "sector"];

  return (
    <div className="max-w-[400px] h-[100dvh] m-auto ">
      <Arrow
        role="button"
        className="hidden absolute top-20 left-[40%] md:block w-8 h-8 rotate-180 border border-neutral-400 rounded-full p-1 fill-neutral-400"
        onClick={() => handleFormChange("fullname", ["fullname"])}
      />
      <CompanyInfoIcon className="mb-6 m-auto" />
      <div className="mb-4 text-center mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Company information
        </h2>
        <p>Help us get to know your organisation better</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        {activeCompanyInfo === "organisation" && (
          <aside>
            <CustomInput
              label="Company Name"
              type="text"
              placeholder="Travel Space Inc"
              name="organisation"
              onChange={(e) => setState((prev) => ({ ...prev, organisation: e.target.value }))}
              validatorMessage={error?.organisation}
            />
            <Button
              onClick={() => handleSubmitFormInfo("teamSize")}
              className="w-full mt-6"
              size={"default"}
              variant="fill">
              Continue
            </Button>
          </aside>
        )}

        {activeCompanyInfo === "teamSize" && (
          <aside>
            <SelectInput
              name="teamSize"
              label="Team size"
              selectedOption={teamSize}
              options={teamSizeOptions}
              handleSelectChange={(value) =>
                value && setState((prev) => ({ ...prev, teamSize: value }))
              }
              placeholder={"What is the size of your team?"}
              validatorMessage={error?.teamSize}
            />
            <Button
              onClick={() => handleSubmitFormInfo("sector")}
              className="w-full mt-6"
              size={"default"}
              variant="fill">
              Continue
            </Button>
          </aside>
        )}

        {activeCompanyInfo === "sector" && (
          <aside>
            <SelectInput
              name="sector"
              label="Sector"
              selectedOption={sector}
              options={sectorOptions}
              handleSelectChange={(value) =>
                value && setState((prev) => ({ ...prev, sector: value }))
              }
              placeholder={"Select sector"}
              validatorMessage={error?.sector}
            />
            <Button
              onClick={() => handleSubmitFormInfo("done")}
              className="w-full mt-6"
              size={"default"}
              variant="fill">
              Continue
            </Button>
          </aside>
        )}

        <div className="flex justify-center items-center gap-4 mt-8">
          {progressBtns.map((btn) => (
            <div
              key={btn}
              className={`w-3 h-3 rounded-full bg-vobb-neutral-10 cursor-pointer ${
                btn === activeCompanyInfo ? "bg-vobb-primary-70" : ""
              }`}
              onClick={() => setActiveCompanyInfo(btn)}></div>
          ))}
        </div>
      </form>
    </div>
  );
};

export { CompanyInfo };
