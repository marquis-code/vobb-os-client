import { signupService } from "api";
import { useToast } from "components";
import { useApiRequest } from "hooks";
import { useGoogleSignin } from "hooks/useGoogleSignin";
import { SignupData, SignupUI } from "modules";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

const Signup = () => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const { authorizationCode: code, googleSignIn } = useGoogleSignin({
    redirectUrl
  });

  const handleEmailSignup = (data: SignupData) => {
    run(signupService(data));
  };

  const handleGoogleSignUp = () => {
    googleSignIn();
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
        submit={handleEmailSignup}
        clear={requestStatus.isResolved}
        handleGoogleSignup={handleGoogleSignUp}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { Signup };
