import { OnboardingContextProvider } from "context";
import { LearnMore } from "./learnMore";
import { Steps } from "./steps";
import { UnsupportedScreenSize } from "components";
import { useMobile } from "hooks";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
  const { isMobile } = useMobile({ size: 1024 });

  return (
    <>
      {isMobile ? (
        <UnsupportedScreenSize />
      ) : (
        <OnboardingContextProvider>
          <section className="bg-vobb-neutral-10 overflow-hidden h-[100vh]">
            <div className="grid grid-cols-colsLayout items-start max-w-[1440px] mx-auto">
              <Steps />
              <section className="py-4 md:pt-[8.5rem] h-full md:pb-12 md:bg-circle-pattern bg-white bg-no-repeat bg-[length:700px_700px] md:bg-[center_top_-100px] ">
                {children}
              </section>
              <LearnMore />
            </div>
          </section>
        </OnboardingContextProvider>
      )}
    </>
  );
};

export { OnboardingLayout };
