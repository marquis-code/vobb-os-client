import { cn } from "lib";
import { useOnboardingContext } from "context";
interface LearnmoreProps {
  className: string;
}
const LearnMore: React.FC<LearnmoreProps> = ({ className }: LearnmoreProps) => {
  const { activeForm } = useOnboardingContext();
  return (
    <div className={cn(" lg:flex items-center text-left gap-8 lg:px-6 h-full", className)}>
      <div className="mx-auto text-left">
        <p className="font-semibold hidden lg:block ">
          {activeForm === "fullname" ||
          activeForm === "companyInfo" ||
          activeForm === "companyWeb" ||
          activeForm === "address"
            ? "Personal and Company Info"
            : "Choose your Team"}
        </p>
        <p>
          {activeForm === "fullname" ||
          activeForm === "companyInfo" ||
          activeForm === "companyWeb" ||
          activeForm === "address"
            ? `Understanding your demographic information  and knowing more about your company also allows us to offer targeted support and guidance tailored to your industry or business needs.`
            : `By sharing your problems, you contribute to making our product more useful, efficient, and enjoyable for your team. Your feedback allows us to make sure we are solving your exact problems and building what you’d love to use.`}
        </p>
      </div>
    </div>
  );
};

export { LearnMore };
