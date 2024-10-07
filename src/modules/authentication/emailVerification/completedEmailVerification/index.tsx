import { Button } from "components";
import { CheckCircledIcon } from "@radix-ui/react-icons";
interface CompletedProps {
  submit: () => void;
}
const CompletedEmailVerifyUI: React.FC<CompletedProps> = ({ submit }) => {
  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <CheckCircledIcon className="mb-12 mt-2 mx-auto w-8 h-8" data-testid="logo" />

        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Email verified
        </h1>
        <p className="text-center mb-8">Great news! Your email is now verified.</p>

        <form onSubmit={() => submit()}>
          <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
            Continue
          </Button>
        </form>
      </section>
    </main>
  );
};

export { CompletedEmailVerifyUI };
