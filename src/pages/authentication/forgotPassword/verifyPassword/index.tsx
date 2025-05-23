import { Routes } from "router";
import { VerifyPasswordUI } from "modules";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApiRequest } from "hooks";
import { forgotPasswordService, forgotPasswordVerifyService } from "api";
import { useMemo } from "react";
import { toast } from "components";
import { forgotPasswordParams } from "types";
import Cookies from "js-cookie";

const VerifyPassword = () => {
  const {
    run: runVerify,
    data: verifyResponse,
    error: verifyError,
    requestStatus: verifyStatus
  } = useApiRequest({});
  const navigate = useNavigate();
  const handleVerifyCode = (data: forgotPasswordParams) => {
    runVerify(forgotPasswordVerifyService(data));
  };

  useMemo(() => {
    if (verifyResponse?.status === 200) {
      Cookies.set("vobbOSAccess", verifyResponse?.data?.data?.token, {
        secure: true,
        sameSite: "Strict"
      });

      navigate(Routes.new_password);
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

  const [searchParams] = useSearchParams();
  const encodedEmail = searchParams.get("email");
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null;
  const {
    run: runResend,
    data: resendResponse,
    error: resendError,
    requestStatus: resendStatus
  } = useApiRequest({});

  const handleResendCode = () => {
    email && runResend(forgotPasswordService({ email }));
  };
  useMemo(() => {
    if (resendResponse?.status === 200) {
      Cookies.set("vobbOSAccess", resendResponse?.data?.data?.token, {
        secure: true,
        sameSite: "Strict"
      });
      toast({
        description: resendResponse?.data?.message
      });
    } else if (resendError) {
      toast({
        variant: "destructive",
        description: resendError?.response?.data?.error
      });
    }
  }, [resendResponse, resendError]);
  return (
    <>
      <VerifyPasswordUI
        submit={handleVerifyCode}
        handleResend={handleResendCode}
        loading={resendStatus.isPending || verifyStatus.isPending}
      />
    </>
  );
};

export { VerifyPassword };
