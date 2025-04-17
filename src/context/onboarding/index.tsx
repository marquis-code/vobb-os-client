import { createContext, ReactNode, useContext, useState } from "react";
type FormType = "fullname" | "companyInfo" | "companyWeb" | "address";

type CompletedFormsType =
  | []
  | [FormType]
  | [FormType, FormType]
  | [FormType, FormType, FormType]
  | [FormType, FormType, FormType, FormType]
  | any;

interface OnboardingContextType {
  activeForm: FormType;
  completedForms: CompletedFormsType;
  setActiveForm: (form: FormType) => void;
  handleFormChange: (form: FormType, completed: CompletedFormsType) => void;
}

const defaultValue: OnboardingContextType = {
  activeForm: "fullname",
  setActiveForm: () => {},
  completedForms: [],
  handleFormChange: () => {}
};

const OnboardingContext = createContext<OnboardingContextType>(defaultValue);

interface OnboardingContextProviderProps {
  children: ReactNode;
}

export const useOnboardingContext = () => {
  return useContext(OnboardingContext);
};

export const OnboardingContextProvider = ({ children }: OnboardingContextProviderProps) => {
  const [activeForm, setActiveForm] = useState<FormType>("fullname");
  const [completedForms, setCompletedForms] = useState<CompletedFormsType>([]);

  /**
   * handleFormChange
   * @param form current form
   * @param completed list of completed forms
   */
  const handleFormChange = (form: FormType, completed: CompletedFormsType) => {
    setActiveForm(form);
    setCompletedForms(completed);
  };

  return (
    <OnboardingContext.Provider
      value={{ activeForm, setActiveForm, completedForms, handleFormChange }}>
      {children}
    </OnboardingContext.Provider>
  );
};
