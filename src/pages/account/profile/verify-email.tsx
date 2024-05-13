import { personalEmailUpdateVerifyService } from "api";
import { OTPModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";

interface VerifyEmailProps extends ModalProps {
  fetchProfile: () => void;
}
const VerifyEmail: React.FC<VerifyEmailProps> = ({ show, close, fetchProfile }) => {
  const navigate = useNavigate();
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const [searchParams] = useSearchParams();
  const encodedEmail = searchParams.get("email");
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null;
  const handleSubmit = (data: { otp: string }) => {
    run(personalEmailUpdateVerifyService(data));
  };

  useMemo(() => {
    if (response?.status === 200) {
      close();
      fetchProfile();
      toast({
        description: response?.data?.message
      });
      navigate(Routes.profile);
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <OTPModal
        title="Verify Your Email"
        text={`We’ve sent a 6-character code to ${email} The code expires shortly, so please enter it soon.`}
        show={show}
        close={close}
        submit={handleSubmit}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { VerifyEmail };
