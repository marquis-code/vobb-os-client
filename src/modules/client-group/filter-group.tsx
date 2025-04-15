"use client";

import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconAdjustments } from "@tabler/icons-react";
import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { Label } from "components/ui/label";

export default function FilterGroup({
  pipelines,
  handleParams
}: {
  pipelines: { _id: string; name: string }[];
  handleParams: (param: string, value: string | number) => void;
}) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isPipelinePopoverOpen, setIsPipelinePopoverOpen] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null);

  const handlePipelineSelect = (pipelineid: string) => {
    setSelectedPipeline(pipelineid);
    handleParams("pipeline", pipelineid);
    setIsPipelinePopoverOpen(false);
    setIsFiltersOpen(false);
  };

  const getSelectedPipelineName = () => {
    if (!selectedPipeline) return "Pipeline";
    const pipeline = pipelines.find((p) => p._id === selectedPipeline);
    return pipeline ? pipeline.name : "Pipeline";
  };

  return (
    <div className="relative">
      <DropdownMenu open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white border-[0.5px] border-[#dddfe5] py-1.5 px-2">
            <IconAdjustments size={16} stroke={1.5} color="#667085" />
            <p className="text-xs text-[#344054] font-medium">Filters</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <Popover
            open={isPipelinePopoverOpen}
            onOpenChange={(open) => {
              setIsPipelinePopoverOpen(open);
              if (open) setIsFiltersOpen(true);
            }}>
            <PopoverTrigger asChild>
              <div
                onClick={() => setIsPipelinePopoverOpen(true)}
                className="px-2 py-1.5 text-sm cursor-pointer flex w-full justify-between items-center hover:bg-accent hover:text-accent-foreground rounded-sm">
                Pipeline
                <IconChevronRight size={16} stroke={1.5} color="#667085" />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[280px] p-0 bg-white border z-50"
              sideOffset={10}
              side="right"
              align="start">
              <div className="border-b px-3 py-2 flex items-center">
                <button
                  onClick={() => setIsPipelinePopoverOpen(false)}
                  className="p-1 rounded-sm hover:bg-slate-100 mr-2">
                  <IconChevronLeft size={16} stroke={1.5} color="#667085" />
                </button>
                <h3 className="text-sm font-medium">Pipeline</h3>
              </div>

              <div className="py-1">
                <RadioGroup value={selectedPipeline || ""} onValueChange={handlePipelineSelect}>
                  {pipelines.map((pipeline) => (
                    <div
                      key={pipeline._id}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-50">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value={pipeline._id}
                          id={`pipeline-${pipeline._id}`}
                          className="data-[state=checked]:border-[#344054] data-[state=checked]:text-[#344054]"
                        />
                        <Label
                          htmlFor={`pipeline-${pipeline._id}`}
                          className="text-sm font-normal cursor-pointer">
                          {pipeline.name}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </PopoverContent>
          </Popover>

          <div className="px-2 py-1.5 text-sm cursor-pointer flex w-full justify-between items-center hover:bg-accent hover:text-accent-foreground rounded-sm">
            Assigned member
            <IconChevronRight size={16} stroke={1.5} color="#667085" />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
