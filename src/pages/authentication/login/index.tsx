import React, { useState, useMemo, useEffect } from "react";
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

  useMemo(() => {
    if (emailResponse?.status === 200) {
      localStorage.setItem("vobbOSAccess", emailResponse?.data?.data?.token);
      emailResponse?.data["2fa_status"]
        ? setTwoFactor({ show: true })
        : navigate(Routes.onboarding);
    } else if (emailError) {
      toast({
        variant: "destructive",
        description: emailError?.response?.data?.error
      });
    }
  }, [emailResponse, emailError, navigate, toast]);

  //google signin
  const handleGoogleSignin = () => {
    googleSignIn();
  };

  useEffect(() => {
    if (code) {
      runGoogleLogin(googleSigninService({ code }));
    }
  }, [code, runGoogleLogin]);

  useMemo(() => {
    if (googleResponse?.status === 200) {
      localStorage.setItem("vobbOSAccess", googleResponse?.data?.data?.access_token);
      localStorage.setItem("vobbOSRefresh", googleResponse?.data?.data?.refresh_token);
      navigate(Routes.overview);
      toast({
        description: googleError?.response?.data?.message
      });
    } else if (googleError) {
      toast({
        variant: "destructive",
        description: googleError?.response?.data?.error
      });
    }
  }, [googleResponse, googleError, navigate, toast]);

  return (
    <>
      <Login2FA {...twoFactor} close={() => setTwoFactor({ show: false })} email={email} />
      <LoginUI
        submit={submit}
        loading={emailStatus.isPending || googleStatus.isPending}
        handleGoogleSignin={handleGoogleSignin}
      />
    </>
  );
};

export { Login };
