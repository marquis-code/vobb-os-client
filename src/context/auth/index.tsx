import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  email: string;
  message: string;
  handleSetResponse: (email: string, message: string) => void;
}

const defaultValue: AuthContextType = {
  email: "",
  message: "",
  handleSetResponse: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultValue);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSetResponse = (email: string, message: string) => {
    setEmail(email);
    setMessage(message);
  };

  return (
    <AuthContext.Provider value={{ email, message, handleSetResponse }}>
      {children}
    </AuthContext.Provider>
  );
};
