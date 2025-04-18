import { useState, useMemo, useEffect } from "react";
import { LoginUI, initLogin } from "modules";
import { Login2FA } from "./login2fa";
import { useApiRequest, useGoogleSignin } from "hooks";
import { emailLoginService, googleSigninService } from "api";
import { loginData } from "types/auth";
import { toast } from "components";
import { Routes } from "router";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [loginReq, setLoginReq] = useState<loginData>(initLogin);
  const [twoFactor, setTwoFactor] = useState({
    show: false
  });
  const navigate = useNavigate();

  const { authorizationCode: code, googleSignIn } = useGoogleSignin({
    pathname: Routes.login
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

  const handleEmail = (data: loginData) => {
    runEmailLogin(emailLoginService(data));
    setLoginReq(data);
  };

  useMemo(() => {
    if (emailResponse?.status === 200) {
      if (emailResponse?.data["2fa_status"]) {
        Cookies.set("vobbOSAccess", emailResponse?.data?.data?.token, {
          secure: true,
          sameSite: "Strict"
        });
        setTwoFactor({ show: true });
      } else if (emailResponse?.data?.status) {
        Cookies.set("vobbOSAccess", emailResponse?.data?.data?.token, {
          secure: true,
          sameSite: "Strict"
        });
        if (emailResponse?.data?.status === "email_verify") {
          const email = encodeURIComponent(emailResponse?.data?.data?.email);
          navigate(`${Routes.email_verify}?email=${email}`);
        } else navigate(`${Routes[`onboarding_${emailResponse?.data?.status}`]}`);
      } else {
        Cookies.set("vobbOSAccess", emailResponse?.data?.data?.access_token, {
          secure: true,
          sameSite: "Strict"
        });
        Cookies.set("vobbOSRefresh", emailResponse?.data?.data?.refresh_token, {
          secure: true,
          sameSite: "Strict"
        });
        navigate(Routes.overview);
      }
      toast({
        description: emailResponse?.data?.message
      });
    } else if (emailError) {
      toast({
        variant: "destructive",
        description: emailError?.response?.data?.error
      });
    }
  }, [emailResponse, emailError, navigate]);

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
      if (googleResponse?.data?.status) {
        Cookies.set("vobbOSAccess", googleResponse?.data?.token, {
          secure: true,
          sameSite: "Strict"
        });
        navigate(`${Routes[`onboarding_${googleResponse?.data?.status}`]}`);
      } else {
        Cookies.set("vobbOSAccess", googleResponse?.data?.data?.access_token, {
          secure: true,
          sameSite: "Strict"
        });
        Cookies.set("vobbOSRefresh", googleResponse?.data?.data?.refresh_token, {
          secure: true,
          sameSite: "Strict"
        });
        navigate(Routes.overview);
      }
      toast({
        description: googleResponse?.data?.message
      });
    } else if (googleError) {
      toast({
        variant: "destructive",
        description: googleError?.response?.data?.error
      });
    }
  }, [googleResponse, googleError, navigate]);

  return (
    <>
      <Login2FA
        {...twoFactor}
        close={() => setTwoFactor({ show: false })}
        email={loginReq?.email ?? ""}
      />
      <LoginUI
        submit={handleEmail}
        loading={emailStatus.isPending || googleStatus.isPending}
        handleGoogleSignin={handleGoogleSignin}
      />
    </>
  );
};

export { Login };
