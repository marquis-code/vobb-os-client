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
      <Modal show={show} close={close} contentClassName="p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-15">
          <h2 className="text-lg font-medium text-vobb-neutral-95">{title}</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <div className="p-4 mb-8">
          <p className="mb-10">{text}</p>
          <form className="flex justify-center align-center">
            <CustomInputOTP value={otp} onChange={setOTP} />
          </form>
        </div>

        <div className="border-t border-vobb-neutral-15 flex justify-end gap-2 items-center p-4 bg-vobb-neutral-25">
          <Button className="text-error-10" size={"default"} variant={"outline"}>
            Cancel
          </Button>
          <Button
            loading={loading}
            disabled={otp.length !== 6}
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
