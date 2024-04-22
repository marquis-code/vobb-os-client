import { CompanyInfoIcon, LocationIcon, Logo, MailIcon, PersonalIcon, WeblinkIcon } from "assets";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { useOnboardingContext } from "context";
import { StepsType } from "types/onboarding";
import { cn } from "lib";
interface StepsProps {
  className: string;
}
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
const Steps: React.FC<StepsProps> = ({ className }: StepsProps) => {
  const { activeForm, completedForms } = useOnboardingContext();
  return (
    <div className={cn("min-h-full overflow-auto", className)}>
      <div className="lg:px-4 py-8 flex gap-20 flex-col h-full justify-between">
        <Link className="block" to={Routes.home}>
          <Logo className="min-w-28 min-h-8 m-auto lg:m-0" />
        </Link>

        <div className=" gap-8 overflow-auto flex lg:flex-col">
          {stepsItems.map((step) => (
            <div
              key={step.name}
              className={`flex w-fit justify-start items-center gap-3  ${
                activeForm === step.name ? "border-b-2 border-vobb-primary-70 lg:border-none" : ""
              }`}>
              <div className={completedForms.includes(step.name) ? "completedForm" : ""}>
                {step.icon}
              </div>
              <div className={` ${activeForm === step.name ? "text-black" : "text-neutral-500"}`}>
                <p className="font-semibold whitespace-nowrap">{step.title}</p>
                <span className="hidden lg:block">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex justify-between items-center mt-48">
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
