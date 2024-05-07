/*
=================================
ONBOARDING SERVICES
=================================
*/

import {
  companyAddressesURL,
  companyCountryURL,
  companyNameURL,
  companySectorURL,
  companySizeURL,
  companyStateURL,
  companyWebsiteURL,
  companyZipcodeURL,
  patchRequest,
  personalDetailsURL
} from "api";
import { CompanyAddressFormData, CompanyWebsiteData, optionType } from "types";
interface personalData {
  first_name: string;
  last_name: string;
}

/**
 * personal details service
 * @param data - An object containing the personal information including firstname and lastname
 * @returns axios promise
 */
export const personalDetailsService = (data: personalData) => {
  return patchRequest({
    url: personalDetailsURL(),
    data: data
  });
};

/**
 * company name service
 * @param data - An object containing company name, type string.
 * @returns axios promise
 */
export const companyNameService = (data: { name: string | undefined }) => {
  return patchRequest({
    url: companyNameURL(),
    data: data
  });
};

/**
 * company size service
 * @param data - An object containing company size, type string(get value from optionType)
 * @returns axios promise
 */
export const companySizeService = (data: { size: optionType | null }) => {
  return patchRequest({
    url: companySizeURL(),
    data: data
  });
};

/**
 * company sector service
 * @param data - An object containing company sector, type string(get value from optionType).
 * @returns axios promise
 */
export const companySectorService = (data: { sector: optionType | null }) => {
  return patchRequest({
    url: companySectorURL(),
    data: data
  });
};

/**
 * company website service
 * @param data - An object containing company website, type string.
 * @returns axios promise
 */
export const companyWebsiteService = (data: CompanyWebsiteData) => {
  return patchRequest({
    url: companyWebsiteURL(),
    data: data
  });
};

/**
 * company country service
 * @param data - An object containing company's operating country, type string(gotten from option value).
 * @returns axios promise
 */
export const companyCountryService = (data: { country: optionType | null }) => {
  return patchRequest({
    url: companyCountryURL(),
    data: data
  });
};

/**
 * company zipcode service
 * @param data - An object containing company's operating country's zipcode, type string.
 * @returns axios promise
 */
export const companyZipcodeService = (data: { zip_code: string | undefined }) => {
  return patchRequest({
    url: companyZipcodeURL(),
    data: data
  });
};

/**
 * company state service
 * @param data - An object containing company's operating state, type string.
 * @returns axios promise
 */
export const companyStateService = (data: { state: string | undefined }) => {
  return patchRequest({
    url: companyStateURL(),
    data: data
  });
};

/**
 * company address service
 * @param data - An object containing company's address lines and city, each of type string.
 * @returns axios promise
 */
export const companyAddressesService = (data: CompanyAddressFormData) => {
  return patchRequest({
    url: companyAddressesURL(),
    data: data
  });
};
