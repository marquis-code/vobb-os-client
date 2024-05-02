import { VerifyEmailUI } from "modules";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Routes } from "router";
import { useApiRequest } from "hooks";
import { resendVerifyEmailService, verifyEmailService } from "api";
import { useToast } from "components";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [activeUrl, setActiveUrl] = useState("verify");
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const { toast } = useToast();

  const handleVerify = (data: { token: number }) => {
    run(verifyEmailService(data));
    setActiveUrl("verify");
  };
  const handleResend = (data: { email: string }) => {
    run(resendVerifyEmailService(data));
    setActiveUrl("resend");
  };
  useMemo(() => {
    if (response?.status === 200) {
      const email = encodeURIComponent(response?.data?.data?.email);
      activeUrl === "verify"
        ? navigate(Routes.completed_email_verify)
        : navigate(`${Routes.email_verify}?email=${email}`);
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, navigate, activeUrl, error, toast]);
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
