import { LoopIcon, Pencil1Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "components/ui";
import { useClickOutside } from "hooks";
import { useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  value: string;
  handleChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, handleChange }) => {
  const [show, setShow] = useState(false);
  const pickerRef = useRef(null);

  const close = () => {
    setShow(false);
  };

  useClickOutside(pickerRef, close);

  return (
    <>
      <div className="relative flex gap-4 items-center">
        <div style={{ background: value }} className="w-8 h-8 rounded-full"></div>
        <Button
          onClick={() => setShow(true)}
          variant={"outline"}
          size={"icon"}
          data-testid="open-color">
          <Pencil1Icon />
        </Button>
        {show ? (
          <div
            ref={pickerRef}
            className="absolute bg-white p-2 shadow-sm shadow-vobb-neutral-40 z-[1] rounded-md top-0 left-[3rem]">
            <HexColorPicker color={value} onChange={handleChange} />
            <HexColorInput
              className="border border-input mt-2 p-1 rounded pl-2"
              prefixed
              color={value}
              onChange={handleChange}
              data-testid="color-input"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export { ColorPicker };
