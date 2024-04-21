import { LoginUI } from "modules";
import { useState } from "react";
import { Login2FA } from "./login2fa";

const Login = () => {
  const [twoFactor, setTwoFactor] = useState({
    show: false
  });

  return (
    <>
      <Login2FA {...twoFactor} close={() => setTwoFactor({ show: false })} />
      <LoginUI />
    </>
  );
};

export { Login };
