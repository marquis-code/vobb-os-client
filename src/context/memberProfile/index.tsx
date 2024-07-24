import { createContext, ReactNode, useContext, useState } from "react";

interface MemberProfileContextType {
  subTab: string;
  handleUpdateSubTab: (tab: string) => void;
}

const defaultValue: MemberProfileContextType = {
  subTab: "",
  handleUpdateSubTab: () => {}
};

export const MemberProfileContext = createContext<MemberProfileContextType>(defaultValue);

interface MemberProfileContextProviderProps {
  children: ReactNode;
}

export const useMemberProfileContext = () => {
  return useContext(MemberProfileContext);
};

export const MemberProfileProvider = ({ children }: MemberProfileContextProviderProps) => {
  const [subTab, setSubTab] = useState<string>("details");

  const handleUpdateSubTab = (tab: string) => {
    setSubTab(tab);
  };

  return (
    <MemberProfileContext.Provider value={{ subTab, handleUpdateSubTab }}>
      {children}
    </MemberProfileContext.Provider>
  );
};
