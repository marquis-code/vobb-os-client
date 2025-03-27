import { createPipelineRequestBody, createPipelineService } from "api";
import { useApiRequest } from "hooks";
import { SetStateAction, useMemo, useState } from "react";
import { ModalProps, PipelineTableData } from "types";
import { EditPipelineStages } from "./editPipelineStages";
import {
  CreatePipelineData,
  CreatePipelineErrorModal,
  CreatePipelineModal,
  CreatePipelineSuccessModal
} from "components";

interface CreatePipelineProps extends ModalProps {
  showSuccessModal: boolean;
  showFailureModal: boolean;
  setShowFailureModal: React.Dispatch<SetStateAction<boolean>>;
  setShowSuccessModal: React.Dispatch<SetStateAction<boolean>>;
  onPipelineUpdate: () => void;
}

export const CreatePipeline: React.FC<CreatePipelineProps> = ({
  show,
  close,
  showFailureModal,
  showSuccessModal,
  setShowFailureModal,
  setShowSuccessModal,
  onPipelineUpdate
}) => {
  const [editPipelineStagesModal, setEditPipelineStagesModal] = useState(false);
  const { run, data, requestStatus, error } = useApiRequest({});
  
  const submit = (data: CreatePipelineData) => {
    const requestBody: createPipelineRequestBody = {
      name: data.name
    };
    if (data.description && data.description.trim() !== "") {
      requestBody.description = data.description;
    }
    run(createPipelineService(requestBody));
  };

  const transformedPipelineData: PipelineTableData | null = useMemo(() => {
    if (data?.status === 201 && data?.data?.data) {
      const originalData = data.data.data;
      return {
        id: originalData._id,
        ...originalData
      };
    }
    return null;
  }, [data]);

  useMemo(() => {
    if (data?.status === 201) {
      close();
      setShowSuccessModal(true);
    } else if (error) {
      close();
      setShowFailureModal(true);
    }
  }, [data, error]);

  return (
    <>
      <CreatePipelineModal
        show={show}
        close={close}
        submit={submit}
        loading={requestStatus.isPending}
      />
      <EditPipelineStages
        mode="create"
        show={editPipelineStagesModal}
        close={() => setEditPipelineStagesModal(false)}
        callback={onPipelineUpdate}
        pipelineTableData={transformedPipelineData}
      />
      <CreatePipelineSuccessModal
        show={showSuccessModal}
        close={() => setShowSuccessModal(false)}
        onEditPipelineStages={() => setEditPipelineStagesModal(true)}
      />
      <CreatePipelineErrorModal
        show={showFailureModal}
        close={() => setShowFailureModal(false)}
        errorMessage={error?.response?.data?.error}
      />
    </>
  );
};