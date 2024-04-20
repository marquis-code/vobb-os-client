import { CompanyInfoIcon, LocationIcon, Logo, MailIcon, PersonalIcon, WeblinkIcon } from "assets";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { useOnboardingContext } from "context";
import { StepsType } from "types/onboarding";

const stepsItems: StepsType[] = [
  {
    icon: <PersonalIcon />,
    name: "fullname",
    title: "Personal Information",
    desc: "Please provide your legal name"
  },
  {
    icon: <CompanyInfoIcon />,
    name: "companyInfo",
    title: "Company Information",
    desc: "A few details about your company"
  },
  {
    icon: <WeblinkIcon />,
    name: "companyWeb",
    title: "Company Website",
    desc: "Please provide the website url"
  },
  {
    icon: <LocationIcon />,
    name: "address",
    title: "Operating Address",
    desc: "Where is the company operating from"
  }
];
const Steps = () => {
  const { activeForm, completedForms } = useOnboardingContext();
  return (
    <div className="min-h-full overflow-auto">
      <div className="px-4 py-8 flex gap-20 flex-col h-full justify-between">
        <Link className=" block w-fit" to={Routes.home}>
          <Logo className="min-w-28 min-h-8" />
        </Link>

        <div className="gap-8 overflow-auto flex md:flex-col">
          {stepsItems.map((step) => (
            <div
              key={step.name}
              className={`flex w-fit justify-start items-center gap-3  ${
                activeForm === step.name ? "border-b-2 border-vobb-primary-70 md:border-none" : ""
              }`}>
              <div className={completedForms.includes(step.name) ? "completedForm" : ""}>
                {step.icon}
              </div>
              <div className={` ${activeForm === step.name ? "text-black" : "text-neutral-500"}`}>
                <p className="font-semibold whitespace-nowrap">{step.title}</p>
                <span className="hidden md:block">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-48">
          <span>© Vobb 2024</span>
          <a href="mailto:support@vobb.io" className="flex items-center gap-2">
            <MailIcon /> support@vobb.io
          </a>
        </div>
      </div>
    </div>
  );
};

export { Steps };
