import { toggle2faStusService } from "api";
import { OTPModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types/interfaces";

interface Setup2FAProps extends ModalProps {
  // email: string
}

const Setup2FA: React.FC<Setup2FAProps> = ({ show, close }) => {
  const { run, data: response, error } = useApiRequest({});

  const handleSubmit = ({ otp }) => {
    run(toggle2faStusService({ otp }));
  };
  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      close();
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
        title="Two-Factor Authentication"
        text={`We’ve sent a 6-character code to test@yopmail.com. The code expires shortly, so please enter it soon.`}
        show={show}
        close={close}
        submit={handleSubmit}
      />
    </>
  );
};

export { Setup2FA };
