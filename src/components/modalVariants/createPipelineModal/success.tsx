import { IconPlus } from "@tabler/icons-react";
import { Modal } from "components/modal";
import { Button } from "components/ui";
import { Column, Row } from "layout";
import { FC } from "react";
import { ModalProps } from "types";

interface CreatePipelineSuccessModalProps extends ModalProps {
  onEditPipelineStages: () => void;
}

export const CreatePipelineSuccessModal:FC<CreatePipelineSuccessModalProps> = ({
      show,
      close,
      onEditPipelineStages
}) => {
      return (
            <Modal show={show} close={close} dialogClassName="p-0" contentClassName="p-0" testId="createPipeline-success-modal">
            <Column className="border">
              <Column className="px-4 pt-4 gap-2">
                <h2 className="text-sm font-bold text-vobb-neutral-95 font-inter">Pipeline Created Successfully!</h2>
                <p className="text-xs leading-5">You have successfully created the pipeline. You can now proceed to add stages to define the client journey.</p>
              </Column>
              <Row className="justify-between border-t py-2 px-4">
                <Button onClick={close} className="flex gap-2 text-xs font-medium px-2" variant={"outline"}>
                  Close
                </Button>
                <Button onClick={() =>{
                  close()
                  onEditPipelineStages()
                }} className="flex gap-2 text-xs font-medium px-2" variant={"fill"}>
                  <IconPlus size={14} /> Add stage
                </Button>
              </Row>
            </Column>
          </Modal>
      )
}