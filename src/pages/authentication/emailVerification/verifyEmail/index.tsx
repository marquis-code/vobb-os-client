import { VerifyEmailUI } from "modules";
import { useNavigate } from "react-router-dom";
import { useVerifyEmailService } from "hooks";
import { useEffect, useState } from "react";
import { Routes } from "router";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { verifyEmail, resendVerify, response, apiError, loading } = useVerifyEmailService();
  const [activeUrl, setActiveUrl] = useState("verify");

  const handleVerify = ({ token }: { token: number }) => {
    verifyEmail({ token });
    setActiveUrl("verify");
  };
  const handleResend = ({ email }: { email: string }) => {
    resendVerify({ email });
    setActiveUrl("resend");
  };
  useEffect(() => {
    if (response?.status === 200) {
      activeUrl === "verify" && navigate(Routes.completed_email_verify);
    }
  }, [response, navigate, activeUrl]);
  return (
    <>
      <VerifyEmailUI
        handleVerify={handleVerify}
        handleResend={handleResend}
        apiError={apiError}
        loading={loading}
      />
    </>
  );
};

export { VerifyEmail };
