import { IconTrash } from "@tabler/icons-react";
import { Button } from "components/ui";
import { Column, Row } from "layout";
import { cn } from "lib";
import { FC } from "react";
import { IPipelineStage } from "types";

interface Props {
  block: IPipelineStage, 
  index: number,
  activeStageIndex: number | null, 
  handleDeleteStage: (index: number) => void;
  internalMode: "create" | "edit"
}
export const Delete: FC<Props> = ({ block, index, activeStageIndex, handleDeleteStage, internalMode }) => {
  return (
    <Column
      className={cn(
        "hover:cursor-pointer bg-white shadow-sm p-4 rounded-md min-w-[359px] max-w-[359px] z-20 relative",
        "after:content-[''] before:content-[''] after:absolute before:absolute after:w-[40px] before:w-[40px] after:h-[1px] before:h-[1px] after:bg-[#DDDFE5] before:bg-[#DDDFE5] after:top-[52%] before:top-[52%] after:-right-[40px] before:-left-[40px]",
        {
          "border border-transparent": activeStageIndex !== index,
          "border-vobb-primary-40 shadow-md": activeStageIndex === index
        }
      )}>
      <Row className="justify-between">
        <span className="border px-3 py-1 rounded-md min-h-[32px] min-w-[32px]">
          <p>{block.level}</p>
        </span>
        <Button
          variant="outline"
          size="sm"
          className="min-w-[30px] min-h-[30px]"
          data-testid="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteStage(index);
          }}>
          <IconTrash data-testid="icon-trash" className="w-[14px] h-[14px]" />
        </Button>
      </Row>
      <Row className="items-center justify-between">
        <p>{block.title}</p>
        <Row className="items-center gap-2 px-2 py-1 border border-neutral-40 rounded-md">
          <span
            data-testid="color-indicator"
            style={{ backgroundColor: block.color }}
            className={cn("w-[8px] h-[8px] rounded-full")}
          />
          <p>Color</p>
        </Row>
      </Row>
    </Column>
  );
};