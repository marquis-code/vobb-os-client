import { SendIcon } from "assets";
import { Button, UnsupportedScreenSize } from "components";

import { useMobile } from "hooks";
import { useNavigate } from "react-router-dom";

const CompletedOnboardingUI = () => {
  const { isMobile } = useMobile({ size: 1024 });
  const navigate = useNavigate();

  return (
    <>
      {isMobile ? (
        <UnsupportedScreenSize />
      ) : (
        <main>
          <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
            <SendIcon className="mb-12 m-auto" />
            <h1 className="text-xl sm:text-2xl font-bold mb-8 text-vobb-neutral-100 text-center">
              All done, yay!
            </h1>
            <p>You've officially set sail with us.</p>

            <Button
              onClick={() => navigate("/")}
              className="w-full mt-6"
              size={"default"}
              variant="fill">
              Continue
            </Button>
          </section>
        </main>
      )}
    </>
  );
};

export { CompletedOnboardingUI };
