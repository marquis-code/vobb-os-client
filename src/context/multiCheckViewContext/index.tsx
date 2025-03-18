import React, { createContext, useContext, useState } from "react";

const MultiCheckViewContext = createContext<{
  multiCheckView: boolean;
  setMultiCheckView: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCheckboxes: Set<string>;
  toggleCheckbox: (id: string) => void;
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<Set<string>>>;
} | null>(null);

const MultiCheckViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [multiCheckView, setMultiCheckView] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Set<string>>(new Set());


  const toggleCheckbox = (id: string) => {
    setSelectedCheckboxes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <MultiCheckViewContext.Provider
      value={{
        multiCheckView,
        setMultiCheckView,
        selectedCheckboxes,
        toggleCheckbox,
        setSelectedCheckboxes
      }}>
      {children}
    </MultiCheckViewContext.Provider>
  );
};

const useMultiCheckViewContext = () => {
  const context = useContext(MultiCheckViewContext);
  if (!context) {
    throw new Error("useMultiCheckViewContext must be used within a MultiCheckViewProvider");
  }
  return context;
};

export { MultiCheckViewProvider, useMultiCheckViewContext };
