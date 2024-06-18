import { AddAttributeModal } from "components";
import { ModalProps } from "types";

const AddClientAttribute = ({ show, close }: ModalProps) => {
  return (
    <>
      <AddAttributeModal submit={console.log} close={close} show={show} />
    </>
  );
};

export { AddClientAttribute };
