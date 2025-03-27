import { IconInfoCircle } from "@tabler/icons-react";
import { StagesAllowedPopover } from "components/dropdowns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { Row } from "layout";
import { cn, toolTipInfos } from "lib";
import { FC } from "react";
import { IPipelineStage } from "types";

interface Props {
  block: IPipelineStage,
  activeStageIndex: number | null,
  index: number,
  blocks: Array<IPipelineStage>,
  handleStagePermissionToggle: (blockIndex: number, stageLevel: string, forcedStages?: string[]) => void;
}
export const Permissions: FC<Props> = ({ block, activeStageIndex, index, blocks, handleStagePermissionToggle }) => {

  // Ensure we always filter out the current stage from allowed_stages
  const filteredAllowedStages = block?.allowed_stages?.filter(
    stageLevel => String(stageLevel) !== String(block.level)
  ) || [];
  
  // Total selectable stages (all stages minus current one)
  const totalSelectableStages = blocks.length - 1;
  
  // Check if all selectable stages are allowed
  const hasAllSelectableStages = filteredAllowedStages.length === totalSelectableStages;
  
  return (
    <StagesAllowedPopover
      activeStageIndex={activeStageIndex}
      blocks={blocks}
      handleStagePermissionToggle={handleStagePermissionToggle}
      showLabel={false}
      triggerNode={
        <button className={cn("hover:cursor-pointer relative")}>
          <div className="min-w-[96px]">
            <Row className="bg-white shadow-sm border text-xs font-medium max-w-max min-h-[36px] px-2 text-center rounded-md items-center justify-center mt-1 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <IconInfoCircle className="w-[12px] h-[12px]" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-vobb-neutral-95 max-w-[300px] h-full max-h-[300px] border border-vobb-neutral-80">
                    <p className="text-xs text-left text-white leading-5">
                      {hasAllSelectableStages
                        ? toolTipInfos.allStagesAllowed
                        : toolTipInfos.specificStageAllowed(filteredAllowedStages.length)}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-xs font-medium text-nowrap max-w-max">
                  {hasAllSelectableStages
                    ? "All"
                    : `${filteredAllowedStages.length} ${filteredAllowedStages.length === 1 ? 'stage' : 'stages'}`}
                </p>
            </Row>
          </div>
        </button>
      }
    />
  );
};