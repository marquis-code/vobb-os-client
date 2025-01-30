import { IconX } from "@tabler/icons-react";
import { useMultiCheckViewContext } from "context";
import { Button } from "./ui";
import { MultiCheckActionsProps } from "types";

const MultiCheckActions = ({ actions }: MultiCheckActionsProps) => {
  const { multiCheckView, setMultiCheckView, selectedCheckboxes, setSelectedCheckboxes } =
    useMultiCheckViewContext();
  const handleCloseMultiCheckView = () => {
    setMultiCheckView(false);
    setSelectedCheckboxes(new Set());
  };
  return (
    <>
      {multiCheckView && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-md bg-white border border-vobb-neutral-30 shadow-sm">
          <div className="flex px-6 py-1 w-full items-center gap-6">
            <div className="text-vobb-primary-70 font-medium text-xs">
              {selectedCheckboxes.size} selected
            </div>
            <div className="flex items-center gap-2">
              {actions.map((cta, index) => (
                <button
                  key={index}
                  onClick={()=> cta.callback && cta.callback()}
                  className={`flex items-center gap-1 p-2 shadow-sm border rounded cursor-pointer ${
                    cta.className || "border-[#dddfe5]"
                  }`}
                  style={cta.style}>
                  {cta.icon && <span className="icon">{cta.icon}</span>}
                  <span className="text-xs font-medium">{cta.name}</span>
                </button>
              ))}
            </div>
            <Button onClick={handleCloseMultiCheckView} variant="ghost" className="p-1 outline-none">
              <IconX size={16} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export { MultiCheckActions };
