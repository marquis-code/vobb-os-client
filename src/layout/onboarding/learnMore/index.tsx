import { useOnboardingContext } from "context";

const LearnMore = () => {
  const { activeForm } = useOnboardingContext();
  return (
    <div className="md:flex items-center text-left gap-8 p-6  mt-32">
      <div className="mx-auto text-left">
        <h4 className="font-semibold">
          {activeForm === "fullname" ||
          activeForm === "companyInfo" ||
          activeForm === "companyWeb" ||
          activeForm === "address"
            ? "Personal and Company Info"
            : "Choose your Team"}
        </h4>
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
