import { ModalProps } from "types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { CustomInputOTP } from "../form";
import { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

interface OTPModalProps extends ModalProps {
  title: string;
  text: string;
  submit: (data: { otp: string }) => void;
  loading?: boolean;
}

const OTPModal: React.FC<OTPModalProps> = ({ show, close, text, title, submit, loading }) => {
  const [otp, setOTP] = useState("");
  return (
    <>
      <Modal show={show} close={close}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <p className="mb-12">{text}</p>
        <form className="mb-16 flex justify-center align-center">
          <CustomInputOTP value={otp} onChange={setOTP} />
        </form>

        <div className="flex justify-end gap-2">
          <Button className="text-error-10" size={"default"} variant={"outline"}>
            Cancel
          </Button>
          <Button
            loading={loading}
            disabled={otp.length !== 6 || loading}
            size={"default"}
            variant={"fill"}
            onClick={() => submit({ otp })}>
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { OTPModal };
