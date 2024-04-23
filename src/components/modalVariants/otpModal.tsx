import { ModalProps } from "types/interfaces";
import { Modal } from "../modal";
import { Button } from "../ui";
import { CustomInputOTP } from "../form";
import { useState } from "react";

interface OTPModalProps extends ModalProps {
  show: boolean;
  close: () => void;
  title: string;
  text: string;
}

const OTPModal: React.FC<OTPModalProps> = ({ show, close, text, title }) => {
  const [otp, setOTP] = useState("");
  return (
    <>
      <Modal show={show} close={close}>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-12">{text}</p>
        <form className="mb-16 flex justify-center align-center">
          <CustomInputOTP value={otp} onChange={setOTP} />
        </form>
        <div className="flex justify-end gap-2">
          <Button className="text-error-10" size={"default"} variant={"outline"}>
            Cancel
          </Button>
          <Button disabled={otp.length !== 6} size={"default"} variant={"fill"}>
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { OTPModal };
