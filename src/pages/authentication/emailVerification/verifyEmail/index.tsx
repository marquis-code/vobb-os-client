import { VerifyEmailUI } from "modules";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Routes } from "router";
import { useApiRequest } from "hooks";
import { resendVerifyEmailService, verifyEmailService } from "api";
import { useToast } from "components";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [activeUrl, setActiveUrl] = useState("verify");
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const { toast } = useToast();

  const handleVerify = async (data: { token: number }) => {
    await run(verifyEmailService(data));
    setActiveUrl("verify");
  };
  const handleResend = async (data: { email: string }) => {
    await run(resendVerifyEmailService(data));
    setActiveUrl("resend");
  };
  useEffect(() => {
    if (response?.status === 200) {
      const email = encodeURIComponent(response?.data?.data?.email);
      activeUrl === "verify"
        ? navigate(Routes.completed_email_verify)
        : navigate(`${Routes.email_verify}?email=${email}`);
    } else if (error) {
      toast({
        description: error?.response?.data?.error
      });
    }
  }, [response, navigate, activeUrl, toast, error]);
  return (
    <>
      <VerifyEmailUI
        handleVerify={handleVerify}
        handleResend={handleResend}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { VerifyEmail };
