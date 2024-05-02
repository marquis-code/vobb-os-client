import { signupService } from "api";
import { useToast } from "components";
import { useApiRequest } from "hooks";
import { SignupData, SignupUI } from "modules";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Signup = () => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const submit = (data: SignupData) => {
    run(signupService(data));
  };

  useMemo(() => {
    if (response?.status === 201) {
      localStorage.setItem("vobbOSAccess", response?.data?.data?.token);
      const email = encodeURIComponent(response?.data?.data?.email);
      navigate(`${Routes.email_verify}?email=${email}`);
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate, toast]);

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
