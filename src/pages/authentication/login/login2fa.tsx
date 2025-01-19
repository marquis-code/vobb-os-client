import { login2faService } from "api";
import { OTPModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types";
import Cookies from "js-cookie";

interface Login2FAProps extends ModalProps {
  email: string;
}

const Login2FA: React.FC<Login2FAProps> = ({ show, close, email }) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const navigate = useNavigate();

  const submit = (data: { otp: string }) => {
    run(login2faService(data));
  };

  useMemo(() => {
    if (response?.status === 200) {
      if (response?.data?.status) {
        Cookies.set("vobbOSAccess", response?.data?.token, {
          secure: true,
          sameSite: "Strict"
        });
        navigate(`${Routes[`onboarding_${response?.data?.status}`]}`);
      } else {
        Cookies.set("vobbOSAccess", response?.data?.data?.access_token, {
          secure: true,
          sameSite: "Strict"
        });
        Cookies.set("vobbOSRefresh", response?.data?.data?.refresh_token, {
          secure: true,
          sameSite: "Strict"
        });
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
      <OTPModal
        title="Two-Factor Authentication"
        text={`We’ve sent a 6-character code to ${email}. The code expires shortly, so please enter it soon.`}
        show={show}
        close={close}
        submit={submit}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { Login2FA };
