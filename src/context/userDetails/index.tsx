import { createContext, useState, useContext, ReactNode } from "react";

const UserDetailsContext = createContext<any>(undefined);

export const useUserContext = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserDetailsProvider");
  }
  return context;
};

export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState(null);

  const handleUpdateUser = (userDetails: any) => {
    setUserDetails(userDetails);
  };

  return (
    <UserDetailsContext.Provider value={{ userDetails, handleUpdateUser }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
