import { AccountSecurityUI } from "modules";
import { useState } from "react";
import { Setup2FA } from "./setup2fa";

const AccountSecurity = () => {
  const [twoFactor, setTwoFactor] = useState({
    show: false
  });

  return (
    <>
      <Setup2FA {...twoFactor} close={() => setTwoFactor({ show: false })} />
      <AccountSecurityUI
        twoFactor={{
          handle2FA: () => setTwoFactor({ show: true }),
          enable2FA: false
        }}
      />
    </>
  );
};

export { AccountSecurity };
