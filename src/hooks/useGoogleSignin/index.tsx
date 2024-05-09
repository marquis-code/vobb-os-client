import { useState, useEffect } from "react";

const client_id = process.env.REACT_APP_API_GOOGLE_CLIENT_ID;

const useGoogleSignin = ({ redirectUrl }) => {
  const [authorizationCode, setAuthorizationCode] = useState<string | null>(null);
  const googleSignIn = () => {
    const scope = "email profile openid";
    const responseType = "code";
    const redirect = `http://${window.location.host}${redirectUrl}`; // window.location.host returns 'localhost:3000' without http://
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${encodeURIComponent(
      redirect
    )}&scope=${encodeURIComponent(
      scope
    )}&response_type=${responseType}&access_type=offline&prompt=consent`;

    window.location.href = authUrl;
  };

  const extractAuthorizationCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      setAuthorizationCode(code);
    }
  };

  useEffect(() => {
    extractAuthorizationCode();
  }, []);

  return { authorizationCode, googleSignIn };
};

export { useGoogleSignin };
