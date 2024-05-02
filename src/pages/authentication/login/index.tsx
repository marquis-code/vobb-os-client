import { LoginUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { Login2FA } from "./login2fa";
import { useGoogleSignin } from "hooks/useGoogleSignin";
import { useApiRequest } from "hooks";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { googleSigninService } from "api";

const redirectUrl = process.env.REACT_APP_REDIRECT_LOGIN;

const Login = () => {
  const [twoFactor, setTwoFactor] = useState({
    show: false
  });
  const navigate = useNavigate();
  const { authorizationCode: code, googleSignIn } = useGoogleSignin({
    redirectUrl
  });
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const handleGoogleSignin = () => {
    googleSignIn();
  };

  useEffect(() => {
    if (code) {
      run(googleSigninService({ code }));
    }
  }, [code, run]);

  useMemo(() => {
    if (response?.status === 200) {
      localStorage.setItem(
        "vobbOSAccess",
        response?.data?.data?.token ?? response?.data?.data?.access_token
      );
      localStorage.setItem(
        "vobbOSRefresh",
        response?.data?.data?.token ?? response?.data?.data?.refresh_token
      );
      if (response?.data["2fa_status"]) {
        setTwoFactor({ show: true });
      } else {
        navigate(Routes.overview);
      }
    } else if (error) {
      console.log(error);
    }
  }, [response, error, navigate]);

  return (
    <>
      <Login2FA {...twoFactor} close={() => setTwoFactor({ show: false })} />
      <LoginUI handleGoogleSignin={handleGoogleSignin} loading={requestStatus?.isPending} />
    </>
  );
};

export { Login };
