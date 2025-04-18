import { OnboardingContextProvider } from "context";
import { LearnMore } from "./learnMore";
import { Steps } from "./steps";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
  return (
    <OnboardingContextProvider>
      <section className="px-4 lg:bg-vobb-neutral-10 overflow-hidden h-[100vh]">
        <div className="grid lg:grid-cols-colsLayout items-center lg:h-[100vh]  lg:max-w-[1440px] mx-auto">
          <Steps className="order-1  overflow-auto" />
          <LearnMore className="order-2 lg:order-3" />
          <section className="order-3 lg:h-full overflow-auto lg:order-2 py-4 lg:pt-[8.5rem] lg:pb-12 lg:bg-circle-pattern bg-white bg-no-repeat mt-6 lg:mt-0 bg-[length:700px_700px] lg:bg-[center_top_-100px]">
            {children}
          </section>
        </div>
      </section>
    </OnboardingContextProvider>
  );
};

export { OnboardingLayout };
