import { Button, Modal } from "components";
import { ModalProps } from "types";

interface ConfirmModalProps extends ModalProps {
  action: () => void;
  loading?: boolean;
  width?: number;
  title: string;
  description: string;
}

const ConfirmDangerousActionModal = ({
  show,
  close,
  action,
  loading,
  title,
  width,
  description
}: ConfirmModalProps) => {
  return (
    <Modal
      contentClassName={`p-0 ${!width ? "max-w-[260px]" : "w-fit"}`}
      show={show}
      close={close}
      testId="confirm-action-modal">
      <div
        style={{
          maxWidth: width
        }}
        className="rounded-lg bg-white border-[0.5px] border-[#ebecf0] shadow-[0px_1px_2px_0px_#1018280D]">
        <div className="border-b p-3">
          <p className="text-sm font-semibold text-[#101323] mb-1">{title}</p>
          <p className="text-xs text-[#667085]">{description}</p>
        </div>
        <div className="p-3 pt-2 flex justify-between">
          <Button
            onClick={() => close()}
            className="text-xs rounded-sm"
            size={"default"}
            variant={"outline"}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={action}
            disabled={loading}
            loading={loading}
            size={"default"}
            variant={"fill"}
            className="text-xs rounded-sm bg-[#d92d20] border-[#d92d20]">
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default ConfirmDangerousActionModal;
