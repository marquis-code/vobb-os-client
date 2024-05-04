import { VerifyEmailUI } from "modules";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Routes } from "router";
import { useApiRequest } from "hooks";
import { resendVerifyEmailService, verifyEmailService } from "api";
import { useToast } from "components";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const {
    run: runVerify,
    data: verifyResponse,
    error: verifyError,
    requestStatus: verifyStatus
  } = useApiRequest({});
  const {
    run: runResend,
    data: resendResponse,
    error: resendError,
    requestStatus: resendStatus
  } = useApiRequest({});
  const { toast } = useToast();

  const handleVerify = (data: { token: number }) => {
    runVerify(verifyEmailService(data));
  };
  const handleResend = (data: { email: string }) => {
    runResend(resendVerifyEmailService(data));
  };

  useMemo(() => {
    if (verifyResponse?.status === 200) {
      navigate(Routes.completed_email_verify);
    } else {
      toast({
        variant: "destructive",
        description: verifyError?.response?.data?.error
      });
    }
  }, [verifyResponse, verifyError, navigate, toast]);

  useMemo(() => {
    if (resendResponse?.status === 200) {
      const email = encodeURIComponent(resendResponse?.data?.data?.email);
      navigate(`${Routes.email_verify}?email=${email}`);
    } else {
      toast({
        variant: "destructive",
        description: resendError?.response?.data?.error
      });
    }
  }, [resendResponse, resendError, navigate, toast]);

  return (
    <>
      <VerifyEmailUI
        handleVerify={handleVerify}
        handleResend={handleResend}
        loading={verifyStatus.isPending || resendStatus.isPending}
      />
    </>
  );
};

export { VerifyEmail };
