import { Column, Row } from "layout";
import { CustomInput } from "components/form";
import { ColorPicker } from "components/form";
import { StagesAllowedPopover } from "components/dropdowns";
import { Button } from "components/ui";
import { IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "components/ui/tooltip";
import { toolTipInfos } from "lib";

export const Sidebar = ({
  register,
  handleTitleChange,
  color,
  handleColorChange,
  activeStageIndex,
  blocks,
  handleStagePermissionToggle,
  titleInputRef
}) => {
  // Get the active block title for the input
  const activeBlock = activeStageIndex !== null ? blocks[activeStageIndex] : null;
  const activeTitle = activeBlock?.title || "";

  return (
    <Column className="flex-shrink-0 w-[285px] max-w-[285px] overflow-y-auto">
      <div className="p-4 border-b">
        <Row className="items-center gap-2">
          <p className="text-xs font-medium leading-5">Stage Creation</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="hover:cursor-pointer">
                <IconInfoCircle className="w-[12px] h-[12px]" />
              </TooltipTrigger>
              <TooltipContent className="bg-vobb-neutral-95 border border-vobb-neutral-80 max-w-[300px]">
                <p className="text-xs text-left text-white leading-5">{toolTipInfos.stageCreation}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Row>
      </div>
      <Column className="p-4 pt-0 justify-between h-full">
        <form className="flex flex-col ">
          <CustomInput
            label="Stage title"
            placeholder="Enter stage title"
            type="text"
            name="title"
            register={register}
            onChange={handleTitleChange}
            value={activeTitle}
            disabled={activeStageIndex === null}
          />
          <ColorPicker
            color={color}
            onChange={handleColorChange}
          />
          <StagesAllowedPopover
            activeStageIndex={activeStageIndex}
            blocks={blocks}
            handleStagePermissionToggle={handleStagePermissionToggle}
          />
        </form>
        <Button variant="outline">
          <IconPlus className="w-[14px] h-[14px]" />
          Try our templates
        </Button>
      </Column>
    </Column>
  );
};