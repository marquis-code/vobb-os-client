import React, { useState, useMemo } from "react";
import { LoginUI } from "modules";
import { Login2FA } from "./login2fa";
import { useApiRequest, useGoogleSignin } from "hooks";
import { emailLoginService, googleSigninService } from "api";
import { loginData } from "types/auth";
import { useToast } from "components";
import { Routes } from "router";
import { useNavigate } from "react-router-dom";

const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [twoFactor, setTwoFactor] = useState({
    show: false
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { authorizationCode: code, googleSignIn } = useGoogleSignin({
    redirectUrl: `${redirectUrl}login`
  });
  const {
    run: runEmailLogin,
    data: emailResponse,
    requestStatus: emailStatus,
    error: emailError
  } = useApiRequest({});
  const {
    run: runGoogleLogin,
    data: googleResponse,
    requestStatus: googleStatus,
    error: googleError
  } = useApiRequest({});

  const submit = (data: loginData) => {
    runEmailLogin(emailLoginService(data));
    setEmail(data.email);
  };

  const handleGoogleSignin = () => {
    googleSignIn();
    if (code) {
      runGoogleLogin(googleSigninService({ code }));
    }
  };

  useMemo(() => {
    if (emailResponse?.status === 200) {
      if (emailResponse?.data["2fa_status"]) {
        localStorage.setItem("vobbOSAccess", emailResponse?.data?.data?.token);
        setTwoFactor({ show: true });
      } else {
        localStorage.setItem("vobbOSAccess", emailResponse?.data?.data?.access_token);
        localStorage.setItem("vobbOSRefresh", emailResponse?.data?.data?.refresh_token);
        navigate(Routes.overview);
        toast({
          description: emailResponse?.data?.message
        });
      }
    } else {
      toast({
        variant: "destructive",
        description: emailError?.response?.data?.error
      });
    }
  }, [emailResponse, emailError, navigate, toast]);

  return (
    <>
      <Login2FA {...twoFactor} close={() => setTwoFactor({ show: false })} email={email} />
      <LoginUI
        submit={submit}
        loading={emailStatus.isPending}
        handleGoogleSignin={handleGoogleSignin}
      />
    </>
  );
};

export { Login };
