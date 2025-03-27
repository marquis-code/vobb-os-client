import { useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from './ui';
import { IconHandStop, IconMaximize, IconPointer, IconZoomIn, IconZoomOut, IconSearch } from '@tabler/icons-react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { CanvasIcon } from 'assets';
import { cn } from 'lib';

export const CanvasZoomControls = ({ 
  zoom,
  setZoom,
  setFitToView,
  setInteractionMode,
  setPosition,
  blocksCount = 1
}) => {
  const [interactionMode, setLocalInteractionMode] = useState<"pan" | "select" | "centered">('select');

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
    setFitToView(false);
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
    setFitToView(false);
  };

  const handleFitToView = () => {
    setFitToView(true);
    
    const baseZoom = 100;
    const zoomAdjustment = Math.max(0, blocksCount - 2) * 10; 
    const calculatedZoom = Math.max(25, baseZoom - zoomAdjustment);
    
    setZoom(calculatedZoom);
    setPosition({ x: 0, y: 0 });
  };

  const handleModeChange = (mode) => {
    setLocalInteractionMode(mode);
    setInteractionMode(mode);
  };

  return (
    <div className="flex items-center gap-1 bg-white p-2 rounded-lg shadow-sm">
      <div className="flex items-center pr-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            handleModeChange('select')
          }}
          className={`h-8 w-8 p-0 border ${
            interactionMode === 'select' 
              ? 'bg-vobb-primary-80 text-white hover:bg-vobb-primary-80 hover:text-white' 
              : ''
          }`}
        >
          <IconPointer className="h-[14px] w-[14px]" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleModeChange('pan')}
          className={`h-8 w-8 p-0 ml-1 border ${
            interactionMode === 'pan' 
              ? 'bg-vobb-primary-80 text-white hover:bg-vobb-primary-80 hover:text-white' 
              : ''
          }`}
        >
          <IconHandStop className="h-[14px] w-[14px]" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleModeChange('centered')}
          className={`h-8 w-8 p-0 ml-1 border ${
            interactionMode === 'centered' 
              ? 'bg-vobb-primary-80 text-white hover:bg-vobb-primary-80 hover:text-white' 
              : ''
          }`}
        >
          <CanvasIcon className={cn("h-[14px] w-[14px]")} />
        </Button>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
            <IconSearch className="mr-2 h-[14px] w-[14px]" />
            {zoom}%
            <ChevronDownIcon className="h-[14px] w-[14px] ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2 mb-2">
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              className="justify-start"
            >
              <IconZoomIn className="mr-2 h-[14px] w-[14px]" />
              Zoom In
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              className="justify-start"
            >
              <IconZoomOut className="mr-2 h-[14px] w-[14px]" />
              Zoom Out
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setZoom(50);
                setFitToView(false);
              }}
              className="justify-start"
            >
              <IconSearch className="mr-2 h-[14px] w-[14px]" />
              Zoom to 50%
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setZoom(100);
                setFitToView(false);
              }}
              className="justify-start"
            >
              <IconSearch className="mr-2 h-[14px] w-[14px]" />
              Zoom to 100%
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setZoom(200);
                setFitToView(false);
              }}
              className="justify-start"
            >
              <IconSearch className="mr-2 h-[14px] w-[14px]" />
              Zoom to 200%
            </Button>
            <div className="border-b" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFitToView}
              className="justify-start"
            >
              <IconMaximize className="mr-2 h-[14px] w-[14px]" />
              Fit to View
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};