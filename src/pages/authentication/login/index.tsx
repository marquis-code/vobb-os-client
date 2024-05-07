import React, { useState, useMemo } from "react";
import { LoginUI } from "modules";
import { Login2FA } from "./login2fa";
import { useApiRequest } from "hooks";
import { emailLoginService } from "api";
import { loginData } from "types/auth";
import { toast } from "components";
import { Routes } from "router";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [twoFactor, setTwoFactor] = useState({
    show: false
  });
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const navigate = useNavigate();

  const submit = (data: loginData) => {
    run(emailLoginService(data));
    setEmail(data.email);
  };

  useMemo(() => {
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
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate]);

  return (
    <>
      <Login2FA {...twoFactor} close={() => setTwoFactor({ show: false })} email={email} />
      <LoginUI submit={submit} loading={requestStatus.isPending} />
    </>
  );
};

export { Login };
