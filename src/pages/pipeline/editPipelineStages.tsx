import { editPipelineStagesService } from "api";
import { EditPipelineStagesModal, toast } from "components";
import { useApiRequest } from "hooks";
import React, { useMemo } from "react";
import { EditPipelineStagesDto, ModalProps, PipelineTableData } from "types";
interface EditPipelineStagesProps extends ModalProps {
  callback: () => void;
  mode: "edit" | "create";
  pipelineTableData?: PipelineTableData | null;
}

const EditPipelineStages: React.FC<EditPipelineStagesProps> = ({ 
  show, 
  close, 
  mode, 
  callback,
  pipelineTableData}) => {

      const { 
            run, 
            data, 
            requestStatus, 
            error
          } = useApiRequest({});

          const onSubmit = (id, data: EditPipelineStagesDto) => {
            run(editPipelineStagesService(id, data))
          }

          useMemo(() => {
            if (data?.status === 200) {
              toast({
                description: data?.data?.message
              });
              close()
              callback()
            } else if (error) {
              toast({
                variant: "destructive",
                description: error?.response?.data?.error
              });
            }
          }, [data, error]);

  return (
    <>
      <EditPipelineStagesModal
      submit={onSubmit}
        show={show}
        close={close}
        editPipelineStagesStatus={requestStatus}
        initialMode={mode}
        pipelineTableData={pipelineTableData}
      />
    </>
  );
};

export { EditPipelineStages };