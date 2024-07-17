import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Modal } from "components";
import { ModalProps } from "types";

interface InviteMemberModalProps extends ModalProps {
  submit: (data) => void;
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ submit, close, show }) => {
  return (
    <>
      <Modal contentClassName="max-w-[800px]" show={show} close={close}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Invite Member</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { InviteMemberModal };
