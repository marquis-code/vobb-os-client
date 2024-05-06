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
  size?: optionType | null;
  sector?: optionType | null;
}

export interface CompanyFormProps {
  initName: { organisation: string };
  initSize: { size: optionType | null };
  initSector: { sector: optionType | null };
  submit: (data: CompanyFormData) => void;
}
export interface CompanyFormErrors {
  organisation?: string;
  sector?: string;
  teamSize?: string;
}

export interface CompanyWebsiteData {
  companyUrl: string;
}
export interface CompanyUrlFormProps {
  initData: CompanyWebsiteData | undefined;
  submit: (data: CompanyWebsiteData) => void;
}

export interface CompanyAddressFormData {
  country?: optionType;
  zipcode?: string;
  province?: string;
  address1?: string;
  address2?: string;
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
  initData?: CompanyAddressFormData | undefined;
  submit: (data: CompanyAddressFormData) => void | undefined;
  countries?: CountryType[];
  changeActiveState?: (newActiveCompanyInfo: string) => void;
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
