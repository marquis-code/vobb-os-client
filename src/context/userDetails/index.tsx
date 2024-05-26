import { createContext, useState, useContext, ReactNode } from "react";
import { OrganisationBranchesProps, OrganisationProfileProps, UserProfileProps } from "types";

interface UserContextProps {
  userDetails: UserProfileProps | null;
  orgDetails: OrganisationProfileProps | null;
  orgBranches: OrganisationBranchesProps[];
  handleUpdateUser: (userDetails: UserProfileProps | null) => void;
  handleUpdateOrg: (orgDetails: OrganisationProfileProps | null) => void;
  handleUpdateBranches: (orgBranches: OrganisationBranchesProps[]) => void;
}

const UserDetailsContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserDetailsProvider");
  }
  return context;
};

export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserProfileProps | null>(null);
  const [orgDetails, setOrgDetails] = useState<OrganisationProfileProps | null>(null);
  const [orgBranches, setOrgBranches] = useState<OrganisationBranchesProps[]>([]);

  const handleUpdateUser = (userDetails: UserProfileProps | null) => {
    setUserDetails(userDetails);
  };

  const handleUpdateOrg = (orgDetails: OrganisationProfileProps | null) => {
    setOrgDetails(orgDetails);
  };

  const handleUpdateBranches = (orgBranches: OrganisationBranchesProps[]) => {
    setOrgBranches(orgBranches);
  };

  return (
    <UserDetailsContext.Provider
      value={{
        userDetails,
        orgDetails,
        orgBranches,
        handleUpdateUser,
        handleUpdateOrg,
        handleUpdateBranches
      }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
