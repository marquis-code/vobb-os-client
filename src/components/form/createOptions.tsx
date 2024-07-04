import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "components/ui";
import { useClickOutside } from "hooks";
import { cn } from "lib";
import { useEffect, useRef, useState } from "react";

export interface CreateOptionsProps {
  label?: string;
  //   icon?: ReactNode;
  validatorMessage?: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  required?: boolean;
  value: string[];
  onChange: (val: string[]) => void;
}

const CreateOptions: React.FC<CreateOptionsProps> = (props) => {
  const { label, parentClassName, required, validatorMessage, onChange, value } = props;
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState<string[]>(value);
  const ref = useRef(null);
  const close = () => {
    setShow(false);
  };
  useClickOutside(ref, close);

  useEffect(() => {
    setOptions(value);
  }, [value]);

  const handleRemove = (index: number) => {
    setOptions((prev) => {
      const options = prev.filter((option, optionIndex) => optionIndex !== index);
      onChange(options);
      return options;
    });
  };

  const handleAppend = (val) =>
    setOptions((prev) => {
      const newOptions = [...prev, val];
      onChange(newOptions);
      return newOptions;
    });

  const handleInputChange = (value: string, index) => {
    setOptions((prev) => {
      const newOptions = prev.map((option, optionIndex) =>
        optionIndex === index ? value : option
      );
      onChange(newOptions);
      return newOptions;
    });
  };

  return (
    <>
      <div className={cn("mb-4 relative", parentClassName)}>
        {label && (
          <label className={"block font-inter text-xs mb-1"}>
            {label}
            {required ? <span className={"text-error-50"}>*</span> : ""}
          </label>
        )}

        <div ref={ref}>
          <div
            onClick={() => setShow((prev) => !prev)}
            className="flex gap-2 flex-wrap min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
            {options.length > 0 ? (
              options.map((option, index) => (
                <span
                  key={`${option}_${index}`}
                  className="text-xs py-1 px-2 border rounded-lg border-vobb-sec-40 bg-vobb-sec-10">
                  {option}
                </span>
              ))
            ) : (
              <p className="text-xs text-vobb-neutral-50">No Options</p>
            )}
          </div>
          {show && (
            <div className="p-2 border bg-vobb-neutral-0 rounded-md absolute w-full mt-2 z-[1] shadow-sm">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    className="h-8 text-xs border flex-1 rounded-md py-1 px-2 focus-visible:border-vobb-sec-70"
                    placeholder="Option name"
                    value={option}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        close();
                      }
                    }}
                  />
                  <Cross1Icon role="button" onClick={() => handleRemove(index)} />
                </div>
              ))}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleAppend("");
                }}
                size="sm"
                className="gap-2 w-full h-8"
                variant={"outline"}>
                <PlusIcon /> Create option
              </Button>
            </div>
          )}
          {validatorMessage && (
            <small className="block text-[11px] mt-1 text-error-10">{validatorMessage}</small>
          )}
        </div>
      </div>
    </>
  );
};

export { CreateOptions };
