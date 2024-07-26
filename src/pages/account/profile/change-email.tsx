import { personalEmailUpdateService } from "api";
import { ChangeEmailModal, toast } from "components";
import { useApiRequest, useFetchUser } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";

interface ChangeEmailProps extends ModalProps {
  callback: () => void;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ show, close, callback }) => {
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const { fetchUserDetails } = useFetchUser();

  const handleSubmit = (data: { email: string }) => {
    run(personalEmailUpdateService(data));
  };

  useMemo(() => {
    if (response?.status === 200) {
      fetchUserDetails();
      toast({
        description: response?.data?.message
      });
      callback();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <ChangeEmailModal
        show={show}
        close={close}
        submit={handleSubmit}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { ChangeEmail };
