import { Button } from "components/ui";
import { Row } from "layout";
import { IconInfoCircle } from "@tabler/icons-react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "components/ui/tooltip";
import { toolTipInfos } from "lib";

export const Footer = ({ 
  close, 
  loading, 
  initialMode, 
  internalMode, 
  hasBlocksChanged, 
  blocks, 
  handleSubmit, 
  onSubmit 
}) => {
  return (
    <div className="flex justify-between py-2 px-4 bg-vobb-neutral-10">
      <Button
        onClick={() => close()}
        className="text-xs rounded-sm"
        size="default"
        variant="outline"
        disabled={loading}>
        Cancel
      </Button>
      <Row className="items-center gap-6">
        {initialMode === "create" ? (
          <Button
            variant="ghost"
            onClick={close}
            className="text-neutral-70 text-xs font-medium">
            Skip Stage Creation
          </Button>
        ) : null}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={
                    loading ||
                    (internalMode === "edit" && !hasBlocksChanged()) ||
                    (internalMode === "create" && blocks.length < 2) ||
                    blocks.some((block) => block.title === "[Stage title]")
                  }
                  loading={loading}
                  size="default"
                  variant="fill"
                  className="text-xs rounded-sm">
                  {internalMode === "create" ? "Create Stages" : "Save changes"}
                </Button>
              </div>
            </TooltipTrigger>
            {internalMode === "create" && blocks.length < 2 && (
              <TooltipContent side="top" className="bg-white shadow-sm">
                <Row className="gap-2 items-center">
                  <IconInfoCircle className="w-4 h-4 text-warning-60" />
                  <p className="text-xs leading-5 text-vobb-neutral-80">
                    {toolTipInfos.stageValidation}
                  </p>
                </Row>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </Row>
    </div>
  );
};