import { createPipelineRequestBody, createPipelineService } from "api";
import { CreatePipelineData, CreatePipelineModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
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
      toast({
        description: response?.data?.message
      });
      callback?.();
      close();
      handleOpenEditPipelineStages();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
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
    </>
  );
};

export { CreatePipeline };
