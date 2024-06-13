import { Button } from "components";
import { Check } from "assets";

const CompletedOnboardingUI = ({ submit }) => {
  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <Check className="mb-12 mt-2 mx-auto w-8 h-8" />
        <h1 className="text-xl sm:text-2xl font-bold mb-8 text-vobb-neutral-100 text-center">
          All done, yay!
        </h1>
        <p className="text-center">You've officially set sail with us.</p>

        <Button onClick={submit} className="w-full mt-6" size={"default"} variant="fill">
          Continue
        </Button>
      </section>
    </main>
  );
};

export { CompletedOnboardingUI };
