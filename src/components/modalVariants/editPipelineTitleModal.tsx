import { useEffect, useRef } from "react";
import { InputActionModal } from "components";
import { PipelineTableData } from "types";

interface EditPipelineTitleModalProps {
  isOpen: boolean;
  handleClose: () => void;
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
  handleClose,
  data,
  editTitle,
  editPipelineTitleStatus
}) => {


  const handleConfirm = (inputValue: string) => {
    // Only trigger an API call if the title has changed
    if (inputValue === data.name) {
      editTitle({ name: inputValue })
    }
    
  };

  return (
    <InputActionModal
      modalView={isOpen}
      handleClose={handleClose}
      onConfirm={handleConfirm}
      prefilledValue={data.name}
      placeholder="Enter new title"
      loading={editPipelineTitleStatus.isPending}
    />
  );
};