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
      <Modal contentClassName="max-w-[600px]" show={show} close={close} testId="confirm-modal">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Confirm Action</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"} data-testid="close-btn">
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
        <p className="text-sm text-vobb-neutral-70 mb-8">{text}</p>
        <div className="flex justify-end gap-2">
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
