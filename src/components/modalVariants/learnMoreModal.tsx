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
      <Modal contentClassName="max-w-[600px]" show={show} close={close}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <Button onClick={close} variant={"ghost"} size={"icon"}>
            <Cross1Icon stroke="currentColor" strokeWidth={1} />
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
