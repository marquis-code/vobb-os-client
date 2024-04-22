import { OnboardingContextProvider } from "context";
import { LearnMore } from "./learnMore";
import { Steps } from "./steps";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
  return (
    <>
      <OnboardingContextProvider>
        <main className="bg-vobb-neutral-10 overflow-hidden h-[100vh]">
          <div className="grid grid-cols-colsLayout items-start max-w-[1440px] mx-auto">
            <Steps />
            <section className="py-4 md:pt-[8.5rem] h-full md:pb-12 md:bg-circle-pattern bg-white bg-no-repeat bg-[length:700px_700px] md:bg-[center_top_-100px] ">
              {children}
            </section>
            <LearnMore />
          </div>
        </main>
      </OnboardingContextProvider>
    </>
  );
};

export { OnboardingLayout };
