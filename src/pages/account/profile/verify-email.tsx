import { OTPModal } from "components";
import { ModalProps } from "types/interfaces";

interface VerifyEmailProps extends ModalProps {
  email: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ show, close, email }) => {
  return (
    <>
      <OTPModal
        title="Verify Your Email"
        text={`We’ve sent a 6-character code to test@yopmail.com. The code expires shortly, so please enter it soon.`}
        show={show}
        close={close}
      />
    </>
  );
};

export { VerifyEmail };
