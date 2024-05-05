import { googleSignupService, signupService } from "api";
import { useToast } from "components";
import { useApiRequest } from "hooks";
import { useGoogleSignin } from "hooks/useGoogleSignin";
import { SignupData, SignupUI } from "modules";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { authorizationCode: code, googleSignIn } = useGoogleSignin({
    redirectUrl
  });
  const {
    run: runEmailSignup,
    data: emailResponse,
    requestStatus: emailStatus,
    error: emailError
  } = useApiRequest({});
  const {
    run: runGoogleSignup,
    data: googleResponse,
    requestStatus: googleStatus,
    error: googleError
  } = useApiRequest({});

  //email signup
  const handleEmailSignup = (data: SignupData) => {
    runEmailSignup(signupService(data));
  };

  useMemo(() => {
    if (emailResponse?.status === 201) {
      localStorage.setItem("vobbOSAccess", emailResponse?.data?.data?.token);
      const email = encodeURIComponent(emailResponse?.data?.data?.email);
      navigate(`${Routes.email_verify}?email=${email}`);
      toast({
        description: emailResponse?.data?.message
      });
    } else if (emailError) {
      toast({
        variant: "destructive",
        description: emailError?.response?.data?.error
      });
    }
  }, [emailResponse, emailError, navigate, toast]);

  //google signup
  const handleGoogleSignUp = () => {
    googleSignIn();
  };

  useEffect(() => {
    if (code) {
      runGoogleSignup(googleSignupService({ code }));
    }
  }, [code, runGoogleSignup]);

  useMemo(() => {
    if (googleResponse?.status === 201) {
      localStorage.setItem("vobbOSAccess", googleResponse?.data?.data?.token);
      navigate(Routes.onboarding);
      toast({
        description: googleResponse?.data?.message
      });
    } else if (googleError) {
      toast({
        variant: "destructive",
        description: googleError?.response?.data?.error
      });
    }
  }, [googleResponse, googleError, navigate, toast]);

  return (
    <>
      <SignupUI
        submit={handleEmailSignup}
        clear={emailStatus.isResolved}
        handleGoogleSignup={handleGoogleSignUp}
        loading={emailStatus.isPending || googleStatus.isPending}
      />
    </>
  );
};

export { Signup };
