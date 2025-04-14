import { Checkbox } from "components";
import { useClickOutside } from "hooks";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";

export type ClientType = {
  id: string;
  first_name: string;
  last_name: string;
};

interface SelectClientProps {
  label: string;
  validatorMessage?: string;
  hint?: string;
  parentClassName?: string;
  className?: string;
  required?: boolean;
  options: ClientType[];
  selectedOptions: ClientType[];
  setSelectedOptions: Dispatch<SetStateAction<ClientType[]>>;
  //   onChange: (val: ClientType[]) => void;
}

const SelectClients: FC<SelectClientProps> = ({
  label,
  options: defaultOptions,
  required,
  selectedOptions,
  setSelectedOptions
}) => {
  const [show, setShow] = useState(false);
  const [options] = useState<ClientType[]>(defaultOptions);
  const [displayedOptions, setDisplayedOptions] = useState<ClientType[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const ref = useRef(null);
  const close = () => {
    setShow(false);
  };
  useClickOutside(ref, close);

  useEffect(() => {
    if (options) {
      setDisplayedOptions(() => {
        return options.filter(
          (item) =>
            item.first_name.startsWith(searchValue) || item.last_name.startsWith(searchValue)
        );
      });
    }
  }, [searchValue]);

  return (
    <div className="mb-4 relative">
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
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option, index) => (
              <div className="flex items-center gap-1 w-fit p-1 border rounded">
                <span className="size-5 rounded-full text-[10px] text-white bg-vobb-primary-80 uppercase grid place-items-center">
                  {option.first_name.slice(0, 1)}
                  {option.last_name.slice(0, 1)}
                </span>
                <p className="capitalize">{option.first_name}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-vobb-neutral-50">Select Clients</p>
          )}
        </div>
        {show && (
          <div className="p-2 border bg-vobb-neutral-0 rounded-md absolute w-full mt-2 z-[1] shadow-sm mb-2">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-8 text-xs border flex-1 rounded-md py-1 px-2 focus-visible:border-vobb-sec-70 w-full"
              placeholder="Search Client"
            />
            <div className="border-t-[0.5px] border-[#ebecf0] w-full mt-2 pt-2">
              {displayedOptions.length > 0 ? (
                displayedOptions.map((option, index) => (
                  <div key={option.id} className="flex px-2 py-1.5 justify-between items-center">
                    <label htmlFor={option.id} className="flex items-center gap-2 flex-1">
                      <span className="size-6 rounded-full text-xs text-white bg-vobb-primary-80 uppercase grid place-items-center">
                        {option.first_name.slice(0, 1)}
                        {option.last_name.slice(0, 1)}
                      </span>
                      <p className="capitalize">
                        {option.first_name} {option.last_name}
                      </p>
                    </label>
                    <Checkbox
                      onCheckedChange={() => {
                        if (!selectedOptions.includes(option))
                          setSelectedOptions([...selectedOptions, option]);
                        else
                          setSelectedOptions((prev) =>
                            prev.filter((item) => item.id !== option.id)
                          );
                      }}
                      id={option.id}
                      name={option.id}
                    />
                  </div>
                ))
              ) : (
                <p className="w-full text-center text-sm text-vobb-neutral-50">
                  {options.length < 1 && "No clients for this pipline"}
                  {options.length > 1 &&
                    displayedOptions.length < 1 &&
                    "No clients match this search"}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SelectClients;
