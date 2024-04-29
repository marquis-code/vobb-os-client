import { signupService } from "api";
import { useAuthContext } from "context";
import { useApiRequest } from "hooks";
import { SignupData, SignupUI } from "modules";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Signup = () => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const navigate = useNavigate();
  const { handleSetResponse } = useAuthContext();

  const submit = (data: SignupData) => {
    run(signupService(data));
  };

  useEffect(() => {
    if (requestStatus.isResolved && response?.status === 201) {
      localStorage.setItem("vobbOSAccess", response?.data?.data?.token);
      handleSetResponse(response?.data?.data?.email, response?.data?.message);
      navigate(Routes.email_verify);
    }
  }, [requestStatus, response, handleSetResponse, navigate]);

  return (
    <>
      <SignupUI
        submit={submit}
        clear={requestStatus.isResolved}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { Signup };
