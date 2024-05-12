import { Routes } from "router";
import { VerifyPasswordUI } from "modules";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApiRequest } from "hooks";
import { forgotPasswordService, forgotPasswordVerifyService } from "api";
import { useMemo } from "react";
import { toast } from "components";
import { forgotPasswordParams } from "types";

const VerifyPassword = () => {
  const { run: runVerify, data: verifyResponse, error: verifyError } = useApiRequest({});
  const navigate = useNavigate();
  const handleVerifyCode = (data: forgotPasswordParams) => {
    runVerify(forgotPasswordVerifyService(data));
  };

  useMemo(() => {
    if (verifyResponse?.status === 200) {
      localStorage.setItem("vobbOSAccess", verifyResponse?.data?.data?.token);

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
      localStorage.setItem("vobbOSAccess", resendResponse?.data?.data?.token);
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
        loading={resendStatus.isPending}
      />
    </>
  );
};

export { VerifyPassword };
