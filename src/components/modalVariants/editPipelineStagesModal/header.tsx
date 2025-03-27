import { Button } from "components/ui";
import { IconArrowNarrowLeft, IconRotateClockwise } from "@tabler/icons-react";

export const Header = ({ close, initialMode, resetPipelineStages }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-vobb-neutral-20">
      <div className="flex items-center gap-4">
        <Button
          onClick={close}
          variant="outline"
          size="icon"
          data-testid="close-btn"
          className="w-[26px] h-[26px] p-0 shadow-sm">
          <IconArrowNarrowLeft className="w-[14px] h-[14px]" />
        </Button>
        <h2 className="text-xs font-inter font-medium text-vobb-neutral-95">
          {initialMode === "create" ? "Pipeline Creation" : "Edit stages"}
        </h2>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <Button
          onClick={resetPipelineStages}
          variant="outline"
          size="icon"
          data-testid="reset-btn"
          className="flex items-center gap-2 w-fit px-2 shadow-sm text-xs font-medium leading-5">
          <IconRotateClockwise className="w-[14px] h-[14px]" />
          Reset
        </Button>
      </div>
    </div>
  );
};