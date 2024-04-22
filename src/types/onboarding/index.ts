import { ReactElement } from "react";
import { optionType } from "../interfaces";

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
  initData: FullnameFormData | undefined;
  submit: (data: FullnameFormData) => void;
}

export interface CompanyFormData {
  organisation: string;
  sector?: optionType | null;
  teamSize?: optionType | null;
}

export interface CompanyFormProps {
  initData: CompanyFormData | undefined;
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
  country?: string;
  zipcode?: string;
  state?: string;
  addressline1?: string;
  addressline2?: string;
  city?: string;
}
export interface CompanyAddressProps {
  initData: CompanyAddressFormData | undefined;
  submit: (data: CompanyAddressFormData) => void;
}
export interface CompanyAddressFormErrors {
  country?: string;
  zipcode?: string;
  state?: string;
  addressline1?: string;
  addressline2?: string;
  city?: string;
}
