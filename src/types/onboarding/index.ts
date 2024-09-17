import { ReactElement } from "react";
import { optionType } from "types/interfaces";

export type companySizeTypes = "0-5" | "6-10" | "11-20" | "21-50" | "51+";
export type companySectorTypes = "Education" | "Medical and Health" | "Tourism";
export interface StepsType {
  icon: ReactElement<SVGElement>;
  name: string;
  title: string;
  desc: string;
}
export interface FullnameFormData {
  firstName: string;
  lastName: string;
}

export interface FullnameFormProps {
  loading: boolean;
  initData: FullnameFormData;
  submit: (data: FullnameFormData) => void;
}

export interface CompanyFormData {
  organisation?: string;
  size?: { label: string; value: companySizeTypes } | null;
  sector?: { label: string; value: companySectorTypes } | null;
}

export interface CompanyFormProps {
  initName: { organisation: string };
  initSize: { size: { label: string; value: companySizeTypes } | null };
  initSector: { sector: { label: string; value: companySectorTypes } | null };
  activeCompanyInfo: string;
  loading: boolean;
  handleCompanyChange: (step: string) => void;
  submit: (data: CompanyFormData) => void;
}

export interface CompanyWebsiteData {
  website: string;
}
export interface CompanyUrlFormProps {
  initData: CompanyWebsiteData;
  submit: (data: CompanyWebsiteData) => void;
  loading: boolean;
}

export interface CompanyAddressFormData {
  country?: optionType | null;
  zipCode?: string;
  state?: string;
  addressLine1?: string;
  addressLine2?: string;
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
  selectedCountry?: optionType | undefined;
}

export interface CountryType extends optionType {
  postalCode: {
    format?: string;
    regex?: string;
  };
  flag: string;
}

export interface companyAddressRequestBody {
  country?: string;
  zip_code?: string;
  state?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
}
