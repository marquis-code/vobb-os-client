import { createContext, useState, useContext, ReactNode } from "react";
import { UserProfileProps } from "types";

interface UserContextProps {
  userDetails: UserProfileProps | null;
  handleUpdateUser: (userDetails: UserProfileProps | null) => void;
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

  const handleUpdateUser = (userDetails: UserProfileProps | null) => {
    setUserDetails(userDetails);
  };

  return (
    <UserDetailsContext.Provider value={{ userDetails, handleUpdateUser }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
