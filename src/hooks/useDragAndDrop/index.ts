import { useRef } from "react";
import { calculateNewActiveIndex } from "lib";
import { IPipelineStage } from "types";

type UseDragAndDropReturn = {
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, position: number) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, position: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
};

export const useDragAndDrop = (
    blocks: Array<IPipelineStage>, 
    setBlocks: React.Dispatch<React.SetStateAction<Array<IPipelineStage>>>, 
    activeStageIndex: number | null, 
    setActiveStageIndex: React.Dispatch<React.SetStateAction<number | null>>
  ): UseDragAndDropReturn => {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragStart = (e, position) => {
    dragItem.current = position;
    e.dataTransfer?.setDragImage(e.currentTarget, 0, 0);
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("opacity-50");

    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newBlocks = [...blocks];
      const draggedItem = newBlocks[dragItem.current];

      const isActiveBlock = activeStageIndex === dragItem.current;

      newBlocks.splice(dragItem.current, 1);
      newBlocks.splice(dragOverItem.current, 0, draggedItem);

      const updatedBlocks = newBlocks.map((block, index) => ({
        ...block,
        id: `${index + 1}`
      }));

      setBlocks(updatedBlocks);

      if (isActiveBlock) {
        setActiveStageIndex(dragOverItem.current);
      } else if (activeStageIndex !== null) {
        const newActiveIndex = calculateNewActiveIndex(
          activeStageIndex,
          dragItem.current,
          dragOverItem.current
        );
        setActiveStageIndex(newActiveIndex);
      }

      dragItem.current = null;
      dragOverItem.current = null;
    }
  };

  return {
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDragEnd
  };
};