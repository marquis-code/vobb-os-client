import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { PipelineStagesColors } from "lib";
import { AllowedStages, IPipelineStage } from "types";

export interface StageSelectionResult {
  title: string;
  color: string;
}

interface IUsePipelineStages {
  /** Array of pipeline stage objects representing the current stages */
  blocks: Array<IPipelineStage>;
  /** State setter function for updating the blocks array */
  setBlocks: React.Dispatch<React.SetStateAction<Array<IPipelineStage>>>;
  /** Index of the currently selected/active stage, null if no stage is selected */
  activeStageIndex: number | null;
  /** State setter function for updating the active stage index */
  setActiveStageIndex: React.Dispatch<React.SetStateAction<number | null>>;
  /** Current color value for the active stage */
  color: string;
  /** State setter function for updating the current color */
  setColor: React.Dispatch<React.SetStateAction<string>>;
  /** Current mode: 'create' for creating new pipeline stages, 'edit' for editing existing ones */
  internalMode: "create" | "edit";
  /** Checks if the current blocks have been modified from the original state */
  hasBlocksChanged: () => boolean;
  /** Handles color changes for the active stage */
  handleColorChange: (newColor: string) => void;
  /** Handles title changes for the active stage, including duplicate title validation */
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handles selection of a stage, updating the active index and returning the selected stage info */
  handleStageSelection: (index: number) => StageSelectionResult;
  /** Adds a new stage after the specified index and returns the new stage info */
  handleAddStage: (index: number) => StageSelectionResult;
  /** Deletes the stage at the specified index and returns the new active stage info */
  handleDeleteStage: (index: number) => StageSelectionResult | null;
  /** Resets all stages to their original state */
  handleReset: () => StageSelectionResult | null;
  
  /** Toggles allowed stages for the specified block
   * @param blockIndex - Index of the block to modify
   * @param stageLevel - Level of the stage to toggle
   * @param forcedStages - Optional array of stage levels to force-set (overrides toggle behavior)
   */
  handleStagePermissionToggle: (blockIndex: number, stageLevel: string, forcedStages?: string[]) => void;
  
  /** Prepares and validates the data for submission, returns null if validation fails */
  prepareSubmitData: () => Array<Partial<IPipelineStage>> | null;
  
  /** Updates the original blocks reference to track changes */
  updateOriginalBlocks: () => void;
  
  /** Error message for duplicate titles, null if no errors */
  titleDuplicateError: string | null;
  
  /** Reference to the title input element for focus management */
  titleInputRef: React.RefObject<HTMLInputElement>;
}

export const titleError = "Stage titles must be unique";

const createInitialBlock = () => ({
  _id: "1",
  title: "[Stage title]",
  color: PipelineStagesColors[0],
  level: 1,
  allow_all_stages: true,
  allowed_stages: []
});

const createExistingBlocks = (pipelineStages) =>
  pipelineStages.map((stage) => ({
    _id: stage._id,
    title: stage.title,
    color: stage.color,
    level: stage.level,
    allow_all_stages: stage.allow_all_stages,
    allowed_stages: stage.allowed_stages.map((stage) =>  stage.title)
  }));

  export const usePipelineStages = (pipelineStages: any[], initialMode: "create" | "edit", show: boolean): IUsePipelineStages => {
    const [blocks, setBlocks] = useState<Array<IPipelineStage>>([]);
    const [originalBlocks, setOriginalBlocks] = useState<Array<IPipelineStage>>([]);
    const [internalMode, setInternalMode] = useState(initialMode);
    const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);
    const [color, setColor] = useState(PipelineStagesColors[0]);
    const [titleDuplicateError, setTitleDuplicateError] = useState<string | null>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [isDirty, setIsDirty] = useState(false);
  
    const hasData = useMemo(() => pipelineStages?.length > 0, [pipelineStages]);
  
    // Focus input when active stage changes
    useEffect(() => {
      if (activeStageIndex !== null && titleInputRef.current) {
        setTimeout(() => titleInputRef.current?.focus(), 0);
      }
    }, [activeStageIndex]);
  
    // Initialize or update blocks based on pipelineStages
    useEffect(() => {
      if (!show || (isDirty && blocks.length)) return;
      
      const shouldUpdate = !blocks.length || 
        (initialMode === "edit" && hasData && (
          pipelineStages.length !== blocks.length || 
          pipelineStages.some((stage, i) => 
            stage.title !== blocks[i]?.title || 
            stage.color !== blocks[i]?.color
          )
        ));
      
      if (!shouldUpdate) return;
      
      let newBlocks;
      if (initialMode === "edit" && hasData) {
        setInternalMode("edit");
        newBlocks = createExistingBlocks(pipelineStages);
        setOriginalBlocks(newBlocks);
      } else {
        setInternalMode("create");
        newBlocks = [createInitialBlock()];
      }
      
      setBlocks(newBlocks);
      setActiveStageIndex(0);
      if (newBlocks[0]) setColor(newBlocks[0].color);
      
    }, [initialMode, pipelineStages, show, blocks.length, hasData, isDirty]);
  
    // Handler functions
    const handleColorChange = useCallback((newColor: string) => {
      setColor(newColor);
      if (activeStageIndex !== null) {
        setBlocks(blocks => blocks.map((block, i) => 
          i === activeStageIndex ? {...block, color: newColor} : block
        ));
      }
    }, [activeStageIndex]);
  
    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      if (activeStageIndex === null) return;
      
      // Check for duplicates
      const isDuplicate = blocks.some(
        (block, index) => index !== activeStageIndex && block.title === newTitle
      );
      
      setTitleDuplicateError(isDuplicate && newTitle.trim() !== "" ? titleError : null);
      
      // Update blocks with new title
      setBlocks(prevBlocks => {
        const oldTitle = prevBlocks[activeStageIndex].title;
        const activeBlockId = prevBlocks[activeStageIndex]._id;
        
        return prevBlocks.map((block, index) => {
          // Update active block title
          if (index === activeStageIndex) {
            return {...block, title: newTitle};
          }
          
          // Update references in other blocks' allowed_stages
          if (Array.isArray(block.allowed_stages)) {
            let updatedAllowedStages;
            
            if (internalMode === "edit") {
              // Edit mode: update title in string array
              updatedAllowedStages = block.allowed_stages.map(stageTitle => 
                stageTitle === oldTitle ? newTitle : stageTitle
              );
            } else {
              // Create mode: update title in object array
              updatedAllowedStages = block.allowed_stages.map(stage => 
                stage._id === activeBlockId ? {...stage, title: newTitle} : stage
              );
            }
            
            return {...block, allowed_stages: updatedAllowedStages};
          }
          
          return block;
        });
      });
    }, [activeStageIndex, blocks, internalMode]);
  
    const handleStageSelection = useCallback((index: number): StageSelectionResult => {
      setActiveStageIndex(index);
      const selectedStage = blocks[index];
      setColor(selectedStage.color);
      
      return {
        title: selectedStage.title,
        color: selectedStage.color
      };
    }, [blocks]);
  
    // Simplified utility functions
    const ensureAllowedStages = useCallback((blockIndex: number, allBlocks: IPipelineStage[]): AllowedStages => {
      
      // In edit mode, return titles of other blocks
      if (internalMode === "edit") {
        return allBlocks
          .filter((_, i) => i !== blockIndex)
          .map(block => block.title);
      }
      
      // In create mode, return objects for other blocks
      return allBlocks
        .filter((_, i) => i !== blockIndex)
        .map(block => ({
          _id: block._id,
          title: block.title,
          color: block.color
        }));
    }, [internalMode]);
  
    // Reset to original state
    const handleReset = useCallback((): StageSelectionResult | null => {
      let resetBlocks;
      
      if (internalMode === "edit" && pipelineStages?.length) {
        resetBlocks = createExistingBlocks(pipelineStages);
        
        // Ensure each stage has proper allowed_stages
        resetBlocks.forEach((block, index) => {
          if ((!block.allowed_stages || block.allowed_stages.length === 0) && resetBlocks.length > 1) {
            block.allowed_stages = ensureAllowedStages(index, resetBlocks);
            block.allow_all_stages = true;
          }
        });
        
        setOriginalBlocks(resetBlocks);
      } else if (internalMode === "create") {
        const initialBlock = createInitialBlock();
        initialBlock.allowed_stages = [];
        initialBlock.allow_all_stages = true;
        resetBlocks = [initialBlock];
      } else {
        return null;
      }
      
      setBlocks(resetBlocks);
      setActiveStageIndex(0);
      setTitleDuplicateError(null);
      
      if (resetBlocks[0]) {
        setColor(resetBlocks[0].color);
        return {
          title: resetBlocks[0].title,
          color: resetBlocks[0].color
        };
      }
      
      return null;
    }, [internalMode, pipelineStages, ensureAllowedStages]);
  
    // Add a new stage
    const handleAddStage = useCallback((index: number): StageSelectionResult => {
      setIsDirty(true);
      
      const newBlockPosition = index + 1;
      const newLevel = blocks.length + 1;
      const defaultColor = PipelineStagesColors[0];
      const newTitle = "[Stage title]";
      const newBlockId = internalMode === "edit" ? `temp_${Date.now()}_${newLevel}` : newLevel.toString();
      
      // Create updated blocks array with the new block
      setBlocks(prevBlocks => {
        // Create the new block
        const newBlock: IPipelineStage = {
          _id: newBlockId,
          title: newTitle,
          color: defaultColor,
          level: newLevel,
          allow_all_stages: true,
          allowed_stages: []  // Will be populated properly below
        };
        
        // Insert the new block
        const updatedBlocks = [
          ...prevBlocks.slice(0, newBlockPosition),
          newBlock,
          ...prevBlocks.slice(newBlockPosition)
        ];
        
        // Update all blocks with proper allowed_stages and levels
        return updatedBlocks.map((block, idx) => {
          const updatedLevel = idx + 1;
          
          return {
            ...block,
            level: updatedLevel,
            allowed_stages: ensureAllowedStages(idx, updatedBlocks)
          };
        });
      });
      
      // Update UI state
      setActiveStageIndex(newBlockPosition);
      setColor(defaultColor);
      setTitleDuplicateError(null);
      
      setTimeout(() => titleInputRef.current?.focus(), 0);
      
      return {
        title: newTitle,
        color: defaultColor
      };
    }, [blocks.length, internalMode, ensureAllowedStages]);
  
    // Delete a stage
    const handleDeleteStage = useCallback((index: number): StageSelectionResult | null => {
      if (blocks.length <= 1) return null;
      
      let newActiveIndex;
      let resultStage;
      
      setBlocks(prevBlocks => {
        // Remove the block at index
        const newBlocks = prevBlocks.filter((_, i) => i !== index);
        
        // Calculate new active index
        newActiveIndex = Math.min(index < newBlocks.length ? index : index - 1, newBlocks.length - 1);
        resultStage = newBlocks[newActiveIndex];
        
        // Update all blocks with new levels and allowed_stages
        return newBlocks.map((block, idx) => ({
          ...block,
          level: idx + 1,
          allowed_stages: ensureAllowedStages(idx, newBlocks),
          allow_all_stages: true
        }));
      });
      
      setTitleDuplicateError(null);
      setActiveStageIndex(newActiveIndex);
      
      if (resultStage) {
        setColor(resultStage.color);
        setTimeout(() => titleInputRef.current?.focus(), 0);
        
        return {
          title: resultStage.title,
          color: resultStage.color
        };
      }
      
      return null;
    }, [blocks.length, ensureAllowedStages]);
  
    // Toggle stage permissions
    const handleStagePermissionToggle = useCallback((blockIndex: number, stageLevel: string, forcedStages?: string[]) => {
      setBlocks(prevBlocks => {
        const updatedBlocks = [...prevBlocks];
        const currentBlock = {...updatedBlocks[blockIndex]};
        const currentLevel = currentBlock.level;
        
        if (forcedStages !== undefined) {
          // Handle forced stages selection
          let stagesToUse = [...forcedStages];
          
          // Ensure we have at least one stage if clearing all
          if (stagesToUse.length === 0 && prevBlocks.length > 1) {
            const oneOtherStage = prevBlocks.find(block => block.level !== currentLevel);
            if (oneOtherStage) {
              stagesToUse = [oneOtherStage.level.toString()];
            }
          }
          
          // Convert level strings to appropriate format based on mode
          if (internalMode === "edit") {
            currentBlock.allowed_stages = stagesToUse
              .filter(level => Number(level) !== currentLevel)
              .map(level => {
                const matchingBlock = prevBlocks.find(b => b.level.toString() === level);
                return matchingBlock?.title || "";
              })
              .filter(title => title !== "");
          } else {
            currentBlock.allowed_stages = stagesToUse
              .filter(level => Number(level) !== currentLevel)
              .map(level => {
                const stageToAdd = prevBlocks.find(block => block.level.toString() === level);
                if (stageToAdd) {
                  return { 
                    _id: stageToAdd._id, 
                    title: stageToAdd.title, 
                    color: stageToAdd.color 
                  };
                }
                return null;
              })
              .filter(stage => stage !== null);
          }
        } else if (Number(stageLevel) !== currentLevel) {
          // Handle individual toggle
          const stageToToggle = prevBlocks.find(block => block.level.toString() === stageLevel);
          if (!stageToToggle) return prevBlocks;
          
          const currentAllowedStages = currentBlock.allowed_stages || [];
          
          if (internalMode === "edit") {
            // For edit mode: toggle title in the array
            if (currentAllowedStages.includes(stageToToggle.title)) {
              // Remove if already present, but ensure at least one remains
              if (currentAllowedStages.length > 1) {
                currentBlock.allowed_stages = currentAllowedStages.filter(
                  title => title !== stageToToggle.title
                );
              }
            } else {
              // Add if not present
              currentBlock.allowed_stages = [...currentAllowedStages, stageToToggle.title];
            }
          } else {
            // For create mode: toggle object in the array
            const hasStage = currentAllowedStages.some(stage => stage._id === stageToToggle._id);
            
            if (hasStage) {
              // Remove if already present, but ensure at least one remains
              if (currentAllowedStages.length > 1) {
                currentBlock.allowed_stages = currentAllowedStages.filter(
                  stage => stage._id !== stageToToggle._id
                );
              }
            } else {
              // Add if not present
              currentBlock.allowed_stages = [
                ...currentAllowedStages, 
                { 
                  _id: stageToToggle._id, 
                  title: stageToToggle.title, 
                  color: stageToToggle.color 
                }
              ];
            }
          }
        }
        
        // Update all_stages flag
        currentBlock.allow_all_stages = currentBlock.allowed_stages.length === prevBlocks.length - 1;
        
        // Replace the updated block
        updatedBlocks[blockIndex] = currentBlock;
        return updatedBlocks;
      });
    }, [internalMode]);
  
    // Check if blocks have changed from original
    const hasBlocksChanged = useCallback(() => {
      if (blocks.length !== originalBlocks.length) return true;
  
      return blocks.some(
        (block, index) =>
          block.title !== originalBlocks[index]?.title || 
          block.color !== originalBlocks[index]?.color ||
          JSON.stringify(block?.allowed_stages?.sort()) !== 
            JSON.stringify((originalBlocks[index]?.allowed_stages || []).sort())
      );
    }, [blocks, originalBlocks]);
  
    // Prepare data for submission
    const prepareSubmitData = useCallback(() => {
      // Check for duplicate titles
      const titles = blocks.map(block => block.title);
      const hasDuplicates = titles.some(
        (title, index) => titles.indexOf(title) !== index && title.trim() !== ""
      );
      
      if (hasDuplicates) {
        setTitleDuplicateError(titleError);
        return null;
      }
  
      // Check for default titles
      const hasDefaultTitles = blocks.some(
        block => block.title === "[Stage title]" || block.title.startsWith("[Stage title ")
      );
    
      if (hasDefaultTitles) {
        setTitleDuplicateError("Please update all default stage titles");
        return null;
      }
    
      // Format blocks for submission
      return blocks.map(block => {
        const blockData: Partial<IPipelineStage> = {
          title: block.title,
          color: block.color,
          allowed_stages: internalMode === "edit" 
            ? block.allowed_stages 
            : block.allowed_stages.map(item => item.title),
        };
    
        if (internalMode === "edit" && !String(block._id).startsWith("temp_")) {
          blockData._id = block._id;
        }
    
        return blockData;
      });
    }, [blocks, internalMode]);
  
    // Update original blocks (for tracking changes)
    const updateOriginalBlocks = useCallback(() => {
      setOriginalBlocks(JSON.parse(JSON.stringify(blocks)));
      setTitleDuplicateError(null);
    }, [blocks]);
  
    return {
      blocks,
      setBlocks,
      activeStageIndex,
      setActiveStageIndex,
      color,
      setColor,
      internalMode,
      hasBlocksChanged,
      handleColorChange,
      handleTitleChange,
      handleStageSelection,
      handleAddStage,
      handleDeleteStage,
      handleReset,
      handleStagePermissionToggle,
      prepareSubmitData,
      updateOriginalBlocks,
      titleDuplicateError,
      titleInputRef
    };
  };