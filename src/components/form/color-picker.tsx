import { Column, Row } from "layout"
import { useRef, useState } from "react"
import { IconColorPicker } from "@tabler/icons-react"
import { HexColorPicker } from "react-colorful"
import { useClickOutside } from "hooks"
import { cn, PipelineStagesColors } from "lib"
import { Button } from "components/ui"


interface CanvasColorPickerProps {
  color: string
  onChange: (color: string) => void
}

const ColorPicker = ({ color, onChange}: CanvasColorPickerProps) => {
      const colorPickerRef = useRef(null);
      const [showPicker, setShowPicker] = useState<boolean>(false);
      useClickOutside(colorPickerRef, () => setShowPicker(false));
    
      const handleColorChange = (newColor: string) => {
        onChange(newColor);
      };

      const isColorEqual = (color1: string, color2: string) => {
        return color1 === color2;
      };
    
      return (
        <div className="space-y-2 mb-4 max-w-[250px]">
          <label className="block text-xs font-medium text-gray-700 leading-5">Color</label>
          <Column className="border p-2 rounded-[8px] gap-2">
            <Row className="flex-wrap gap-2">
              {PipelineStagesColors.map((item, index) => (
                <button
                  key={`${item}-${index}`}
                  className={cn("w-[32px] h-[32px] rounded-[4px] border border-transparent transition-shadow duration-500 ease-in-out", {
                    "shadow-[0px_0px_0px_4px_#E0DAFA,0px_1px_2px_0px_rgba(26,22,47,0.05)]" : isColorEqual(color, item)
                  })}
                  style={{ backgroundColor: item }}
                  onClick={() => handleColorChange(item)}
                  type="button"
                />
              ))}
            </Row>
            <Row className="items-center gap-2">
              <div className="relative">
                <Button
                  type="button"
                  variant={"outline"}
                  size={"icon"}
                  className="w-[30px] h-[30px] rounded border border-gray-300"
                  onClick={() => setShowPicker(!showPicker)}
                >
                  <IconColorPicker className="w-[14px] h-[14px]" />
                </Button>
                {showPicker && (
                  <div ref={colorPickerRef} className="absolute z-10">
                    <HexColorPicker color={color} onChange={handleColorChange} />
                  </div>
                )}
              </div>
              <Row className="flex-1 flex items-center gap-0 pl-2 border rounded-md overflow-hidden">
                <div
                  style={{ backgroundColor: color || "#F5F5F5" }}
                  className="w-[20px] h-[20px] rounded-[4px]"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="p-2 flex-1 min-w-0"
                />
              </Row>
            </Row>
          </Column>
        </div>
      );
    };
    

export { ColorPicker };