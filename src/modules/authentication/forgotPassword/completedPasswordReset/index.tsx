import { Button } from "components";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Routes } from "router";
interface CompletedProps {
  submit: () => void;
}
const CompletedPasswordResetUI: React.FC<CompletedProps> = ({ submit }) => {
  const navigate = useNavigate();

  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <CheckCircledIcon className="mb-12 mt-2 mx-auto w-8 h-8" />

        <h1 className="text-xl sm:text-2xl font-bold mb-8 text-vobb-neutral-100 text-center">
          Password reset
        </h1>
        <p className="text-center mb-8">
          Your password has been successfully reset. Click below to log in magically.
        </p>

        <form onSubmit={() => submit()}>
          <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
            Continue
          </Button>
        </form>

        <Button
          onClick={() => navigate(Routes.home)}
          className="w-full mt-6 flex gap-4 items-center"
          size={"default"}
          variant="link">
          <ArrowLeftIcon /> Back to log in
        </Button>
      </section>
    </main>
  );
};

export { CompletedPasswordResetUI };
