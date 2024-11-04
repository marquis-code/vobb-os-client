import { Button, LoadingSpinner } from "components";
import { Check } from "assets";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

interface VerifyProps {
  loading: boolean;
  message: { status: string; message: string };
}

const MemberEmailVerifyUI: React.FC<VerifyProps> = ({ loading, message }) => {
  const navigate = useNavigate();

  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Check className="mb-12 mt-2 mx-auto w-8 h-8" />
            <h1 className="text-xl sm:text-2xl font-bold mb-8 text-vobb-neutral-100 text-center">
              {message.status}
            </h1>
            <p className="text-center">{message.message}</p>
            <Button
              onClick={() => navigate(Routes.login)}
              className="w-full mt-6"
              size={"default"}
              variant="fill">
              Go to login
            </Button>{" "}
          </>
        )}
      </section>
    </main>
  );
};

export { MemberEmailVerifyUI };
