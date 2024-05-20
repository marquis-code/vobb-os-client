import { OrgProfileUI } from "modules";
import { ChangeEmail } from "./change-email";
import { VerifyEmail } from "./verify-email";
import { useState } from "react";

const OrgProfile = () => {
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
      <OrgProfileUI handleChangeEmail={() => setChangeEmail(true)} />
    </>
  );
};

export { OrgProfile };
