import { ModalProps } from "types/interfaces";
import { Modal } from "../modal";
import { Button } from "../ui";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

interface ConfirmationModalProps extends ModalProps {
  text: ReactNode | string;
  handleContinue: () => void;
  isDestructive?: boolean;
  loading: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  close,
  text,
  handleContinue,
  isDestructive,
  loading
}) => {
  return (
    <>
      <Modal contentClassName="max-w-[944px] p-0" show={show} close={close} testId="confirm-modal">
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-15">
          <h2 className="text-lg font-medium text-vobb-neutral-95">Confirm Action</h2>
          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <p className="text-sm text-vobb-neutral-70 p-4 ">{text}</p>
        <div className="flex justify-end gap-2 items-center p-4 bg-vobb-neutral-25">
          <Button
            onClick={close}
            className={isDestructive ? "" : "text-error-10"}
            size={"default"}
            variant={"outline"}
            disabled={loading}>
            Cancel
          </Button>
          <Button
            className={isDestructive ? "bg-error-10 border-error-10" : ""}
            size={"default"}
            variant={"fill"}
            onClick={handleContinue}
            loading={loading}>
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { ConfirmationModal };
