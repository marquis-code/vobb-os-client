import { OrgProfileUI } from "modules";
import { ChangeEmail } from "./change-email";
import { VerifyEmail } from "./verify-email";
import { useMemo, useState } from "react";
import { useApiRequest, useFetchOrganisation } from "hooks";
import { resendCodeOrgEmailsService, updateOrgNumbersService, updateOrgProfileService } from "api";
import { toast } from "components";

const OrgProfile = () => {
  const [changeEmail, setChangeEmail] = useState(false);
  const [emailOTP, setEmailOTP] = useState(false);
  const { fetchOrgDetails } = useFetchOrganisation();

  const {
    run: runUpdate,
    data: updateResponse,
    error: updateError,
    requestStatus: updateStatus
  } = useApiRequest({});
  const {
    run: runResend,
    data: resendResponse,
    error: resendError,
    requestStatus: resendStatus
  } = useApiRequest({});

  const {
    run: runNumbers,
    data: numbersResponse,
    error: numbersError,
    requestStatus: numbersStatus
  } = useApiRequest({});

  const updateProfile = (formData: FormData) => {
    runUpdate(updateOrgProfileService(formData));
  };

  const updateOrgNumbers = (data: { number: string; action: "primary" | "support" }) => {
    runNumbers(updateOrgNumbersService(data));
  };

  const handleResendEmailVerify = (data: { action: "primary" | "support" }) => {
    runResend(resendCodeOrgEmailsService(data));
  };

  useMemo(() => {
    if (updateResponse?.status === 200) {
      toast({
        description: updateResponse?.data?.message
      });
      fetchOrgDetails();
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

  useMemo(() => {
    if (numbersResponse?.status === 200) {
      toast({
        description: numbersResponse?.data?.message
      });
    } else if (numbersError) {
      toast({
        variant: "destructive",
        description: numbersError?.response?.data?.error
      });
    }
  }, [numbersResponse, numbersError]);

  return (
    <>
      <ChangeEmail
        callback={() => setEmailOTP(true)}
        show={changeEmail}
        close={() => setChangeEmail(false)}
      />
      <VerifyEmail show={emailOTP} close={() => setEmailOTP(false)} />
      <OrgProfileUI
        handleChangeEmail={() => setChangeEmail(true)}
        updateProfile={{
          submit: updateProfile,
          loading: updateStatus.isPending
        }}
        updateEmails={{
          submit: handleResendEmailVerify,
          loading: resendStatus.isPending
        }}
        updateNumbers={{
          submit: updateOrgNumbers,
          loading: numbersStatus.isPending
        }}
      />
    </>
  );
};

export { OrgProfile };
