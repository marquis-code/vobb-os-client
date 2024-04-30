import { signupService } from "api";
import { useToast } from "components";
import { useApiRequest } from "hooks";
import { SignupData, SignupUI } from "modules";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "router";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const Signup = () => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  const submit = (data: SignupData) => {
    run(signupService(data));
  };

  const googleSignin = () => {
    const clientId = CLIENT_ID;
    const redirectUri = "http://localhost:3000/login";
    const scope = "email profile openid";
    const responseType = "code";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(
      scope
    )}&response_type=${responseType}&access_type=offline&prompt=consent`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    if (requestStatus.isResolved && response?.status === 201) {
      localStorage.setItem("vobbOSAccess", response?.data?.data?.token);
      const email = encodeURIComponent(response?.data?.data?.email);
      navigate(`${Routes.email_verify}?email=${email}`);
    } else if (error) {
      toast({
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate, requestStatus, run, location, toast]);

  return (
    <>
      <SignupUI
        submit={submit}
        handleGoogleSigniIn={googleSignin}
        clear={requestStatus.isResolved}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { Signup };
