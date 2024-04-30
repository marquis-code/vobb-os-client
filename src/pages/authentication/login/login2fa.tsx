import { login2faService } from "api";
import { OTPModal, useToast } from "components";
import { useApiRequest } from "hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { ModalProps } from "types/interfaces";

interface Login2FAProps extends ModalProps {
  loading: boolean;
}

const Login2FA: React.FC<Login2FAProps> = ({ show, close, loading }) => {
  const { toast } = useToast();
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const navigate = useNavigate();

  const submit = (data: { otp: string }) => {
    run(login2faService(data));
  };

  useEffect(() => {
    if (requestStatus.isResolved && response?.status === 200) {
      localStorage.setItem("vobbOSAccess", response?.data?.data?.access_token);
      navigate(Routes.overview);
    } else if (error) {
      toast({
        description: error?.response?.data?.error
      });
    }
  }, [response, error, requestStatus, navigate, toast]);
  return (
    <>
      <OTPModal
        title="Two-Factor Authentication"
        text={`We’ve sent a 6-character code to your email. The code expires shortly, so please enter it soon.`}
        show={show}
        close={close}
        submit={submit}
        loading={loading}
      />
    </>
  );
};

export { Login2FA };
