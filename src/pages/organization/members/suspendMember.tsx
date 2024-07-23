import { SuspendMemberModal } from "components";
import { ModalProps } from "types";

interface SuspendMemberProps extends ModalProps {
  id: string;
  name: string;
}

const SuspendMember = ({ show, close, id, name }: SuspendMemberProps) => {
  const handleContinue = () => {
    console.log(id, name);
  };

  return (
    <>
      <SuspendMemberModal submit={handleContinue} close={close} show={show} />
    </>
  );
};

export { SuspendMember };
