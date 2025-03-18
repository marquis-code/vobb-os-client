import { IconX } from "@tabler/icons-react";
import { useMultiCheckViewContext } from "context";
import { Button } from "components";
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
        <div
          data-testid="multicheck-view"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-lg bg-white border border-vobb-neutral-30 shadow-sm">
          <div className="flex px-4 py-1 w-full items-center gap-6">
            <div className="font-medium text-xs flex items-center gap-1">
              <div className="bg-vobb-primary-70 rounded-[2px] w-4 h-4 flex items-center justify-center text-white">
                {selectedCheckboxes.size}
              </div>{" "}
              selected
            </div>
            <div className="flex items-center gap-2">
              {actions.map((cta, index) => (
                <Button
                  key={index}
                  onClick={() => cta.callback && cta.callback()}
                  variant={cta.btnVariant}
                  className={`flex items-center gap-1 p-2 shadow-sm border rounded cursor-pointer ${
                    cta.className || "border-[#dddfe5]"
                  }`}
                  style={cta.style}>
                  {cta.icon && <span>{cta.icon}</span>}
                  <span className="text-xs font-medium">{cta.name}</span>
                </Button>
              ))}
            </div>
            <Button
              onClick={handleCloseMultiCheckView}
              variant="ghost"
              className="outline-none border p-2 w-8 h-8 flex items-center justify-center">
              <IconX size={16} stroke="black" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export { MultiCheckActions };
