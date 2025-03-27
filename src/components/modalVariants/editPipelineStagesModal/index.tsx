import { Modal } from "components/modal";
import { useForm } from "react-hook-form";
import { FC, useEffect } from "react";
import { Row } from "layout";
import { useFetchPipelineStages } from "hooks";
import { usePipelineStages } from 'hooks';
import { useDragAndDrop } from 'hooks';
import { useCanvasZoom } from 'hooks';
import { Footer } from "./footer";
import { Sidebar } from "./sideBar";
import { Header } from "./header";
import { Canvas } from "./canvas";
import { EditPipelineStagesDto, IPipelineStage, PipelineTableData } from "types";

interface Props {
  show: boolean,
  close: () => void;
  submit: (id, data: EditPipelineStagesDto) => void;
  editPipelineStagesStatus: {
    isResolved: boolean;
    isPending: boolean;
    isRejected: boolean;
    isIdle: boolean;
}
  initialMode: "create" | "edit",
  pipelineTableData?: PipelineTableData | null
}

const EditPipelineStagesModal: FC<Props> = ({
  show,
  close,
  submit,
  editPipelineStagesStatus,
  initialMode,
  pipelineTableData
}) => {
  const {
    fetchPipelineStages,
    pipelineStages
  } = useFetchPipelineStages(pipelineTableData?.id ?? "");

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (show) {
      fetchPipelineStages();
    }
  }, [fetchPipelineStages, show]);

  const {
    blocks,
    setBlocks,
    activeStageIndex,
    setActiveStageIndex,
    color,
    internalMode,
    hasBlocksChanged,
    handleColorChange,
    handleTitleChange,
    handleStageSelection,
    handleAddStage,
    handleDeleteStage,
    handleReset: resetPipelineStages,
    handleStagePermissionToggle,
    prepareSubmitData,
    updateOriginalBlocks,
    titleInputRef
  } = usePipelineStages(pipelineStages, initialMode, show);

  // Update form value when active block changes
  useEffect(() => {
    if (activeStageIndex !== null && blocks[activeStageIndex]) {
      setValue("title", blocks[activeStageIndex].title);
    }
  }, [activeStageIndex, blocks, setValue]);
  
  useEffect(() => {
    if(editPipelineStagesStatus.isResolved) fetchPipelineStages()
  }, [editPipelineStagesStatus.isResolved])

  const dragAndDrop = useDragAndDrop(blocks, setBlocks, activeStageIndex, setActiveStageIndex);
  const canvasZoom = useCanvasZoom(blocks.length);

  const onSubmit = () => {
    const stages = prepareSubmitData();
    if (stages) {
      submit(pipelineTableData?.id , { stages: stages as Array<IPipelineStage> })
      updateOriginalBlocks();
    }
  };

  return (
    <Modal
      contentClassName="max-w-[1136px] h-full max-h-[812px] p-0 flex flex-col justify-between"
      show={show}
      close={close}
      data-testid="edit-pipeline-stages-modal">
      
      <Header 
        close={close} 
        initialMode={initialMode} 
        resetPipelineStages={resetPipelineStages}
        // titleDuplicateError={titleDuplicateError}
      />

      <Row className="h-[calc(100%-96px)] flex-grow flex-shrink-1 min-h-0 gap-0 divide-x border">
        <Sidebar
          register={register}
          handleTitleChange={handleTitleChange}
          color={color}
          handleColorChange={handleColorChange}
          activeStageIndex={activeStageIndex}
          blocks={blocks}
          handleStagePermissionToggle={handleStagePermissionToggle}
          titleInputRef={titleInputRef}
        />

        <Canvas
          blocks={blocks}
          activeStageIndex={activeStageIndex}
          handleStageSelection={handleStageSelection}
          handleAddStage={handleAddStage}
          handleDeleteStage={handleDeleteStage}
          handleStagePermissionToggle={handleStagePermissionToggle}
          dragAndDrop={dragAndDrop}
          canvasZoom={canvasZoom}
          internalMode={internalMode}
        />
      </Row>

      <Footer
        close={close}
        loading={editPipelineStagesStatus.isPending}
        initialMode={initialMode}
        internalMode={internalMode}
        hasBlocksChanged={hasBlocksChanged}
        blocks={blocks}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        // titleDuplicateError={titleDuplicateError}
      />
    </Modal>
  );
};

export { EditPipelineStagesModal };