import { OTPModal } from "components";
import { ModalProps } from "types/interfaces";

interface Login2FAProps extends ModalProps {
  // email: string
}

const Login2FA: React.FC<Login2FAProps> = ({ show, close }) => {
  return (
    <>
      <OTPModal
        title="Two-Factor Authentication"
        text={`We’ve sent a 6-character code to test@yopmail.com. The code expires shortly, so please enter it soon.`}
        show={show}
        close={close}
      />
    </>
  );
};

export { Login2FA };
