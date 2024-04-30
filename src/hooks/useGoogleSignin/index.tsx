import { useState, useEffect } from "react";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const useGoogleSignin = () => {
  const [authorizationCode, setAuthorizationCode] = useState<string | null>(null);
  const googleSignIn = () => {
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
