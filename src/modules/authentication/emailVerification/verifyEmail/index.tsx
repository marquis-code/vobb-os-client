import { Button, CustomInputOTP } from "components";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Routes } from "router";

interface VerifyEmailProps {
  handleVerify: ({ token }) => void;
  handleResend: ({ email }) => void;
  loading: boolean;
}

const VerifyEmailUI: React.FC<VerifyEmailProps> = ({ handleVerify, handleResend, loading }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [searchParams] = useSearchParams();
  const encodedEmail = searchParams.get("email");
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null;

  const submitVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleVerify({ token: +otp });
  };

  const submitResend = () => {
    handleResend({ email });
    setCountdown(30);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);
  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <EnvelopeClosedIcon className="mb-12 mt-2 mx-auto w-8 h-8" data-testid="logo" />

        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Check your email
        </h1>
        <p className="text-center mb-8" data-testid="subtitle">
          We sent a verification code to {email}
        </p>

        <form onSubmit={submitVerify}>
          <div className="flex justify-center items-center mb-10" data-testid="otp">
            <CustomInputOTP value={otp} onChange={setOtp} />
          </div>

          <Button
            disabled={otp.length !== 6 || loading}
            loading={loading}
            size={"default"}
            variant={"fill"}
            className="w-full"
            data-testid="continue-btn">
            Continue
          </Button>
        </form>
        <p className="cursor-pointer mx-auto mt-6 text-center ">
          <span>Didn't receive the code?</span> <span>{countdown > 0 && "Resend in "}</span>
          <Button
            className="text-vobb-primary-70 p-0"
            onClick={submitResend}
            disabled={countdown > 0}
            variant="link"
            data-testid="resend-btn">
            {countdown > 0 ? countdown : "Resend code"}
          </Button>
        </p>

        <Button
          onClick={() => navigate(Routes.home)}
          className="w-full mt-6 flex gap-4 items-center"
          size={"default"}
          variant="link"
          data-testid="back-btn">
          <ArrowLeftIcon data-testid="arrow-icon" /> Back to sign up
        </Button>
      </section>
    </main>
  );
};

export { VerifyEmailUI };
