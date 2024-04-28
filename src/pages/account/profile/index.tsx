import { AccountProfileUI } from "modules";
import { useState } from "react";
import { ChangeEmail } from "./change-email";
import { VerifyEmail } from "./verify-email";

const AccountProfile = () => {
  const [changeEmail, setChangeEmail] = useState(false);
  const [emailOTP, setEmailOTP] = useState(false);
  return (
    <>
      <ChangeEmail
        callback={() => setEmailOTP(true)}
        show={changeEmail}
        close={() => setChangeEmail(false)}
      />
      <VerifyEmail email="" show={emailOTP} close={() => setEmailOTP(false)} />
      <AccountProfileUI handleChangeEmail={() => setChangeEmail(true)} />
    </>
  );
};

export { AccountProfile };
