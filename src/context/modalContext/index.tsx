import { useFetchBranches, useFetchUser } from "hooks";
import { AddBranch, AddTeam, InviteMember, UpdateJobTitle } from "pages";
import { CreateClient } from "pages/pipeline/createClient";
import { createContext, ReactNode, useContext, useState, ReactElement } from "react";

interface ModalContextType {
  addBranch: boolean;
  addTeam: boolean;
  inviteMember: boolean;
  updateJobTitle: boolean;
  addClient: {
    show: boolean;
    pipeline?: string;
  };
  setUpdateJobTitle: (value: boolean) => void;
  setAddBranch: (value: boolean) => void;
  setAddTeam: (value: boolean) => void;
  setInviteMember: (value: boolean) => void;
  setAddClient: (value: { show: boolean; pipeline?: string }) => void;
  pipelineUpdateCallback: () => void;
  setPipelineUpdateCallback: (callback: () => void) => void;
}

const defaultValue: ModalContextType = {
  addBranch: false,
  addTeam: false,
  inviteMember: false,
  updateJobTitle: false,
  addClient: {
    show: false
  },
  setUpdateJobTitle: () => {},
  setAddBranch: () => {},
  setAddTeam: () => {},
  setInviteMember: () => {},
  setAddClient: () => {},
  pipelineUpdateCallback: () => {},
  setPipelineUpdateCallback: () => {}
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
  const [addClient, setAddClient] = useState<{
    show: boolean;
    pipeline?: string;
  }>({
    show: false
  });
  const [pipelineId, setPipelineId] = useState<string>("");
  const [pipelineUpdateCallback, setPipelineUpdateCallback] = useState<() => void>(() => {});
  const { fetchUserDetails } = useFetchUser();
  const { fetchOrgBranches } = useFetchBranches({});
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
        setInviteMember,
        addClient,
        setAddClient,
        pipelineUpdateCallback,
        setPipelineUpdateCallback
      }}>
      {children}
      <AddBranch
        close={() => setAddBranch(false)}
        show={addBranch}
        callback={() => {
          fetchOrgBranches({});
          setAddBranch(false);
        }}
      />
      <AddTeam close={() => setAddTeam(false)} show={addTeam} />
      <InviteMember close={() => setInviteMember(false)} show={inviteMember} />
      <UpdateJobTitle
        close={() => setUpdateJobTitle(false)}
        show={updateJobTitle}
        callback={() => {
          fetchUserDetails();
          setUpdateJobTitle(false);
        }}
      />
      <CreateClient
        close={() => setAddClient((prev) => ({ ...prev, show: false }))}
        show={addClient.show}
        callback={pipelineUpdateCallback}
      />
    </ModalContext.Provider>
  );
};
