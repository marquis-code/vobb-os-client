import { googleSignupService, signupService } from "api";
import { useApiRequest } from "hooks";
import { useGoogleSignin } from "hooks/useGoogleSignin";
import { SignupData, SignupUI } from "modules";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

const Signup = () => {
  const navigate = useNavigate();
  const { authorizationCode: code, googleSignIn } = useGoogleSignin({
    redirectUrl
  });
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const handleEmailSignup = (data: SignupData) => {
    run(signupService(data));
  };

  const handleGoogleSignUp = () => {
    googleSignIn();
  };

  useEffect(() => {
    if (code) {
      run(googleSignupService({ code }));
    }
  }, [code, run]);

  useMemo(() => {
    if (response?.status === 201) {
      localStorage.setItem("vobbOSAccess", response?.data?.data?.token);
      const email = encodeURIComponent(response?.data?.data?.email);
      navigate(`${Routes.email_verify}?email=${email}`);
    } else if (error) {
      console.error(error);
    }
  }, [response, error, navigate]);

  return (
    <>
      <SignupUI
        submit={handleEmailSignup}
        handleGoogleSignup={handleGoogleSignUp}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { Signup };
