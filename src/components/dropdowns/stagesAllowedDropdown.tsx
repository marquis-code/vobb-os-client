import { IconChevronDown } from "@tabler/icons-react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "components/ui";
import { Switch } from "components/ui/switch";
import { FC, useMemo } from "react";
import { IPipelineStage } from "types";

interface StagesAllowed {
  activeStageIndex: number | null;
  blocks: Array<IPipelineStage>;
  handleStagePermissionToggle: (blockIndex: number, stageLevel: string, forcedStages?: string[]) => void;
  triggerNode?: React.ReactNode;
  showLabel?: boolean;
}

export const StagesAllowedPopover: FC<StagesAllowed> = ({ 
      activeStageIndex, 
      blocks, 
      handleStagePermissionToggle,
      triggerNode,
      showLabel = true 
    }) => {
      const currentBlock = activeStageIndex !== null ? blocks[activeStageIndex] : null;
      
      const filteredAllowedStages = useMemo(() => 
        currentBlock?.allowed_stages?.filter(
          stageObj => stageObj.level !== currentBlock.level
        ) || [], 
        [currentBlock?.allowed_stages, currentBlock?.level]
      );
      
      const totalSelectableStages = useMemo(() => 
        blocks.length - 1, 
        [blocks.length]
      );
      
      const isAllSelected = useMemo(() => 
        filteredAllowedStages.length === totalSelectableStages,
        [filteredAllowedStages.length, totalSelectableStages]
      );

      if (activeStageIndex === null) return null;
      
      const selectedCount = filteredAllowedStages.length;
    
      const handleSelectAll = () => {
        if (isAllSelected) {
          const allStagesExceptCurrent = blocks
            .filter(block => block.level !== currentBlock?.level)
            .map(block => block.level.toString());
          
          if (allStagesExceptCurrent.length > 0) {
            handleStagePermissionToggle(activeStageIndex, "", [allStagesExceptCurrent[0]]);
          }
        } else {
          const allStagesExceptCurrent = blocks
            .filter(block => block.level !== currentBlock?.level)
            .map(block => block.level.toString());
          handleStagePermissionToggle(activeStageIndex, "", allStagesExceptCurrent);
        }
      };

    
      return (
        <div className="w-full">
          {showLabel ? (
          <label className="text-xs font-medium mb-2 block text-neutral-40">Stages allowed</label>
          ): null}
          <Popover>
            <PopoverTrigger asChild>
              {
                triggerNode ? triggerNode : (
                  <Button
                    variant="outline"
                    className="w-full justify-between text-left h-9 text-xs font-medium"
                  >
                    <span>
                      {isAllSelected 
                        ? "All" 
                        : selectedCount > 1 
                          ? `${selectedCount} stages` 
                          : `${selectedCount} stage`}
                    </span>
                    <IconChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                )
              }
            </PopoverTrigger>
            {
              blocks.length === 1 ? null : (
                <PopoverContent className="w-[244px] p-0" align="end">
                <div className="p-2 max-h-[284px] overflow-y-auto relative">
                  <div className="fixed top-0 left-0 px-[20px] z-10 pt-4 pb-2 w-full bg-white flex items-center justify-between border-b">
                    <span className="text-xs font-medium">Select All Stages</span>
                    <Switch
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      className="w-[26px] h-[16px]"
                      thumbClassname="w-[14px] h-[14px] data-[state=checked]:translate-x-2"
                    />
                  </div>
  
                  <div className="mt-8">
                  {blocks.map((stage) => {
                    if (activeStageIndex !== null && stage.level === currentBlock?.level) {
                      return null;
                    }
                    
                    const isChecked = currentBlock?.allowed_stages ? (
                      Array.isArray(currentBlock?.allowed_stages) && 
                      (typeof currentBlock?.allowed_stages[0] === 'string' 
                        ? currentBlock?.allowed_stages.includes(stage.title)
                        : currentBlock?.allowed_stages.some(allowedStage => allowedStage.title === stage.title))
                    ) : false;
                    
                    return (
                      <div
                        key={stage._id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: stage.color }}
                          />
                          <span className="text-xs font-medium">{stage.title}</span>
                        </div>
                        <Switch
                          checked={isChecked}
                          onCheckedChange={() => handleStagePermissionToggle(activeStageIndex, stage.level.toString())}
                          className="w-[26px] h-[16px]"
                          thumbClassname="w-[14px] h-[14px] data-[state=checked]:translate-x-2"
                        />
                      </div>
                    );
                  })}
                  </div>
                </div>
              </PopoverContent>
              )
            }
          </Popover>
        </div>
      );
    };