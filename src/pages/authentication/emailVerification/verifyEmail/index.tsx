import { VerifyEmailUI } from "modules";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Routes } from "router";
import { useApiRequest } from "hooks";
import { resendVerifyEmailService, verifyEmailService } from "api";
import { toast } from "components";
import Cookies from "js-cookie";

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

  const handleVerify = (data: { token: number }) => {
    runVerify(verifyEmailService(data));
  };
  const handleResend = (data: { email: string }) => {
    runResend(resendVerifyEmailService(data));
  };

  useMemo(() => {
    if (verifyResponse?.status === 200) {
      Cookies.set("vobbOSAccess", verifyResponse?.data?.data?.token, {
        secure: true,
        sameSite: "Strict"
      });
      navigate(Routes.completed_email_verify);
      toast({
        description: verifyResponse?.data?.message
      });
    } else if (verifyError) {
      toast({
        variant: "destructive",
        description: verifyError?.response?.data?.error
      });
    }
  }, [verifyResponse, verifyError, navigate]);

  useMemo(() => {
    if (resendResponse?.status === 200) {
      const email = encodeURIComponent(resendResponse?.data?.data?.email);
      navigate(`${Routes.email_verify}?email=${email}`);
      toast({
        description: resendResponse?.data?.message
      });
    } else if (resendError) {
      toast({
        variant: "destructive",
        description: resendError?.response?.data?.error
      });
    }
  }, [resendResponse, resendError, navigate]);

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
