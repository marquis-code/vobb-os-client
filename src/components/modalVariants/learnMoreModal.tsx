import { ModalProps } from "types/interfaces";
import { Modal } from "../modal";
import { Button } from "../ui";
import { Cross1Icon } from "@radix-ui/react-icons";

interface LearnMoreModalProps extends ModalProps {
  title: string;
  text1: string;
  text2?: string;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ show, close, title, text1, text2 }) => {
  return (
    <>
      <Modal contentClassName="max-w-[944px] p-0" show={show} close={close}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-vobb-neutral-20">
          {" "}
          <h2 className="text-lg font-bold">{title}</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"} className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-6 h-6" />
          </Button>
        </div>
        <div className="text-sm text-vobb-neutral-70">
          <p>{text1}</p>
          {text2 ? <p className="mt-4">{text2}</p> : ""}
        </div>
      </Modal>
    </>
  );
};

export { LearnMoreModal };
