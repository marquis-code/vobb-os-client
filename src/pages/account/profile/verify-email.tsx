import { personalEmailUpdateVerifyService } from "api";
import { OTPModal, toast } from "components";
import { useUserContext } from "context";
import { useApiRequest, useFetchUser } from "hooks";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ModalProps } from "types";

const VerifyEmail: React.FC<ModalProps> = ({ show, close }) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const { userDetails } = useUserContext();
  const { fetchUserDetails } = useFetchUser();

  const handleSubmit = (data: { otp: string }) => {
    run(personalEmailUpdateVerifyService(data));
  };

  useMemo(() => {
    if (response?.status === 200) {
      close();
      fetchUserDetails();
      toast({
        description: response?.data?.message
      });
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <OTPModal
        title="Verify Your Email"
        text={`We’ve sent a 6-character code to ${userDetails?.pendingEmail} The code expires shortly, so please enter it soon.`}
        show={show}
        close={close}
        submit={handleSubmit}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { VerifyEmail };
