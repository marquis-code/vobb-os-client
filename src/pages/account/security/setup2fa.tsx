import { toggle2faStusService } from "api";
import { OTPModal, toast } from "components";
import { useUserContext } from "context";
import { useApiRequest, useFetchUser } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types/interfaces";

const Setup2FA: React.FC<ModalProps> = ({ show, close }) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const { fetchUserDetails } = useFetchUser();
  const { userDetails } = useUserContext();

  const handleSubmit = ({ otp }) => {
    run(toggle2faStusService({ otp }));
  };
  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      fetchUserDetails();
      close();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);
  const email = userDetails?.email;
  return (
    <>
      <OTPModal
        title="Two-Factor Authentication"
        text={`We’ve sent a 6-character code to ${email}. The code expires shortly, so please enter it soon.`}
        show={show}
        close={close}
        submit={handleSubmit}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { Setup2FA };
