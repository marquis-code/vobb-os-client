import { CompanyInfoIcon, LocationIcon, Logo, MailIcon, PersonalIcon, WeblinkIcon } from "assets";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { useOnboardingContext } from "context";
import { StepsType } from "types/onboarding";
import { cn } from "lib";
import { useEffect, useRef } from "react";
interface StepsProps {
  className: string;
}
const stepsItems: StepsType[] = [
  {
    icon: <PersonalIcon className="w-8 lg:w-12" />,
    name: "fullname",
    title: "Personal Information",
    desc: "Please provide your legal name"
  },
  {
    icon: <CompanyInfoIcon className="w-8 lg:w-12" />,
    name: "companyInfo",
    title: "Company Information",
    desc: "A few details about your company"
  },
  {
    icon: <WeblinkIcon className="w-8 lg:w-12" />,
    name: "companyWeb",
    title: "Company Website",
    desc: "Please provide the website url"
  },
  {
    icon: <LocationIcon className="w-8 lg:w-12" />,
    name: "address",
    title: "Operating Address",
    desc: "Where is the company operating from"
  }
];
const Steps: React.FC<StepsProps> = ({ className }: StepsProps) => {
  const { activeForm, completedForms } = useOnboardingContext();
  const activeFormRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (activeFormRef.current) {
      activeFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }
  }, [activeForm]);
  return (
    <div className={cn("h-full", className)}>
      <div className="lg:px-4 py-6 h-full flex flex-col gap-4 lg:gap-0 lg:justify-between">
        <Link className="block" to={Routes.home}>
          <Logo className="min-w-28 min-h-8" />
        </Link>

        <div className=" gap-8 overflow-auto flex lg:flex-col">
          {stepsItems.map((step) => (
            <div
              key={step.name}
              ref={activeForm === step.name ? activeFormRef : null}
              className={`flex w-fit justify-start items-center gap-1 lg:gap-3  ${
                activeForm === step.name ? "border-b-2 border-vobb-primary-70 lg:border-none" : ""
              }`}>
              <div className={`${completedForms.includes(step.name) ? "completedForm" : ""} `}>
                {step.icon}
              </div>
              <div className={` ${activeForm === step.name ? "text-black" : "text-neutral-500"}`}>
                <p className="font-semibold whitespace-nowrap">{step.title}</p>
                <span className="hidden lg:block">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex justify-between items-center">
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
