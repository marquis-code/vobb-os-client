import { createContext, ReactNode, useContext, useState, ReactElement } from "react";

interface ModalContextType {
  addBranch: boolean;
  addTeam: boolean;
  inviteMember: boolean;
  updateJobTitle: boolean;
  setUpdateJobTitle: (value: boolean) => void;
  setAddBranch: (value: boolean) => void;
  setAddTeam: (value: boolean) => void;
  setInviteMember: (value: boolean) => void;
}

const defaultValue: ModalContextType = {
  addBranch: false,
  addTeam: false,
  inviteMember: false,
  updateJobTitle: false,
  setUpdateJobTitle: () => {},
  setAddBranch: () => {},
  setAddTeam: () => {},
  setInviteMember: () => {}
};

export const ModalContext = createContext<ModalContextType>(defaultValue);

export const useModalContext = () => {
  return useContext(ModalContext);
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps): ReactElement => {
  const [addBranch, setAddBranch] = useState<boolean>(false);
  const [addTeam, setAddTeam] = useState<boolean>(false);
  const [inviteMember, setInviteMember] = useState<boolean>(false);
  const [updateJobTitle, setUpdateJobTitle] = useState<boolean>(false);
  return (
    <ModalContext.Provider
      value={{
        addBranch,
        addTeam,
        inviteMember,
        updateJobTitle,
        setUpdateJobTitle,
        setAddBranch,
        setAddTeam,
        setInviteMember
      }}>
      {children}
    </ModalContext.Provider>
  );
};
