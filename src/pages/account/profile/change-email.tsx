import { personalEmailUpdateService } from "api";
import { ChangeEmailModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { ModalProps } from "types";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";


interface ChangeEmailProps extends ModalProps {
  callback: () => void;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ show, close, callback }) => {
  const { run, data: response, error} = useApiRequest({});
  const navigate = useNavigate();

  const handleSubmit = (data: { email: string }) => {
    run(personalEmailUpdateService(data));
  };

  useMemo(() => {
    if (response?.status === 200) {
      callback();
      toast({
        description: response?.data?.message
      });
      navigate(`${Routes.profile}?email=${response?.data?.data}`);

    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <ChangeEmailModal show={show} close={close} submit={handleSubmit} />
    </>
  );
};

export { ChangeEmail };
