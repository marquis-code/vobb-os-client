import { AccountProfileUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { ChangeEmail } from "./change-email";
import { VerifyEmail } from "./verify-email";
import { useApiRequest, useFetchUser } from "hooks";
import { toast } from "components";
import { personalAccountUpdateService } from "api";

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

  const updateProfile = (formData: FormData) => {
    runUpdate(personalAccountUpdateService(formData));
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

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <ChangeEmail
        callback={() => setEmailOTP(true)}
        show={changeEmail}
        close={() => setChangeEmail(false)}
      />
      <VerifyEmail show={emailOTP} close={() => setEmailOTP(false)} />
      <AccountProfileUI
        updateProfile={updateProfile}
        loadingUpdate={updateStatus.isPending}
        handleChangeEmail={() => setChangeEmail(true)}
      />
    </>
  );
};

export { AccountProfile };
