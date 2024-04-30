import { LoginUI } from "modules";
import { useEffect, useState } from "react";
import { Login2FA } from "./login2fa";
import { useApiRequest } from "hooks";
import { emailLoginService } from "api";
import { loginData } from "types/auth";
import { useToast } from "components";

const Login = () => {
  const [twoFactor, setTwoFactor] = useState({
    show: false
  });
  const { toast } = useToast();
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const submit = (data: loginData) => {
    run(emailLoginService(data));
  };

  useEffect(() => {
    if (requestStatus.isResolved && response?.status === 200) {
      setTwoFactor({ show: true });
    } else if (error) {
      toast({
        description: error?.response?.data?.error
      });
    }
  }, [response, error, requestStatus, toast]);

  return (
    <>
      <Login2FA
        {...twoFactor}
        close={() => setTwoFactor({ show: false })}
        loading={requestStatus.isPending}
      />
      <LoginUI submit={submit} loading={requestStatus.isPending} />
    </>
  );
};

export { Login };
