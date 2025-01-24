import { Modal } from "components/modal";
import { Button } from "components/ui";
import { Column, Row } from "layout";
import { FC } from "react";
import { ModalProps } from "types";

interface CreatePipelineErrorModalProps extends ModalProps {
  errorMessage: string;
}

const CreatePipelineErrorModal: FC<CreatePipelineErrorModalProps> = ({ show, close, errorMessage }) => {
      return (
            <Modal show={show} close={close} dialogClassName="p-0" contentClassName="p-0">
              <Column className="border">
                <Column className="px-4 pt-4 gap-2">
                  <h2 className="text-sm font-bold text-vobb-neutral-95">Error Creating Pipeline</h2>
                  <p className="text-xs leading-5">{errorMessage || "There was an issue creating the pipeline. Please ensure all mandatory fields (Pipeline Name and Sector) are filled correctly and try again."}</p>
                </Column>
                <Row className="justify-between border-t py-2 px-4">
                  <Button onClick={close} className="flex gap-2" variant={"outline"}>
                    Close
                  </Button>
                </Row>
              </Column>
          </Modal>
      )
}

export { CreatePipelineErrorModal };