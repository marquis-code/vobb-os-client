import { Button, CustomInputOTP } from "components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeftIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Routes } from "router";

interface VerifyEmailProps {
  submit: () => void;
}

const VerifyEmailUI: React.FC<VerifyEmailProps> = ({ submit }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <EnvelopeClosedIcon className="mb-12 mt-2 mx-auto w-8 h-8" />

        <h1 className="text-xl sm:text-2xl font-bold mb-8 text-vobb-neutral-100 text-center">
          Check your email
        </h1>
        <p className="text-center mb-8">We sent a verification code to anjola@vobb.io</p>

        <form onSubmit={() => submit()}>
          <div className="flex justify-center items-center mb-10">
            <CustomInputOTP value={otp} onChange={setOtp} />
          </div>

          {otp.length === 6 && (
            <Button size={"default"} variant={"fill"} className="w-full">
              Continue
            </Button>
          )}

          <p className="cursor-pointer mx-auto mt-8 text-center">
            Didn't receive the code?{" "}
            <strong className="text-vobb-primary-70">Click to resend</strong>
          </p>
        </form>

        <Button
          onClick={() => navigate(Routes.home)}
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
