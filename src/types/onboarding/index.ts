import { ReactElement } from "react";
import { optionType } from "types/interfaces";

export interface StepsType {
  icon: ReactElement<SVGElement>;
  name: string;
  title: string;
  desc: string;
}
export interface FullnameFormData {
  first_name: string;
  last_name: string;
}

export interface FullnameFormProps {
  loading: boolean;
  initData: FullnameFormData | undefined;
  submit: (data: FullnameFormData) => void;
}

export interface CompanyFormData {
  organisation?: string;
  size?: optionType | string | null | undefined;
  sector?: optionType | string | null;
}

export interface CompanyFormProps {
  initName: { organisation: string };
  initSize: { size: optionType | null };
  initSector: { sector: optionType | null };
  activeCompanyInfo: string;
  loading: boolean;
  handleCompanyChange: (step: string) => void;
  submit: (data: CompanyFormData) => void;
}
export interface CompanyFormErrors {
  organisation?: string;
  sector?: string;
  teamSize?: string;
}

export interface CompanyWebsiteData {
  website: string;
}
export interface CompanyUrlFormProps {
  initData: CompanyWebsiteData | undefined;
  submit: (data: CompanyWebsiteData) => void;
  loading: boolean;
}

export interface CompanyAddressFormData {
  country?: optionType | null;
  zip_code?: string;
  state?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
}

export interface CountriesProps {
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  name: {
    common: string;
    nativeName: {
      ron: {
        common: string;
        official: string;
      };
      official: string;
    };
  };
  postalCode: {
    format: string;
    regex: string;
  };
}
export interface CompanyAddressProps {
  initCountry?: CompanyAddressFormData;
  initZipcode?: CompanyAddressFormData;
  initState?: CompanyAddressFormData;
  initCityAddresses?: CompanyAddressFormData;
  activeCompanyAddress?: string;
  loading: boolean;
  handleCompanyChange?: (step: string) => void;
  submit: (data: CompanyAddressFormData) => void | undefined;
  countries?: CountryType[];
}
export interface CompanyAddressFormErrors {
  country?: string;
  zipcode?: string;
  state?: string;
  addressline1?: string;
  addressline2?: string;
  city?: string;
}

export interface CountryType extends optionType {
  postalCode: {
    format?: string;
    regex?: string;
  };
  flag: string;
}
