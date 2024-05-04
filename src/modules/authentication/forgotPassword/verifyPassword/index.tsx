import { Button, CustomInputOTP } from "components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeftIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Routes } from "router";
import { forgotPasswordParams } from "types";

interface VerifyPasswordProps {
  submit: (data: forgotPasswordParams) => void;
}

const VerifyPasswordUI: React.FC<VerifyPasswordProps> = ({ submit }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const encodedToken = searchParams.get("token");
  const encodedEmail = searchParams.get("email");
  const token = encodedToken ? decodeURIComponent(encodedToken) : null;
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ token, otp });
  };
  return (
    <main>
      <section className="bg-circle-pattern max-w-[400px] m-auto text-vobb_neutral-100 bg-no-repeat bg-[length:600px_600px] bg-[center_top_-100px] pt-[100px] px-4 pb-4">
        <EnvelopeClosedIcon className="mb-12 mt-2 mx-auto w-8 h-8" />

        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Check your email
        </h1>
        <p className="text-center mb-8">We sent a verification code to {email}</p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center mb-10">
            <CustomInputOTP value={otp} onChange={setOtp} />
          </div>

          <Button disabled={otp.length !== 6} size={"default"} variant={"fill"} className="w-full">
            Continue
          </Button>

          <p className="cursor-pointer mx-auto mt-8 text-center">
            Didn't receive the code?{" "}
            <strong className="text-vobb-primary-70">Click to resend</strong>
          </p>
        </form>

        <Button
          onClick={() => navigate(Routes.login)}
          className="w-full mt-6 flex gap-4 items-center"
          size={"default"}
          variant="ghost">
          <ArrowLeftIcon /> Back to log in
        </Button>
      </section>
    </main>
  );
};

export { VerifyPasswordUI };
