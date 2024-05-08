import React, { useState, useMemo, useEffect } from "react";
import { LoginUI } from "modules";
import { Login2FA } from "./login2fa";
<<<<<<< HEAD
import { useApiRequest, useGoogleSignin } from "hooks";
import { emailLoginService, googleSigninService } from "api";
=======
import { useApiRequest } from "hooks";
import { emailLoginService } from "api";
>>>>>>> 6f14fd363a3bfbe6f14945b7ba4308b75847f812
import { loginData } from "types/auth";
import { toast } from "components";
import { Routes } from "router";
import { useNavigate } from "react-router-dom";

const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [twoFactor, setTwoFactor] = useState({
    show: false
  });
<<<<<<< HEAD
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
=======
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const navigate = useNavigate();

  const submit = (data: loginData) => {
    run(emailLoginService(data));
>>>>>>> 6f14fd363a3bfbe6f14945b7ba4308b75847f812
    setEmail(data.email);
  };

  useMemo(() => {
<<<<<<< HEAD
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
      if (googleResponse?.data?.status === "user_details") {
        localStorage.setItem("vobbOSAccess", googleResponse?.data?.token);
        navigate(Routes.onboarding);
      } else {
        localStorage.setItem("vobbOSAccess", googleResponse?.data?.data?.access_token);
        localStorage.setItem("vobbOSRefresh", googleResponse?.data?.data?.refresh_token);
        navigate(Routes.overview);
      }
      toast({
        description: googleResponse?.data?.message
      });
    } else if (googleError) {
=======
    if (response?.status === 200) {
      if (response?.data["2fa_status"]) {
        localStorage.setItem("vobbOSAccess", response?.data?.data?.token);
        setTwoFactor({ show: true });
      } else if (response?.data?.status) {
        localStorage.setItem("vobbOSAccess", response?.data?.data?.token);
        navigate(Routes.onboarding_user_details);
      } else {
        localStorage.setItem("vobbOSAccess", response?.data?.data?.access_token);
        localStorage.setItem("vobbOSRefresh", response?.data?.data?.refresh_token);
        navigate(Routes.overview);
      }
      toast({
        description: response?.data?.message
      });
    } else if (error) {
>>>>>>> 6f14fd363a3bfbe6f14945b7ba4308b75847f812
      toast({
        variant: "destructive",
        description: googleError?.response?.data?.error
      });
    }
<<<<<<< HEAD
  }, [googleResponse, googleError, navigate, toast]);
=======
  }, [response, error, navigate]);
>>>>>>> 6f14fd363a3bfbe6f14945b7ba4308b75847f812

  return (
    <>
      <Login2FA {...twoFactor} close={() => setTwoFactor({ show: false })} email={email} />
<<<<<<< HEAD
      <LoginUI
        submit={submit}
        loading={emailStatus.isPending || googleStatus.isPending}
        handleGoogleSignin={handleGoogleSignin}
      />
=======
      <LoginUI submit={submit} loading={requestStatus.isPending} />
>>>>>>> 6f14fd363a3bfbe6f14945b7ba4308b75847f812
    </>
  );
};

export { Login };
