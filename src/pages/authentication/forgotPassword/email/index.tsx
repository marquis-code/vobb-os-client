import { forgotPasswordService } from "api";
import { toast } from "components";
import { useApiRequest } from "hooks";
import { EmailUI } from "modules";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import Cookies from "js-cookie";

const Email = () => {
  const [email, setEmail] = useState("");
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const handleForgotPassword = (data: { email: string }) => {
    run(forgotPasswordService(data));
    setEmail(data.email);
  };
  const navigate = useNavigate();

  useMemo(() => {
    if (response?.status === 200) {
      Cookies.set("vobbOSAccess", response?.data?.data?.token, {
        secure: true,
        sameSite: "Strict"
      });
      const token = response?.data?.data?.token;
      navigate(`${Routes.forgot_password_verify}?email=${email}&token=${token}`);
      toast({
        description: response?.data?.message
      });
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate, email]);

  return (
    <>
      <EmailUI submit={handleForgotPassword} loading={requestStatus.isPending} />
    </>
  );
};

export { Email };
