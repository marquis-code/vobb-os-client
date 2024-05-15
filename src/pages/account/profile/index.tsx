import { AccountProfileUI, ProfileFormData } from "modules";
import { useEffect, useMemo, useState } from "react";
import { ChangeEmail } from "./change-email";
import { VerifyEmail } from "./verify-email";
import { useApiRequest } from "hooks";
import { LoadingSpinner, toast } from "components";
import { personalAccountDetailsService, personalAccountUpdateService } from "api";

const AccountProfile = () => {
  const [changeEmail, setChangeEmail] = useState(false);
  const [emailOTP, setEmailOTP] = useState(false);
  const [personalProfile, setPersonalProfile] = useState(null);

  const {
    run: runProfile,
    data: profileResponse,
    error: profileError,
    requestStatus: profileStatus
  } = useApiRequest({});

  const {
    run: runUpdate,
    data: updateResponse,
    error: updateError,
    requestStatus: updateStatus
  } = useApiRequest({});

  const fetchProfile = () => {
    runProfile(personalAccountDetailsService());
  };
  const updateProfile = (formData: FormData) => {
    runUpdate(personalAccountUpdateService(formData));
  };
  useMemo(() => {
    if (profileResponse?.status === 200) {
      setPersonalProfile(profileResponse?.data?.data);
    } else if (profileError) {
      toast({
        variant: "destructive",
        description: profileError?.response?.data?.error
      });
    }
  }, [profileResponse, profileError]);

  useMemo(() => {
    if (updateResponse?.status === 200) {
      toast({
        description: updateResponse?.data?.message
      });
      runProfile(personalAccountDetailsService());
    } else if (updateError) {
      toast({
        variant: "destructive",
        description: updateError?.response?.data?.error
      });
    }
  }, [updateResponse, updateError]);

  useEffect(() => {
    fetchProfile();
  }, []);

  if (profileStatus.isPending) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <ChangeEmail
        callback={() => setEmailOTP(true)}
        show={changeEmail}
        close={() => setChangeEmail(false)}
      />
      <VerifyEmail fetchProfile={fetchProfile} show={emailOTP} close={() => setEmailOTP(false)} />
      <AccountProfileUI
        profile={personalProfile}
        updateProfile={updateProfile}
        loadingUpdate={updateStatus.isPending}
        handleChangeEmail={() => setChangeEmail(true)}
      />
    </>
  );
};

export { AccountProfile };
