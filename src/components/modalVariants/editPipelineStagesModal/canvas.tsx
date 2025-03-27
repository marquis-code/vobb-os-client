import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IconGripVertical, IconPlus } from "@tabler/icons-react";
import { Button } from "components/ui";
import { Column, Row } from "layout";
import { CanvasZoomControls } from "components/canvasZoomControls";
import { Delete } from './delete';
import { Permissions } from './permissions';
import { FC } from 'react';
import { IUseCanvasZoom, StageSelectionResult } from 'hooks';

interface ICanvas {
  blocks: any,
  activeStageIndex: number | null,
  handleStageSelection: (index: number) => void;
  handleAddStage: (index: number) => void,
  handleDeleteStage: (index: number) => StageSelectionResult | null;
  handleStagePermissionToggle: (blockIndex: number, stageLevel: string, forcedStages?: string[]) => void;
  dragAndDrop: any;
  canvasZoom: IUseCanvasZoom;
  internalMode: "create" | "edit"
}
export const Canvas: FC<ICanvas> = ({
  blocks,
  activeStageIndex,
  handleStageSelection,
  handleAddStage,
  handleDeleteStage,
  handleStagePermissionToggle,
  dragAndDrop,
  canvasZoom,
  internalMode
}) => {
  const [parent] = useAutoAnimate({
    duration: 400,
    easing: "ease-in-out",
  });

  const { handleDragStart, handleDragEnter, handleDragOver, handleDragEnd } = dragAndDrop;
  const {
    containerRef,
    zoom,
    setZoom,
    setFitToView,
    setInteractionMode,
    setPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    getZoomStyle
  } = canvasZoom;

  return (
    <div className="flex-grow min-h-0 relative overflow-hidden">
      <div
        className="flex items-center justify-center absolute inset-0 overflow-y-auto bg-grid-bg bg-[#F3F6F9]"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        <div style={getZoomStyle()} className="w-full h-full flex flex-col items-center mx-auto">
          <div ref={parent} className="flex flex-col items-center">
            {blocks.map((block, index) => (
              <Column
                key={block._id}
                className="max-w-[512px] my-4 items-center"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragOver={handleDragOver}
                onDragEnd={(e) => handleDragEnd(e)}
                onClick={() => handleStageSelection(index)}>
                <Row className="text-xs font-medium leading-5 items-center justify-between gap-10">
                  <div className="bg-white shadow-sm border flex items-center justify-center rounded-[4px] min-w-[30px] h-[30px] mt-1 hover:cursor-grabbing">
                    <IconGripVertical className="w-[14px] h-[14px]" />
                  </div>
                  <Delete 
                    block={block} 
                    index={index} 
                    activeStageIndex={activeStageIndex} 
                    handleDeleteStage={handleDeleteStage} 
                    internalMode={internalMode}
                  />
                  <Permissions
                    block={block}
                    activeStageIndex={activeStageIndex}
                    index={index}
                    blocks={blocks}
                    handleStagePermissionToggle={handleStagePermissionToggle}
                  />
                </Row>
                <Button
                  onClick={(e) => handleAddStage(index)}
                  className="w-[28px] h-[28px] p-0 bg-white text-black hover:bg-neutral-50 relative before:content-[''] before:absolute before:w-[1px] before:h-[16px] before:bg-[#DDDFE5] before:bottom-[100%]"
                  size="sm">
                  <IconPlus className="w-[13px] h-[13px]" />
                </Button>
              </Column>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute max-w-max bottom-4 left-4">
        <CanvasZoomControls
          zoom={zoom}
          setZoom={setZoom}
          setFitToView={setFitToView}
          setInteractionMode={setInteractionMode}
          setPosition={setPosition}
          blocksCount={blocks.length}
        />
      </div>
    </div>
  );
};