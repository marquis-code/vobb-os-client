import { AccountProfileUI } from "modules";
import { useMemo, useState } from "react";
import { ChangeEmail } from "./change-email";
import { VerifyEmail } from "./verify-email";
import { useApiRequest, useFetchUser } from "hooks";
import { toast } from "components";
import { personalAccountUpdateService, personalEmailResendVerifyService } from "api";

const AccountProfile = () => {
  const [changeEmail, setChangeEmail] = useState(false);
  const [emailOTP, setEmailOTP] = useState(false);
  const { fetchUserDetails } = useFetchUser();
  const {
    run: runUpdate,
    data: updateResponse,
    error: updateError,
    requestStatus: updateStatus
  } = useApiRequest({});
  const { run: runResend, data: resendResponse, error: resendError } = useApiRequest({});

  const updateProfile = (formData: FormData) => {
    runUpdate(personalAccountUpdateService(formData));
  };

  const handleResendEmailVerify = () => {
    runResend(personalEmailResendVerifyService());
  };

  useMemo(() => {
    if (updateResponse?.status === 200) {
      toast({
        description: updateResponse?.data?.message
      });
      fetchUserDetails();
    } else if (updateError) {
      toast({
        variant: "destructive",
        description: updateError?.response?.data?.error
      });
    }
  }, [updateResponse, updateError]);

  useMemo(() => {
    if (resendResponse?.status === 200) {
      setEmailOTP(true);
      toast({
        description: resendResponse?.data?.message
      });
    } else if (resendError) {
      toast({
        variant: "destructive",
        description: resendError?.response?.data?.error
      });
    }
  }, [resendResponse, resendError]);

  return (
    <>
      <ChangeEmail
        callback={() => {
          setEmailOTP(true);
          fetchUserDetails();
        }}
        show={changeEmail}
        close={() => setChangeEmail(false)}
      />
      <VerifyEmail show={emailOTP} close={() => setEmailOTP(false)} />
      <AccountProfileUI
        submit={updateProfile}
        loading={updateStatus.isPending}
        handleChangeEmail={() => setChangeEmail(true)}
        handleResendEmail={handleResendEmailVerify}
      />
    </>
  );
};

export { AccountProfile };

export * from "./update-job-title";
