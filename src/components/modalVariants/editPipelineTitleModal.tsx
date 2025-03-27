import { useEffect, useRef } from "react";
import { InputActionModal } from "components";
import { PipelineTableData } from "types";

interface EditPipelineTitleModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: PipelineTableData;
  editTitle: (data: {name: string}) => void;
  editPipelineTitleStatus: {
    isResolved: boolean;
    isPending: boolean;
    isRejected: boolean;
    isIdle: boolean;
};
}

export const EditPipelineTitleModal: React.FC<EditPipelineTitleModalProps> = ({
  isOpen,
  setIsOpen,
  data,
  editTitle,
  editPipelineTitleStatus
}) => {

  
  const modalRef = useRef(null);

  const handleConfirm = (inputValue: string) => {
    // Only trigger an API call if the title has changed
    if (inputValue === data.name) {
      setIsOpen(false);
      return;
    }
    editTitle({ name: inputValue })
  };

  return (
    <InputActionModal
      modalView={isOpen}
      setModalView={setIsOpen}
      modalRef={modalRef}
      onConfirm={handleConfirm}
      prefilledValue={data.name}
      placeholder="Enter new title"
      loading={editPipelineTitleStatus.isPending}
    />
  );
};