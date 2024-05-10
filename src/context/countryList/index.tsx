import { createContext, ReactNode, useContext, useState } from "react";
import { optionType } from "types";

export interface CountryType extends optionType {
  postalCode: {
    format?: string;
    regex?: string;
  };
}

interface CountriesContextType {
  countries: CountryType[];
  handleUpdateCountries: (countries: CountryType[]) => void;
}

const defaultValue: CountriesContextType = {
  countries: [],
  handleUpdateCountries: () => {}
};

const CountriesContext = createContext<CountriesContextType>(defaultValue);

interface CountriesContextProviderProps {
  children: ReactNode;
}

export const useCountriesContext = () => {
  return useContext(CountriesContext);
};

export const CountriesProvider = ({ children }: CountriesContextProviderProps) => {
  const [countries, setCountries] = useState<CountryType[]>([]);

  const handleUpdateCountries = (countries: CountryType[]) => {
    setCountries(countries);
  };

  return (
    <CountriesContext.Provider value={{ countries, handleUpdateCountries }}>
      {children}
    </CountriesContext.Provider>
  );
};
