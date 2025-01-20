import { createPipelineStageService } from "api";
import { EditPipelineStagesModal, toast } from "components";
import { useApiRequest } from "hooks";
import React, { useMemo } from "react";
import { ModalProps } from "types";
interface EditPipelineStagesProps extends ModalProps {
  callback?: () => void;
}

const EditPipelineStages: React.FC<EditPipelineStagesProps> = ({ callback, show, close }) => {
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const submit = (data) => {
    run(createPipelineStageService(data));
  };

  useMemo(() => {
    if (response?.status === 201) {
      toast({
        description: response?.data?.message
      });
      callback?.();
      close();
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error]);

  return (
    <>
      <EditPipelineStagesModal
        show={show}
        close={close}
        submit={submit}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { EditPipelineStages };
