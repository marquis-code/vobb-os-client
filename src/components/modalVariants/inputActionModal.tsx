import { IconCheck, IconX } from "@tabler/icons-react";
import { LoadingSpinner } from "components/ui";
import { useEffect, useState } from "react";

interface InputActionModalProps {
  modalView: boolean;
  setModalView: React.Dispatch<React.SetStateAction<boolean>>;
  modalRef: React.MutableRefObject<null>;
  onConfirm: (inputValue: string) => void;
  prefilledValue?: string;
  placeholder?: string;
  loading?: boolean;
  parentClassName?: string;
}

const InputActionModal: React.FC<InputActionModalProps> = ({
  modalView,
  setModalView,
  modalRef,
  onConfirm,
  prefilledValue = "",
  placeholder = "Enter value",
  loading,
  parentClassName
}) => {
  const [inputValue, setInputValue] = useState(prefilledValue);
  const [isEmpty, setIsEmpty] = useState(!prefilledValue);

  useEffect(() => {
    setInputValue(prefilledValue);
  }, [modalView, prefilledValue]);

  const handleConfirm = () => {
    onConfirm(inputValue);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onConfirm(inputValue);
    }
  };

  return (
    <div
      data-testid="input-action-modal"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}>
      {modalView && (
        <div
          ref={modalRef}
          className={`absolute flex items-center justify-center w-[272px] z-[200] ${parentClassName}`}>
          <div className="w-full rounded-md bg-vobb-neutral-10 flex items-center justify-between p-1 relative">
            <div
              className={`bg-white border p-2 transition-all duration-200 ${
                isEmpty ? "w-[85%]" : "w-[70%]"
              }  rounded-md flex items-center justify-start relative z-[15]`}>
              <input
                role="textbox"
                data-testid="action-input"
                className="text-xs w-full text-vobb-neutral-60"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setIsEmpty(e.target.value.length < 1);
                }}
                placeholder={placeholder}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="flex items-center gap-6 px-2 absolute right-2 top-1/2 -translate-y-1/2 z-[10]">
              {!loading && !isEmpty ? (
                <IconCheck
                  className="cursor-pointer"
                  onClick={handleConfirm}
                  size={16}
                  stroke="black"
                />
              ) : (
                !isEmpty && <LoadingSpinner size={16} />
              )}
              <IconX
                onClick={() => {
                  setModalView(false);
                }}
                className="cursor-pointer"
                size={16}
                stroke="black"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { InputActionModal };
