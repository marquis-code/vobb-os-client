import { createContext, useState, useContext, ReactNode } from "react";
import { OrganisationProfileProps, UserProfileProps } from "types";

interface UserContextProps {
  userDetails: UserProfileProps | null;
  orgDetails: OrganisationProfileProps | null;
  handleUpdateUser: (userDetails: UserProfileProps | null) => void;
  handleUpdateOrg: (orgDetails: OrganisationProfileProps | null) => void;
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

  const handleUpdateUser = (userDetails: UserProfileProps | null) => {
    setUserDetails(userDetails);
  };

  const handleUpdateOrg = (orgDetails: OrganisationProfileProps | null) => {
    setOrgDetails(orgDetails);
  };

  return (
    <UserDetailsContext.Provider
      value={{
        userDetails,
        orgDetails,
        handleUpdateUser,
        handleUpdateOrg
      }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
