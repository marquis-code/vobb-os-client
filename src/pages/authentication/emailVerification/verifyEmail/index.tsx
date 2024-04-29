import { VerifyEmailUI } from "modules";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Routes } from "router";
import { useAuthContext } from "context";
import { useApiRequest } from "hooks";
import { resendVerifyEmailService, verifyEmailService } from "api";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { handleSetResponse } = useAuthContext();
  const [activeUrl, setActiveUrl] = useState("verify");
  const { run, data: response, error, requestStatus } = useApiRequest({});

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
      activeUrl === "verify"
        ? navigate(Routes.completed_email_verify)
        : handleSetResponse(response?.data?.data?.email, response?.data?.data?.message);
    }
  }, [response, navigate, handleSetResponse, activeUrl]);
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
