import { createPipelineRequestBody, createPipelineService } from "api";
import {
  CreatePipelineData,
  CreatePipelineErrorModal,
  CreatePipelineModal,
  CreatePipelineSuccessModal
} from "components";
import { useApiRequest } from "hooks";
import { useMemo, useState } from "react";
import { ModalProps } from "types";

interface CreatePipelineProps extends ModalProps {
  callback?: () => void;
  handleStages: (pipeline: string) => void;
}

const CreatePipeline: React.FC<CreatePipelineProps> = ({ show, close, callback, handleStages }) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const submit = (data: CreatePipelineData) => {
    const requestBody: createPipelineRequestBody = {
      name: data.name
    };
    if (data.description && data.description.trim() !== "") {
      requestBody.description = data.description;
    }
    run(createPipelineService(requestBody));
  };

  useMemo(() => {
    if (response?.status === 201) {
      close();
      setShowSuccessModal(true);
      callback?.();
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
      <CreatePipelineSuccessModal
        show={showSuccessModal}
        close={() => setShowSuccessModal(false)}
        onEditPipelineStages={() => handleStages(response?.data?.data?._id)}
      />
      <CreatePipelineErrorModal
        show={showFailureModal}
        close={() => setShowFailureModal(false)}
        errorMessage={error?.response?.data?.error}
      />
    </>
  );
};

export { CreatePipeline };
