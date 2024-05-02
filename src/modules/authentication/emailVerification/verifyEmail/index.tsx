import { Button, CustomInputOTP } from "components";
import { useState } from "react";
import { ArrowLeftIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { useAuthContext } from "context";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

interface VerifyEmailProps {
  handleVerify: ({ token }) => void;
  handleResend: ({ email }) => void;
  apiError: any;
  loading: boolean;
}

const VerifyEmailUI: React.FC<VerifyEmailProps> = ({
  handleVerify,
  handleResend,
  apiError,
  loading
}) => {
  const { email, message } = useAuthContext();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const submitVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleVerify({ token: +otp });
  };

  const submitResend = () => {
    handleResend({ email });
  };
  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <EnvelopeClosedIcon className="mb-12 mt-2 mx-auto w-8 h-8" />

        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Check your email
        </h1>
        <p className="text-center mb-8">{message}</p>

        <form onSubmit={submitVerify}>
          <div className="flex justify-center items-center mb-10">
            <CustomInputOTP value={otp} onChange={setOtp} />
          </div>

          <Button disabled={otp.length !== 6} size={"default"} variant={"fill"} className="w-full">
            Continue
          </Button>

          {apiError && (
            <small className="block text=-xs text-error-10 text-center mt-4">
              {apiError?.response?.data?.error}
            </small>
          )}
        </form>
        <p className="cursor-pointer mx-auto mt-6 text-center">
          Didn't receive the code?{" "}
          <strong className="text-vobb-primary-70" onClick={submitResend}>
            Click to resend
          </strong>
        </p>

        <Button
          onClick={() => navigate(Routes.home)}
          type="submit"
          className="w-full mt-6 flex gap-4 items-center"
          size={"default"}
          variant="link">
          <ArrowLeftIcon /> Back to sign up
        </Button>
      </section>
    </main>
  );
};

export { VerifyEmailUI };
