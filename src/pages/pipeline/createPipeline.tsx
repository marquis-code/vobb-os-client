import { IconPlus } from "@tabler/icons-react";
import { createPipelineRequestBody, createPipelineService } from "api";
import { Button, CreatePipelineData, CreatePipelineErrorModal, CreatePipelineModal, CreatePipelineSuccessModal } from "components";
import { useApiRequest } from "hooks";
import { Column, Row } from "layout";
import { useMemo, useState } from "react";
import { ModalProps } from "types";

interface CreatePipelineProps extends ModalProps {
  callback?: () => void;
  handleOpenEditPipelineStages: () => void;
  handleCloseEditPipelineStages: () => void;
}

const CreatePipeline: React.FC<CreatePipelineProps> = ({
  show,
  close,
  callback,
  handleOpenEditPipelineStages
}) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const submit = (data: CreatePipelineData) => {
    const requestBody: createPipelineRequestBody = {
      name: data.name,
      sector: data.sector.value
    };
    if (data.description && data.description.trim() !== "") {
      requestBody.description = data.description;
    }
    if (data.stages?.length) {
      requestBody.stages = data.stages;
    }
    run(createPipelineService(requestBody));
  };

  useMemo(() => {
    if (response?.status === 201) {
      setShowSuccessModal(true);
      callback?.();
      close();
    } else if (error) {
      close();
      setShowFailureModal(true);
    }
  }, [response, error]);


  return (
    <>
      <CreatePipelineModal
        show={show}
        close={close}
        submit={submit}
        loading={requestStatus.isPending}
      />
      <CreatePipelineSuccessModal show={showSuccessModal} close={() => setShowSuccessModal(false)} onEditPipelineStages={handleOpenEditPipelineStages} />
      <CreatePipelineErrorModal show={showFailureModal} close={() => setShowFailureModal(false)} errorMessage={error?.response?.data?.error} />
    </>
  );
};

export { CreatePipeline };
