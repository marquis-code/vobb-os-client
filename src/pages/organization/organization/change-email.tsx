import { ChangeEmailModal } from "components";
import { ModalProps } from "types";

interface ChangeEmailProps extends ModalProps {
  callback: () => void;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ show, close, callback }) => {
  const handleSubmit = (email: string) => {
    console.log(email);
    callback();
  };

  return (
    <>
      <ChangeEmailModal show={show} close={close} submit={handleSubmit} />
    </>
  );
};

export { ChangeEmail };
